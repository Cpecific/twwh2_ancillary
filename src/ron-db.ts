import assert from 'assert';
import path from 'path';
import fs from 'fs';
import ASTY from 'asty-astq';
/**
 * !WARNING
 * I modified `tokenizr` package, so it won't use `Array.slice`
 * or `Array.push` each time some action happens.
 * Otherwise, native `tokenizr` will take tens of hours (or probably never)
 * to finish processing .ron file
 */
import Tokenizr, { IToken } from 'tokenizr';
import { get } from 'lodash';
import { StringDecoder } from 'string_decoder';
import { current_game, game_data } from './config';

const fieldTypeList = [
	'string', 'optstring',
	'string_ascii', 'optstring_ascii',
	'float', 'int', 'int64', 'boolean',
	'colour_rgb'] as const;
export type FieldType = typeof fieldTypeList[number];
interface IField {
	name: string;
	type: FieldType;
	pk: boolean;
	locFile: string | undefined;
}
interface IDefinition {
	version: number;
	fieldList: IField[];
	keyList: string[];
	locList: IField[];
	refList: IField[];
}
interface ISchema {
	table: string;
	name: string;
	definitionList: IDefinition[];
}
const readString = (opts: {
	buf: Buffer;
	offset: number;
	encoding: 'utf8' | 'utf16';// | 'test';
	optional: boolean;
	// debug?: boolean;
}) => {
	let { buf, offset } = opts;
	if (opts.optional && buf[offset++] === 0x00) {
		return [
			null,
			offset
		] as const;
	}
	const int = buf.slice(offset, offset += 2);
	let length = int.readInt16LE();
	if (opts.encoding === 'utf16') { length *= 2; }
	// else if (opts.encoding === 'test') { length *= 2; }
	const dec = new StringDecoder(
		opts.encoding === 'utf16' ? 'utf16le' :
			opts.encoding === 'utf8' ? 'utf8' :
				'utf8');
	const stringRaw = buf.slice(offset, offset += length);
	// if (opts.debug) {
	// 	const decMap = {
	// 		ascii: new StringDecoder('ascii'),
	// 		latin1: new StringDecoder('latin1'),
	// 		ucs2: new StringDecoder('ucs2'),
	// 		utf16le: new StringDecoder('utf16le'),
	// 		utf8: new StringDecoder('utf8'),
	// 	}
	// 	console.log({
	// 		int,
	// 		length,
	// 		stringRaw,
	// 	})
	// 	for (const key in decMap) {
	// 		// @ts-ignore
	// 		const dec = decMap[key];
	// 		// console.log(key, dec.end(stringRaw));
	// 		// console.log()
	// 		// console.log()
	// 	}
	// }
	return [
		dec.end(stringRaw),
		offset,
	] as const;
};
export interface IEntry {
	[K: string]: string | boolean | number | bigint | null;
}
interface SchemaInput {
	db: Buffer;
}
export type SchemaKeyed = { [K: string]: SchemaKeyed };
interface SchemaData {
	raw: IEntry[];
	keyed: SchemaKeyed;
	getEntry(keyList: string[]): IEntry | null;
}
type LocFile = Map<string, string>;
class LocFileController {
	map = new Map<string, LocFile>();
	constructor() { }
	loadFile(opts: {
		name: string;
		filepath?: string;
	}) {
		let { filepath, name } = opts;
		if (typeof filepath === 'undefined' && this.map.has(name)) {
			return this.map.get(name)!;
		}
		const file: LocFile = new Map();
		if (typeof filepath === 'undefined') {
			this.map.set(name, file);
			filepath = path.join(__dirname, '../input', current_game, 'text/db', `${name}__.loc`);
		}
		const input = fs.existsSync(filepath) ?
			fs.readFileSync(filepath) :
			undefined;
		if (typeof input === 'undefined') {
			return file;
		}
		let offset = 14;
		const entryCnt = input.slice(offset - 4, offset).readUInt32LE();
		for (let i = 0; i < entryCnt; ++i) {
			const strList: string[] = [];
			for (let j = 0; j < 2; ++j) {
				const [string, setOffset] = readString({
					buf: input,
					offset,
					encoding: 'utf16',
					optional: false,
				});
				offset = setOffset;
				strList.push(string!);
			}
			let [key, localisation] = strList;
			// isTooltip
			++offset;
			file.set(key, localisation);
		}
		return file;
	}
}
export const locFileController = new LocFileController();
class Schema implements ISchema {
	table: string;
	name: string;
	version: number | null;
	definitionList: IDefinition[];
	constructor(s: ISchema) {
		this.table = s.table;
		this.name = s.name;
		this.definitionList = s.definitionList;
		this.version = null;
	}
	private data: SchemaData | null = null;
	tryLoadVersion(definition: IDefinition, input: SchemaInput) {
		const { fieldList, keyList, locList, refList, version } = definition;
		let headerSize = 83;
		if (input.db[78] !== 0x01) { headerSize += 8; }
		const entryCnt = input.db.slice(headerSize - 4, headerSize).readUInt32LE();
		let offset = headerSize;
		this.data = {
			raw: [],
			keyed: {},
			getEntry(keyList) {
				let ref = this.keyed;
				for (const key of keyList) {
					if (typeof ref[key] === 'undefined') { return null; }
					ref = ref[key] as SchemaKeyed;
				}
				return ref as unknown as IEntry;
			}
		};
		for (let i = 0; i < entryCnt; ++i) {
			let entry: IEntry = {};
			let v: Buffer;
			let string: ReturnType<typeof readString>;
			for (const field of fieldList) {
				switch (field.type) {
					case 'boolean':
						entry[field.name] = (input.db[offset++] !== 0x00);
						break;
					case 'int':
						v = input.db.slice(offset, offset += 4);
						entry[field.name] = v.readInt32LE();
						break;
					case 'int64':
						v = input.db.slice(offset, offset += 8);
						entry[field.name] = v.readBigInt64LE();
						break;
					case 'float':
						v = input.db.slice(offset, offset += 4);
						entry[field.name] = v.readFloatLE();
						break;
					case 'colour_rgb':
						// let's just skip it for now, as I don't even use those values
						// should be raw: BGRA
						input.db.slice(offset, offset += 4);
						// v = input.db.slice(offset, offset += 4);
						// entry[field.name] = v.readInt32LE();
						break;
					case 'optstring':
					case 'optstring_ascii':
					case 'string':
					case 'string_ascii':
						string = readString({
							buf: input.db,
							offset,
							encoding: field.type.indexOf('_ascii') !== -1 ? 'utf8' : 'utf16',
							optional: field.type.indexOf('opt') === 0,
						});
						entry[field.name] = string[0];
						offset = string[1];
						break;
				}
			}
			if (keyList.length > 0) {
				let keyedRef: SchemaKeyed = this.data.keyed;
				for (let i = 0; i < keyList.length - 1; ++i) {
					const key = entry[keyList[i]] as string;
					if (typeof keyedRef[key] === 'undefined') {
						keyedRef[key] = {};
					}
					keyedRef = keyedRef[key] as SchemaKeyed;
				}
				const key = entry[keyList[keyList.length - 1]] as string;
				keyedRef[key] = entry as unknown as SchemaKeyed;
			}
			for (const locField of locList) {
				entry[`@${locField.name}`] = null;
			}
			for (const locField of refList) {
				entry[`@${locField.name}`] = null;
			}
			this.data.raw.push(entry);
			if (offset > input.db.length) { throw 'error'; }
		}
		if (offset !== input.db.length) { throw 'error'; }

		const locMap = locFileController.loadFile({ name: this.name });
		for (let [key, localisation] of locMap) {
			for (const locField of locList) {
				const substr = `${this.name}_${locField.name}_`;
				if (key.indexOf(substr) === 0) {
					key = key.substr(substr.length);
					// const entry = this.data.keyed[key] as unknown as IEntry;
					const entry = this.data.raw.find(row => {
						let rowKey = keyList.map(keyColumn => {
							const val = row[keyColumn];
							if (!val) { return ''; }
							return val.toString();
						}).join('');
						return rowKey === key
					});
					if (entry) {
						entry[`@${locField.name}`] = localisation;
					}
					break;
				}
			}
		}
		for (const locField of refList) {
			const substr = `${this.name}_${locField.name}_`;
			const locMap = locFileController.loadFile({ name: locField.locFile! });
			for (let [key, localisation] of locMap) {
				if (key.indexOf(substr) === 0) {
					key = key.substr(substr.length);
					const entry = this.data.raw.find(row => (
						row[locField.name] === key
					));
					if (typeof entry !== 'undefined') {
						entry[`@${locField.name}`] = localisation;
					}
					break;
				}
			}
		}
	}
	getData(input?: SchemaInput) {
		const initialVoid = (typeof input === 'undefined');
		if (initialVoid) {
			if (this.data !== null) { return this.data; }
			input = {
				db: fs.readFileSync(path.join(__dirname, '../input', current_game, 'db', this.table, 'data__')),
			};
		}
		let definitionList = this.definitionList;
		if (initialVoid && this.version !== null) {
			definitionList = definitionList.filter(d => d.version === this.version);
		}
		for (const definition of definitionList) {
			try {
				this.tryLoadVersion(definition, input!);
				if (initialVoid) { this.version = definition.version; }
				break;
			} catch (e) {
				// console.log(
				// 	'// FAILED TO LOAD DEFINITION //',
				// 	{
				// 		table: this.table,
				// 		definition,
				// 	},
				// 	e);
			}
		}
		assert(this.version !== null, `failed to parse DB file "${this.table}"`);
		return this.data!;
	}
	getDefinition() {
		this.getData();
		return this.definitionList.find(def => def.version === this.version);
	}
}

