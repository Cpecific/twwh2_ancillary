import { ITrigger, Events, IGetChance, IDataCulture, IDataSpawn } from './data-types';
import {
	agent,
	agent_subtype,
	building_exists,
	chain_or_superchain,
	corruption,
	culture,
	post_battle_captive_option,
	region,
	technology,
	unit,
	resource,
} from './build-data';

const alwaysFalse = true;
const careful = true;
const bug = true;
const impossible = true;
const prevent = true;
const unique = true;
const onlyPlayer = true;
const turnOwnRegion = true;
const turnEnemy = true;
const onlyMainLord = true;
const hasArmy = true;
const hasRegion = true;

// Used
Events.CharacterCharacterTargetAction;
Events.CharacterCompletedBattle;
Events.CharacterGarrisonTargetAction;
Events.CharacterLootedSettlement;
Events.CharacterPostBattleCaptureOption;
Events.CharacterRankUp;
Events.CharacterRazedSettlement;
Events.CharacterSackedSettlement;
Events.CharacterTurnEnd;
Events.CharacterTurnStart;
Events.HeroCharacterParticipatedInBattle;

const BugsWH3 = {
	wh_main_sch_settlement_major: {
		value: true,
		description: `Building superchains "wh_main_sch_settlement_major" and "wh_main_sch_settlement_major_coast" no longer exist in WH3`,
	},
	character_won_battle_against_culture: {
		value: false,
		description: `Function *character_won_battle_against_culture* will work, only if your faction is Main Attacker/Defender,
only compares cultures of the Main Attacker/Defender on both sides,
and it will skip any rebels factions`,
	},
	character_won_battle_against_unit: {
		value: false,
		description: `Function *character_won_battle_against_unit* will work, only if your faction is Main Attacker/Defender`,
	},
	pb_against_culture: {
		value: false,
		description: "Will work, only if Main Attacker/Defender is of specified \"against: culture\"",
	},
} as const;

const _colonel_description = `<span title="Colonel is a temporary placeholder, when your lord is killed during the end turn
Colonel is also a general placeholder for garrison armies">"Colonel"</span>`;
const _generic_description = `All triggers forbid "Green Knight", "Hand of the Shadow Crown" and ${_colonel_description} character from satisfying condition.`;
export const dataCultureMap: IDataCulture = new Map([
	['wh2_dlc09_tmb_tomb_kings', {
		title: 'Tomb Kings',
		description: _generic_description,
	}],
	['wh_main_brt_bretonnia', {
		title: 'Bretonnia',
		description: _generic_description,
	}],
	['wh_main_emp_empire', {
		title: 'Empire, Kislev, Southern Realms',
		description: _generic_description,
	}],
	['wh2_main_def_dark_elves', {
		title: 'Dark Elves',
		description: _generic_description,
	}],
	['wh2_main_hef_high_elves', {
		title: 'High Elves',
		description: _generic_description,
	}],
	['wh2_main_lzd_lizardmen', {
		title: 'Lizardmen',
		description: _generic_description,
	}],
	['wh2_main_skv_skaven', {
		title: 'Skaven',
		description: _generic_description,
	}],
	['wh_dlc03_bst_beastmen', {
		title: 'Beastmen',
		description: _generic_description,
	}],
	['wh2_dlc11_cst_vampire_coast', {
		title: 'Vampire Coast',
		description: _generic_description,
	}],
	['wh_main_chs_chaos', {
		title: 'Chaos',
		description: _generic_description,
	}],
	['wh_dlc08_nor_norsca', {
		title: 'Norsca',
		description: _generic_description,
	}],
	['wh_main_vmp_vampire_counts', {
		title: 'Vampire Counts',
		description: _generic_description,
	}],
	['wh_main_grn_greenskins', {
		title: 'Greenskins, Savage Orcs',
		description: _generic_description,
	}],
	['wh_main_dwf_dwarfs', {
		title: 'Dwarfs',
		description: _generic_description,
	}],
	['wh3_dlc23_chd_chaos_dwarfs', {
		title: 'Chaos Dwarfs',
		description: _generic_description,
	}],
	['wh_dlc05_wef_wood_elves', {
		title: 'Wood Elves',
		description: _generic_description,
	}],

	['wh3_main_kho_khorne', {
		title: 'Khorne',
		description: _generic_description,
	}],
	['wh3_main_pro_ksl_kislev', {
		title: 'Kislev',
		description: _generic_description,
	}],
	['wh3_main_tze_tzeentch', {
		title: 'Tzeentch',
		description: _generic_description,
	}],
	['wh3_main_cth_cathay', {
		title: 'Grand Cathay',
		description: _generic_description,
	}],
	['wh3_main_dae_daemons', {
		title: 'Daemons of Chaos',
		description: _generic_description,
	}],
	['wh3_main_ksl_kislev', {
		title: 'Kislev',
		description: _generic_description,
	}],
	['wh3_main_nur_nurgle', {
		title: 'Nurgle',
		description: _generic_description,
	}],
	['wh3_main_ogr_ogre_kingdoms', {
		title: 'Ogre Kingdoms',
		description: _generic_description,
	}],
	['wh3_main_sla_slaanesh', {
		title: 'Slaanesh',
		description: _generic_description,
	}],

	['wh2_main_rogue', {
		title: 'Rogue Armies',
		description: _generic_description,
	}],
]);

export const getChance: IGetChance = context => {
	let { chance } = context.ancData;
	// if (context.group.by === 'culture') {
	if (context.group.cultureKey === 'wh3_main_dae_daemons') {
		return chance * 0.5;
	}
	// }
};
export const spawn_unique_subtype: IDataSpawn = {
	wh2_dlc09_tmb_tomb_king_wakhaf: { forename: 'names_name_586036692', surname: '' },
	wh2_dlc09_tmb_tomb_king_rakhash: { forename: 'names_name_684097886', surname: '' },
	wh2_dlc09_tmb_tomb_king_thutep: { forename: 'names_name_1216967341', surname: '' },
	wh2_dlc09_tmb_tomb_king_lahmizzash: { forename: 'names_name_380641190', surname: '' },
	wh2_dlc09_tmb_tomb_king_setep: { forename: 'names_name_118554284', surname: '' },
	wh2_dlc09_tmb_tomb_king_alkhazzar_ii: { forename: 'names_name_293842310', surname: '' },

	wh2_dlc11_cst_admiral_tech_01: { forename: 'names_name_471943374', surname: '' },
	wh2_dlc11_cst_admiral_tech_02: { forename: 'names_name_119593724', surname: '' },
	wh2_dlc11_cst_admiral_tech_03: { forename: 'names_name_1954332184', surname: '' },
	wh2_dlc11_cst_admiral_tech_04: { forename: 'names_name_1995028532', surname: '' },
};
export const ca_ancillary_list = {
	armour: {
		common: [],

		uncommon: [],

		rare: [],
	},

	enchanted_item: {
		common: [],

		uncommon: [],

		rare: [],
	},

	banner: {
		common: [],

		uncommon: [],

		rare: [],
	},

	talisman: {
		common: [],

		uncommon: [],

		rare: [],
	},

	weapon: {
		common: [],

		uncommon: [],

		rare: [],
	},

	arcane_item: {
		common: [],

		uncommon: [],

		rare: [],
	},
};

