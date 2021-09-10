import fs from 'fs';
import path from 'path';
import xml from 'fast-xml-parser';
import iterate from 'iterare';
import { addMap, unique, toArray, deleteItem, intersect, isEqualShuffle } from './common';
import { schema, IEntry, locFileController } from './ron-db';
import {
	ITrigger,
	Events,
	agent_loc,
	ICondition,
	CampaignType,
	CultureType,
	SubCultureType,
	culture_min_loc,
	UnitCasteType,
	IAncillary,
	AgentType,
	AgentSubtype
} from './data-types';
import { isEqual } from 'lodash';

export const DB = {
	building_chain_availabilities: schema['building_chain_availabilities'].getData(),
	building_chain_availability_sets: schema['building_chain_availability_sets'].getData(),
	building_chains: schema['building_chains'].getData(),
	building_culture_variants: schema['building_culture_variants'].getData(),
	building_levels: schema['building_levels'].getData(),
	regions: schema['regions'].getData(),
	technologies: schema['technologies'].getData(),
	//
	agents: schema['agents'].getData(),
	agent_recruitment_categories: schema['agent_recruitment_categories'].getData(), // key, @onscreen_name
	agent_subtypes: schema['agent_subtypes'].getData(),
	agent_subtype_subculture_overrides: schema['agent_subtype_subculture_overrides'].getData(),
	agent_culture_details: schema['agent_culture_details'].getData(),
	ancillaries: schema['ancillaries'].getData(),
	// Бесполезно, категории типа "Armour", "Follower"...
	// ancillaries_categories: schema['ancillaries_categories'].getData(),
	ancillaries_included_agent_subtypes: schema['ancillaries_included_agent_subtypes'].getData(),
	ancillary_included_subcultures: schema['ancillary_included_subcultures'].getData(),
	ancillary_to_effects: schema['ancillary_to_effects'].getData(),
	ancillary_to_included_agents: schema['ancillary_to_included_agents'].getData(),
	ancillary_types: schema['ancillary_types'].getData(),
	campaign_effect_scopes: schema['campaign_effect_scopes'].getData(),
	campaign_group_members: schema['campaign_group_members'].getData(),
	campaign_group_member_criteria_originating_cultures: schema['campaign_group_member_criteria_originating_cultures'].getData(),
	campaign_post_battle_captive_options: schema['campaign_post_battle_captive_options'].getData(),
	cultures: schema['cultures'].getData(),
	culture_packs: schema['culture_packs'].getData(),
	cultures_subcultures: schema['cultures_subcultures'].getData(),
	effects: schema['effects'].getData(),
	factions: schema['factions'].getData(),
	faction_agent_permitted_subtypes: schema['faction_agent_permitted_subtypes'].getData(),
	frontend_factions: schema['frontend_factions'].getData(),
	main_units: schema['main_units'].getData(),
	names: schema['names'].getData(),
	land_units: schema['land_units'].getData(),
	pooled_resources: schema['pooled_resources'].getData(),
	unique_agents: schema['unique_agents'].getData(),
	unit_castes: schema['unit_castes'].getData(),
	start_pos_factions: (() => {
		const content = fs.readFileSync(
			path.join(__dirname, '../input/start_pos_factions.xml')
		);
		const json = xml.parse(content.toString(), {
			parseNodeValue: false,
		});
		return (json['dataroot']['start_pos_factions'] as any[]).map(row => ({
			faction: row['faction'] as string,
			campaign: row['campaign'] as CampaignType,
			playable: (row['playable'] !== '0'),
		}));
	})(),
};
const TEXT = {
	ui_text_replacements: new Map(toArray(locFileController.loadFile({ name: 'ui_text_replacements' }))
		.map(([k, v]) => [
			// ui_text_replacements_localised_text_
			k.substr(36),
			v
		])),
};

export const getFactionListSorted = () => {
	const rows = DB.frontend_factions.raw.slice();
	rows.sort((a, b) => (a['sort_order'] as number) - (b['sort_order'] as number));
	let frontendFactionList = rows.map(row => ({
		factionKey: row['faction'] as string,
		subcultureKey: DB.factions.raw.find(q => q['key'] === row['faction'])!['subculture'] as SubCultureType,
	}))
	const playableFactionList = frontendFactionList
		.map(q => q.factionKey as string)
		.filter(factionKey => DB.start_pos_factions.some(q => q.faction === factionKey && q.playable));

	const subcultureList = unique(frontendFactionList.map(v => v.subcultureKey));
	const cultureTmpMap = new Map<CultureType, SubCultureType[]>();
	for (const subcultureKey of subcultureList) {
		const cultureKey = toCultureKey(subcultureKey);
		addMap(cultureTmpMap, cultureKey, subcultureKey);
	}
	for (const row of DB.cultures_subcultures.raw) {
		addMap(cultureTmpMap, row['culture'], row['subculture']);
	}
	const cultureMap = new Map<CultureType, {
		subcultureList: SubCultureType[];
		factionMap: Map<SubCultureType, string[]>;
	}>();
	for (const [cultureKey, subcultureKey] of cultureTmpMap) {
		const subcultureList = unique(subcultureKey);
		const factionMap = new Map<SubCultureType, string[]>();
		for (const row of DB.factions.raw) {
			if (!subcultureList.includes(row['subculture'] as SubCultureType)) { continue; }
			const factionKey = row['key'] as string;
			addMap(factionMap, row['subculture'] as SubCultureType, factionKey);
		}
		cultureMap.set(cultureKey, {
			subcultureList,
			factionMap,
		});
	}
	return {
		frontendFactionList,
		playableFactionList,
		cultureMap,
	};
};