export const schema: { [K: string]: Schema } = {};

function parseSchema(input: string) {
	let asty = new ASTY()
	const AST = (type: string, ref: any) => {
		let ast = asty.create(type);
		if (typeof ref === 'object' && ref instanceof Array && ref.length > 0) {
			ref = ref[0];
		}
		if (typeof ref === 'object' && ref instanceof Tokenizr.Token) {
			ast.pos(ref.line, ref.column, ref.pos);
		} else if (typeof ref === 'object' && asty.isA(ref)) {
			ast.pos(ref.pos().line, ref.pos().column, ref.pos().offset);
		}
		return ast;
	}

	// #region LEXER
	const lexer = new Tokenizr();
	// Some|SequenceU32|DB
	lexer.rule(/(None|Boolean|StringU8|StringU16|OptionalStringU8|OptionalStringU16|ColourRGB|I8|I16|I32|I64|U8|U16|U32|U64|F32|F64)/, (ctx, match) => {
		ctx.accept('keyword', match[1]);
	});
	lexer.rule(/(true|false)/i, (ctx, match) => {
		ctx.accept('boolean', match[1]);
	});
	lexer.rule(/[a-z_][a-z\d_]*/i, (ctx, match) => {
		ctx.accept('id');
	});
	lexer.rule(/-?\d+/, (ctx, match) => {
		ctx.accept('number', parseInt(match[0]));
	});
	lexer.rule(/"((?:\\"|[^\r\n])*?)"/, (ctx, match) => {
		ctx.accept('string', match[1].replace(/\\"/g, "\""));
	});
	lexer.rule(/[\s\r\n]+/, (ctx, match) => {
		ctx.ignore();
	});
	lexer.rule(/./, (ctx, match) => {
		ctx.accept('char');
	});
	// #endregion

	// 	input = `foo {
	// 	baz = 1 // sample comment
	// 	bar {
	// 		quux = 42
	// 		hello = "hello \"world\"!"
	// 	}
	// 	quux = 7
	// }`;

	lexer.input(input);
	// lexer.tokens().forEach(token => {
	// 	console.log(token.toString())
	// })
	// return;
	// lexer.debug(true);
	const debug = !true;
	let structName: IToken | undefined = undefined;
	const createParseStructTuple = (isStruct: boolean) => () => {
		const name = structName;
		lexer.consume('char', '(');
		const itemList: IToken[] = [];
		const parseValue = isStruct ?
			parser.parseKV :
			parser.parseValue;
		if (!name) {
			// debug && console.log(NAME, 'getValue');
			const item = parseValue();
			// debug && console.log(NAME, 'parseComma');
			lexer.consume('char', ',');
			itemList.push(item);
			// debug && console.log(NAME, 'result', item);
		}
		while (true) {
			// debug && console.log(NAME, 'getValue or EOF');
			let peek = lexer.peek();
			if (peek.type === 'char' && peek.value === ')') {
				lexer.token(); break;
			}
			const item = parseValue();
			// debug && console.log(NAME, 'result', item);
			itemList.push(item);

			peek = lexer.token()!;
			if (peek.type !== 'char') { throw lexer.error(); }
			if (peek.value === ')') { break; }
			else if (peek.value !== ',') { throw lexer.error(); }
		}
		return {
			type: isStruct ? 'Struct' : 'Tuple',
			name: name?.value,
			value: itemList,
		} as unknown as IToken;
		// const ast = AST(isStruct ? 'Struct' : 'Tuple', name || firstChar || itemList);
		// ast.add(itemList)
		// ast.set({ name: name ? name.value : null });
		// // console.log(NAME, 'complete');
		// return ast;
	}
	const createParseMapArray = (isMap: boolean) => () => {
		const eof = isMap ? '}' : ']';
		lexer.consume('char', isMap ? '{' : '[');
		const itemList: IToken[] = [];
		const parseValue = isMap ?
			parser.parseKV :
			parser.parseValue;
		while (true) {
			let peek = lexer.peek();
			if (peek.type === 'char' && peek.value === eof) {
				lexer.token(); break;
			}
			const item = parseValue();
			itemList.push(item);

			peek = lexer.token()!;
			if (peek.type !== 'char') { throw lexer.error(); }
			if (peek.value === eof) { break; }
			else if (peek.value !== ',') { throw lexer.error(); }
		}
		return {
			type: isMap ? 'Map' : 'Array',
			value: itemList,
		} as unknown as IToken;
		// return AST(isMap ? 'Map' : 'Array', firstChar || itemList).add(itemList);
	};
	const parser = {
		parseCfg() {
			// structName = { value: 'ROOT' } as IToken;
			structName = undefined;
			const ast = parser.parseStruct();
			lexer.consume('EOF');
			return ast;
		},
		parseStruct: createParseStructTuple(true),
		parseTuple: createParseStructTuple(false),
		parseMap: createParseMapArray(true),
		parseArray: createParseMapArray(false),
		parseKV() {
			const key = lexer.token()!;
			switch (key.type) {
				case 'id':
				case 'number':
				case 'string':
					break;
				default:
					throw lexer.error();
			}
			lexer.consume('char', ':');
			// debug && console.log('consuming KV, key =', key.value)
			let value = parser.parseValue();
			return {
				type: 'Property',
				key: key.value,
				value,
			} as unknown as IToken;
			// return AST('Property', key).set({
			// 	key: key.value,
			// 	value,
			// });
		},
		parseValue(): IToken {
			let peek = lexer.peek();
			structName = undefined;
			if (peek.type === 'id') {
				structName = lexer.token()!;
				peek = lexer.peek();
				if (peek.type !== 'char' || peek.value !== '(') {
					throw lexer.error();
				}
			}
			if (peek.type === 'char') {
				if (peek.value === '(') {
					if (structName) {
						return lexer.alternatives(
							parser.parseTuple,
							parser.parseStruct,
						);
					}
					return lexer.alternatives(
						parser.parseStruct,
						parser.parseTuple,
					);
					// peek = lexer.peek(1);
					// if (peek.type === 'char') {
					// 	if (peek.value === ')') {
					// 		return parser.parseTuple();
					// 	}
					// 	throw lexer.error();
					// }
					// switch (peek.type) {
					// 	case 'number':
					// 	case 'boolean':
					// 	case 'string':
					// 	case 'keyword':
					// 		peek = lexer.peek(2);
					// 		if (peek.type === 'char') {
					// 			if (peek.value === ':') {
					// 				return parser.parseStruct();
					// 			} else if (peek.value === ')') {
					// 				return parser.parseTuple();
					// 			}
					// 		}
					// 		throw lexer.error();
					// 		break;
					// 	default:
					// 		throw lexer.error();
					// }
					// return;
				}
				else if (peek.value === '[') {
					return parser.parseArray();
				}
				else if (peek.value === '{') {
					return parser.parseMap();
				}
				throw lexer.error();
			}
			switch (peek.type) {
				case 'number':
				case 'boolean':
				case 'string':
				case 'keyword':
					break;
				default:
					throw lexer.error();
			}
			return lexer.token()!;
			// return lexer.alternatives(
			// 	parser.parseNamedStructTuple,
			// 	parser.parseArray,
			// 	parser.parseMap,
			// 	parser.parseNumber,
			// 	parser.parseBoolean,
			// 	parser.parseString,
			// 	parser.parseKeyword,
			// );
		},
		parseKeyword() {
			return lexer.consume('keyword');
		},
		parseId() {
			return lexer.consume('id');
		},
		parseNumber() {
			return lexer.consume('number');
		},
		parseBoolean() {
			return lexer.consume('boolean');
		},
		parseString() {
			return lexer.consume('string');
		},
		parseComma() {
			return lexer.consume('char', ',');
		},
		parseEmpty() {
			return undefined;
		},
	}
	console.time();
	const ast = parser.parseCfg();
	console.timeEnd();
	// const ast2kv = () => {
	// 	let output: any = {};
	// 	ast.query('// Property').forEach((p: any) => {
	// 		let ns = p.query('..// Section').reverse().slice(1).map((n: any) => n.get('ns'));
	// 		let keyList = [...ns, p.get('key')];
	// 		let val = p.get('val');
	// 		// output += `${key} ${val}\n`;
	// 		let ref = output
	// 		for (const key of keyList) {
	// 			if (typeof output[key] === 'undefined') {
	// 				output[key] = {};
	// 			}
	// 			ref = output[key];
	// 		}
	// 	})
	// 	return output;
	// }
	// const kv = ast2kv();
	// console.log(kv);
	return ast as any;
}
function parseFieldList(rawFieldList: any) {
	// const rawFieldList = def[1].value.value;
	let pFieldList: any[] = [];
	for (const field of rawFieldList) {
		const parsed: any = {};
		for (const kv of field.value) {
			const v = kv.value;
			switch (kv.key) {
				case 'field_type':
					switch (v.value) {
						case 'StringU8':
							parsed[kv.key] = 'string_ascii';
							break;
						case 'OptionalStringU8':
							parsed[kv.key] = 'optstring_ascii';
							break;
						case 'StringU16':
							parsed[kv.key] = 'string';
							break;
						case 'OptionalStringU16':
							parsed[kv.key] = 'optstring';
							break;
						case 'F32':
							parsed[kv.key] = 'float';
							break;
						case 'I32':
							parsed[kv.key] = 'int';
							break;
						case 'I64':
							parsed[kv.key] = 'int64';
							break;
						case 'Boolean':
							parsed[kv.key] = 'boolean';
							break;
						case 'ColourRGB':
							parsed[kv.key] = 'colour_rgb';
							break;
					}
					break;
				case 'is_key':
					parsed[kv.key] = v.value === 'true';
					break;
				case 'max_length':
				case 'ca_order':
					parsed[kv.key] = parseInt(v.value);
					break;
				case 'name':
					parsed[kv.key] = v.value;
					break;
				case 'is_reference':
					if (v.value.type === 'Tuple' && v.value.name === 'Some') {
						const some = v.value.value[0];
						// [some[0].value, some[1].value]; // [text_file, key]
						parsed[kv.key] = some[0].value; // text_file
					}
					break;
			}
		}
		// if (!parsed.is_key) { continue; }
		if (parsed.ca_order < 0) { parsed.ca_order += 32767; }
		pFieldList.push(parsed);
	}
	// pFieldList.sort((a, b) => a.ca_order - b.ca_order);
	const fieldList = pFieldList.map((field): IField => ({
		name: field.name,
		type: field.field_type,
		pk: field.is_key,
		locFile: field.is_reference,
	}));
	return [fieldList, pFieldList] as const;
}
function loadSchema() {
	const schemaContent = fs.readFileSync(path.join(__dirname, '../input', current_game, game_data.get(current_game)!.schema_file)).toString();
	const schemaRaw = parseSchema(schemaContent);
	for (const dbTuple of schemaRaw.value[1].value.value) {
		if (dbTuple.type !== 'Tuple'
			|| dbTuple.name !== 'DB') { continue; }

		const dbTableName = dbTuple.value[0].value as string;
		const dbVersionList = dbTuple.value[1].value as any[];
		dbVersionList.sort((a, b) => b.value[0].value.value - a.value[0].value.value);
		const definitionList = dbVersionList.map(({ value: def }): IDefinition => {
			const [fieldList, pFieldList] = parseFieldList(def[1].value.value); // fields
			const [locList] = parseFieldList(def[2].value.value); // localised_fields
			const refList = fieldList.filter(q => typeof q.locFile !== 'undefined');
			const pKeyList = pFieldList.filter(f => f.is_key);
			pKeyList.sort((a, b) => a.ca_order - b.ca_order)
			const keyList: IDefinition['keyList'] = pKeyList.map(f => f.name);
			return {
				version: parseInt(def[0].value.value),
				fieldList,
				keyList,
				locList,
				refList,
			};
		});
		let locList = definitionList[definitionList.length - 1].locList;
		for (let i = definitionList.length - 2; i >= 0; --i) {
			const v = definitionList[i];
			if (v.locList.length === 0) {
				v.locList = locList;
			} else {
				locList = v.locList;
			}
		}

		const table = dbTableName;
		const name = table.replace(/\_tables$/, '');
		// console.log(name, fieldList);
		// if (name === 'achievements') { console.log(pFieldList); }
		if (!fs.existsSync(path.join(__dirname, '../input', current_game, 'db', table, 'data__'))) {
			continue;
		}
		const sch = new Schema({
			table,
			name,
			definitionList,
		});
		// if (sch.fieldList.some(f => f.name.indexOf('?') !== -1)) { continue; }
		schema[name] = sch;
	}
	// for (const name in schema) {
	// 	const tbl = schema[name];
	// 	// if (name[0] !== 'a') { continue; }
	// 	// if (name !== 'cdir_configs') { continue; }
	// 	console.log(name, tbl)
	// 	tbl.getData();
	// }
}

loadSchema();
