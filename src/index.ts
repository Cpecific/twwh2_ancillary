import fs from 'fs';
import glob from 'glob';
import iterate from 'iterare';
import { isEqual } from 'lodash';
import path from 'path';
import { current_game, game_data, data, dataCultureMap } from './config';
import { isEqualShuffle, toArray, unique, toMap } from './common';
import {
	concatTextNode,
	ctx_setTarget,
	DB,
	findAncillary,
	getCulture,
	getCultureSubcultureList,
	getEffectDesc,
	getFaction,
	getFactionListSorted,
	getSubcultureFactionList,
	getSubcultureSubset,
	IParsed,
	parseTrigger,
	printTextNode,
	sortParsedMap,
	toCultureKey,
	has_ca_ancillary,
	getTranslation,
} from './build-data';
import { _BugType, CultureType, ITrigger, SubCultureType, TransformBug } from './data-types';
import { } from './ron-db';
import assert from 'assert';


const replace_file_content = (filename: string, string: string) => {
	let content: string | null = null;
	try {
		content = fs.readFileSync(filename, { encoding: 'utf-8' });
	} catch (e) { }
	if (content !== string) {
		fs.writeFileSync(filename, string);
		return true;
	}
	return false;
};

// !STEAM
async function outputSteam() {
	if (current_game !== 'warhammer_2') { return; }
	ctx_setTarget('steam');
	const parsed = new Map<CultureType, Map<string, IParsed>>();
	for (const trigger of data) {
		for (const ancData of trigger.ancillaryList) {
			const ancillary = findAncillary(ancData.key);
			for (const cultureKey of ancillary.cultureList) {
				if (!parsed.has(cultureKey)) {
					parsed.set(cultureKey, new Map());
				}
				const cultureMap = parsed.get(cultureKey)!;
				const requestSubcultureSubset = getSubcultureSubset(cultureKey, ancillary.subcultureList);

				await parseTrigger({
					parsed: cultureMap,
					group: {
						by: 'culture',
						cultureKey,
						subcultureSubset: requestSubcultureSubset,
					},
					trigger,
					requestSubcultureSubset,
				});
			}
		}
	}
	sortParsedMap(parsed);
	let writtenCultureList: CultureType[] = [];
	for (const [cultureKey, cultureMap] of parsed) {
		let string = '';
		const culture = getCulture(cultureKey)!;
		const cultureData = dataCultureMap.get(cultureKey)!;
		const allSubcultureList = getCultureSubcultureList(cultureKey);
		console.log(cultureKey, allSubcultureList);
		// string += `[h1]${c['@name']}[/h1]\n`;
		if (typeof cultureData.description !== 'undefined') {
			string += `${cultureData.description}\n`;
		}
		string += `[table]`;
		string += `[tr]
[th]/////////////////////////[/th]
[th]//////////////////////////////////////////////////////////[/th]
[th]////////[/th]
[th]///////////////////////////////////////////////////////////[/th]
[/tr]`;
		for (const [ancillaryKey, parsed] of cultureMap) {
			const { ancillaryInfo, tirggerList } = parsed;
			const ancillary = findAncillary(ancillaryKey);
			const effectList = await Promise.all(ancillary.effectList.map(v => getEffectDesc(v, { cultureKey })));
			const subcultureSubset = getSubcultureSubset(cultureKey, ancillary.subcultureList);

			let steamChanceIcon: string[] = [];
			if (ancillaryInfo.hasLord) {
				if (ancillaryInfo.incompleteLord) {
					steamChanceIcon.push(`[previewicon=21642549;sizeOriginal,inline;character_general_ability.png][/previewicon]`);
				} else {
					steamChanceIcon.push(`[previewicon=21641941;sizeOriginal,inline;battle_general_ability.png][/previewicon]`);
				}
			}
			if (ancillaryInfo.hasHero) {
				if (ancillaryInfo.incompleteHero) {
					steamChanceIcon.push(`[previewicon=21642086;sizeOriginal,inline;character_agent.png][/previewicon]`);
				} else {
					steamChanceIcon.push(`[previewicon=21641943;sizeOriginal,inline;campaign_agent.png][/previewicon]`);
				}
			}
			let steamChanceText = steamChanceIcon.length > 0 ? steamChanceIcon.join('') + '\n' : '';

			let myInfo: string[] = [];
			ancillaryInfo.narrow.length > 0 && myInfo.push(ancillaryInfo.narrow.join(', '));

			if (!isEqualShuffle(subcultureSubset, allSubcultureList)) {
				myInfo.unshift(subcultureSubset
					.map(subcultureKey => (
						DB.cultures_subcultures.getEntry([subcultureKey])!['@name'] as string
					)).join(', '));
			}
			const tgResult = tirggerList.map(({ chance, repeat, triggerDesc }, idx) => {
				const tgDescList = triggerDesc.map(v => {
					let text = v.text;
					if ((v.top.allowed.length + v.top.against.length + v.top.forbid.length) > 0) {
						let top = v.top.allowed.slice();
						top = concatTextNode(top, v.top.against, { text: 'against: ' });
						top = concatTextNode(top, v.top.forbid, { text: 'Forbid:: ' }, true);
						let topText = printTextNode(top, v => {
							let t = v.text;
							if (v.underline) { t = `[u]${t}[/u]`; }
							if (v.strike) { t = `[s]${t}[/s]`; }
							return t;
						});
						text = `(${topText})\n${text}`;
					}
					if (!v.c.prevent) {
						text = `*${text}`;
					}
					return text;
				});
				return `[td]${idx === 0 ? steamChanceText : ''}${chance}%${typeof repeat === 'undefined' ? '' : `\nx${repeat}`}[/td]
[td]${unique(tgDescList).join(';\n')}[/td]`;
			});

			// myInfo = myInfo.map(v => `(only for: ${v})`);
			myInfo = myInfo.map(v => `(${v})`);
			string += `[tr]
[td]${ancillary.ancillary['@onscreen_name']}[/td]
[td]${[...myInfo, ...effectList].join('\n')}[/td]
${tgResult[0]}
[/tr]`;
			if (tgResult.length > 1) {
				string += tgResult
					.slice(1)
					.map(string => `
[tr]
[td][/td]
[td][/td]
${string}
[/tr]`)
					.join('');
			}
		}
		string += `[/table]`;

		const outputFolder = path.join(__dirname, '../output', 'steamworkshop', current_game);
		fs.mkdirSync(outputFolder, { recursive: true });
		const filename = path.join(outputFolder, `${cultureKey}.txt`);
		if (replace_file_content(filename, string)) {
			writtenCultureList.push(cultureKey);
		}
	}
	console.log('@writtenCultureList (steam)', writtenCultureList);
}