interface SchemaEntry { [K: string]: IEntry }
export const toCultureKey = (subcultureKey: SubCultureType) => {
	return DB.cultures_subcultures.getEntry([subcultureKey])!['culture'] as CultureType;
}
export const getCulture = (cultureKey: CultureType) => {
	return DB.cultures.getEntry([cultureKey]);
}
const _getCultureSubcultureListCache = new Map<CultureType, SubCultureType[]>();
export const getCultureSubcultureList = (cultureKey: CultureType) => {
	if (_getCultureSubcultureListCache.has(cultureKey)) {
		return _getCultureSubcultureListCache.get(cultureKey)!;
	}
	const output: SubCultureType[] = [];
	for (const row of DB.cultures_subcultures.raw) {
		if (row['culture'] === cultureKey) {
			output.push(row['subculture'] as SubCultureType);
		}
	}
	_getCultureSubcultureListCache.set(cultureKey, output);
	return output;
}
const _findAncillaryCache = new Map<string, FindAncillary>(); // ancillary_key -> { ancillary, subcultureList, cultureList, effectList }
interface EffectData {
	effectAnc: IEntry;
	effect: IEntry;
	scope: IEntry | null;
}
interface FindAncillary {
	ancillary: IEntry;
	icon: string;
	agentList: string[];
	subcultureList: SubCultureType[];
	/** Список получен из subcultureList. В базе только указано каким subcultures давать ancillary */
	cultureList: CultureType[];
	effectList: EffectData[];
	toAgent: AgentType[];
	toAgentSubtype: AgentSubtype[];
}
export const findAncillary = (key: string): FindAncillary => {
	if (_findAncillaryCache.has(key)) {
		return _findAncillaryCache.get(key)!;
	}
	const ancillary = DB.ancillaries.getEntry([key])!;
	const icon = DB.ancillary_types.getEntry([ancillary['type'] as string])!['ui_icon'] as string;
	const agentList = Object.keys(DB.ancillary_to_included_agents.keyed[key] || {})
		.filter(agent => DB.agents.getEntry([agent])!['playable'] as boolean);
	const subcultureList = Object.keys(DB.ancillary_included_subcultures.keyed[key] || {}) as SubCultureType[];
	const cultureList = unique(subcultureList.map(subculture => (
		toCultureKey(subculture)
	)));
	const effectMap = (DB.ancillary_to_effects.keyed[key] || {}) as unknown as SchemaEntry;
	const effectList = toArray(effectMap).map(([effectKey, effectAnc]) => {
		const effect = DB.effects.getEntry([effectKey])!;
		const effectScope = effectAnc['effect_scope'] as string;
		const scope = DB.campaign_effect_scopes.getEntry([effectScope]);
		return {
			effectAnc,
			effect,
			scope,
		};
	});
	const toAgent = DB.ancillary_to_included_agents.raw.filter(row => (
		row['ancillary'] === key
	)).map(row => row['agent'] as AgentType);
	const toAgentSubtype = DB.ancillaries_included_agent_subtypes.raw.filter(row => (
		row['ancillary'] === key
	)).map(row => row['agent_subtype'] as AgentSubtype);
	const v: FindAncillary = {
		ancillary,
		icon,
		agentList,
		subcultureList,
		cultureList,
		effectList,
		toAgent,
		toAgentSubtype,
	};
	_findAncillaryCache.set(key, v);
	return v;
};
const _getIconCache = new Map<string, string>();
const getIcon = async (icon: string): Promise<string> => {
	if (_getIconCache.has(icon)) {
		return _getIconCache.get(icon)!;
	}
	const promiseList: Promise<boolean>[] = [];
	const dirList = [
		['ui/skins/default/', false],
		['ui/campaign ui/effect_bundles/', true],
		['ui/common ui/unit_category_icons/', false],
		['ui/common ui/unit_category_icons/', true],
	] as const;
	for (const [dir, mustBeIcon] of dirList) {
		let src = icon;
		if (mustBeIcon) {
			if (!/^icon_/.test(src)) { continue; }
			src = src.substr(5);
		}
		promiseList.push(new Promise(resolve => {
			fs.stat(path.join(__dirname, '../input', dir, `${src}.png`), (err, stats) => {
				if (err === null) { resolve(true); }
				else { resolve(false); }
			});
		}));
	}
	const result = await Promise.all(promiseList);
	let idx = result.indexOf(true);
	if (idx === -1) { idx = 0; }
	const [dir, mustBeIcon] = dirList[idx];
	let src = icon;
	if (mustBeIcon) {
		src = src.substr(5);
	}
	const output = `${dir}${src}.png`;
	_getIconCache.set(icon, output);
	return output;
};
export const getEffectDesc = async (v: EffectData, opts?: {
	image?: 'html';
	color?: 'html';
}) => {
	const { effect, effectAnc, scope } = v;
	const image = opts?.image;
	const color = opts?.color;
	const effectValue = effectAnc['value'] as number;
	let desc = effect['@description'] as string;
	desc = desc
		.replace('%+n', `${effectValue > 0 ? '+' : ''}${effectValue.toString()}`)
		.replace('%n', effectValue.toString());
	if (scope) {
		desc += (scope['@localised_text'] as string).replace(/^\n/, ' ');
	}
	let imgIdx = 0;
	const imgPromiseList: Promise<void>[] = [];
	desc = desc.replace(/\[\[img\:([^\]]*)\]\][^\[]*\[\[\/img\]\]/g, (_, icon) => {
		if (image === 'html') {
			// var src = icon;
			// if (src.substr(0, 5) === 'icon_') {
			// 	src = src.substr(5);
			// }
			// return '<img src="game/ui/skins/default/' + icon + '.png" icon="' + icon + '" />';
			let idx = imgIdx++;
			let uniqTag = `<img $${idx}$ />`;
			imgPromiseList.push(getIcon(icon).then(path => {
				desc = desc.replace(uniqTag, `<img src="${path}" icon="${icon}" />`);
			}));
			return uniqTag;
		}
		return '';
	});
	await Promise.all(imgPromiseList);
	desc = desc.replace(
		/\[\[col\:([^\]]*)\]\]([^\[]*)\[\[\/col\]\]/g,
		color === 'html'
			? '<span style="color: $1;">$2</span>'
			: '$2'
	);
	desc = desc.replace(/\{\{tr\:(.*?)\}\}/g, (_, key) => {
		return TEXT.ui_text_replacements.get(key) || '';
	});
	return desc;
};
export const getSubcultureSubset = (cultureKey: CultureType | SubCultureType[], subcultureList: SubCultureType[]) => {
	return intersect(
		typeof cultureKey === 'string'
			? getCultureSubcultureList(cultureKey) :
			cultureKey,
		subcultureList
	);
	// const allSubcultureList = typeof cultureKey === 'string'
	// 	? getCultureSubcultureList(cultureKey) :
	// 	cultureKey;
	// return subcultureList
	// 	.filter(subcultureKey => allSubcultureList.includes(subcultureKey));
};
const getSubcultureFactionList = (subcultureSubset: SubCultureType[]) => {
	return unique(DB.factions.raw.filter(row => (
		subcultureSubset.includes(row['subculture'] as SubCultureType)
	)).map(row => row['key'] as string));
};
// CONTEXT
const ctx_getEventData = () => {
	let turnStart = false, turnEnd = false;
	let heroEvent = false;
	let onlyMainLord = false;
	let notObviousHeroEvent = (context.event === Events.HeroCharacterParticipatedInBattle);
	switch (context.event) {
		case Events.CharacterTurnStart:
		case Events.SlotTurnStart:
		case Events.RegionTurnStart:
		case Events.FactionTurnStart:
			turnStart = true;
			break;
		case Events.CharacterTurnEnd:
		case Events.RegionTurnEnd:
		case Events.FactionTurnEnd:
		case Events.FactionAboutToEndTurn:
			turnEnd = true;
			break;
		case Events.CharacterCharacterTargetAction:
		case Events.CharacterGarrisonTargetAction:
		case Events.HeroCharacterParticipatedInBattle:
			heroEvent = true;
			break;
		case Events.CharacterCompletedBattle:
		case Events.CharacterLootedSettlement:
		case Events.CharacterSackedSettlement:
		case Events.CharacterRazedSettlement:
		case Events.CharacterPostBattleRelease:
		case Events.CharacterPostBattleSlaughter:
		case Events.CharacterPostBattleEnslave:
		case Events.GarrisonAttackedEvent:
			onlyMainLord = true;
			break;
	}
	return {
		turnStart,
		turnEnd,
		heroEvent,
		notObviousHeroEvent,
		onlyMainLord,
	};
}
const ctx_getSubcultureSubset = (): SubCultureType[] => {
	const { group } = context;
	switch (group.by) {
		case 'culture':
			return group.subcultureSubset;
		case 'subculture':
			return [group.subculture];
	}
}
const getUnitCaste = (associated_unit: any): UnitCasteType | null => {
	if (typeof associated_unit === 'string') {
		const unitRow = DB.main_units.getEntry([associated_unit])!;
		return unitRow['caste'] as UnitCasteType;
	}
	return null;
};
const ctx_getAgentData = (agentKey: AgentType) => {
	const { group } = context;
	const { cultureKey } = group;
	let unit: any = null;
	let name: string = agent_loc[agentKey];
	const agentCultureRow = DB.agent_culture_details.raw.find(row => (
		row['agent'] === agentKey
		&& row['culture'] === cultureKey
	));
	if (typeof agentCultureRow !== 'undefined') {
		unit = agentCultureRow['associated_unit'];
		name = agentCultureRow['@onscreen_name'] as string;
	}
	return {
		name,
		unit_caste: getUnitCaste(unit),
	};
};
const ctx_getAgentSubtypeData = (subtypeKey: string) => {
	const { group } = context;
	const agentSubtypeRow = DB.agent_subtypes.getEntry([subtypeKey]);
	if (!agentSubtypeRow) { return; }

	// show_in_ui, can_gain_xp (луче не надо нэрровить через эти филды, т.к. есть играбельные герои с false)
	let unit = agentSubtypeRow['associated_unit_override'];
	let name = agentSubtypeRow['@onscreen_name_override'] as string;
	// Если группируем по subculture, то можно уточнить данные для subculture_overrides
	if (group.by === 'subculture') {
		// Бессмысленно
		const subcultureOverrideRow = null && DB.agent_subtype_subculture_overrides.raw.find(row => (
			row['subtype'] === subtypeKey
			&& row['subculture'] === group.subculture
		));
		if (subcultureOverrideRow) {
			const unit_override = subcultureOverrideRow['associated_unit_override'];
			if (typeof unit_override === 'string' && unit_override) { unit = unit_override; }
			const name_override = subcultureOverrideRow['@onscreen_name'];
			if (typeof name_override === 'string' && name_override) { name = name_override; }
		}
	}
	const uniqueRow = DB.unique_agents.getEntry([subtypeKey]);
	if (uniqueRow) {
		// { [K in name_types.key]: string | null }
		const nameResult = {
			forename: null as (string | null),
			family_name: null as (string | null), // surname
			other: null as (string | null), // other_name
			clan_name: null as (string | null),
		};
		let haveSome = false;
		// могут не совпадать
		for (const uniqueColumn of ['forename', 'surname', 'other_name', 'clan_name'] as const) {
			const nameId = uniqueRow[uniqueColumn];
			if (typeof nameId === 'string') {
				haveSome = true;
				const nameRow = DB.names.getEntry([nameId])!;
				const type = nameRow['type'] as keyof typeof nameResult;
				nameResult[type] = nameRow['@name'] as string;
			}
		}
		if (haveSome) {
			name = '';
			for (const type in nameResult) {
				const v = nameResult[type as keyof typeof nameResult];
				if (typeof v === 'string') { name += v + ' '; }
			}
			name = name.trim();
		}
	}
	return {
		row: agentSubtypeRow,
		name,
		unit_caste: getUnitCaste(unit),
	};
};
const _ctx_getPermittedSubtypeListCache = new Map<string, GetPermittedSubtypeList[]>();
interface GetPermittedSubtypeList {
	agent: AgentType;
	subtype: AgentSubtype;
}
const ctx_getPermittedSubtypeList = (): GetPermittedSubtypeList[] => {
	const subcultureSubset = ctx_getSubcultureSubset();
	const key = subcultureSubset.join(',');
	if (_ctx_getPermittedSubtypeListCache.has(key)) {
		return _ctx_getPermittedSubtypeListCache.get(key)!;
	}
	const factionList = getSubcultureFactionList(subcultureSubset);
	const list = DB.faction_agent_permitted_subtypes.raw.filter(row => (
		factionList.includes(row['faction'] as string)
	))
		// .map(row => row['subtype'] as AgentSubtype);
		.map(row => ({
			agent: row['agent'] as AgentType,
			subtype: row['subtype'] as AgentSubtype,
		})).filter((row, idx, self) => (
			self.findIndex(v => (
				v.subtype === row.subtype
				// && v.agent === row.agent
			)) === idx
		));
	// return unique(data);
	_ctx_getPermittedSubtypeListCache.set(key, list);
	return list;
};
const ctx_getRecruitmentCategoryMap = () => {
	const subtypeList = ctx_getPermittedSubtypeList().map(v => v.subtype);
	const map = new Map<string, AgentSubtype[]>();
	for (const row of DB.agent_subtypes.raw) {
		const subtypeKey = row['key'] as AgentSubtype;
		if (!subtypeList.includes(subtypeKey)) { continue; }
		const categoryKey = row['recruitment_category'] as string;
		addMap(map, categoryKey, subtypeKey);
	}
	return map;
};
export interface AncillaryInfo {
	hasLord: boolean;
	incompleteLord: boolean;
	hasHero: boolean;
	incompleteHero: boolean;
	list: string[];
	narrow: string[];
}
const getAncillaryInfo = (): AncillaryInfo => {
	const { ancillary, group } = context;
	let info: AncillaryInfo = {
		hasLord: false,
		incompleteLord: false,
		hasHero: false,
		incompleteHero: false,
		list: [],
		narrow: [],
	};
	let ancillaryInfo: string[] = [];
	let toAgentList: string[] = [];
	// let toAgentSubtypeList: string[] = [];
	if (true || ancillary.toAgent.length > 0) {
		let cultureAgentList = unique(DB.agent_culture_details.raw.filter(row => (
			row['culture'] === group.cultureKey
		)));
		// .map(row => row['agent'] as AgentType)
		// let playableList = cultureAgentList.filter(key => key !== 'colonel' && key !== 'minister');
		let playableList = unique(cultureAgentList
			.filter(row => !!row['associated_unit'])
			.map(row => row['agent'] as AgentType));
		let heroList = playableList.filter(key => key !== 'general');

		let keyList = ancillary.toAgent.filter(key => cultureAgentList.some(row => row['agent'] === key));
		// let int = intersect(arr, cultureAgentList);
		toAgentList = keyList.map(key => ctx_getAgentData(key).name);
		let narrow = intersect(keyList, playableList);
		if (narrow.length > 0) {
			if (narrow.includes('general')) {
				info.hasLord = true;
				narrow = narrow.filter(v => v !== 'general');
			}
			if (narrow.length > 0) {
				info.hasHero = true;
				if (narrow.length === heroList.length) {
					narrow = [];
				} else {
					info.incompleteHero = true;
				}
			}
		}

		info.list = toAgentList;
		info.narrow = narrow.map(key => ctx_getAgentData(key).name);
	}
	if (ancillary.toAgentSubtype.length > 0) {
		// && DB.start_pos_factions.some(f => (
		// 	f.faction === row['key']
		// 	// && f.playable
		// ))
		// subculturePermittedSubtypeList
		const permittedList = ctx_getPermittedSubtypeList();
		const toAgentSubtypeList = permittedList
			.filter(row => ancillary.toAgentSubtype.includes(row.subtype))
			.map(row => ({
				...ctx_getAgentSubtypeData(row.subtype)!,
				...row,
			}));
		// We always assume, that `ancillaries_included_agent_subtypes` only contain a subset of `agents`
		// so it will always give **incomplete**
		// TODO not to assume ;)
		if (toAgentSubtypeList.some(v => v.agent === 'general')) {
			info.hasLord = true;
			info.incompleteLord = true;
		}
		if (toAgentSubtypeList.some(v => v.agent !== 'general')) {
			info.hasHero = true;
			info.incompleteHero = true;
		}
		let keyList = ancillary.toAgentSubtype
			.map(subtypeKey => ({
				...ctx_getAgentSubtypeData(subtypeKey)!,
				subtypeKey,
			}));

		let output: string[] = [];
		for (const [recruitmentKey, subtypeList] of ctx_getRecruitmentCategoryMap()) {
			const filter = keyList.filter(v => subtypeList.includes(v.subtypeKey));
			if (filter.length === subtypeList.length) {
				output.push(DB.agent_recruitment_categories.getEntry([recruitmentKey])!['@onscreen_name'] as string);
			} else {
				output = output.concat(filter.map(v => v.name));
			}
		}

		if (output.length > 0) {
			info.list.push(...output);
			info.narrow.push(...output);
		}
	}
	if (info.list.length === 0) {
		// toAgentList.length === 0
		// && toAgentSubtypeList.length === 0
		info.hasLord = true;
		info.hasHero = true;
	}
	return info;
};
type TextNode = {
	text: string;
	category?: boolean | TextNode;
	underline?: boolean;
	// [K: string]: string | boolean | undefined;
} & {
	[K: string]: string;
}
export const concatTextNode = (self: TextNode[], tmp: TextNode[], category?: TextNode, setRestCategory?: boolean) => {
	if (tmp.length > 0) {
		tmp[0].category = category || true;
		if (setRestCategory) {
			for (const a of tmp) {
				if (a === tmp[0]) { continue; }
				a.category = true;
			}
		}
		return self.concat(tmp);
	}
	return self;
};
export const printTextNode = (self: TextNode[], format: (v: TextNode) => string) => {
	let output = '';
	for (let i = 0; i < self.length; ++i) {
		const a = self[i];
		if (a.category) {
			output += '; ';
			if (typeof a.category !== 'boolean') {
				output += format(a.category);
			}
		} else {
			output += ', ';
		}
		output += format(a);
	}
	return output.substr(2);
};
// TODO ancillary_to_included_agents
// TODO ancillaries_included_agent_subtypes
const buildTriggerDesc = () => {
	const { trigger, group } = context;
	const subcultureSubset = ctx_getSubcultureSubset();
	// const ancillaryKey = ancData.key;
	let { notObviousHeroEvent, onlyMainLord } = ctx_getEventData();
	return trigger.condition.map((c, cIdx) => {
		let allowed: TextNode[] = [];
		let allowedGreenKnight = false; // c.allowed.default: case 'no-green-knight':
		let allowedNormal = false; // c.allowed.default: case 'normal':
		let hasLord = false, hasHero = false;
		if (typeof c.allowed !== 'undefined') {
			if (typeof c.allowed.agent !== 'undefined') {
				const tmp: TextNode[] = [];
				for (const agentKey of c.allowed.agent) {
					const res = ctx_getAgentData(agentKey);
					if (res) {
						const node: TextNode = { text: res.name };
						if (res.unit_caste === 'lord') {
							hasLord = true;
							if (onlyMainLord) {
								node.underline = true;
								node.type = 'onlyMainLord';
							}
						} else if (res.unit_caste === 'hero') {
							hasHero = true;
						}
						tmp.push(node);
					}
				}
				if (tmp.length > 0) {
					tmp[0].category = true;
					allowed = allowed.concat(tmp);
				}
			}
			if (typeof c.allowed.agent_subtype !== 'undefined') {
				const tmp: TextNode[] = [];
				for (const subtypeKey of c.allowed.agent_subtype) {
					const res = ctx_getAgentSubtypeData(subtypeKey);
					if (res) {
						const node: TextNode = { text: res.name };
						if (res.unit_caste === 'lord') {
							hasLord = true;
							if (onlyMainLord) {
								node.underline = true;
								node.type = 'onlyMainLord';
							}
						} else if (res.unit_caste === 'hero') {
							hasHero = true;
						}
						tmp.push(node);
					}
				}
				if (tmp.length > 0) {
					tmp[0].category = true; // `character subtype: `
					allowed = allowed.concat(tmp);
				}
			}
		}
		if (notObviousHeroEvent && !hasHero) {
			// DB.unit_castes.getEntry(['hero'])!['@localised_name'] as string
			allowed.unshift({ text: `Hero` });
		}
		if ((onlyMainLord || c.onlyMainLord) && !hasLord) {
			const node: TextNode = { text: `Lord` };
			node.underline = true;
			node.type = 'onlyMainLord';
			allowed.unshift(node);
		}
		// !prepend
		if (typeof c.allowed !== 'undefined') {
			if (typeof c.allowed.pooled_resource !== 'undefined') {
				const pooled_resource = c.allowed.pooled_resource.slice();
				if (deleteItem(pooled_resource, 'wh2_main_ritual_currency')) {
					allowed.unshift({ text: `Vortex` });
					context.campaign = 'wh2_main_great_vortex';
				}
				const tmp: TextNode[] = [];
				for (const val of pooled_resource) {
					const row = DB.pooled_resources.getEntry([val])!;
					tmp.push({ text: row['@display_name'] as string });
				}
				if (tmp.length > 0) {
					tmp[0].category = true; // `resource: `
					allowed = tmp.concat(allowed);
				}
			}
		}
		if (typeof c.allowed !== 'undefined') {
			if (typeof c.allowed.culture !== 'undefined') {
				let culture = c.allowed.culture.slice();
				culture = culture.filter(cultureKey => cultureKey !== group.cultureKey);

				const tmp: TextNode[] = [];
				for (const val of culture) {
					const row = getCulture(val)!;
					tmp.push({ text: row['@name'] as string });
				}
				if (tmp.length > 0) {
					tmp[0].category = true;
					allowed = allowed.concat(tmp);
				}
			}
			if (typeof c.allowed.subculture !== 'undefined') {
				const tmp: TextNode[] = [];
				for (const val of c.allowed.subculture) {
					const row = DB.cultures_subcultures.getEntry([val])!;
					tmp.push({ text: row['@name'] as string });
				}
				if (tmp.length > 0) {
					tmp[0].category = true;
					allowed = allowed.concat(tmp);
				}
			}
		}
		let forbid: TextNode[] = [];
		if (typeof c.forbid !== 'undefined') {
			if (typeof c.forbid.agent !== 'undefined') {
				const agent = c.forbid.agent.slice();
				if (deleteItem(agent, 'colonel')) {
					allowedNormal = true;
				}
				if (agent.length > 0) { console.error('TODO'); }
			}
			if (typeof c.forbid.agent_subtype !== 'undefined') {
				let agent_subtype = c.forbid.agent_subtype.slice();
				deleteItem(agent_subtype, 'dlc07_brt_green_knight');
				deleteItem(agent_subtype, 'wh2_dlc10_hef_shadow_walker');

				// we are splitting ancillary into multiple cultures
				// inside each culture there is a subset of subcultures (of this culture)
				// which can receive ancillary. We must check whether
				// there is some faction in one of such subcultures
				// that can actually recruit forbiddent character subtype
				agent_subtype = agent_subtype.filter(subtypeKey => {
					const factionList = unique(
						DB.faction_agent_permitted_subtypes.raw
							.filter(row => row.subtype === subtypeKey)
							.map(row => row.faction as string)
					);
					const subcultureList = unique(
						factionList
							.map(factionKey => DB.factions.getEntry([factionKey])!)
							.filter(row => (row.category as string) === 'playable')
							.map(row => row.subculture as SubCultureType)
					).filter(key => subcultureSubset.includes(key));
					return (subcultureList.length > 0);
				});
				const tmp: TextNode[] = [];
				for (const subtypeKey of agent_subtype) {
					const res = ctx_getAgentSubtypeData(subtypeKey);
					if (res) {
						tmp.push({ text: res.name });
					}
				}
				if (tmp.length > 0) {
					tmp[0].category = true; // `character subtype: `
					forbid = forbid.concat(tmp);
				}
			}
		}
		let against: TextNode[] = [];
		if (typeof c.against !== 'undefined') {
			if (typeof c.against.culture !== 'undefined') {
				const tmp: TextNode[] = [];
				for (const cultureKey of c.against.culture) {
					const row = getCulture(cultureKey)!;
					tmp.push({ text: row['@name'] as string });
				}
				if (tmp.length > 0) {
					tmp[0].category = true;
					against = against.concat(tmp);
				}
			}
			if (typeof c.against.subculture !== 'undefined') {
				const tmp: TextNode[] = [];
				for (const subcultureKey of c.against.subculture) {
					const row = DB.cultures_subcultures.getEntry([subcultureKey])!;
					tmp.push({ text: row['@name'] as string });
				}
				if (tmp.length > 0) {
					tmp[0].category = true;
					against = against.concat(tmp);
				}
			}
		}
		const qq = {
			hasEmpty: false,
		};
		context.condition = c;
		let text = c.text().replace(/\{(.*?)\}/g, (_, q: string) => {
			const qList = q.split(',');
			if (qList.length === 0) {
				return '';
			}
			const output: string[] = [];
			for (const val of qList) {
				switch (val) {
					case 'normal':
						if (allowedNormal) {
							allowedNormal = false;
							output.push(TXT.normal);
						}
				}
			}
			if (output.length === 0) { return ''; }
			return `(${output.join('; ')})`;
		});

		const top = {
			allowed,
			against,
			forbid,
		};
		if ((allowed.length + against.length + forbid.length) > 0) {
			// if (against.length > 0) {
			// 	top = top.concat([`against: ${against.join(', ')}`]);
			// }
			// if (forbid.length > 0) {
			// 	top = top.concat([`Forbid:: ${forbid[0]}`, ...forbid.slice(1)]);
			// }
			// text = `(${top.join('; ')})${cIdx === 0 || true ? '\n' : ' '}${text}`;
		}
		// if ((forbid.length) > 0) {
		// 	text = `(Forbid:: ${forbid.join('; ')})${cIdx === 0 || true ? '\n' : ' '}${text}`;
		// }
		if (c.unique) { c.prevent = true; }
		return {
			c,
			impossible: !!c.bug,
			top,
			text,
		};
	});
};
const TXT = {
	normal: 'with normal character',
};

