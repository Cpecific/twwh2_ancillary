import fs from 'fs';
import path from 'path';
import xml from 'fast-xml-parser';
import iterate from 'iterare';
import { current_game, getChance, spawn_unique_subtype } from './config';
import { addMap, unique, toArray, deleteItem, intersect, isEqualShuffle } from './common';
import { schema, IEntry, locFileController } from './ron-db';
import {
	agent_loc,
	culture_min_loc,
	corruption_loc,
	Events,
	ITrigger,
	IDataCondition,
	CampaignType,
	CultureType,
	SubCultureType,
	UnitCasteType,
	AgentType,
	AgentSubtype,
	TransformBug,
	CorruptionType,
	IContext,
	IGetChance,
	IEffect,
	ICAncillary,
	ICGroupBy,
} from './data-types';
import { isEqual } from 'lodash';
import assert from 'assert';

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
	agent_subtype_subculture_overrides: schema['agent_subtype_subculture_overrides']?.getData(),
	agent_culture_details: schema['agent_culture_details'].getData(),
	ancillaries: schema['ancillaries'].getData(),
	// Бесполезно, категории типа "Armour", "Follower"...
	// ancillaries_categories: schema['ancillaries_categories'].getData(),
	ancillaries_included_agent_subtypes: schema['ancillaries_included_agent_subtypes'].getData(),
	ancillary_included_subcultures: schema['ancillary_included_subcultures']?.getData(), // ! ONLY WH2
	ancillary_to_effects: schema['ancillary_to_effects'].getData(),
	ancillary_to_included_agents: schema['ancillary_to_included_agents'].getData(),
	ancillary_types: schema['ancillary_types'].getData(),
	banners: schema['banners'].getData(),
	battle_set_piece_armies_characters_items: schema['battle_set_piece_armies_characters_items'].getData(),
	campaign_effect_scopes: schema['campaign_effect_scopes'].getData(),
	campaign_group_members: schema['campaign_group_members'].getData(),
	campaign_group_member_criteria_cultures: schema['campaign_group_member_criteria_cultures'].getData(),
	campaign_group_member_criteria_subcultures: schema['campaign_group_member_criteria_subcultures'].getData(),
	campaign_group_member_criteria_originating_cultures: schema['campaign_group_member_criteria_originating_cultures']?.getData(), // ! ONLY WH2
	campaign_group_member_criteria_originating_subcultures: schema['campaign_group_member_criteria_originating_subcultures']?.getData(), // ! ONLY WH2
	campaign_post_battle_captive_options: schema['campaign_post_battle_captive_options'].getData(),
	cultures: schema['cultures'].getData(),
	culture_packs: schema['culture_packs'].getData(),
	cultures_subcultures: schema['cultures_subcultures'].getData(),
	effects: schema['effects'].getData(),
	effect_bundles: schema['effect_bundles'].getData(),
	effect_bundles_to_effects_junctions: schema['effect_bundles_to_effects_junctions'].getData(),
	factions: schema['factions'].getData(),
	faction_agent_permitted_subtypes: schema['faction_agent_permitted_subtypes'].getData(),
	faction_set_items: schema['faction_set_items'].getData(),
	frontend_factions: schema['frontend_factions'].getData(),
	main_units: schema['main_units'].getData(),
	names: schema['names'].getData(),
	land_units: schema['land_units'].getData(),
	pooled_resources: schema['pooled_resources'].getData(),
	unique_agents: schema['unique_agents'].getData(),
	unit_castes: schema['unit_castes'].getData(),
	start_pos_factions: (() => {
		let source: any[] = [];
		if (current_game === 'warhammer_2' || true) {
			const content = fs.readFileSync(
				path.join(__dirname, `../input/${current_game}/start_pos_factions.xml`)
			);
			const json = xml.parse(content.toString(), {
				parseNodeValue: false,
			});
			source = json['dataroot']['start_pos_factions'] as any[];
		} else {
			// const factions = [
			// 	'wh3_main_cth_the_northern_provinces',
			// 	'wh3_main_cth_the_western_provinces',
			// 	'wh3_main_dae_daemon_prince',
			// 	'wh3_main_kho_exiles_of_khorne',
			// 	'wh3_main_ksl_the_great_orthodoxy',
			// 	'wh3_main_ksl_the_ice_court',
			// 	'wh3_main_ksl_ursun_revivalists',
			// 	'wh3_main_nur_poxmakers_of_nurgle',
			// 	'wh3_main_ogr_disciples_of_the_maw',
			// 	'wh3_main_ogr_goldtooth',
			// 	'wh3_main_sla_seducers_of_slaanesh',
			// 	'wh3_main_tze_oracles_of_tzeentch',
			// 	'wh3_prologue_kislev_expedition',
			// ]
			// source = factions.map(faction => {
			// 	if (/_pro_/.test(faction)) {
			// 		return [{ faction: faction, campaign: 'wh3_main_prologue', playable: true }];
			// 	}
			// 	return [
			// 		{ faction: faction, campaign: 'wh3_main_combi', playable: true },
			// 		{ faction: faction, campaign: 'wh3_main_chaos', playable: true },
			// 	]
			// }).flat();
		}
		return source.map(row => ({
			faction: row['faction'] as string,
			// campaign: row['campaign'] as CampaignType,
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
	let playableFactionList = frontendFactionList.map(q => q.factionKey as string);
	if (current_game === 'warhammer_2' || true) {
		playableFactionList = playableFactionList.filter(factionKey => DB.start_pos_factions.some(q => q.faction === factionKey && q.playable));
	} else if (current_game === 'warhammer_3') {
		playableFactionList = playableFactionList.filter(q => q.startsWith('wh3_main_'));
		playableFactionList = [
			'wh2_dlc09_skv_clan_rictus',
			'wh2_dlc09_tmb_exiles_of_nehek',
			'wh2_dlc09_tmb_followers_of_nagash',
			'wh2_dlc09_tmb_khemri',
			'wh2_dlc09_tmb_lybaras',
			'wh2_dlc11_cst_noctilus',
			'wh2_dlc11_cst_pirates_of_sartosa',
			'wh2_dlc11_cst_the_drowned',
			'wh2_dlc11_cst_vampire_coast',
			'wh2_dlc11_def_the_blessed_dread',
			'wh2_dlc11_vmp_the_barrow_legion',
			'wh2_dlc12_lzd_cult_of_sotek',
			'wh2_dlc13_emp_golden_order',
			'wh2_dlc13_emp_the_huntmarshals_expedition',
			'wh2_dlc13_lzd_spirits_of_the_jungle',
			'wh2_dlc14_brt_chevaliers_de_lyonesse',
			'wh2_dlc15_grn_bonerattlaz',
			'wh2_dlc15_grn_broken_axe',
			'wh2_dlc15_hef_imrik',
			'wh2_dlc16_wef_drycha',
			'wh2_dlc16_wef_sisters_of_twilight',
			'wh2_dlc17_bst_malagor',
			'wh2_dlc17_bst_taurox',
			'wh2_dlc17_dwf_thorek_ironbrow',
			'wh2_dlc17_lzd_oxyotl',
			'wh2_main_def_cult_of_pleasure',
			'wh2_main_def_hag_graef',
			'wh2_main_def_har_ganeth',
			'wh2_main_def_naggarond',
			'wh2_main_hef_avelorn',
			'wh2_main_hef_eataine',
			'wh2_main_hef_nagarythe',
			'wh2_main_hef_order_of_loremasters',
			'wh2_main_hef_yvresse',
			'wh2_main_lzd_hexoatl',
			'wh2_main_lzd_itza',
			'wh2_main_lzd_last_defenders',
			'wh2_main_lzd_tlaqua',
			'wh2_main_skv_clan_eshin',
			'wh2_main_skv_clan_mors',
			'wh2_main_skv_clan_moulder',
			'wh2_main_skv_clan_pestilens',
			'wh2_main_skv_clan_skryre',
			'wh2_twa03_def_rakarth',
			'wh3_dlc20_chs_azazel',
			'wh3_dlc20_chs_festus',
			'wh3_dlc20_chs_kholek',
			'wh3_dlc20_chs_sigvald',
			'wh3_dlc20_chs_valkia',
			'wh3_dlc20_chs_vilitch',
			'wh3_main_chs_shadow_legion',
			'wh3_main_cth_the_northern_provinces',
			'wh3_main_cth_the_western_provinces',
			'wh3_main_dae_daemon_prince',
			'wh3_main_dwf_the_ancestral_throng',
			'wh3_main_emp_cult_of_sigmar',
			'wh3_main_kho_exiles_of_khorne',
			'wh3_main_ksl_the_great_orthodoxy',
			'wh3_main_ksl_the_ice_court',
			'wh3_main_ksl_ursun_revivalists',
			'wh3_main_nur_poxmakers_of_nurgle',
			'wh3_main_ogr_disciples_of_the_maw',
			'wh3_main_ogr_goldtooth',
			'wh3_main_sla_seducers_of_slaanesh',
			'wh3_main_tze_oracles_of_tzeentch',
			'wh3_main_vmp_caravan_of_blue_roses',
			'wh3_prologue_kislev_expedition',
			'wh_dlc03_bst_beastmen',
			'wh_dlc05_bst_morghur_herd',
			'wh_dlc05_wef_argwylon',
			'wh_dlc05_wef_wood_elves',
			'wh_dlc08_nor_norsca',
			'wh_dlc08_nor_wintertooth',
			'wh_main_brt_bordeleaux',
			'wh_main_brt_bretonnia',
			'wh_main_brt_carcassonne',
			'wh_main_chs_chaos',
			'wh_main_dwf_dwarfs',
			'wh_main_dwf_karak_izor',
			'wh_main_dwf_karak_kadrin',
			'wh_main_emp_empire',
			'wh_main_grn_crooked_moon',
			'wh_main_grn_greenskins',
			'wh_main_grn_orcs_of_the_bloody_hand',
			'wh_main_vmp_schwartzhafen',
			'wh_main_vmp_vampire_counts',
		];
	}

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

const isHeroAgent = (key: AgentType) => (key !== 'general' && key !== 'colonel' && key !== 'minister');
interface SchemaEntry { [K: string]: IEntry }
export const toCultureKey = (subcultureKey: SubCultureType) => {
	return DB.cultures_subcultures.getEntry([subcultureKey])!['culture'] as CultureType;
};
export const getCulture = (cultureKey: CultureType) => {
	return DB.cultures.getEntry([cultureKey]);
};
const _getCultureSubcultureListCache = new Map<CultureType, SubCultureType[]>();
export const getCultureSubcultureList = (cultureKey: CultureType): SubCultureType[] => {
	if (_getCultureSubcultureListCache.has(cultureKey)) {
		return _getCultureSubcultureListCache.get(cultureKey)!;
	}
	const ret: SubCultureType[] = [];
	for (const row of DB.cultures_subcultures.raw) {
		if (row['culture'] === cultureKey) {
			ret.push(row['subculture'] as SubCultureType);
		}
	}
	_getCultureSubcultureListCache.set(cultureKey, ret);
	return ret;
};
const getFactionSubculture = (factionKey: string): SubCultureType => {
	return DB.factions.getEntry([factionKey])!['subculture'] as SubCultureType;
};
const getSubcultureListForFactionSet = (factionSetKey: string) => {
	let subcultureList: SubCultureType[] = [];
	const add: IEntry[] = [];
	const remove: IEntry[] = [];
	let all_row: boolean = false;
	for (const row of DB.faction_set_items.raw) {
		if (row['set'] !== factionSetKey) { continue; }
		const v1 = ((row['culture'] as string | null) !== null ? 1 : 0);
		const v2 = ((row['faction'] as string | null) !== null ? 1 : 0);
		const v3 = ((row['subculture'] as string | null) !== null ? 1 : 0);
		const bRemove = row['remove'] as boolean;
		if (v1 + v2 + v3 === 0) {
			all_row = true;
		} else {
			assert(v1 + v2 + v3 === 1, `unexpected row in faction_set_items_tables with id=${row['id']}`);
		}
		if (bRemove) { remove.push(row); }
		else { add.push(row); }
	}
	if (all_row) {
		// console.log({ add, remove })
		assert(add.length + remove.length === 1, `we expect faction_set="all" to be the only row`);
		assert(remove.length === 0, `we expect faction_set="all" not to "remove"`);
		subcultureList = DB.cultures_subcultures.raw.map(row => row['subculture'] as SubCultureType);
		return subcultureList;
	} else {
		assert(add.length + remove.length > 0, `currently, we expect faction_set="${factionSetKey}" to have some entries in faction_set_items_tables`);
	}
	if (add.length > 0) {
		assert(remove.length === 0, 'not implemented');
		for (const row of add) {
			if (row['culture']) { subcultureList.push(...getCultureSubcultureList(row['culture'] as CultureType)); }
			if (row['faction']) { subcultureList.push(getFactionSubculture(row['faction'] as string)); }
			if (row['subculture']) { subcultureList.push(row['subculture'] as SubCultureType); }
		}
	}
	if (remove.length > 0) {
		assert(add.length === 0, 'not implemented');
		for (const row of remove) {
			if (row['culture']) { subcultureList.push(...getCultureSubcultureList(row['culture'] as CultureType)); }
			if (row['faction']) { subcultureList.push(getFactionSubculture(row['faction'] as string)); }
			if (row['subculture']) { subcultureList.push(row['subculture'] as SubCultureType); }
		}
		subcultureList = DB.cultures_subcultures.raw.map(row => row['subculture'] as SubCultureType)
			.filter(k => !subcultureList.includes(k));
	}
	return unique(subcultureList);
};
const _findAncillaryCache = new Map<string, ICAncillary>(); // ancillary_key -> { ancillary, subcultureList, cultureList, effectList }
export const findAncillary = (key: string): ICAncillary => {
	if (_findAncillaryCache.has(key)) {
		return _findAncillaryCache.get(key)!;
	}
	const ancillary = DB.ancillaries.getEntry([key])!;
	assert(ancillary['category'] === 'general', `only category "general" (followers) are currently supported`);
	const icon = DB.ancillary_types.getEntry([ancillary['type'] as string])!['ui_icon'] as string;
	const agentList = Object.keys(DB.ancillary_to_included_agents.keyed[key] || {})
		.filter(agent => DB.agents.getEntry([agent])!['playable'] as boolean);
	const effectMap = toArray((DB.ancillary_to_effects.keyed[key] || {}) as unknown as SchemaEntry);
	const bspaci = DB.battle_set_piece_armies_characters_items.raw.filter(row => row['character_item'] === key);
	const bannerKey = ancillary['provided_banner'] as string | null;
	if (bannerKey) {
		// TODO banner_permitted_unit_sets
		const banner = DB.banners.getEntry([bannerKey]);
		assert(!!banner, `missing db entry banners="${bannerKey}" for ancillary="${key}"`);
		const bundleKey = banner['effect_bundle'] as string;
		const eb = DB.effect_bundles.getEntry([bundleKey]);
		assert(!!eb, `missing db entry effect_bundles="${bundleKey}" for banners="${bannerKey}", ancillary="${key}"`);
		for (const row of DB.effect_bundles_to_effects_junctions.raw) {
			if (row['effect_bundle_key'] !== bundleKey) { continue; }
			effectMap.push([row['effect_key'] as string, row]);
		}
	}
	const effectList = effectMap.map(([effectKey, row]): IEffect => {
		const effect = DB.effects.getEntry([effectKey])!;
		const effectScope = row['effect_scope'] as string;
		const scope = DB.campaign_effect_scopes.getEntry([effectScope]);
		return {
			row,
			effect,
			scope,
		};
	});
	const toAgent = DB.ancillary_to_included_agents.raw.filter(row => (
		row['ancillary'] === key
	)).map(row => row['agent'] as AgentType);
	let toAgentSubtype: AgentSubtype[] = DB.ancillaries_included_agent_subtypes.raw.filter(row => (
		row['ancillary'] === key
	)).map(row => row['agent_subtype'] as AgentSubtype);
	if (DB.agent_subtypes.raw[0].hasOwnProperty('can_equip_ancillaries')) {
		let list = toAgentSubtype.filter(key => (
			DB.agent_subtypes.getEntry([key])!['can_equip_ancillaries']
		));
		assert(list.length === toAgentSubtype.length, `currently it is unexpected to have can_equip_ancillaries=false`);
	}

	let subcultureList: SubCultureType[] = [];
	if (current_game === 'warhammer_2') {
		subcultureList = Object.keys(DB.ancillary_included_subcultures.keyed[key] || {}) as any;
	} else if (current_game === 'warhammer_3') {
		subcultureList = getSubcultureListForFactionSet(ancillary['faction_set'] as string);
	}
	subcultureList = unique(subcultureList);
	const cultureList: CultureType[] = unique(subcultureList.map(subculture => (
		toCultureKey(subculture)
	)));

	const v: ICAncillary = {
		ancillary,
		icon,
		agentList,
		effectList,
		toAgent,
		toAgentSubtype,

		subcultureList,
		cultureList,
	};
	_findAncillaryCache.set(key, v);
	return v;
};
const _getIconCache = new Map<string, string>();
const getIcon = async (icon: string): Promise<string> => {
	if (/\.png$/.test(icon)) { icon = icon.substr(0, icon.length - 4); }
	if (_getIconCache.has(icon)) {
		return _getIconCache.get(icon)!;
	}
	if (icon === 'icon_general') {
		// const dir = path.join(__dirname, '../input', current_game, 'ui/skins/')
		icon = 'icon_army';
	}
	const promiseList: Promise<boolean>[] = [];
	const dirList: [string, boolean][] = [
		['ui/skins/default/', false],
		// ['ui/skins/warhammer_3/', false],
		['ui/campaign ui/effect_bundles/', true],
		['ui/common ui/unit_category_icons/', false],
		['ui/common ui/unit_category_icons/', true],
	];
	for (const [dir, mustBeIcon] of dirList) {
		let src = icon;
		if (mustBeIcon) {
			if (!/^icon_/.test(src)) { continue; }
			src = src.substr(5);
		}
		promiseList.push(new Promise(resolve => {
			fs.stat(path.join(__dirname, '../input', current_game, dir, `${src}.png`), (err, stats) => {
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
	const ret = `${dir}${src}.png`;
	_getIconCache.set(icon, ret);
	return ret;
};
export const getEffectDesc = async (v: IEffect, opts?: {
	subcultureKey?: SubCultureType;
	cultureKey?: CultureType;
}) => {
	const { effect, row, scope } = v;
	const effectValue = row['value'] as number;
	let desc = effect['@description'] as string;
	desc = desc
		.replace('%+n', `${effectValue > 0 ? '+' : ''}${effectValue.toString()}`)
		.replace('%n', effectValue.toString());
	if (scope) {
		let str = scope['@localised_text'] as string;
		if (/^\n/.test(str)) {
			if (ctx_target === 'html') {
				str = str.replace(/^\n/, '');
				str = str.replace(/^([^\s]+?)(?=\s)|(?<=\s)([^\s]+?)$/g, '<span class="nowr">$1$2</span>');
				str = ' ' + str;
			} else {
				str = str.replace(/^\n/, ' ');
			}
		}
		desc += str;
	}
	let imgIdx = 0;
	const imgPromiseList: Promise<void>[] = [];
	desc = desc.replace(/\[\[img\:([^\]]*)\]\][^\[]*\[\[\/img\]\]/gm, (_, icon) => {
		if (ctx_target === 'html') {
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
	desc = desc.replace(/\{\{tr\:(.*?)\}\}/g, (_, key) => {
		let arr = [
			opts?.subcultureKey ? TEXT.ui_text_replacements.get(key + '_' + opts.subcultureKey) || null : null,
			opts?.cultureKey ? TEXT.ui_text_replacements.get(key + '_' + opts.cultureKey) || null : null,
			TEXT.ui_text_replacements.get(key) || null,
		];
		return arr.find(q => q !== null) || '';
	});
	let colMap = {
		green: '#00ff00', // it's too dark
	} as any;
	for (const r of [
		/\[\[col\:([^\]]*?)\]\]([^\[]*?)\[\[\/col\]\]/gm,
		// bugged wh3 description ([[col]] tag is not closed)
		/\[\[col\:([^\]]*?)\]\]([^\[]*)/gm,
	]) {
		desc = desc.replace(r, (_, col, v) => {
			if (ctx_target === 'html') {
				return `<span style="color: ${colMap[col] || col};">${v}</span>`;
			}
			return v;
		});
	}
	return desc;
};
export const getSubcultureSubset = (cultureKey: CultureType | SubCultureType[], subcultureList: SubCultureType[]): SubCultureType[] => {
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
const getSubcultureFactionList = (subcultureSubset: SubCultureType[]): string[] => {
	return unique(DB.factions.raw.filter(row => (
		subcultureSubset.includes(row['subculture'] as SubCultureType)
	)).map(row => row['key'] as string));
};
const getUnitCaste = (associated_unit: any): UnitCasteType | null => {
	if (typeof associated_unit === 'string') {
		const row = DB.main_units.getEntry([associated_unit])!;
		return row['caste'] as UnitCasteType;
	}
	return null;
};

const getSubcultureListForAgentSubtypeList = (subtypeList: AgentSubtype[]): SubCultureType[] => {
	const factionList = DB.faction_agent_permitted_subtypes.raw.filter(row => (
		subtypeList.includes(row['subtype'] as AgentSubtype)
	)).map(row => (
		DB.factions.getEntry([row['faction'] as string])!
	));
	return unique(factionList.map(row => (
		row['subculture'] as SubCultureType
	)));
};

// CONTEXT
type ContextTarget = 'steam' | 'html' | null;
var ctx_target: ContextTarget = null;
export const ctx_setTarget = (target: ContextTarget) => { ctx_target = target; }
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
		// TODO CharacterPostBattleCaptureOption
		case Events.CharacterPostBattleCaptureOption:
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
		// const subcultureOverrideRow = null && DB.agent_subtype_subculture_overrides?.raw.find(row => (
		// 	row['subtype'] === subtypeKey
		// 	&& row['subculture'] === group.subculture
		// ));
		// if (subcultureOverrideRow) {
		// 	const unit_override = subcultureOverrideRow['associated_unit_override'];
		// 	if (typeof unit_override === 'string' && unit_override) { unit = unit_override; }
		// 	const name_override = subcultureOverrideRow['@onscreen_name'];
		// 	if (typeof name_override === 'string' && name_override) { name = name_override; }
		// }
	}
	const uniqueRow = DB.unique_agents.getEntry([subtypeKey]) || spawn_unique_subtype[subtypeKey];
	let isUnique = false;
	if (uniqueRow) {
		isUnique = true;
		const nameResult = {
			forename: null as (string | null),
			family_name: null as (string | null), // surname
			other: null as (string | null), // other_name
			clan_name: null as (string | null),
		};
		let haveSome = false;
		// могут не совпадать
		for (const uniqueColumn of ['forename', 'surname', 'other_name', 'clan_name'] as const) {
			let nameId = uniqueRow[uniqueColumn];
			if (typeof nameId === 'string' && nameId) {
				if (/^names_name_\d+$/.test(nameId)) { nameId = nameId.substr(11); }
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
		isUnique,
	};
};
interface GetPermittedSubtypeList {
	agent: AgentType;
	subtype: AgentSubtype;
}
const _ctx_getPermittedSubtypeListCache = new Map<string, GetPermittedSubtypeList[]>();
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
				&& v.agent === row.agent
			)) === idx
		));
	// return unique(data);
	_ctx_getPermittedSubtypeListCache.set(key, list);
	return list;
};
const ctx_getRecruitmentCategoryMap = () => {
	const permitted = ctx_getPermittedSubtypeList();
	const map = new Map<string, AgentSubtype[]>();
	const actualCategorySet = new Set<string>();
	for (const row of DB.agent_subtypes.raw) {
		const subtypeKey = row['key'] as AgentSubtype;
		const subtypeList = permitted.filter(v => v.subtype === subtypeKey);
		if (subtypeList.length === 0) { continue; }
		let categoryKey = row['recruitment_category'] as string | null;
		if (categoryKey !== null) {
			addMap(map, categoryKey, subtypeKey);
			actualCategorySet.add(categoryKey);
			continue;
		}
		// subtype is hero
		for (const v of subtypeList) {
			addMap(map, v.agent, subtypeKey);
		}
	}
	const ret = new Map<string, AgentSubtype[]>();
	const hero_sort: { [K in AgentType]: number } = {
		general: 10000000,
		colonel: 20000000,
		minister: 30000000,
		champion: 10000001,
		dignitary: 10000003,
		engineer: 10000004,
		runesmith: 10000005,
		spy: 10000006,
		wizard: 10000007,
	};
	const rkList = iterate(map).map(([key]) => {
		const row = DB.agent_recruitment_categories.getEntry([key]);
		return {
			key,
			order: row ? row['order'] as number : hero_sort[key as AgentType],
		};
	}).toArray().sort((a, b) => a.order - b.order);
	for (const { key } of rkList) { ret.set(key, map.get(key)!); }
	return map;
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
	let ret = '';
	for (let i = 0; i < self.length; ++i) {
		const a = self[i];
		if (a.category) {
			ret += '; ';
			if (typeof a.category !== 'boolean') {
				ret += format(a.category);
			}
		} else {
			ret += ', ';
		}
		ret += format(a);
	}
	return ret.substr(2);
};
// TODO ancillary_to_included_agents
// TODO ancillaries_included_agent_subtypes
const buildTriggerDesc = async () => {
	const { trigger, group } = context;
	const subcultureSubset = ctx_getSubcultureSubset();
	// const ancillaryKey = ancData.key;
	let { notObviousHeroEvent, onlyMainLord } = ctx_getEventData();
	const ret = []
	for (let cIdx = 0; cIdx < trigger.condition.length; ++cIdx) {
		const c = trigger.condition[cIdx];
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
				if (current_game === 'warhammer_2') {
					deleteItem(agent_subtype, 'dlc07_brt_green_knight');
				}
				else {
					deleteItem(agent_subtype, 'wh_dlc07_brt_green_knight');
				}
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
		let text;
		let textValue = c.text()
		if (typeof textValue === 'string') {
			text = textValue;
		} else {
			text = await textValue;
		}
		text = text.replace(/\{(.*?)\}(\s?)/g, (_, q: string, space: string) => {
			const qList = q.split(',');
			const ret: string[] = [];
			for (const val of qList) {
				switch (val) {
					case 'normal':
						allowedNormal = true;
					// if (allowedNormal) {
					// 	allowedNormal = false;
					// 	ret.push('with normal character');
					// }
				}
			}
			if (ctx_target === 'html') { return ''; }
			else { return ''; }
			if (ret.length === 0) { return ''; }
			return `(${ret.join('; ')})`;
		});
		text = text.replace(/\[\[nowr\]\]([^\[]*?)\[\[\/nowr\]\]/gm,
			ctx_target === 'html'
				? '<span class="nowr">$1</span>'
				: '$1');

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

		const bug = TransformBug(c.bug);
		ret.push({
			c,
			impossible: !!bug.value,
			top,
			text,
			flags: {
				normal: allowedNormal,
			},
		});
	}
	return ret;
};

interface IParsedAncillaryInfo {
	hasLord: boolean;
	incompleteLord: boolean;
	hasHero: boolean;
	incompleteHero: boolean;
	list: string[];
	narrow: string[];
}
const getAncillaryInfo = (): IParsedAncillaryInfo => {
	const { ancillary, group } = context;
	let info: IParsedAncillaryInfo = {
		hasLord: false,
		incompleteLord: false,
		hasHero: false,
		incompleteHero: false,
		list: [],
		narrow: [],
	};
	if (ancillary.toAgent.length === 0
		&& ancillary.toAgentSubtype.length === 0) {
		info.hasLord = true;
		info.hasHero = true;
		return info;
	}
	// if ancillary_to_included_agents doesn't contain rows for ancillary, then we suppose that all agents can wear it
	// *confirmed* with wh_main_anc_magic_standard_the_bad_moon_banner on wh_main_grn_night_goblin_shaman::
	// .toAgentSubtype will further narrow down, what is mentioned in .toAgent
	const C = (() => {
		let agentList = unique(DB.agent_culture_details.raw.filter(row => (
			row['culture'] === group.cultureKey
		)));
		// .map(row => row['agent'] as AgentType)
		// let playableList = agentList.filter(key => key !== 'colonel' && key !== 'minister');
		let playableAgentList = unique(agentList
			.filter(row => !!row['associated_unit'])
			.map(row => row['agent'] as AgentType));
		let generalList: AgentType[] = [];
		let heroList: AgentType[] = [];
		for (const key of playableAgentList) {
			if (isHeroAgent(key)) { heroList.push(key); }
			else { generalList.push(key); }
		}

		const subtypeList = ctx_getPermittedSubtypeList();

		return {
			agentList,
			playableAgentList,
			generalList,
			heroList,
			subtypeList,
		};
	})();
	if (ancillary.toAgentSubtype.length > 0) {
		// ctx_getAgentSubtypeData(row.subtype)!,
		let toSubtypeList = C.subtypeList.filter(row => ancillary.toAgentSubtype.includes(row.subtype));
		if (ancillary.toAgent.length > 0) {
			toSubtypeList = toSubtypeList.filter(row => ancillary.toAgent.includes(row.agent));
		}
		// We always assume, that `ancillaries_included_agent_subtypes` only contain a subset of `agents`
		// so it will always give **incomplete**
		// TODO not to assume ;)
		if (toSubtypeList.some(v => !isHeroAgent(v.agent))) {
			info.hasLord = true;
			info.incompleteLord = true;
		}
		if (toSubtypeList.some(v => isHeroAgent(v.agent))) {
			info.hasHero = true;
			info.incompleteHero = true;
		}
		// const keyList = ancillary.toAgentSubtype.map(subtype => ({
		// 	...ctx_getAgentSubtypeData(subtype)!,
		// 	subtype,
		// }));
		const keyList = toSubtypeList.map(q => ({
			...ctx_getAgentSubtypeData(q.subtype)!,
			...q,
		}));

		let catList: string[] = [];
		let uniList: string[] = [];
		for (const [recruitmentKey, subtypeList] of ctx_getRecruitmentCategoryMap()) {
			const filter = keyList.filter(v => subtypeList.includes(v.subtype));
			if (filter.length === subtypeList.length
				&& !filter.some(v => v.isUnique)
			) {
				const category = DB.agent_recruitment_categories.getEntry([recruitmentKey]);
				// assert(!!category, `hero category "${recruitmentKey}"; ancillary="` + ancillary.ancillary['key'] + '";;;' + JSON.stringify(subtypeList) + ';;;' + JSON.stringify(category))
				if (category) {
					catList.push(category['@onscreen_name'] as string);
					continue;
				}
			}
			for (const v of filter) {
				if (v.row['recruitment_category'] !== 'legendary_lords') {
					uniList.push(v.name);
					continue;
				}
				const mainUnitKey = v.row['associated_unit_override'] as string;
				const unitKey = DB.main_units.getEntry([mainUnitKey])!['land_unit'] as string;
				assert(!!unitKey);
				const row = DB.land_units.getEntry([unitKey])!;
				assert(!!row, `legendary_lord "${v.row['key']}" doesn't have land_unit="${unitKey}" for main_unit="${mainUnitKey}"`);
				uniList.push(row['@onscreen_name'] as string);
			}
		}

		info.list.push(...catList, ...uniList);
		info.narrow.push(...catList, ...uniList);
	}
	else if (ancillary.toAgent.length > 0) {
		let keyList = ancillary.toAgent.filter(key => C.agentList.some(row => row['agent'] === key));
		let narrow = intersect(keyList, C.playableAgentList);
		if (ancillary.toAgent.length > 0) {
			assert(narrow.length > 0);
			if (narrow.some(v => !isHeroAgent(v))) {
				info.hasLord = true;
				narrow = narrow.filter(v => isHeroAgent(v));
			}
			if (narrow.length > 0) {
				info.hasHero = true;
				if (narrow.length === C.heroList.length) {
					narrow = [];
				} else {
					info.incompleteHero = true;
				}
			}
		}

		info.list.push(...keyList.map(key => ctx_getAgentData(key).name));
		info.narrow.push(...narrow.map(key => ctx_getAgentData(key).name));
	}
	assert(info.list.length > 0);
	return info;
};
export interface IParsedTrigger {
	trigger: ITrigger;
	chance: number | null;
	repeat?: number;
	triggerDesc: ReturnType<typeof buildTriggerDesc> extends Promise<infer R> ? R : never;
}
export interface IParsed {
	// subcultureSubset: SubCultureType[];
	// effectList: EffectData[]; // string[];
	ancillaryInfo: IParsedAncillaryInfo;
	tirggerList: IParsedTrigger[];
}
let context: IContext;
export const parseTrigger = async (opts: {
	// ancillaryKey > IParsed
	// parsed: Map<string, Map<string, IParsed>>;
	parsed: Map<string, IParsed>;
	group: ICGroupBy;
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
			try {
				parsed.set(ancData.key, {
					// effectList: ancillary.effectList,
					ancillaryInfo: getAncillaryInfo(),
					tirggerList: [],
				});
			} catch (e) {
				continue;
			}
		}
		// if (!trigger.event) { continue; }

		const parsedAncillary = parsed.get(ancData.key)!;
		if (parsedAncillary.tirggerList.some(v => v.trigger === trigger)) { continue; }

		const triggerDesc = !trigger.event ? [] : await buildTriggerDesc();
		let chance: number | undefined | null = null;
		if (typeof ancData.chance === 'undefined') {
			assert(!trigger.event);
			// @ts-ignore
			const c: IDataCondition = {};
			let text: string[] = ancillary.subcultureList.slice();
			assert(group.by === 'subculture');
			// text = text.filter(key => key !== group.subculture);
			if (text.includes('filter_all')) { text = ['filter_all']; }
			text = text.map(key => {
				let title = DB.cultures_subcultures.getEntry([key])!['@name'] as string;
				if (key === group.subculture) {
					if (ctx_target === 'html') {
						title = `<span class="dimmed">${title}</span>`;
					}
				}
				return title;
			});
			triggerDesc.push({
				c,
				impossible: false,
				top: {
					against: [],
					allowed: [],
					forbid: [],
				},
				text: text.join(', '),
				flags: {
					normal: false,
				},
			})
		} else {
			chance = getChance(context);
			if (typeof chance === 'undefined') { chance = ancData.chance; }
		}
		parsedAncillary.tirggerList.push({
			trigger,
			chance: chance,
			repeat: ancData.repeat,
			triggerDesc,
		});
	}
};
export const sortAncMap = (ancMap: Map<string, IParsed>) => {
	return new Map([...ancMap.entries()].sort((a, b) => {
		const aa = findAncillary(a[0]);
		const bb = findAncillary(b[0]);
		const as = aa.ancillary['@onscreen_name'] as string;
		const bs = bb.ancillary['@onscreen_name'] as string;
		return as.localeCompare(bs);
		// return a[0].localeCompare(b[0]);
	}));
};
export const sortParsedMap = (parsed: Map<string, Map<string, IParsed>>) => {
	for (const [subcultureKey, ancMap] of parsed) {
		parsed.set(subcultureKey, sortAncMap(ancMap));
	}
};

const typical_output = (ret: string[]) => {
	if (ret.length === 0) {
		const { condition } = context;
		assert(!!condition.bug, `condition expects some data, but got none of data and has no "bug" property set`);
	}
	return ret.length === 0
		? '?'
		: ret.length === 1
			? ret[0]
			: ret.slice(0, -1).join(', ') + ' or ' + ret[ret.length - 1];
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
	const ret: string[] = [];
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
		ret.push(`“${variant['@name']}”`);
	}
	return `building ${typical_output(ret)}`;
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
		const ret: IEntry[] = [];
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
				fowOwn && ret.push(chainRow);
			} else {
				!fowOwn && ret.push(chainRow);
			}
			// Бессмысленно, т.к. enemy region может быть и твоя же culture
			// if (false && (!allowOwnRegion || !allowEnemyRegion)) { }
		}
		return ret;
	}
	const ret: string[] = [];
	const retChainMap = new Map<string, string[]>(); // chain_tooltip > culture_min[]
	for (let [superchain, chainList] of superChainMap) {
		// if (foundSuperchainList.includes(superchain)) {
		// 	ret.push(``);
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
					// addMap(retChainMap, superchain_loc[superchainKey], '');
					// continue;
					tooltip = superchain_loc[superchainKey];
				}
				let cultureAvailabilityList: CultureType[] = unique(
					getChainAvailabilityList(chainRow)
						.map(row => (row['culture'] as CultureType | null) || '*')
				);
				const cultureMin = cultureAvailabilityList.map(culture => (
					culture_min_loc[culture]
				)).filter((v): v is string => typeof v === 'string');
				for (const min of cultureMin) {
					addMap(retChainMap, tooltip, min);
				}
			}
			// и при этом нету chain, где key === superchain
			// if (!chainList.some(chainRow => chainRow['key'] === superchain)) {
			// тогда нужно будет конкретно дописывать в ret, ключ superchain (раз уж нету локализации для superchain)
			// }
			continue;
		}

		if (typeof filterOwnRegion !== 'undefined') {
			chainList = filterChainList(chainList, filterOwnRegion);
		}
		for (const chainRow of chainList) {
			addMap(retChainMap, chainRow['@chain_tooltip'] as string, '');
		}
	}
	const retCultureMinMap = new Map<string[], string[]>(); // culture_min[] > chain_tooltip[]
	for (let [chainTooltip, cultureMinList] of retChainMap) {
		cultureMinList = unique(cultureMinList);
		if (
			(+deleteItem(cultureMinList, ''))
			+ (+deleteItem(cultureMinList, '*')) > 0
		) {
			cultureMinList = [];
		}
		cultureMinList.sort((a, b) => a.localeCompare(b));
		let hasSome = false;
		for (let kv of retCultureMinMap) {
			if (isEqual(cultureMinList, kv[0])) {
				hasSome = true;
				kv[1].push(chainTooltip);
				break;
			}
		}
		if (!hasSome) { retCultureMinMap.set(cultureMinList, [chainTooltip]); }
	}
	let retSorted = [...retCultureMinMap.keys()];
	retSorted.sort((a, b) => {
		if (a.length < b.length) { return -1; }
		if (a.length > b.length) { return 1; }
		for (let i = 0; i < a.length; ++i) {
			let aa = a[i], bb = b[i];
			if (aa === bb) { continue; }
			return aa.localeCompare(bb);
		}
		return 0;
	});
	for (let cultureMinList of retSorted) {
		let chainTooltipList = retCultureMinMap.get(cultureMinList)!;
		chainTooltipList = unique(chainTooltipList);
		ret.push(`“${chainTooltipList.join('”, “')}”${cultureMinList.length > 0 ? ` (${cultureMinList.join(', ')})` : ''}`);
	}
	return `chain ${typical_output(ret)}`;
};
export const region = (keyList: string[]) => {
	const ret: string[] = [];
	for (const key of keyList) {
		const region = DB.regions.getEntry([key])!;
		ret.push(`“${region['@onscreen']}”`);
	}
	return `region ${typical_output(ret)}`;
};
export const technology = (keyList: string[]) => {
	const ret: string[] = [];
	for (const key of keyList) {
		const row = DB.technologies.getEntry([key])!;
		ret.push(`“${row['@onscreen_name']}”`);
	}
	return `technology ${typical_output(ret)}`;
};
export const unit = (keyList: string[], hideCaption?: boolean) => {
	const ret: string[] = [];
	for (const unitKey of keyList) {
		const row = DB.land_units.getEntry([unitKey])!;
		ret.push(`“${row['@onscreen_name']}”`);
	}
	return `${hideCaption ? '' : 'unit '}${typical_output(ret)}`;
};
export const resource = async (keyList: string[], hideCaption?: boolean) => {
	const ret: string[] = [];
	for (const unitKey of keyList) {
		const row = DB.pooled_resources.getEntry([unitKey])!;
		const icon = row['optional_icon_path'] as string;
		const path = await getIcon(icon);
		ret.push(`<img src="${path}" icon="${icon}" /> “${row['@display_name']}”`);
	}
	return `${hideCaption ? '' : 'resource '}${typical_output(ret)}`;
};
export const agent = (keyList: AgentType[], hideCaption?: boolean) => {
	const ret: string[] = [];
	for (const unitKey of keyList) {
		const row = ctx_getAgentData(unitKey)!;
		ret.push(`“${row.name}”`);
	}
	return `${hideCaption ? '' : 'agent '}${typical_output(ret)}`;
};
export const agent_subtype = (keyList: AgentSubtype[], hideCaption?: boolean) => {
	const ret: string[] = [];
	for (const unitKey of keyList) {
		const row = ctx_getAgentSubtypeData(unitKey)!;
		ret.push(`“${row.name}”`);
	}
	return `${hideCaption ? '' : 'agent subtype '}${typical_output(ret)}`;
};
const getCampaignGroupMemberData = (memberKey: string) => {
	// we only need "originating" values
	let cultureKey: CultureType | null = null;
	let subcultureKey: SubCultureType | null = null;
	if (current_game === 'warhammer_2') {
		cultureKey = DB.campaign_group_member_criteria_originating_cultures.getEntry([memberKey])?.['culture'] || null as any;
		subcultureKey = DB.campaign_group_member_criteria_originating_subcultures.getEntry([memberKey])?.['subculture'] || null as any;
	} else if (current_game === 'warhammer_3') {
		cultureKey = DB.campaign_group_member_criteria_cultures.getEntry([memberKey, 'ORIGINATOR'])?.['culture'] || null as any;
		subcultureKey = DB.campaign_group_member_criteria_subcultures.getEntry([memberKey, 'ORIGINATOR'])?.['subculture'] || null as any;
	}
	return {
		// memberKey,
		cultureKey,
		subcultureKey,
	};
};
const getCampaignGroupData = (groupKey: string) => {
	const data = DB.campaign_group_members.raw
		.filter(row => (
			row['group'] == groupKey
		))
		.map((row) => ({
			id: row['id'] as string,
			priority: row['priority'] as number,
		}))
		.sort((a, b) => b['priority'] - a['priority'])
		.map(row => ({
			row,
			member: getCampaignGroupMemberData(row['id']),
		}));
	// I'm not sure about this sorting. Maybe game just takes the first sorted priority that matches any criteria
	// or should it match all the criteries of the 'member'?
	let culture_idx: number | null = null;
	let subculture_idx: number | null = null;
	data.forEach((q, i) => {
		const m = q.member;
		if (culture_idx === null && m.cultureKey) { culture_idx = i; }
		if (subculture_idx === null && m.subcultureKey) { subculture_idx = i; }
	});
	const get = (idx: number) => {
		const q = data[idx];
		return {
			...q.member,
			priority: q.row['priority'],
		};
	};
	if (subculture_idx !== null) { return get(subculture_idx); }
	if (culture_idx !== null) { return get(culture_idx); }
	return null;
};
const _post_battle_captive_optionCache = new Map<string, any>();
export const post_battle_captive_option = (captive_option: 'enslave' | 'enslave_slaves_only' | 'kill' | 'release') => {
	const _settings = {
		'enslave': ['Enslave Captives'],
		'enslave_slaves_only': ['Enslave Slaves Only', 'enslave'],
		'kill': ['Kill Captives'],
		'release': ['Release Captives'],
	};
	const defaultText = _settings[captive_option][0];
	let captive_outcome = _settings[captive_option][1] || captive_option;
	const { group: { cultureKey } } = context;
	const subcultureKey = context.group.by === 'subculture' ? context.group.subculture : null;
	let pbo_rows: IEntry[] = _post_battle_captive_optionCache.get(captive_outcome);
	if (!pbo_rows) {
		const source = DB.campaign_post_battle_captive_options.raw;
		pbo_rows = source.filter(
			source[0]!.hasOwnProperty('captive_outcome')
				? row => (row['captive_outcome'] === captive_outcome)
				: row => (row['captive_option'] === captive_outcome)
		);
		if (current_game === 'warhammer_3') {
			pbo_rows.sort((a, b) => (b['sort_priority'] as number) - (a['sort_priority'] as number));
		}
		_post_battle_captive_optionCache.set(captive_outcome, pbo_rows);
	}
	const memberList = pbo_rows.map(row => {
		const m = getCampaignGroupData(row['campaign_group'] as string);
		if (!m) { return null; }
		return {
			...m,
			row,
			// pbo_key: row['id'] as string,
			// pbo_priority: row['sort_priority'] as number || 0,
		};
	}).filter(q => q !== null).map(q => q!);
	const member = memberList.find(q => (
		q.cultureKey === cultureKey
		|| subcultureKey && q.subcultureKey === subcultureKey
	));
	if (!member) { return defaultText; }

	let text = member.row['@onscreen_name'] as string;
	if (ctx_target === 'html') {
		text = `<span title="${defaultText}">${text}</span>`;
	}
	return text;
	// schema for campaign_post_battle_captive_options
	if (current_game === 'warhammer_2') {
		// campaign_group: string
		// captive_option: string
		// effect_bundle: string?
		// effect_bundle_turns: int
		// icon_path: string
		// resource_transaction: string?
		// new_field: string?
	}
	if (current_game === 'warhammer_3') {
		// id: int
		// sort_priority: int
		// captive_outcome: string
		// campaign_group: string
		// effect_bundle: string?
		// effect_bundle_turns: int
		// icon_path: string
		// resource_transaction: string?
		// capturing_force_resource_transaction: string?
		// ...
		return defaultText;
	}
};
export const culture = (keyList: CultureType[], hideCaption?: boolean) => {
	const ret: string[] = [];
	for (const key of keyList) {
		const row = getCulture(key)!;
		ret.push(`“${row['@name'] as string}”`);
	}
	return `${hideCaption ? '' : 'culture '}${typical_output(ret)}`;
};
export function corruption(key: CorruptionType) {
	let v = corruption_loc[key];
	return `${v} corruption`;
}