// !HTML
const enum ConditionFlags {
	not_stolen = 0,
	prevent = 1,
	normal = 2,
	randomly_dropped = 0,
	lua_dropped = 4,
};
const html_public_version = '16'; // ! always update this value, when push update!
async function outputHTML() {
	ctx_setTarget('html');
	// subculture > ancillary > parsed
	type ParsedMapType = Map<SubCultureType, Map<string, IParsed & {
		_category_title?: string;
	}>>;
	const parsed: ParsedMapType = new Map();
	let {
		cultureMap,
		playableFactionList,
	} = getFactionListSorted();
	for (const [cultureKey, { subcultureList }] of cultureMap) {
		for (const subcultureKey of subcultureList) {
			if (!parsed.has(subcultureKey)) {
				parsed.set(subcultureKey, new Map());
			}
		}
	}
	for (const trigger of data) {
		for (const ancData of trigger.ancillaryList) {
			const ancillary = findAncillary(ancData.key);
			for (const subcultureKey of ancillary.subcultureList) {
				if (!parsed.has(subcultureKey)) {
					parsed.set(subcultureKey, new Map());
				}
				const ancMap = parsed.get(subcultureKey)!;
				const cultureKey = toCultureKey(subcultureKey);
				const requestSubcultureSubset = [subcultureKey];

				await parseTrigger({
					parsed: ancMap,
					group: {
						by: 'subculture',
						cultureKey,
						subculture: subcultureKey,
					},
					trigger,
					requestSubcultureSubset,
				});
			}
		}
	}
	for (const key of ['filter_all', 'wh2_main_rogue'] as SubCultureType[]) {
		parsed.delete(key);
	}
	sortParsedMap(parsed);
	if (current_game === 'warhammer_3') {
		// удаляем prologue
		for (const k of [
			'wh3_main_pro_sc_kho_khorne',
			'wh3_main_pro_sc_tze_tzeentch',
			'wh3_main_pro_sc_ksl_kislev',
		] as SubCultureType[]) { parsed.delete(k); }
	}
	const extra = {
		stolen: {
			followers: new Map() as ParsedMapType,
			banners: new Map() as ParsedMapType,
		},
		randomly_dropped: {
			followers: new Map() as ParsedMapType,
			banners: new Map() as ParsedMapType,
		},
	};
	for (const row of DB.ancillaries.raw) {
		const ancillaryKey = row['key'] as string;
		const cbs = row['can_be_stolen'];
		const rd = row['randomly_dropped'];
		const hcaa = has_ca_ancillary(ancillaryKey);
		if (!cbs && !rd && !hcaa) { continue; } // we are only interested in those that can be (stolen or dropped or lua dropped)
		const category = row['category'] as string;
		if (category !== 'general') { continue; }
		const bannerKey = row['provided_banner'] as string | null;
		const ancillary = findAncillary(ancillaryKey);
		let ex: ParsedMapType = extra[cbs ? 'stolen' : 'randomly_dropped'][bannerKey ? 'banners' : 'followers'];
		for (const subcultureKey of ancillary.subcultureList) {
			const ancMap = parsed.get(subcultureKey);
			if (!ancMap) { continue; }
			let exMap = ex.get(subcultureKey);
			if (!exMap) { ex.set(subcultureKey, exMap = new Map()); }
			if (ancMap.has(ancillaryKey)) { continue; }

			const cultureKey = toCultureKey(subcultureKey);
			const requestSubcultureSubset = [subcultureKey];
			await parseTrigger({
				parsed: exMap,
				group: {
					by: 'subculture',
					cultureKey,
					subculture: subcultureKey,
				},
				trigger: {
					// @ts-ignore
					ancillaryList: [{ key: ancillaryKey }]
				},
				requestSubcultureSubset,
			});
		}
	}
	let prevTitle = new Map<SubCultureType, string>();
	const setExMap = (map: ParsedMapType, flags: JsonAncillaryEnum, category_title: string) => {
		sortParsedMap(map);
		for (const [subcultureKey, exMap] of map) {
			const ancMap = parsed.get(subcultureKey)!;
			let pt = prevTitle.get(subcultureKey);
			if (typeof pt === 'undefined') { prevTitle.set(subcultureKey, pt = ''); }
			if (exMap.size > 0) {
				if (pt === category_title) {
					pt = '';
				} else {
					// I don't know why I wanted to put this assert here,
					// but it broke, when 2.0 update came out. Broke because of wh2_main_rogue
					// const first = ancMap.entries().next();
					// assert(!first.done);
					prevTitle.set(subcultureKey, pt = category_title);
				}
			}
			for (const [ancillaryKey, tg] of exMap) {
				if (pt) {
					tg._category_title = pt;
					pt = '';
				}
				let fl = flags;
				ancMap.set(ancillaryKey, tg);
			}
		}
	};
	setExMap(extra.stolen.followers, JsonAncillaryEnum.CanBeStolen, 'Can be stolen');
	setExMap(extra.stolen.banners, JsonAncillaryEnum.CanBeStolen, 'Can be stolen');
	setExMap(extra.randomly_dropped.followers, 0, 'Randomly dropped');
	setExMap(extra.randomly_dropped.banners, 0, 'Randomly dropped');
	type OutputEntry = {
		title: string;
		description: string | undefined;
		ancillaryList: JsonEntry[];
	}
	const enum JsonAncillaryEnum {
		None = 0,
		CanBeStolen = 1,
		RandomlyDropped = 2,
		LuaDropped = 4,
	}
	interface JsonEntry {
		key: string;
		category_title?: string;
		flags: JsonAncillaryEnum;
		ancillaryIcon: string;
		ancillaryName: string;
		excludeFactionList: string[];
		effectList: string[];
		appliedToIcon: string[];
		triggerList: JsonTriggerEntry[];
	}
	type JsonTriggerEntry = [
		chance: number | null,
		conditionList: JsonConditionEntry[]
	]
	type JsonConditionEntry = [
		text: string,
		flags: number,
		bug: _BugType,
	]
	// @ts-ignore
	const output: { [K in SubCultureType]: OutputEntry; } = {};
	const requiredImageSet = new Set<string>();
	let outputGameFolder = game_data.get(current_game)!.short_key;
	const getIconSrc = (src: string): string => {
		if (/^output\/html\//.test(src)) {
			return src.substr(12);
		}
		// if (src.startsWith(`output/${current_game}/html/`)) { return src; }
		src = src.replace(/\\/, '/');
		src = src.toLowerCase();
		requiredImageSet.add(src);
		src = `${outputGameFolder}/${src}`;
		return src;
	};
	const replaceRequiredImage = (text: string) => {
		return text.replace(/\<img(.*?) src\=\"(.*?)\"(.*?)\>/g, (_, before, src, after) => {
			return `<img${before} src="output/html/${getIconSrc(src)}"${after}>`;
		});
	}
	let has1_not_stolen = false;
	for (const [subcultureKey, ancMap] of parsed) {
		if (ancMap.size === 0) { continue; }
		let jsonList: JsonEntry[] = [];
		const cultureKey = toCultureKey(subcultureKey);
		const culture = getCulture(cultureKey)!;
		const cultureData = dataCultureMap.get(cultureKey);
		assert(!!cultureData, `missing key "${cultureKey}" from your config \`dataCultureMap\``);
		const subcultureRow = DB.cultures_subcultures.getEntry([subcultureKey])!;
		const factionList = getSubcultureFactionList(subcultureKey);
		for (const [ancillaryKey, parsed] of ancMap) {
			const { ancillaryInfo, tirggerList } = parsed;
			const ancillary = findAncillary(ancillaryKey);

			let flags: JsonAncillaryEnum = 0;
			if (ancillary.ancillary['can_be_stolen'] === false) {
				flags |= JsonAncillaryEnum.CanBeStolen;
				has1_not_stolen = true;
			}
			if (ancillary.ancillary['randomly_dropped']) { flags |= JsonAncillaryEnum.RandomlyDropped; }
			if (has_ca_ancillary(ancillaryKey)) { flags |= JsonAncillaryEnum.LuaDropped; }

			const category_title = parsed._category_title!;
			const effectList = (await Promise.all(
				ancillary.effectList.map(v => getEffectDesc(v, { subcultureKey, cultureKey }))
			)).map(v => (
				replaceRequiredImage(v.replace(/\n/g, '<br/>'))
			));

			let appliedToIcon: string[] = [];
			if (ancillaryInfo.hasLord) {
				if (ancillaryInfo.incompleteLord) {
					appliedToIcon.push(`character_general_ability.png`);
				} else {
					appliedToIcon.push(`battle_general_ability.png`);
				}
			}
			if (ancillaryInfo.hasHero) {
				if (ancillaryInfo.incompleteHero) {
					appliedToIcon.push(`character_agent.png`);
				} else {
					appliedToIcon.push(`campaign_agent.png`);
				}
			}

			let myInfo: string[] = [];
			ancillaryInfo.narrow.length > 0 && myInfo.push((await Promise.all(ancillaryInfo.narrow.map(v => (
				getTranslation(v, { subcultureKey, cultureKey })
			)))).join(', '));

			const tgResult = tirggerList.map(({ chance, triggerDesc }, idx): JsonTriggerEntry => {
				const tgDescList = triggerDesc.map((v): JsonConditionEntry => {
					let text = v.text;
					let flags = 0;
					if ((v.top.allowed.length + v.top.against.length + v.top.forbid.length) > 0) {
						let top = v.top.allowed.slice();
						top = concatTextNode(top, v.top.against, { text: 'against: ' });
						top = concatTextNode(top, v.top.forbid, { text: 'Forbid:: ' }, true);
						// if (v.top.against.length > 0) {
						// 	top = top.concat([`against: ${v.top.against.join(', ')}`]);
						// }
						// if (v.top.forbid.length > 0) {
						// 	top = top.concat([`Forbid:: ${v.top.forbid[0]}`, ...v.top.forbid.slice(1)]);
						// }
						let topText = printTextNode(top, v => {
							let t = v.text;
							if (v.type === 'onlyMainLord') {
								t = `<u title="Main Lord - the one, who leads the attack/defense">${t}</u>`;
							} else if (v.underline) {
								t = `<u>${t}</u>`;
							}
							if (v.strike) {
								t = `<s>${t}</s>`;
							}
							return t;
						});
						text = `(${topText})\n${text}`;
					}
					if (!v.c.prevent) {
						// text = `*${text}`;
					} else {
						flags |= ConditionFlags.prevent;
					}
					if (v.flags.normal) { flags |= ConditionFlags.normal; }
					return [
						replaceRequiredImage(text),
						flags,
						v.c.bug || false,
					];
				});
				return [
					chance,
					tgDescList
				];
			});

			myInfo = myInfo.map(v => `(${v})`);

			let excludeFactionList: string[];
			const replace_exclude = (arr: string[]) => {
				return arr.map(key => getFaction(key)['@screen_name'] as string);
			};
			if (ancillary.excludeFactionList.length >= factionList.length * 0.66) {
				excludeFactionList = ['+'].concat(replace_exclude(factionList.filter(key =>
					!ancillary.excludeFactionList.includes(key)
				)))
			}
			else {
				excludeFactionList = replace_exclude(ancillary.excludeFactionList);
			}
			let json: JsonEntry = {
				key: ancillaryKey,
				category_title,
				flags,
				ancillaryIcon: getIconSrc(ancillary.icon),
				ancillaryName: ancillary.ancillary['@onscreen_name'] as string,
				excludeFactionList,
				effectList: [...myInfo, ...effectList],
				appliedToIcon,
				triggerList: tgResult,
			};
			jsonList.push(json);
		}
		output[subcultureKey] = {
			title: subcultureRow['@name'] as string,
			description: cultureData.description,
			ancillaryList: jsonList,
		};
	}
	const inputGameFolder = path.join(__dirname, '../input', current_game);
	outputGameFolder = path.join(__dirname, '../output', `html/${outputGameFolder}`);
	await new Promise(resolve => glob(path.join(outputGameFolder, 'ui/**/*'), (err, fileList) => {
		for (const filepath of fileList) {
			if (!fs.lstatSync(filepath).isFile()) { continue; }
			const src = filepath.substr(outputGameFolder.length + 1).replace(/\\/g, '/');
			if (requiredImageSet.has(src)) {
				requiredImageSet.delete(src);
			} else {
				fs.unlinkSync(filepath);
			}
		}
		resolve(null);
	}));
	// console.log({ copyFiles: requiredImageSet });
	for (const src of requiredImageSet) {
		const from = path.join(inputGameFolder, src);
		const to = path.join(outputGameFolder, src);
		try {
			fs.mkdirSync(path.dirname(to), { recursive: true });
			fs.copyFileSync(from, to, fs.constants.COPYFILE_EXCL);
		} catch (e) {
			console.log(e);
		}
	}

	const subcultureList = (Object.keys(output) as SubCultureType[])
		.map(subcultureKey => ({
			subcultureKey,
			playable: cultureMap.get(toCultureKey(subcultureKey))!
				.factionMap.get(subcultureKey)!
				.some(factionKey => playableFactionList.includes(factionKey)),
		}));
	let ds: string[] = [];
	const appliedToVar: { [K: string]: string } = {
		'character_general_ability.png': 'a',
		'battle_general_ability.png': 'b',
		'character_agent.png': 'c',
		'campaign_agent.png': 'd',
	};
	const flagList: (keyof typeof ConditionFlags)[] = [];
	if (has1_not_stolen) { flagList.push('not_stolen'); }
	flagList.push('prevent');
	if (current_game === 'warhammer_2') { flagList.push('normal'); }
	flagList.push('randomly_dropped', 'lua_dropped');
	for (const subcultureKey in output) {
		const entry = output[subcultureKey as SubCultureType];
		let str = '\n\t' + JSON.stringify(subcultureKey) + ': {\n\t\t';
		str += 'title: ' + JSON.stringify(entry.title) + ',\n\t\t';
		str += 'description: ' + JSON.stringify(entry.description) + ',\n\t\t';
		str += 'ancillaryList: [';
		str += entry.ancillaryList.map((ancillary, idx, self) => {
			let str = '\n';
			if (ancillary.category_title) {
				str += JSON.stringify(ancillary.category_title) + ',';
				str += '\n';
			}
			// str += '// ' + ancillary.key + '\n';
			str += '[';
			let flags = ancillary.flags;
			if (flags !== 0) {
				str += flags.toString() + ', ';
			}
			str += JSON.stringify(ancillary.ancillaryIcon) + ',\n';
			str += JSON.stringify(ancillary.ancillaryName) + ',\n';
			if (ancillary.excludeFactionList.length > 0) {
				str += JSON.stringify(ancillary.excludeFactionList) + ',\n';
			}
			for (const s of ancillary.effectList) {
				str += JSON.stringify(s) + ',\n';
			}
			str += '[' + ancillary.appliedToIcon.map(s => appliedToVar[s]).join(',') + '],\n';
			ancillary.triggerList.forEach((trigger, idx, self) => {
				const [chance, tgDescList] = trigger;
				str += JSON.stringify(chance) + ',';
				tgDescList.forEach((q, idx, self) => {
					if (idx === 0) { str += '\t'; }
					else if (self.length > 1) { str += '\n'; }
					const description = JSON.stringify(q[0]);
					const flags = q[1];
					const bug = TransformBug(q[2]);
					if (flags === 0 && !bug.value && !bug.description) {
						str += description;
					} else {
						if (idx > 0) { str += '\t'; }
						str += '[';
						str += description;
						if (flags !== 0 || bug.description) { str += ', ' + JSON.stringify(flags); }
						if (bug.description) {
							str += ',\n\t';
							if (bug.value) { str += JSON.stringify(bug.description); }
							else { str += '[false, ' + JSON.stringify(bug.description) + ']'; }
						}
						str += ']';
					}
					if (idx + 1 < self.length) { str += ','; }
				});
				if (idx + 1 < self.length) { str += ','; }
			})
			str += ']';
			if (idx + 1 < self.length) { str += ','; }
			else { str += '\n\t\t'; }
			return str;
		}).join('');
		str += ']\n\t';
		str += '}';
		ds.push(str);
	}
	const data_flags: { [K in (keyof typeof ConditionFlags)]: {
		tooltip?: string;
		label: string;
		defineVar?: string;
	} } = {
		not_stolen: {
			// tooltip: `Prevent, if character (or faction, if specified) already has ancillary equipped`,
			label: `Can not be stolen`,
		},
		prevent: {
			tooltip: `Prevent, if character (or faction, if specified) already has ancillary equipped`,
			label: `Prevent ancillary duplication`,
			defineVar: 'bFprevent',
		},
		normal: {
			tooltip: `Prevent colonel from acquiring ancillary
Colonel is a temporary placeholder, when your lord is killed during the end turn
Colonel is also a general placeholder for garrison armies`,
			label: `Forbid colonel`,
			defineVar: 'bFnormal',
		},
		randomly_dropped: {
			tooltip: `This ancillary can be randomly dropped... after winning a battle?
I'm not exactly sure about how this actually works.
The main difference from &quot;Lua randomly dropped&quot; is that this flag indicates the value specified in Database.
Either way &quot;Randomly dropped&quot; and &quot;Lua randomly dropped&quot; work independent of each other.
In theory you can get both (if my half-baked understanding without any testing is correct).`,
			label: `Randomly dropped`,
		},
		lua_dropped: {
			tooltip: `This ancillary can be randomly dropped after winning a battle (explicit in lua).
Read guide's last section for further info`,
			label: `Lua randomly dropped`,
		},
	};

	const sortedSubcultureList = subcultureList.map(v => {
		const subcultureRow = DB.cultures_subcultures.getEntry([v.subcultureKey])!;
		return {
			v,
			title: subcultureRow['@name'] as string,
		};
	}).sort((a, b) => a.title.localeCompare(b.title));

	// ! SCRIPT
	let script = `((function(){
${iterate(Object.entries(appliedToVar)).map(([k, v]) => (
		`var ${v} = ${JSON.stringify(k)};`
	)).join('\n')}
${iterate(Object.entries(data_flags)).filter(([k, v]) => typeof v.defineVar !== 'undefined').map(([k, v]) => (
		`${v.defineVar!} = ${flagList.includes(k as any) ? 'true' : 'false'};`
	)).join('\n')}
data = {${ds.join(',')}\n}
})());`;

	// ! CONTENT
	let string = `<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>Ultimate Ancillary Guide</title>
<link rel="stylesheet" href="output/html/style.css?${html_public_version}" />
</head>
<body>
<div id="root">
	<div id="content"></div>
	<div id="sidebar">
		<div id="sidebar-links">
			<div id="subculture-list" class="vertical-link-list">
${sortedSubcultureList.map(({ v, title }) => {
		const cl: string[] = [];
		if (!v.playable) { cl.push('not-playable'); }
		if (v.subcultureKey.match(/_pro_/)) { title += ' (prologue)'; }
		return `<a ${cl.length > 0 ? `class="${cl.join(' ')}" ` : ''}href="#${v.subcultureKey}">${title}</a>