export interface IParsedTrigger {
	trigger: ITrigger;
	chance: number;
	repeat?: number;
	triggerDesc: ReturnType<typeof buildTriggerDesc>;
}
export interface IParsed {
	// subcultureSubset: SubCultureType[];
	// effectList: EffectData[]; // string[];
	ancillaryInfo: AncillaryInfo;
	tirggerList: IParsedTrigger[];
}
type GroupBy = {
	by: 'culture';
	cultureKey: CultureType;
	subcultureSubset: SubCultureType[];
} | {
	by: 'subculture';
	cultureKey: CultureType;
	subculture: SubCultureType;
}
let context: {
	ancillary: FindAncillary;
	ancData: IAncillary;
	group: GroupBy;
	trigger: ITrigger;
	event: Events;
	condition: ICondition;
	campaign?: CampaignType;
};
export const parseTrigger = (opts: {
	// ancillaryKey > IParsed
	// parsed: Map<string, Map<string, IParsed>>;
	parsed: Map<string, IParsed>;
	group: GroupBy;
	trigger: ITrigger;
	/** We assume that this subset is of the same `culture` */
	requestSubcultureSubset: SubCultureType[];
}) => {
	const { parsed, group, trigger, requestSubcultureSubset } = opts;
	for (const ancData of trigger.ancillaryList) {
		const ancillary = findAncillary(ancData.key);

		const subcultureSubset = getSubcultureSubset(requestSubcultureSubset, ancillary.subcultureList);
		if (subcultureSubset.length === 0) { continue; }

		// @ts-ignore
		context = {
			ancillary,
			ancData,
			group,
			trigger,
			event: trigger.event,
		};

		if (!parsed.has(ancData.key)) {
			// const subcultureSubset = getSubcultureSubset(cultureKey, ancillary.subcultureList);
			parsed.set(ancData.key, {
				// effectList: ancillary.effectList,
				ancillaryInfo: getAncillaryInfo(),
				tirggerList: [],
			});
		}
		const parsedAncillary = parsed.get(ancData.key)!;
		if (parsedAncillary.tirggerList.some(v => v.trigger === trigger)) { continue; }

		const triggerDesc = buildTriggerDesc();
		parsedAncillary.tirggerList.push({
			trigger,
			chance: ancData.chance,
			repeat: ancData.repeat,
			triggerDesc,
		});
	}
};
export const sortParsedMap = (parsed: Map<string, Map<string, IParsed>>) => {
	for (const [subcultureKey, subcultureMap] of parsed) {
		parsed.set(subcultureKey, new Map([...subcultureMap.entries()].sort((a, b) => {
			const aa = findAncillary(a[0]);
			const bb = findAncillary(b[0]);
			const as = aa.ancillary['@onscreen_name'] as string;
			const bs = bb.ancillary['@onscreen_name'] as string;
			return as.localeCompare(bs);
			// return a[0].localeCompare(b[0]);
		})));
	}
};