export const data: ITrigger[] = [
	// #region Tomb Kings
	{
		event: Events.CharacterLootedSettlement,
		condition: [{
			prevent,
			text: () => `Loot settlement`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_dlc09_anc_follower_tmb_acolyte_of_sokth',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			prevent,
			text: () => `Rank Up in mountain region`
		}],
		ancillaryList: [{
			chance: 35,
			key: 'wh2_dlc09_anc_follower_tmb_charnel_valley_necrotect',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			prevent,
			text: () => `Rank Up in region with [[nowr]]corruption > 15 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_dlc09_anc_follower_tmb_cultist_of_usirian',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.pb_against_culture,
			onlyMainLord,
			allowed: { agent: ['general'] },
			against: { culture: ['wh2_dlc09_tmb_tomb_kings'] },
			text: () => `Lose/draw battle as attacker`
		}, {
			bug: BugsWH3.pb_against_culture,
			onlyMainLord,
			against: { culture: ['wh2_dlc09_tmb_tomb_kings'] },
			prevent,
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh2_dlc09_anc_follower_tmb_dog_headed_ushabti',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			allowed: { agent: ['general'] },
			hasRegion,
			turnOwnRegion,
			hasArmy,
			prevent,
			text: () => `Spend a turn in own region with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh2_dlc09_anc_follower_tmb_high_born_of_khemri',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			prevent,
			text: () => `Fail an agent action against another character`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh2_dlc09_anc_follower_tmb_legionnaire_of_asaph',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			prevent,
			text: () => `Rank Up in region, which belongs to ${culture(['wh_main_vmp_vampire_counts'], true)}`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh2_dlc09_anc_follower_tmb_priest_of_ptra',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			prevent,
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_dlc09_anc_follower_tmb_skeletal_labourer',
		}]
	}, {
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			prevent,
			text: () => `Post Battle: ${post_battle_captive_option('release')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_dlc09_anc_follower_tmb_tombfleet_taskmaster',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasArmy,
			prevent,
			text: () => `Rank Up, while ${unit(['wh2_dlc09_tmb_mon_ushabti_0', 'wh2_dlc09_tmb_mon_ushabti_1'])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_dlc09_anc_follower_tmb_ushabti_bodyguard',
		}]
	},
	// #endregion
	// #region High Elves
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_port'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_admiral',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_hef_assassin',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and character has won 6 offensive battles`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh2_main_anc_follower_hef_bard',
		}]
	}, {
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_dwf_dwarfs'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 50,
			key: 'wh2_main_anc_follower_hef_beard_weaver',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_court'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_counsellor',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Fail an action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_counterspy',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_dragons'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_dragon_armourer',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_dragons'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_dragon_tamer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh2_main_anc_follower_hef_food_taster',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_special_ellyrian_stables'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_horsemaster',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_special_tower_of_hoeth'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_librarian',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_order'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_minstrel',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_mages'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_poisoner',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_special_hall_of_dragons'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_priest_vaul',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_special_everqueen_court'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_priestess_isha',
		}]
	}, {
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('kill')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_hef_raven_keeper',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Participate in ambush battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_scout',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_worship'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_shrine_keeper',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_mages'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_trappist',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and faction has 40% trade after 5th turn (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_hef_wine_merchant',
		}]
	},
	// #endregion
	// #region Lizardmen
	{
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (2 turn own), which has ${chain_or_superchain(['wh2_main_sch_support2_worship'])}`
		}],
		ancillaryList: [{
			chance: 1,
			key: 'wh2_main_anc_follower_lzd_acolyte_priest',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			bug: BugsWH3.wh_main_sch_settlement_major,
			turnOwnRegion,
			hasRegion,
			// text: () => `Have ${technology(['tech_lzd_4_4'])} and Rank Up in region (1 turn own), with major settlement`
			text: () => `Have ${technology(['wh2_main_tech_lzd_4_4'])} and Rank Up in region (1 turn own) with ${chain_or_superchain([
				'wh_main_sch_settlement_major',
				'wh_main_sch_settlement_major_coast',
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_architect',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and faction has 40% trade after 5th turn (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_archivist',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Participate in ambush battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_army_beast_hunter',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_artefact_hunter',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_lzd_worship_oldones'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_astronomer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh2_main_anc_follower_lzd_attendant',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Have ${technology(['wh2_main_tech_lzd_1_6'])} and Rank Up in region (1 turn own), which has ${chain_or_superchain([
				'wh2_main_sch_military2_stables',
				'wh2_main_sch_military1_barracks'
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_cleaner',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Complete battle and character has won 20 battles`
		}],
		ancillaryList: [{
			chance: 7,
			key: 'wh2_main_anc_follower_lzd_clerk',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own), which has ${chain_or_superchain(['wh2_main_sch_defence_major_lzd'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_defence_expert',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Complete battle and character has won 4 battles`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_lzd_fan_waver',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own), which has ${chain_or_superchain(['wh2_main_sch_defence_major_lzd'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_gardener',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			bug: BugsWH3.wh_main_sch_settlement_major,
			hasRegion,
			turnOwnRegion,
			text: () => `Have ${technology(['wh2_main_tech_lzd_4_6'])} and Rank Up in region (1 turn own) with ${chain_or_superchain([
				'wh_main_sch_settlement_major',
				'wh_main_sch_settlement_major_coast',
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_metallurgist',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia', 'wh3_main_ksl_kislev', 'wh3_main_cth_cathay'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 50,
			key: 'wh2_main_anc_follower_lzd_sacrificial_victim_human',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh2_main_skv_skaven'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 11,
			key: 'wh2_main_anc_follower_lzd_sacrificial_victim_skv',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_lzd_worship_sotek'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_temple_cleaner',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (2 turn own), which has ${chain_or_superchain(['wh2_main_sch_defence_minor'])}`
		}],
		ancillaryList: [{
			chance: 1,
			key: 'wh2_main_anc_follower_lzd_veteran_warrior',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion: false,
			text: () => `Rank Up (4 turn enemy)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_zoat',
		}]
	},
	// #endregion
	// #region Skaven
	{
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_artefact_hunter',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_skv_order'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_bell_polisher',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Fail an action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh2_main_anc_follower_skv_bodyguard',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 1,
			key: 'wh2_main_anc_follower_skv_chemist',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Perform (critical) successful action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_clerk',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win siege battle`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_skv_engineering_student',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_skv_farm'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_female',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Have ${technology(['wh2_main_tech_skv_4_1'])} and win battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_hell_pit_attendant',
		}]
	}, {
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			allowed: { agent: ['engineer'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_skv_mechanic',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 1,
			key: 'wh2_main_anc_follower_skv_messenger',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_skv_pet_wolf_rat',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_skv_saboteur',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_dwf_dwarfs'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 11,
			key: 'wh2_main_anc_follower_skv_sacrificial_victim_dwarf',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh2_main_lzd_lizardmen'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 11,
			key: 'wh2_main_anc_follower_skv_sacrificial_victim_lizardman',
		}]
	}, {
		event: Events.CharacterGarrisonTargetAction,
		condition: [{
			text: () => `Perform (critical) successfull action against garrison`
		}],
		ancillaryList: [{
			chance: 9,
			key: 'wh2_main_anc_follower_skv_scavenger_1',
		}]
	}, {
		event: Events.CharacterLootedSettlement,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Loot settlement and have more than 10 units in your army`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh2_main_anc_follower_skv_scribe',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia', 'wh3_main_ksl_kislev', 'wh3_main_cth_cathay'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 33,
			key: 'wh2_main_anc_follower_skv_slave_human',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			against: { culture: ['wh2_main_hef_high_elves'] },
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 33,
			key: 'wh2_main_anc_follower_skv_slave_skv',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain([
				'wh2_main_skv_assassins',
				'wh2_main_skv_assassins_eshin'
			])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_trainee_assassin',
		}]
	},
	// #endregion
	// #region Warriors of Chaos
	{
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Declare war this turn and Rank Up and character has won 4 offensive battles`
		}],
		ancillaryList: [{
			chance: 18,
			key: 'wh_dlc01_anc_follower_chaos_barbarian',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasArmy,
			text: () => `Rank Up, while ${unit(['wh_main_chs_mon_chaos_warhounds_0'])} is in the army`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_beast_tamer',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_collector',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region with [[nowr]]corruption < 10 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_dlc01_anc_follower_chaos_cultist',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh_dlc01_anc_follower_chaos_darksoul',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have less than 3000 in treasury`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_dlc01_anc_follower_chaos_demagogue',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_huscarl',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_kurgan_chieftain',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and character has won 6 offensive battles`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_magister',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Lose/draw battle`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh_dlc01_anc_follower_chaos_mutant',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion: 'sea',
			text: () => `Rank Up on sea`
		}],
		ancillaryList: [{
			chance: 12,
			key: 'wh_dlc01_anc_follower_chaos_oar_slave',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Have ${technology(['wh_main_tech_chs_main_3'])} and Rank Up and character participated in 4 battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc01_anc_follower_chaos_possessed',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Declare war this turn and sack settlement`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_dlc01_anc_follower_chaos_slave_master',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region with [[nowr]]corruption < 10 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_dlc01_anc_follower_chaos_zealot',
		}]
	},
	// #endregion
	// #region Beastmen
	{
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			allowed: { agent: ['wizard'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_dlc03_anc_follower_beastmen_bray_shamans_familiar',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Lose/draw battle, while ${unit([
				'wh_dlc03_bst_inf_chaos_warhounds_0',
				'wh_dlc03_bst_inf_chaos_warhounds_1',
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 35,
			key: 'wh_dlc03_anc_follower_beastmen_chieftains_pet',
		}]
	}, {
		event: Events.CharacterRazedSettlement,
		condition: [{
			prevent,
			text: () => `Raze settlement`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc03_anc_follower_beastmen_doe',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Declare war this turn and Rank Up and character has won 4 offensive battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc03_anc_follower_beastmen_flayer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up before 11th level`
		}],
		ancillaryList: [{
			chance: 2,
			key: 'wh_dlc03_anc_follower_beastmen_flying_spy',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region with [[nowr]]corruption < 10 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_dlc03_anc_follower_beastmen_herdstone_keeper',
		}]
	}, {
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia', 'wh3_main_ksl_kislev', 'wh3_main_cth_cathay'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_dlc03_anc_follower_beastmen_mannish_thrall',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 4,
			key: 'wh_dlc03_anc_follower_beastmen_pox_carrier',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Rank Up and have an ability to recruit ${unit(['wh_dlc03_bst_mon_chaos_spawn_0'])}`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_dlc03_anc_follower_beastmen_spawn_wrangler',
		}]
	}, {
		event: Events.CharacterRazedSettlement,
		condition: [{
			prevent,
			text: () => `Raze settlement and your character has won 6 battles\n(faction unique in lua)`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_dlc03_anc_follower_beastmen_ungor_whelp',
		}]
	},
	// #endregion
	// #region Wood Elves
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc05_anc_follower_dryad_spy',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up after 21th level`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc05_anc_follower_elder_scout',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up after 21th level`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc05_anc_follower_eternal_guard_commander',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_dlc05_anc_follower_forest_spirit',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up before 11th level`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc05_anc_follower_hawk_companion',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up before 11th level`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc05_anc_follower_hunting_hound',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc05_anc_follower_royal_standard_bearer',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc05_anc_follower_vauls_anvil_smith',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc05_anc_follower_wardancer_drummer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up before 11th level`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc05_anc_follower_young_stag',
		}]
	},
	// #endregion
	// #region Norsca
	{
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('kill')}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_baernsonlings_berserker',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Rank Up and have an ability to recruit ${unit([
				'wh_dlc08_nor_mon_skinwolves_0',
				'wh_dlc08_nor_mon_skinwolves_1',
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_baernsonlings_werekin',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc08_anc_follower_beserker',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_cathy_slave_dancers',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Rank Up, while in raiding stance`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_dlc08_anc_follower_dragonbone_raiders',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			against: { culture: ['wh_main_emp_empire'] },
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_kurgan_slave_merchant',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc08_anc_follower_mammoth',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Declare war this turn and Rank Up and character has won 4 offensive battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_marauder_champion',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up before 11th level`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc08_anc_follower_mountain_scout',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['wizard'] },
			text: () => `Rank Up outside of army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_seer',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			against: { culture: ['wh_main_emp_empire'] },
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_skaeling_trader',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_slave_worker',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Rank Up and have an ability to recruit ${unit([
				'wh_dlc08_nor_mon_war_mammoth_0',
				'wh_dlc08_nor_mon_war_mammoth_1',
				'wh_dlc08_nor_mon_war_mammoth_2',
				'wh_main_nor_mon_chaos_warhounds_0',
				'wh_main_nor_mon_chaos_warhounds_1',
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_vargs_beast_trainer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion: 'sea',
			text: () => `Rank Up on sea`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_whalers',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_main_anc_follower_norsca_berserker',
		}]
	},
	// #endregion
	// #region Humans/Generic
	{
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			allowed: { agent: ['wizard'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_all_hedge_wizard',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_bailiff',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in ${region(['wh3_main_combi_region_marienburg', 'wh3_main_chaos_region_marienburg'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_all_men_boatman',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Fail an action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_all_men_bodyguard',
		}]
	}, {
		event: Events.CharacterLootedSettlement,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Loot settlement and have less than 10 units in your army`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_bounty_hunter',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in ${region(['wh3_main_combi_region_marienburg', 'wh3_main_chaos_region_marienburg'])}`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_fisherman',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.pb_against_culture,
			onlyMainLord,
			allowed: { agent: ['general'] },
			against: { culture: ['wh_main_vmp_vampire_counts'] },
			text: () => `Lose/draw battle as attacker`
		}, {
			bug: BugsWH3.pb_against_culture,
			onlyMainLord,
			against: { culture: ['wh_main_vmp_vampire_counts'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_all_men_grave_robber',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which belongs to ${culture(['wh_main_vmp_vampire_counts'], true)}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_all_men_initiate',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which belongs to ${culture(['wh3_main_ksl_kislev'], true)} after 1st turn`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_all_men_kislevite_kossar',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Lose/draw battle`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_mercenary',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia', 'wh3_main_ksl_kislev', 'wh3_main_cth_cathay'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_all_men_militiaman',
		}]
	}, {
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('kill')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_all_men_ogres_pit_fighter',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Rank Up, while in raiding stance`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_outlaw',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Declare war this turn and Rank Up and character has won 4 offensive battles`
		}],
		ancillaryList: [{
			chance: 14,
			key: 'wh_main_anc_follower_all_men_outrider',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Lose/draw battle`
		}],
		ancillaryList: [{
			chance: 4,
			key: 'wh_main_anc_follower_all_men_protagonist',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			onlyPlayer,
			text: () => `Perform (critical) successfull action against another character other than “Assist Army” (every 2nd turn (even))`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_rogue',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up after 21th level`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_all_men_servant',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			canEquip: true,
			text: () => `Rank Up and faction has 40% trade after 5th turn (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 7,
			key: 'wh_main_anc_follower_all_men_smuggler',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Lose/draw battle`
		}],
		ancillaryList: [{
			chance: 2,
			key: 'wh_main_anc_follower_all_men_soldier',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			onlyPlayer,
			text: () => `Perform (critical) successfull action against another character other than “Assist Army” (every 2nd+1 turn (odd))`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_thug',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up before 11th level`
		}],
		ancillaryList: [{
			chance: 1,
			key: 'wh_main_anc_follower_all_men_tollkeeper',
		}]
	}, {
		event: Events.CharacterLootedSettlement,
		condition: [{
			against: { culture: ['wh_main_vmp_vampire_counts'] },
			text: () => `Loot settlement`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_all_men_tomb_robber',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up after 21th level`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_all_men_vagabond',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and character has won 6 offensive battles`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_all_men_valet',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which belongs to ${culture(['wh_main_vmp_vampire_counts'], true)}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_all_men_zealot',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up on the same turn when you finished researching some technology after 1st turn`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_all_student',
		}]
	},
	// #endregion
	// #region Bretonnia
	{
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region with [[nowr]]corruption > 30 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_bretonnia_court_jester',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia', 'wh3_main_ksl_kislev', 'wh3_main_cth_cathay'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_bretonnia_squire',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up on the same turn when you finished researching some technology after 1st turn`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_archivist',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and have in/out tradable resource “Dwarf Beer”`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_main_anc_follower_dwarfs_brewmaster',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Fail an action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_dwarfs_candle_maker',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 12,
			key: 'wh_main_anc_follower_dwarfs_choir_master',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have less than 3000 in treasury`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_cooper',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Have ${technology(['wh_main_tech_dwf_civ_6_4'])} and Rank Up and character participated in 4 battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_daughter_of_valaya',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and character has won 6 offensive battles`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_dwarfs_dwarf_bride',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region with [[nowr]]corruption > 30 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_dwarfen_tattooist',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which has ${building_exists([
				'wh_main_dwf_resource_gold_1',
				'wh_main_dwf_resource_gold_2',
				'wh_main_dwf_resource_gold_3',
				'wh_main_dwf_resource_gold_4'
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_goldsmith',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.pb_against_culture,
			onlyMainLord,
			allowed: { agent: ['general'] },
			against: { culture: ['wh_main_grn_greenskins'] },
			text: () => `Lose/draw battle as attacker`
		}, {
			bug: BugsWH3.pb_against_culture,
			onlyMainLord,
			against: { culture: ['wh_main_grn_greenskins'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_dwarfs_grudgekeeper',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and faction has 40% trade after 5th turn (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_guildmaster',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which has ${building_exists([
				'wh_main_dwf_resource_gems_1',
				'wh_main_dwf_resource_gems_2',
				'wh_main_dwf_resource_gems_3',
				'wh_main_dwf_resource_gems_4'
			])}`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_dwarfs_jewelsmith',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which has ${building_exists([
				'wh_main_dwf_resource_iron_1',
				'wh_main_dwf_resource_iron_2',
				'wh_main_dwf_resource_iron_3',
				'wh_main_dwf_resource_iron_4'
			])}`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_miner',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Rank Up and have an ability to recruit ${unit(['wh_main_dwf_art_cannon'])}`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_dwarfs_powder_mixer',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_dwarfs_prospector',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia', 'wh3_main_ksl_kislev', 'wh3_main_cth_cathay'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_reckoner',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent_subtype: ['wh_main_dwf_runesmith'] },
			text: () => `Rank Up outside of army`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_dwarfs_runebearer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up and have an ability to recruit ${agent(['runesmith'], true)} in region`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_dwarfs_runesmith_apprentice',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win siege battle`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_dwarfs_sapper',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Rank Up, while in tunneling stance`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_dwarfs_shieldbreaker',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion: 'sea',
			text: () => `Rank Up on sea`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_shipwright',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasArmy,
			text: () => `Rank Up, while ${unit(['wh_main_dwf_inf_slayers'])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_slayer_ward',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and have in/out tradable resource “Marble”`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_stonemason',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_teller_of_tales',
		}]
	}, {
		event: Events.CharacterLootedSettlement,
		condition: [{
			text: () => `Loot settlement`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_dwarfs_treasure_hunter',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle, which featured ${unit(['wh_main_grn_mon_trolls'])}`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_dwarfs_troll_slayer',
		}]
	},
	// #endregion
	// #region Empire
	{
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_empire_agitator',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 4,
			key: 'wh_main_anc_follower_empire_apprentice_wizard',
		}]
	}, {
		event: Events.CharacterLootedSettlement,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Loot settlement and have more than 10 units in your army`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh_main_anc_follower_empire_barber_surgeon',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which belongs to ${culture(['wh_main_vmp_vampire_counts'], true)}`
		}],
		ancillaryList: [{
			chance: 7,
			key: 'wh_main_anc_follower_empire_bone_picker',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 12,
			key: 'wh_main_anc_follower_empire_burgher',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh_main_anc_follower_empire_camp_follower',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_empire_charcoal_burner',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and faction has 40% trade after 5th turn (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 7,
			key: 'wh_main_anc_follower_empire_coachman',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have less than 3000 in treasury`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_empire_entertainer',
		}]
	}, {
		event: Events.CharacterTurnEnd,
		condition: [{
			hasRegion,
			prevent,
			text: () => `At the end of turn have more than 75% action points in ${region([
				'wh3_main_combi_region_bilbali',
				'wh3_main_combi_region_magritta',
				'wh3_main_combi_region_tobaro'
			])}`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh_main_anc_follower_empire_estalian_diestro',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and faction has 40% trade after 5th turn (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_empire_ferryman',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_empire_hunter',
		}]
	}, {
		event: Events.CharacterLootedSettlement,
		condition: [{
			against: { culture: ['wh_main_emp_empire'] },
			text: () => `Loot settlement`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_empire_jailer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region with [[nowr]]corruption > 30 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_empire_light_college_acolyte',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in ${region(['wh3_main_combi_region_marienburg'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_empire_marine',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			prevent,
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 4,
			key: 'wh_main_anc_follower_empire_messenger',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (2 turn own) with less than -25 public order and have (12 <= level <= 20)`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_empire_noble',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_empire_peasant',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion: false,
			text: () => `Rank Up (4 turn enemy)`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_empire_rat_catcher',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Participate in ambush battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_empire_road_warden',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion,
			text: () => `Rank Up (4 turn own) and character has won 3 battles`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_empire_scribe',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in ${region(['wh3_main_combi_region_marienburg'])}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_empire_seaman',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Rank Up, while in raiding stance`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_empire_thief',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and faction has 40% trade after 5th turn (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_main_anc_follower_empire_tradesman',
		}]
	}, {
		event: Events.CharacterGarrisonTargetAction,
		condition: [{
			text: () => `Perform (critical) successfull action against garrison`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_empire_watchman',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which has ${building_exists([
				'wh_main_emp_resource_timber_1',
				'wh_main_emp_resource_timber_2',
				'wh_main_emp_resource_timber_3'
			])}`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_empire_woodsman',
		}]
	}, {
		event: Events.CharacterTurnEnd,
		condition: [{
			hasRegion,
			prevent,
			text: () => `At the end of turn have more than 75% action points in ${region(['wh3_main_combi_region_the_moot'])}`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh_main_anc_follower_halfling_fieldwarden',
		}]
	},
	// #endregion
	// #region Greenskins
	{
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Declare war this turn and Rank Up and character has won 4 offensive battles`
		}],
		ancillaryList: [{
			chance: 50,
			key: 'wh_main_anc_follower_greenskins_backstabba',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Rank Up, while in raiding stance`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_bat-winged_loony',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent_subtype: ['wh_main_grn_goblin_great_shaman'] },
			turnOwnRegion,
			text: () => `Rank Up (4 turn own) and character has won 3 battles`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_greenskins_boggart',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_bully',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_dog_boy_scout',
		}]
	}, {
		event: Events.CharacterTurnEnd,
		condition: [{
			hasRegion,
			text: () => `End turn in region, which has ${building_exists([
				'wh_main_special_greenskin_vandalisation_1',
				'wh_main_special_greenskin_vandalisation_2',
				'wh_main_special_greenskin_vandalisation_3',
				'wh_main_special_greenskin_vandalisation_4',
				'wh_main_special_greenskin_vandalisation_5'
			])}`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_dung_collector',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region with [[nowr]]corruption > 30 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_gobbo_ranta',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_idol_carva',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and character has won 6 offensive battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_pit_boss',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasArmy,
			text: () => `Rank Up, while ${unit([
				'wh_main_grn_inf_savage_orcs',
				'wh_main_grn_inf_savage_orc_arrer_boyz',
				'wh_main_grn_cav_savage_orc_boar_boyz',
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_savage_orc_prodda',
		}]
	}, {
		event: Events.CharacterLootedSettlement,
		condition: [{
			text: () => `Loot settlement`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_greenskins_serial_loota',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['wizard'] },
			text: () => `Rank Up outside of army`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_shamans_lacky',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasArmy,
			text: () => `Rank Up, while ${unit([
				'wh_main_grn_inf_night_goblins',
				'wh_main_grn_inf_night_goblin_archers',
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_shroom_gathera',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent_subtype: ['wh_main_grn_night_goblin_shaman'], },
			text: () => `Rank Up`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_shroom_gathera',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement and have negative income`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh_main_anc_follower_greenskins_snotling_scavengers',
		}]
	}, {
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_snotling_scavengers',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Have ${technology(['wh_main_tech_grn_main_4_1'])} and Rank Up and character participated in 4 battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_spider-god_priest',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent_subtype: ['wh_main_grn_goblin_great_shaman'] },
			text: () => `Rank Up`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_greenskins_squig_mascot',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent_subtype: ['wh_main_grn_night_goblin_shaman'], },
			text: () => `Rank Up`
		}],
		ancillaryList: [{
			chance: 4,
			key: 'wh_main_anc_follower_greenskins_squig_mascot',
		}]
	}, {
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh_main_anc_follower_greenskins_swindla',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh_main_anc_follower_greenskins_swindla',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Complete battle, while ${unit(['wh_main_grn_mon_trolls'])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_troll_herder',
		}]
	},
	// #endregion
	// #region Vampire Counts
	{
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_undead_black_cat',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region with [[nowr]]corruption < 10 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_main_anc_follower_undead_carrion',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_main_anc_follower_undead_corpse_thief',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up and have an ability to recruit ${agent(['spy'], true)} in region`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_undead_crone',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_undead_dreg',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_undead_flesh_golem',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Rank Up in army with mercenaries`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_undead_grave_digger',
		}]
	}, {
		event: Events.CharacterLootedSettlement,
		condition: [{
			against: { culture: ['wh_main_emp_empire'] },
			text: () => `Loot settlement`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_undead_manservant',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia', 'wh3_main_ksl_kislev', 'wh3_main_cth_cathay'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_undead_mortal_informer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_undead_poltergeist',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Fail an action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_undead_possessed_mirror',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have less than 3000 in treasury`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_undead_treasurer',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Participate in ambush battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_undead_warlock',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_undead_warp_stone_hunter',
		}]
	},
	// #endregion
	// #region Vampire Coast
	{
		event: Events.CharacterRazedSettlement,
		condition: [{
			allowed: { agent: ['general'] },
			text: () => `Raze settlement`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh2_dlc11_anc_follower_cst_drawn_chef',
		}]
	}, {
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia', 'wh3_main_ksl_kislev', 'wh3_main_cth_cathay'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh2_dlc11_anc_follower_cst_sartosa_navigator',
		}]
	}, {
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia', 'wh3_main_ksl_kislev', 'wh3_main_cth_cathay'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh2_dlc11_anc_follower_cst_shipwright',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up on sea`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_dlc11_anc_follower_cst_siren',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 4,
			key: 'wh2_dlc11_anc_follower_cst_travelling_necromancer',
		}]
	},
	// #endregion
	// #region Dark Elves
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Have ${technology(['wh2_main_tech_def_2_3_3'])} and spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_murder'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_apprentice_assassin',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_beasts'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_beastmaster',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh2_main_anc_follower_def_bodyguard',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_pleasure_cult'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_cultist',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_pleasure_cult'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_daemon_whisperer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Declare war this turn and Rank Up and character has won 4 offensive battles`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh2_main_anc_follower_def_diplomat',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			prevent,
			text: () => `Have ${technology(['wh2_main_tech_def_3_3_3'])} and spend a turn in region with [[nowr]]corruption > 10 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_def_diplomat_slaanesh',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own), which has ${chain_or_superchain(['wh2_main_def_worship'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_def_fanatic',
		}]
	}, {
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('kill')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_def_fimir_balefiend',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh2_main_anc_follower_def_gravedigger',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own), which has ${chain_or_superchain(['wh2_main_def_pleasure_cult'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_def_harem_attendant',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own), which has ${chain_or_superchain(['wh2_main_def_pleasure_cult'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_def_harem_keeper',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Rank Up and faction has 40% trade after 5th turn (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_def_merchant',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_farm'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_musician_choirmaster',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_order'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_musician_drum',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_pleasure_cult'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_musician_flute',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Have ${technology(['wh2_main_tech_def_2_3_0'])} and Rank Up when faction has 40% trade`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh2_main_anc_follower_def_organ_merchant',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Have ${technology(['wh2_main_tech_def_1_2_0'])} and Rank Up when faction has 20% trade and more than 2000 in treasury`
		}],
		ancillaryList: [{
			chance: 7,
			key: 'wh2_main_anc_follower_def_overseer',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_worship'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_propagandist',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Have ${technology(['wh2_main_tech_def_2_2_0'])} and Rank Up after 10th level`
		}],
		ancillaryList: [{
			chance: 50,
			key: 'wh2_main_anc_follower_def_servant',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh2_main_anc_follower_def_slave',
		}]
	}, {
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('kill')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_def_slave_trader',
		}]
	},
	// #endregion
	// #region Khorne
	{
		event: Events.CharacterRazedSettlement,
		condition: [{
			allowed: { agent: ['general'] },
			text: () => `Raze settlement`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh3_main_anc_follower_kho_agent_of_blood',
		}]
	}, {
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('kill')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh3_main_anc_follower_kho_arena_fighter',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_kho_blood_collector',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			allowed: { agent: ['dignitary'] },
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_kho_cult_book_keeper',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and character has won 6 battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_kho_drillmaster',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Rank Up, while in raiding stance`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_kho_fire_starter',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Complete battle, while ${unit([
				'wh3_main_kho_inf_flesh_hounds_of_khorne_0',
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh3_main_anc_follower_kho_flesh_hound_handler',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion: false,
			text: () => `Rank Up (1 turn enemy)`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh3_main_anc_follower_kho_khornate_familiar',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Complete battle, with reinforcing army of ${culture(['wh3_main_kho_khorne'])}`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_kho_khornate_mutant',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			prevent,
			text: () => `Rank Up in region with [[nowr]]${corruption('wh3_main_corruption_khorne')} < 2[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_kho_khornate_zealot',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_dlc08_nor_norsca'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_kho_norscan_marauder',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Complete battle, with reinforcing army of ${culture(['wh_dlc08_nor_norsca'])}`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_kho_norscan_sage',
		}]
	}, {
		event: Events.GarrisonOccupiedEvent, // TODO
		condition: [{
			text: () => `Occupy settlement`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh3_main_anc_follower_kho_slaughterman',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which belongs to your military ally`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_kho_stoker_of_fires',
		}]
	},
	// #endregion
	// #region Slaanesh
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			text: () => `Win battle as defender`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh3_main_anc_follower_sla_agent_of_temptation',
		}]
	}, {
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('release')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh3_main_anc_follower_sla_card_shark',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh3_main_anc_follower_sla_courtesan',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			allowed: { agent: ['dignitary'] },
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_sla_cult_neophyte',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh3_main_anc_follower_sla_cult_treasurer',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia', 'wh3_main_ksl_kislev', 'wh3_main_cth_cathay'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_sla_dominatrix',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh3_main_dae_daemons', 'wh3_main_kho_khorne', 'wh3_main_nur_nurgle', 'wh3_main_sla_slaanesh', 'wh3_main_tze_tzeentch'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_sla_enticer',
		}]
	}, {
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('enslave_slaves_only')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh3_main_anc_follower_sla_epicurean',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than 10 provincial growth per turn`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_sla_gourmand',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh3_main_anc_follower_sla_master_musician',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Win battle, while ${unit([
				'wh3_main_sla_inf_marauders_0',
				'wh3_main_sla_inf_marauders_1',
				'wh3_main_sla_inf_marauders_2'
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_sla_master_painter',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_sla_master_poet',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which belongs to your military ally`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_sla_paramour',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion: false,
			text: () => `Rank Up (1 turn enemy)`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh3_main_anc_follower_sla_slaaneshi_familiar',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Complete battle, with reinforcing army of ${culture(['wh3_main_sla_slaanesh'])}`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_sla_slaaneshi_mutant',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region with [[nowr]]${corruption('wh3_main_corruption_slaanesh')} < 2[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_sla_slaaneshi_zealot',
		}]
	},
	// #endregion
	// #region Nurgle
	{
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			allowed: { agent: ['spy'] },
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_nur_agent_of_decay',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which belongs to your military ally`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_nur_agitator',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Win battle and have more than 7 units of ${unit(['wh3_main_nur_inf_nurglings_0'], true)}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_nur_bruntos_bowelpurge',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: {
				value: false,
				description: `Will check in forces of defenders, only if character is Main Attacker,
otherwise will check in forces of attackers`
			},
			text: () => `Win battle, which featured ${unit([
				'wh3_main_nur_inf_plaguebearers_0',
				'wh3_main_nur_inf_plaguebearers_1'
			])} in the opposing force`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh3_main_anc_follower_nur_comptroller',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			allowed: { agent: ['dignitary'] },
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_nur_dark_apothecary',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than 10 provincial growth per turn`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_nur_entomologist',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Win battle, while ${unit([
				'wh3_main_nur_inf_plaguebearers_0',
				'wh3_main_nur_inf_plaguebearers_1'
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_nur_leper_lord',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion: false,
			text: () => `Rank Up (1 turn enemy)`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh3_main_anc_follower_nur_nurglish_familiar',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			text: () => `Win battle as defender`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh3_main_anc_follower_nur_nurglish_jester',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Complete battle, with reinforcing army of ${culture(['wh3_main_nur_nurgle'])}`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_nur_nurglish_mutant',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			prevent,
			text: () => `Rank Up in region with [[nowr]]${corruption('wh3_main_corruption_nurgle')} < 2[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_nur_nurglish_zealot',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia', 'wh3_main_ksl_kislev', 'wh3_main_cth_cathay'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_nur_plague_doctor',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh3_main_anc_follower_nur_plagueship_captain',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Win battle when army will suffer attrition and faction has home region`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_nur_poisoner',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh3_main_nur_nurgle'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_nur_preacher_of_decay',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh3_main_anc_follower_nur_sceptic',
		}]
	},
	// #endregion
	// #region Tzeentch
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win normal land battle`
		}],
		ancillaryList: [{
			chance: 4,
			key: 'wh3_main_anc_follower_tze_agent_of_change',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh3_main_anc_follower_tze_alchemist',
		}]
	}, {
		event: Events.CharacterSackedSettlement,
		condition: [{
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_tze_conspiracy_theorist',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			allowed: { agent: ['dignitary'] },
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_tze_cult_scribe',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than 10 provincial growth per turn`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_tze_masked_dilettante',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: { culture: ['wh3_main_dae_daemons', 'wh3_main_kho_khorne', 'wh3_main_nur_nurgle', 'wh3_main_sla_slaanesh', 'wh3_main_tze_tzeentch'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_tze_mythomaniac',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh3_main_anc_follower_tze_player_of_games',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win ambush battle`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_tze_schemer',
		}]
	}, {
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('kill')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh3_main_anc_follower_tze_sorcerers_apprentice',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasRegion,
			text: () => `Win battle in region, which belongs to your military ally`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_tze_treacher',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			text: () => `Win battle as defender`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh3_main_anc_follower_tze_trickster',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion: false,
			text: () => `Rank Up (1 turn enemy)`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh3_main_anc_follower_tze_tzeentchian_familiar',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Complete battle, with reinforcing army of ${culture(['wh3_main_tze_tzeentch'])}`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_tze_tzeentchian_mutant',
		}]
	}, {
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('release')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh3_main_anc_follower_tze_tzeentchian_philosopher',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			prevent,
			text: () => `Rank Up in region with [[nowr]]${corruption('wh3_main_corruption_tzeentch')} < 2[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_tze_tzeentchian_zealot',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which belongs to your military ally`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_tze_weaver',
		}]
	},
	// #endregion
	// #region Kislev
	{
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion: false,
			text: () => `Rank Up (1 turn enemy)`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh3_main_anc_follower_ksl_akshina_informant',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh3_main_anc_follower_ksl_atamans_administrator',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Win battle, while ${unit([
				'wh3_main_ksl_inf_tzar_guard_0',
				'wh3_main_ksl_inf_tzar_guard_1'
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_ksl_knights_squire',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			text: () => `Win battle as defender`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh3_main_anc_follower_ksl_knights_ward',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which belongs to your military ally`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_ksl_kvas_deye',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			// TODO unit_category
			hasArmy,
			text: () => `Win battle and have 4 units of type “Cavalry” or “War Beasts” (counted separately) in the army`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_ksl_nomad_riding_master',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			allowed: { agent: ['wizard'] },
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_ksl_old_crone',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			allowed: { agent: ['dignitary'] },
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_ksl_orthodoxy_cleric',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_culture,
			against: {
				culture: [
					'wh_main_chs_chaos',
					'wh_dlc08_nor_norsca',
					'wh_dlc03_bst_beastmen',
					'wh3_main_dae_daemons',
					'wh3_main_kho_khorne',
					'wh3_main_nur_nurgle',
					'wh3_main_sla_slaanesh',
					'wh3_main_tze_tzeentch',
				]
			},
			prevent,
			text: async () => `Win battle, and your faction must have ${await resource(['wh3_main_ksl_devotion'])}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh3_main_anc_follower_ksl_priest_of_taal',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			against: {
				culture: [
					'wh_main_chs_chaos',
					'wh_dlc08_nor_norsca',
					'wh_dlc03_bst_beastmen',
					'wh3_main_dae_daemons',
					'wh3_main_kho_khorne',
					'wh3_main_nur_nurgle',
					'wh3_main_sla_slaanesh',
					'wh3_main_tze_tzeentch',
				]
			},
			prevent,
			text: async () => `Perform (critical) successfull action against another character other than “Assist Army”, and your faction must have ${await resource(['wh3_main_ksl_devotion'])}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh3_main_anc_follower_ksl_priest_of_ursun',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			prevent,
			text: () => `Rank Up in region with [[nowr]]corruption > 15 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh3_main_anc_follower_ksl_ritual_enforcer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than 10 provincial growth per turn`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_ksl_steppe_shepherd',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh3_main_anc_follower_ksl_tax_collector',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			// TODO unit_category
			hasArmy,
			text: () => `Win battle and have 8 units of type “Melee Infantry” or “Ranged Infantry” in the army`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh3_main_anc_follower_ksl_veteran_warrior',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh3_main_anc_follower_ksl_vodka_distiller',
		}]
	},
	// #endregion
	// #region Ogres
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Win battle, while ${unit(['wh3_main_ogr_inf_leadbelchers_0'])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_ogr_artificer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than 10 provincial growth per turn`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_ogr_bellower',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh3_main_anc_follower_ogr_brewer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			prevent,
			text: () => `Rank Up in region with [[nowr]]corruption > 15 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh3_main_anc_follower_ogr_campfire_storyteller',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasRegion,
			text: () => `Win battle in mountain region`
		}],
		ancillaryList: [{
			chance: 12,
			key: 'wh3_main_anc_follower_ogr_cave_painter',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Complete battle, with reinforcing army of ${culture(['wh3_main_cth_cathay'])}`
		}],
		ancillaryList: [{
			chance: 50,
			key: 'wh3_main_anc_follower_ogr_eastern_traveller',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than -75 public order`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_ogr_enforcer',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Win battle, while ${unit([
				'wh3_main_ogr_inf_gnoblars_0',
				'wh3_main_ogr_inf_gnoblars_1',
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_ogr_gnoblar_chief',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Win battle when army will suffer attrition and faction has home region`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_ogr_gnoblar_inventor',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh3_main_anc_follower_ogr_gnoblar_treasurer',
		}]
	}, {
		event: Events.CharacterPostBattleCaptureOption,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('kill')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh3_main_anc_follower_ogr_halfling_cook',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and character has won 6 battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_ogr_pit_fighter',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which belongs to your military ally`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_ogr_ransom_negotiator',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Win battle, while ${unit([
				'wh3_main_ogr_cav_crushers_0',
				'wh3_main_ogr_cav_crushers_1',
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_ogr_rhinoxen_handler',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_unit,
			text: () => `Win battle, which featured ${unit([
				'wh_dlc06_grn_mon_spider_hatchlings_0_summoned',
				'wh_dlc06_grn_mon_spider_hatchlings_0',
				'wh_dlc08_grn_mon_arachnarok_spider_boss',
				'wh_main_grn_cav_forest_goblin_spider_riders_0',
				'wh_main_grn_cav_forest_goblin_spider_riders_1',
				'wh_main_grn_mon_arachnarok_spider_0',
			])} in the opposing force`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh3_main_anc_follower_ogr_spider_hunter',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh3_main_anc_follower_ogr_yhetee_wrangler',
		}]
	},
	// #endregion
	// #region Cathay
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			text: () => `Win battle as defender`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh3_main_anc_follower_cth_aged_sage',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			allowed: { agent: ['engineer'] },
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_cth_assassins_apprentice',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than 10 provincial growth per turn`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh3_main_anc_follower_cth_city_administrator',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			prevent,
			text: () => `Rank Up in region with [[nowr]]corruption > 15 (total)[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh3_main_anc_follower_cth_fu_hung_monk',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Win battle and have 4 units of type “Cavalry” in the army`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_cth_horse_husband',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh3_main_anc_follower_cth_jade_lion_whisperer',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH3.character_won_battle_against_unit,
			text: () => `Win battle, which featured ${unit([
				'wh3_main_cth_inf_jade_warriors_0',
				'wh3_main_cth_inf_jade_warriors_1',
			])} in the opposing force`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh3_main_anc_follower_cth_jade_sculptor',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Complete battle, with reinforcing army of ${culture(['wh_main_emp_empire'])}`
		}],
		ancillaryList: [{
			chance: 50,
			key: 'wh3_main_anc_follower_cth_mercantilist',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in region, which belongs to your military ally`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_cth_messenger',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			text: () => `Win battle as attacker against ${agent_subtype(['wh3_main_ogr_tyrant_camp'], true)}`
		}],
		ancillaryList: [{
			chance: 50,
			key: 'wh3_main_anc_follower_cth_ogre_mercenary',
		}]
	}, {
		event: Events.CharacterGarrisonTargetAction,
		condition: [{
			text: () => `Perform (critical) successfull action against garrison`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_cth_scrivener',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Win battle, while ${unit(['wh3_main_cth_mon_terracotta_sentinel_0'])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_cth_sentinel_technician',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { agent: ['general'] },
			hasArmy,
			text: () => `Win battle when army will suffer attrition and faction has home region`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh3_main_anc_follower_cth_silk_weaver',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			hasArmy,
			text: () => `Win battle, while ${unit([
				'wh3_main_cth_inf_jade_warriors_0',
				'wh3_main_cth_inf_jade_warriors_1',
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_cth_sword_master',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh3_main_anc_follower_cth_tax_collector',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			text: () => `Rank Up in own region with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh3_main_anc_follower_cth_tea_master',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			text: () => `Win battle and character has won 6 battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh3_main_anc_follower_cth_water_snake_breeder',
		}]
	},
	// #endregion
];
data.forEach(trigger => {
	trigger.condition.forEach(condition => {
		if (typeof condition.forbid === 'undefined') {
			condition.forbid = {};
		}
		if (typeof condition.forbid.agent === 'undefined') {
			condition.forbid.agent = [];
		}
		if (!condition.forbid.agent.includes('colonel')) {
			condition.forbid.agent.push('colonel');
		}
		if (typeof condition.forbid.agent_subtype === 'undefined') {
			condition.forbid.agent_subtype = [];
		}
		if (!condition.forbid.agent_subtype.includes('wh_dlc07_brt_green_knight')) {
			condition.forbid.agent_subtype.push('wh_dlc07_brt_green_knight');
		}
		if (!condition.forbid.agent_subtype.includes('wh2_dlc10_hef_shadow_walker')) {
			condition.forbid.agent_subtype.push('wh2_dlc10_hef_shadow_walker');
		}
	});
});