`;
	}).join('')}
			</div>
			<div id="page-list" class="vertical-link-list">
${iterate(game_data).map(([key, gdata]) => {
		const cl: string[] = [];
		if (current_game === key) { cl.push('active'); }
		return `<a ${cl.length > 0 ? `class="${cl.join(' ')}" ` : ''}href="${key}.html">${gdata.title}</a>`;
	}).join('')}
			</div>
		</div>
		<div id="legend">
${flagList.map(key => {
		const { tooltip, label } = data_flags[key];
		return `<div class="legend-item" ${typeof tooltip === 'string' ? `title="${tooltip.replace(/"/g, '&quot;')}"` : ''}>
	<div class="flag-item flag--${key}"></div>${label}
</div>`;
	}).join('\n')}
<div class="legend-item legend--soft-bug" title="Hover over such trigger condition to see bug explanation">
	Doesn't work as expected
</div>
		</div>
	</div>
</div>
<script src="output/html/${current_game}.js?${html_public_version}"></script>
<script src="output/html/entry.js?${html_public_version}"></script>
</body>
</html>`;
	// data = ${JSON.stringify(output, null, '\t')}

	if (replace_file_content(path.join(__dirname, '..', `output/html/${current_game}.js`), script)) {
		console.log(`@written (output/html/${current_game}.js)`);
	}

	const gdata = game_data.get(current_game)!;
	if (replace_file_content(path.join(__dirname, '..', `${current_game}.html`), string)) {
		console.log(`@written (${current_game}.html)`);
	}
	if (gdata.index) {
		if (replace_file_content(path.join(__dirname, '..', `index.html`), string)) {
			console.log(`@written (index.html)`);
		}
	}
}

async function main() {
	await outputSteam();
	await outputHTML();
	ctx_setTarget(null);
	console.log('END');
}
main();

// TODO
// chain_or_superchain([
// 	'wh_main_sch_settlement_major',
// 	'wh_main_sch_settlement_major_coast',
// ])