const typical_output = (output: string[]) => {
	return output.length === 0
		? '?'
		: output.length === 1
			? output[0]
			: output.slice(0, -1).join(', ') + ' or ' + output[output.length - 1];
};
export const building_exists = (keyList: string[]) => {
	const { group } = context;
	const subcultureSubset = ctx_getSubcultureSubset();
	const buildingList = keyList.map(key => (
		DB.building_levels.getEntry([key])!
	));
	const chainList = unique(
		buildingList.map(row => row['chain'] as string)
	);
	if (chainList.length === 1) {
		const [chainKey] = chainList;
		if (DB.building_levels.raw.filter(row => (
			row['chain'] === chainKey
		)).length === keyList.length) {
			const chainRow = DB.building_chains.getEntry([chainKey])!
			return `chain “${chainRow['@chain_tooltip']}”`;
		}
	}
	const output: string[] = [];
	for (const buildingRow of buildingList) {
		const variantList = DB.building_culture_variants.raw.filter(row => (
			row['building'] === buildingRow['level_name']
		));
		variantList.sort((a, b) => {
			const a_culture = (a['culture'] === null ? -1 : a['culture'] === group.cultureKey ? -2 : 0);
			const b_culture = (b['culture'] === null ? -1 : b['culture'] === group.cultureKey ? -2 : 0);
			const a_subculture = (a['subculture'] === null ? -1 : subcultureSubset.includes(a['subculture'] as SubCultureType) ? -2 : 0);
			const b_subculture = (b['subculture'] === null ? -1 : subcultureSubset.includes(b['subculture'] as SubCultureType) ? -2 : 0);
			return (a_culture + a_subculture) - (b_culture + b_subculture);
		});
		const variant = variantList[0];
		output.push(`“${variant['@name']}”`);
	}
	return `building ${typical_output(output)}`;
};
// “Saphery Landmark” (“Library of Hoeth”, “White Tower of Hoeth”)
// text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_special_tower_of_hoeth'])} (every 5th turn)`
// wh2_main_sch_defence_major_lzd
// wh2_main_sch_defence_minor
const superchain_loc: { [K: string]: string } = {
	// Major Walls
	wh2_dlc09_tmb_defence_major: 'Walls',
	wh2_dlc11_sch_defence_major_cst: 'Walls',
	wh2_main_sch_defence_major_def: 'Walls',
	wh2_main_sch_defence_major_hef: 'Walls',
	wh2_main_sch_defence_major_lzd: 'Walls',
	wh2_main_sch_defence_major_skv: 'Walls',
	// Minor Walls
	wh2_main_sch_defence_minor: 'Garrison',
	wh2_main_sch_defence_norsca: 'Garrison',
};
export const chain_or_superchain = (keyList: string[]): string => {
	const contextSubcultureSubset = ctx_getSubcultureSubset();
	let superChainMap = new Map<string, IEntry[]>(); // superchain > chain_row[]
	for (const key of keyList) {
		for (const row of DB.building_chains.raw) {
			if (row['building_superchain'] !== key && row['key'] !== key) { continue; }
			addMap(superChainMap, row['building_superchain'] as string, row);
		}
	}
	// #region sth
	for (let kv of superChainMap) { kv[1] = unique(kv[1]); }
	// TODO проверить (сейчас нигде не используется в data)
	let { turnStart, turnEnd } = ctx_getEventData();
	const filterOwnRegion = turnStart
		? context.condition.turnOwnRegion :
		undefined;
	// #endregion
	const getChainAvailabilityList = (chainRow: IEntry) => {
		const setList = DB.building_chain_availability_sets.raw.filter(row => (
			row['building_chain'] === chainRow['key']
		)).map(row => row['id'] as string);
		return iterate(setList)
			.map(setId => {
				// avaliable for subcultures (could be for both campaigns):
				return DB.building_chain_availabilities.raw.filter(row => {
					// culture, faction, sub_culture, campaign
					if (row['set_id'] !== setId) { return false; }
					if (typeof context.campaign !== 'undefined'
						&& row['campaign'] !== context.campaign) {
						return false;
					}
					return true;
				});
			})
			.flatten()
			.toArray();
	}
	// Отфильтровать только те chain, которые может построить context.subcultureSubset
	const filterChainList = (chainList: IEntry[], fowOwn: boolean = true) => {
		const output: IEntry[] = [];
		for (const chainRow of chainList) {
			let subcultureAvailabilityList = unique(
				iterate(getChainAvailabilityList(chainRow))
					.map(row => {
						const subculture = row['sub_culture'] as SubCultureType | null;
						if (subculture) { return [subculture]; }
						const culture = row['culture'] as CultureType | null;
						let cultureList: CultureType[];
						if (culture) {
							cultureList = [culture];
						} else {
							cultureList = Object.keys(DB.cultures.keyed) as CultureType[];
						}
						return iterate(cultureList)
							.map(culture => DB.cultures_subcultures.raw.filter(row => (
								row['culture'] === culture
							)))
							.flatten()
							.map(row => row['subculture'] as SubCultureType)
							.toArray();
					})
					.flatten()
					.toArray()
			);
			const subcultureSubset = getSubcultureSubset(
				subcultureAvailabilityList,
				contextSubcultureSubset,
			);
			if (subcultureSubset.length > 0) {
				fowOwn && output.push(chainRow);
			} else {
				!fowOwn && output.push(chainRow);
			}
			// Бессмысленно, т.к. enemy region может быть и твоя же culture
			// if (false && (!allowOwnRegion || !allowEnemyRegion)) { }
		}
		return output;
	}
	const output: string[] = [];
	const outputChainMap = new Map<string, string[]>(); // chain_tooltip > culture_min[]
	for (let [superchain, chainList] of superChainMap) {
		// if (foundSuperchainList.includes(superchain)) {
		// 	output.push(``);
		// 	continue;
		// }
		let superchainChainList = DB.building_chains.raw.filter(row => (
			row['building_superchain'] === superchain
		));

		// let myChainList = filterChainList(chainList);
		// Мы отфильтровали только те chain, которые может построить context.subcultureSubset
		// Это делается для того, чтобы уменьшить кол-во chainList, т.к. их может быть
		// очень много для разных subculture. Если же мы не можем построить chain, то выводим весь chainList
		// if (myChainList.length === 0) { myChainList = chainList.slice(); }

		// Если конкретно указан superchain
		if (keyList.includes(superchain)) {
			if (typeof filterOwnRegion !== 'undefined') {
				superchainChainList = filterChainList(superchainChainList, filterOwnRegion);
			}
			// тогда выводим наименования всех superchainChainList, группируя их по culture
			for (const chainRow of superchainChainList) {
				let tooltip = chainRow['@chain_tooltip'] as string;
				const superchainKey = chainRow['building_superchain'] as string;
				if (typeof superchain_loc[superchainKey] !== 'undefined') {
					// addMap(outputChainMap, superchain_loc[superchainKey], '');
					// continue;
					tooltip = superchain_loc[superchainKey];
				}
				let cultureAvailabilityList: CultureType[] = unique(
					getChainAvailabilityList(chainRow)
						.map(row => (row['culture'] as CultureType | null) || '*')
				);
				const cultureMin = cultureAvailabilityList.map(culture => (
					culture_min_loc[culture]
				));
				for (const min of cultureMin) {
					addMap(outputChainMap, tooltip, min);
				}
			}
			// и при этом нету chain, где key === superchain
			// if (!chainList.some(chainRow => chainRow['key'] === superchain)) {
			// тогда нужно будет конкретно дописывать в output, ключ superchain (раз уж нету локализации для superchain)
			// }
			continue;
		}

		if (typeof filterOwnRegion !== 'undefined') {
			chainList = filterChainList(chainList, filterOwnRegion);
		}
		for (const chainRow of chainList) {
			addMap(outputChainMap, chainRow['@chain_tooltip'] as string, '');
		}
	}
	const outputCultureMinMap = new Map<string[], string[]>(); // culture_min[] > chain_tooltip[]
	for (let [chainTooltip, cultureMinList] of outputChainMap) {
		cultureMinList = unique(cultureMinList);
		if (
			(+deleteItem(cultureMinList, ''))
			+ (+deleteItem(cultureMinList, '*')) > 0
		) {
			cultureMinList = [];
		}
		cultureMinList.sort((a, b) => a.localeCompare(b));
		let hasSome = false;
		for (let kv of outputCultureMinMap) {
			if (isEqual(cultureMinList, kv[0])) {
				hasSome = true;
				kv[1].push(chainTooltip);
				break;
			}
		}
		if (!hasSome) { outputCultureMinMap.set(cultureMinList, [chainTooltip]); }
	}
	let sortedOutput = [...outputCultureMinMap.keys()];
	sortedOutput.sort((a, b) => {
		if (a.length < b.length) { return -1; }
		if (a.length > b.length) { return 1; }
		for (let i = 0; i < a.length; ++i) {
			let aa = a[i], bb = b[i];
			if (aa === bb) { continue; }
			return aa.localeCompare(bb);
		}
		return 0;
	});
	for (let cultureMinList of sortedOutput) {
		let chainTooltipList = outputCultureMinMap.get(cultureMinList)!;
		chainTooltipList = unique(chainTooltipList);
		output.push(`“${chainTooltipList.join('”, “')}”${cultureMinList.length > 0 ? ` (${cultureMinList.join(', ')})` : ''}`);
	}
	return `chain ${typical_output(output)}`;
};
export const region = (keyList: string[]) => {
	const output: string[] = [];
	for (const key of keyList) {
		const region = DB.regions.getEntry([key])!;
		output.push(`“${region['@onscreen']}”`);
	}
	return `region ${typical_output(output)}`;
};
export const technology = (keyList: string[]) => {
	const output: string[] = [];
	for (const key of keyList) {
		const row = DB.technologies.getEntry([key])!;
		output.push(`“${row['@onscreen_name']}”`);
	}
	return `technology ${typical_output(output)}`;
};
export const unit = (keyList: string[], hideCaption?: boolean) => {
	const output: string[] = [];
	for (const unitKey of keyList) {
		const row = DB.land_units.getEntry([unitKey])!;
		output.push(`“${row['@onscreen_name']}”`);
	}
	return `${hideCaption ? '' : 'unit '}${typical_output(output)}`;
};
export const agent = (keyList: AgentType[], hideCaption?: boolean) => {
	const output: string[] = [];
	for (const unitKey of keyList) {
		const row = ctx_getAgentData(unitKey)!;
		output.push(`“${row.name}”`);
	}
	return `${hideCaption ? '' : 'agent '}${typical_output(output)}`;
};
export const post_battle_captive_option = (captive_option: 'enslave' | 'kill' | 'release') => {
	const defaultText = {
		'enslave': 'Enslave Captives',
		'kill': 'Kill Captives',
		'release': 'Release Captives',
	}[captive_option];
	const { group: { cultureKey } } = context;
	let row = DB.campaign_group_member_criteria_originating_cultures.raw.find(row => (
		row['culture'] === cultureKey
	));
	if (!row) { return defaultText; }

	const member = row['member'] as string;
	const member_row = DB.campaign_group_members.getEntry([member]);
	if (!member_row) { return defaultText; }

	const group = member_row['group'] as string;
	const captive_row = DB.campaign_post_battle_captive_options.getEntry([captive_option, group]);
	if (!captive_row) { return defaultText; }

	return captive_row['@onscreen_name'];
};