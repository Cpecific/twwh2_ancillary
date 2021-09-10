import { ITrigger, Events } from './data-types';
import { building_exists, chain_or_superchain, region, technology, unit, agent, post_battle_captive_option } from './build-data';

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

// Used
Events.CharacterCharacterTargetAction;
Events.CharacterCompletedBattle;
Events.CharacterGarrisonTargetAction;
Events.CharacterLootedSettlement;
Events.CharacterPostBattleRelease;
Events.CharacterPostBattleSlaughter;
Events.CharacterRankUp;
Events.CharacterRazedSettlement;
Events.CharacterSackedSettlement;
Events.CharacterTurnEnd;
Events.CharacterTurnStart;
Events.HeroCharacterParticipatedInBattle;

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
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			prevent,
			text: () => `Rank Up in mountain region`
		}],
		ancillaryList: [{
			chance: 35,
			key: 'wh2_dlc09_anc_follower_tmb_charnel_valley_necrotect',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			prevent,
			text: () => `Rank Up in region with untainted < 70%`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_dlc09_anc_follower_tmb_cultist_of_usirian',
		}]
	},
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			allowed: { agent: ['general'] },
			against: { culture: ['wh2_dlc09_tmb_tomb_kings'] },
			text: () => `Lose/draw battle as attacker`
		}, {
			onlyMainLord,
			against: { culture: ['wh2_dlc09_tmb_tomb_kings'] },
			prevent,
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh2_dlc09_anc_follower_tmb_dog_headed_ushabti',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			allowed: { agent: ['general'] },
			turnOwnRegion,
			prevent,
			text: () => `Spend a turn in own region with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh2_dlc09_anc_follower_tmb_high_born_of_khemri',
		}]
	},
	{
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			prevent,
			text: () => `Fail an agent action against another character`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh2_dlc09_anc_follower_tmb_legionnaire_of_asaph',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			prevent,
			text: () => `Rank Up in region, belonging to Vampires`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh2_dlc09_anc_follower_tmb_priest_of_ptra',
		}]
	},
	{
		event: Events.CharacterSackedSettlement,
		condition: [{
			allowed: { agent: ['general'] },
			prevent,
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_dlc09_anc_follower_tmb_skeletal_labourer',
		}]
	},
	{
		event: Events.CharacterPostBattleRelease,
		condition: [{
			allowed: { agent: ['general'] },
			prevent,
			// Release (Ransom) Captives
			text: () => `Post Battle: ${post_battle_captive_option('release')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_dlc09_anc_follower_tmb_tombfleet_taskmaster',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			// but maybe will not return false for general? what returns general:is_embedded_in_military_force() ??
			bug: `in function char_army_has_unit, if second parameter is table, function will always return false`,
			prevent,
			text: () => `Rank Up while ${unit(['wh2_dlc09_tmb_mon_ushabti_0', 'wh2_dlc09_tmb_mon_ushabti_1'])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_dlc09_anc_follower_tmb_ushabti_bodyguard',
		}]
	},
	// #endregion
	// #region Other
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			unique,
			text: () => `Rank Up in ${region(['wh2_main_gnoblar_country_pigbarter'])}`
		}],
		ancillaryList: [{
			chance: 100,
			key: 'wh2_dlc15_anc_follower_mandelour',
		}]
	},
	// #endregion
	// #region Dark Elves
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Have ${technology(['tech_def_2_3_3'])} and {normal} spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_murder'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_apprentice_assassin',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_beasts'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_beastmaster',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_pleasure_cult'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_cultist',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_pleasure_cult'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_daemon_whisperer',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			prevent,
			text: () => `Have ${technology(['tech_def_3_3_3'])} and {normal} spend a turn in region with chaos > 40%`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_def_diplomat_slaanesh',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own), which has ${chain_or_superchain(['wh2_main_def_worship'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_def_fanatic',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own), which has ${chain_or_superchain(['wh2_main_def_pleasure_cult'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_def_harem_attendant',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own), which has ${chain_or_superchain(['wh2_main_def_pleasure_cult'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_def_harem_keeper',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_farm'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_musician_choirmaster',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_order'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_musician_drum',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_pleasure_cult'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_musician_flute',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Have ${technology(['tech_def_2_3_0'])} and Rank Up when faction has 40% trade`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh2_main_anc_follower_def_organ_merchant',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Have ${technology(['tech_def_1_2_0'])} and Rank Up when faction has 20% trade and more than 2000 treasury`
		}],
		ancillaryList: [{
			chance: 7,
			key: 'wh2_main_anc_follower_def_overseer',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_worship'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_def_propagandist',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Have ${technology(['tech_def_2_2_0'])} and {} Rank Up after 10th level`
		}],
		ancillaryList: [{
			chance: 50,
			key: 'wh2_main_anc_follower_def_servant',
		}]
	},
	// #endregion
	// #region High Elves
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_port'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_admiral',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_court'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_counsellor',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_order'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_minstrel',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_mages'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_poisoner',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_mages'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_trappist',
		}]
	},
	// #endregion
	// #region Lizardmen
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Complete battle and character has won 20 battles`
		}],
		ancillaryList: [{
			chance: 7,
			key: 'wh2_main_anc_follower_lzd_clerk',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion,
			// text: () => `Have ${technology(['tech_lzd_4_4'])} and Rank Up in region (1 turn own), with major settlement`
			text: () => `Have ${technology(['tech_lzd_4_4'])} and Rank Up (1 turn own) in region with ${chain_or_superchain([
				'wh_main_sch_settlement_major',
				'wh_main_sch_settlement_major_coast',
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_architect',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			allowed: { pooled_resource: ['wh2_main_ritual_currency'] },
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_lzd_scrying'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_astrologer',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_lzd_worship_oldones'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_astronomer',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion,
			text: () => `Have ${technology(['tech_lzd_1_6'])} and Rank Up in region (1 turn own), which has ${chain_or_superchain(['wh2_main_sch_military2_stables', 'wh2_main_sch_military1_barracks'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_cleaner',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own), which has ${chain_or_superchain(['wh2_main_sch_defence_major_lzd'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_defence_expert',
		}]
	},
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { culture: ['wh2_main_lzd_lizardmen'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Complete battle and character has won 4 battles`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_lzd_fan_waver',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own), which has ${chain_or_superchain(['wh2_main_sch_defence_major_lzd'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_gardener',
		}]
	},
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { pooled_resource: ['wh2_main_ritual_currency'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win a battle`
		}],
		ancillaryList: [{
			chance: 4,
			key: 'wh2_main_anc_follower_lzd_librarian',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion,
			text: () => `Have ${technology(['tech_lzd_4_6'])} and Rank Up (1 turn own) in region with ${chain_or_superchain([
				'wh_main_sch_settlement_major',
				'wh_main_sch_settlement_major_coast',
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_metallurgist',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_lzd_worship_sotek'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_temple_cleaner',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion,
			text: () => `Rank Up in region (2 turn own), which has ${chain_or_superchain(['wh2_main_sch_defence_minor'])}`
		}],
		ancillaryList: [{
			chance: 1,
			key: 'wh2_main_anc_follower_lzd_veteran_warrior',
		}]
	},
	// #endregion
	// #region Skaven
	{
		event: Events.CharacterSackedSettlement,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh2_main_hef_high_elves'] },
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 33,
			key: 'wh2_main_anc_follower_skv_slave_skv',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_skv_order'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_bell_polisher',
		}]
	},
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win a battle`
		}],
		ancillaryList: [{
			chance: 1,
			key: 'wh2_main_anc_follower_skv_chemist',
		}]
	},
	{
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			bug: 'CA wrongly checks “Assist Army”, which always returns false',
			careful,
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Perform successful action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_clerk',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_skv_farm'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_female',
		}]
	},
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Have ${technology(['tech_skv_4_1'])} and win a battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_hell_pit_attendant',
		}]
	},
	{
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			allowed: { agent: ['engineer'] },
			text: () => `Win a battle`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_skv_mechanic',
		}]
	},
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win a battle`
		}],
		ancillaryList: [{
			chance: 1,
			key: 'wh2_main_anc_follower_skv_messenger',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { pooled_resource: ['wh2_main_ritual_currency'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up when faction has 40% trade, after turn 5 (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_skv_sculptor',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_skv_assassins'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_trainee_assassin',
		}]
	},
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_dwf_dwarfs'] },
			text: () => `Win battle as attacker`
		}, {
			onlyMainLord,
			against: { culture: ['wh_main_dwf_dwarfs'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 11,
			key: 'wh2_main_anc_follower_skv_sacrificial_victim_dwarf',
		}, {
			chance: 50,
			key: 'wh2_main_anc_follower_hef_beard_weaver',
		}]
	},
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh2_main_lzd_lizardmen'] },
			text: () => `Win battle as attacker`
		}, {
			onlyMainLord,
			against: { culture: ['wh2_main_lzd_lizardmen'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 11,
			key: 'wh2_main_anc_follower_skv_sacrificial_victim_lizardman',
		}]
	},
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh2_main_skv_skaven'] },
			text: () => `Win battle as attacker`
		}, {
			onlyMainLord,
			against: { culture: ['wh2_main_skv_skaven'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 11,
			key: 'wh2_main_anc_follower_lzd_sacrificial_victim_skv',
		}]
	},
	// #endregion
	// #region High Elves
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_special_everqueen_court'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_priestess_isha',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_dragons'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_dragon_tamer',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_dragons'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_dragon_armourer',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_special_ellyrian_stables'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_horsemaster',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_special_hall_of_dragons'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_priest_vaul',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_special_tower_of_hoeth'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_librarian',
		}]
	},
	{
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_worship'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_shrine_keeper',
		}]
	},
	// #endregion
	// #region Lizardmen
	{
		event: Events.CharacterRankUp,
		condition: [{
			turnOwnRegion,
			text: () => `Rank Up in region (2 turn own), which has ${chain_or_superchain(['wh2_main_sch_support2_worship'])}`
		}],
		ancillaryList: [{
			chance: 1,
			key: 'wh2_main_anc_follower_lzd_acolyte_priest',
		}]
	},
	// #endregion
	// #region Beastmen
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Lose battle while ${unit([
				'wh_dlc03_bst_inf_chaos_warhounds_0',
				'wh_dlc03_bst_inf_chaos_warhounds_1',
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 35,
			key: 'wh_dlc03_anc_follower_beastmen_chieftains_pet',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up and have an ability to recruit ${unit(['wh_dlc03_bst_mon_chaos_spawn_0'])}`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_dlc03_anc_follower_beastmen_spawn_wrangler',
		}]
	},
	{
		event: Events.CharacterRazedSettlement,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			prevent,
			text: () => `Raze settlement`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc03_anc_follower_beastmen_doe',
		}]
	},
	{
		event: Events.CharacterRazedSettlement,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			prevent,
			text: () => `Raze settlement and your character has won 6 battles\n(faction unique in lua)`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_dlc03_anc_follower_beastmen_ungor_whelp',
		}]
	},
	// #endregion
	// #region Coast, Beastmen
	{
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia'] },
			text: () => `Win battle as attacker`
		}, {
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia'] },
			text: () => `Win/draw battle as defender`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh2_dlc11_anc_follower_cst_sartosa_navigator',
		}, {
			chance: 8,
			key: 'wh_dlc03_anc_follower_beastmen_mannish_thrall',
		}, {
			chance: 15,
			key: 'wh2_dlc11_anc_follower_cst_shipwright',
		}]
	},
	// #endregion
	// #region Norsca
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
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
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up and have an ability to recruit ${unit([
				'wh_dlc08_nor_mon_skinwolves_0',
				'wh_dlc08_nor_mon_skinwolves_1',
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_baernsonlings_werekin',
		}]
	},
	// #endregion
	// #region Coast, Norsca
	{
		event: Events.CharacterRazedSettlement,
		condition: [{
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Raze settlement`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc08_anc_follower_baernsonlings_werekin',
		}, {
			chance: 15,
			key: 'wh2_dlc11_anc_follower_cst_drawn_chef',
		}]
	},
	// #endregion
	// #region Beastmen, Chaos, Norsca, Vampire
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in untainted province`// region
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_dlc03_anc_follower_beastmen_herdstone_keeper',
		}, {
			chance: 3,
			key: 'wh_dlc01_anc_follower_chaos_cultist',
		}, {
			chance: 3,
			key: 'wh_dlc01_anc_follower_chaos_zealot',
		}, {
			chance: 3,
			key: 'wh_main_anc_follower_undead_carrion',
		}]
	},
	// #endregion
	// #region Beastmen, Chaos, Dark Elves, Greenskins, High Elves, Norsca, Skaven, Vampires
	{
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			forbid: {
				agent_subtype: ['dlc07_brt_green_knight', 'wh2_dlc10_hef_shadow_walker'],
			},
			text: () => `Perform successfull action against another character`
		}, {
			bug: 'CA wrongly checks “Assist Army”, which always returns false',
			text: () => `Perform critical success action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_dog_boy_scout',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_undead_flesh_golem',
		}, {
			chance: 5,
			key: 'wh2_main_anc_follower_def_organ_merchant',
		}, {
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_huscarl',
		}, {
			chance: 8,
			key: 'wh2_main_anc_follower_def_gravedigger',
		}, {
			chance: 5,
			key: 'wh2_main_anc_follower_hef_assassin',
		}, {
			chance: 10,
			key: 'wh2_main_anc_follower_skv_pet_wolf_rat',
		}]
	},
	// #endregion
	// #region Dwarfs, Empire, Bretonnia, High Elves, Skaven, Vampires
	{
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			bug: 'CA wrongly checks “Assist Army”, which always returns false',
			forbid: {
				agent_subtype: ['dlc07_brt_green_knight', 'wh2_dlc10_hef_shadow_walker'],
			},
			text: () => `Fail an action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_all_men_bodyguard',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_undead_possessed_mirror',
		}, {
			chance: 25,
			key: 'wh2_main_anc_follower_hef_counterspy',
		}, {
			chance: 15,
			key: 'wh2_main_anc_follower_skv_bodyguard',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_dwarfs_candle_maker',
		}]
	},
	// #endregion
	// #region Empire, Bretonnia
	{
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			forbid: {
				agent_subtype: ['dlc07_brt_green_knight', 'wh2_dlc10_hef_shadow_walker'],
			},
			onlyPlayer,
			text: () => `Perform successfull action against another character (every 2nd turn (even))`
		}, {
			bug: 'CA wrongly checks “Assist Army”, which always returns false',
			text: () => `Perform critical success action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_rogue',
		}]
	},
	{
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			forbid: {
				agent_subtype: ['dlc07_brt_green_knight', 'wh2_dlc10_hef_shadow_walker'],
			},
			onlyPlayer,
			text: () => `Perform successfull action against another character (every 2nd+1 turn (odd))`
		}, {
			bug: 'CA wrongly checks “Assist Army”, which always returns false',
			text: () => `Perform critical success action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_thug',
		}]
	},
	// #endregion
	// #region Greenskins
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Complete battle while ${unit(['wh_main_grn_mon_trolls'])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_troll_herder',
		}]
	},
	// #endregion
	// #region Empire, Skaven
	{
		event: Events.CharacterGarrisonTargetAction,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Perform successfull action against garrison`
		}],
		ancillaryList: [{
			chance: 9,
			key: 'wh2_main_anc_follower_skv_scavenger_1',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_empire_watchman',
		}]
	},
	// #endregion
	// #region Empire
	{
		event: Events.CharacterTurnEnd,
		condition: [{
			allowed: { culture: ['wh_main_emp_empire'] },
			forbid: {
				agent: ['colonel'],
				agent_subtype: ['dlc07_brt_green_knight']
			},
			prevent,
			text: () => `At the end of turn have more than 75% action points in ${region([
				'wh_main_estalia_bilbali',
				'wh_main_estalia_magritta',
				'wh_main_estalia_tobaro'
			])}`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh_main_anc_follower_empire_estalian_diestro',
		}]
	},
	{
		event: Events.CharacterTurnEnd,
		condition: [{
			forbid: {
				agent: ['colonel'],
				agent_subtype: ['dlc07_brt_green_knight']
			},
			prevent,
			text: () => `At the end of turn have more than 75% action points in ${region(['wh_main_stirland_the_moot'])}`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh_main_anc_follower_halfling_fieldwarden',
		}]
	},
	// #endregion
	// #region Greenskins, Dwarfs
	{
		event: Events.CharacterLootedSettlement,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Loot settlement`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_dwarfs_treasure_hunter',
		}, {
			chance: 15,
			key: 'wh_main_anc_follower_greenskins_serial_loota',
		}]
	},
	// #endregion
	// #region Empire, Norsca, Vampires
	{
		event: Events.CharacterLootedSettlement,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_emp_empire'] },
			text: () => `Loot settlement`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_skaeling_trader',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_empire_jailer',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_kurgan_slave_merchant',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_undead_manservant',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire
	{
		event: Events.CharacterLootedSettlement,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_vmp_vampire_counts'] },
			text: () => `Loot settlement`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_all_men_tomb_robber',
		}]
	},
	// #endregion
	// #region Empire, Skaven
	{
		event: Events.CharacterLootedSettlement,
		condition: [{
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Loot settlement and have more than 10 units in your army`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh2_main_anc_follower_skv_scribe',
		}, {
			chance: 6,
			key: 'wh_main_anc_follower_empire_barber_surgeon',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire
	{
		event: Events.CharacterLootedSettlement,
		condition: [{
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Loot settlement and have less than 10 units in your army`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_bounty_hunter',
		}]
	},
	// #endregion
	// #region Beastmen, Bretonnia, Chaos, Empire, Norsca
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Lose/draw battle`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh_dlc01_anc_follower_chaos_mutant',
		}, {
			chance: 4,
			key: 'wh_main_anc_follower_all_men_protagonist',
		}, {
			chance: 8,
			key: 'wh_main_anc_follower_all_men_mercenary',
		}, {
			chance: 2,
			key: 'wh_main_anc_follower_all_men_soldier',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire, High Elves, Lizardmen, Vampires, Wood Elves
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Participate in ambush battle`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_army_beast_hunter',
		}, {
			chance: 5,
			key: 'wh_dlc05_anc_follower_dryad_spy',
		}, {
			chance: 25,
			key: 'wh_main_anc_follower_empire_road_warden',
		}, {
			chance: 25,
			key: 'wh2_main_anc_follower_hef_scout',
		}, {
			chance: 25,
			key: 'wh_main_anc_follower_undead_warlock',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire, Dark Elves, High Elves
	{
		event: Events.CharacterPostBattleSlaughter,
		condition: [{
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			// Kill captives
			text: () => `Post Battle: ${post_battle_captive_option('kill')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc05_anc_follower_forest_spirit',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_all_men_ogres_pit_fighter',
		}, {
			chance: 5,
			key: 'wh2_main_anc_follower_hef_raven_keeper',
		}, {
			chance: 5,
			key: 'wh2_main_anc_follower_def_fimir_balefiend',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_baernsonlings_berserker',
		}, {
			chance: 5,
			key: 'wh2_main_anc_follower_def_slave_trader',
		}]
	},
	// #endregion
	// #region Beastmen, Chaos, Coast, Dwarfs, Norsca
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up on sea`
		}],
		ancillaryList: [{
			chance: 12,
			key: 'wh_dlc01_anc_follower_chaos_oar_slave',
		}, {
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_shipwright',
		}, {
			chance: 10,
			key: 'wh2_dlc11_anc_follower_cst_siren',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_whalers',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up and have an ability to recruit ${unit(['wh_main_dwf_art_cannon'])}`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_dwarfs_powder_mixer',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up and have an ability to recruit ${agent(['runesmith'], true)} in region`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_dwarfs_runesmith_apprentice',
		}]
	},
	// #endregion
	// #region Vampires
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up and have an ability to recruit ${agent(['spy'], true)} in region`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_undead_crone',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up and have in/out tradable resource “Dwarf Beer”`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_main_anc_follower_dwarfs_brewmaster',
		}]
	},
	// #endregion
	// #region Greenskins
	{
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent_subtype: ['grn_goblin_great_shaman'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_greenskins_squig_mascot',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent_subtype: ['grn_goblin_great_shaman'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			turnOwnRegion,
			text: () => `Rank Up (4 turns own) and character has won 3 battles`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_greenskins_boggart',
		}]
	},
	// #endregion
	// #region Beastmen, Chaos, Norsca
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up while ${unit(['wh_main_chs_mon_chaos_warhounds_0'])} is in the army`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_beast_tamer',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up while ${unit(['wh_main_dwf_inf_slayers'])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_slayer_ward',
		}]
	},
	// #endregion
	// #region Greenskins
	{
		event: Events.CharacterRankUp,
		// condition: [{
		// 	forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
		// 	text: () => `Rank Up while ${unit(['wh_main_grn_inf_night_goblins'])} is in the army`
		// }, {
		// 	text: () => `Rank Up while ${unit(['wh_main_grn_inf_night_goblin_archers'])} is in the army`
		// }],
		condition: [{
			text: () => `Rank Up while ${unit([
				'wh_main_grn_inf_night_goblins',
				'wh_main_grn_inf_night_goblin_archers',
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_shroom_gathera',
		}]
	},
	{
		event: Events.CharacterRankUp,
		// condition: [{
		// 	forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
		// 	text: () => `Rank Up while ${unit(['wh_main_grn_inf_savage_orcs'])} is in the army`
		// }, {
		// 	text: () => `Rank Up while ${unit(['wh_main_grn_inf_savage_orc_arrer_boyz', 'wh_main_grn_cav_savage_orc_boar_boyz'])} is in the army`
		// }],
		condition: [{
			text: () => `Rank Up while ${unit([
				'wh_main_grn_inf_savage_orcs',
				'wh_main_grn_inf_savage_orc_arrer_boyz',
				'wh_main_grn_cav_savage_orc_boar_boyz',
			])} is in the army`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_savage_orc_prodda',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Have ${technology(['tech_grn_main_4_1'])} and Rank Up and character participated in 4 battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_spider-god_priest',
		}]
	},
	// #endregion
	// #region Beastmen, Chaos, Norsca
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Have ${technology(['tech_chs_main_3'])} and Rank Up and character participated in 4 battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc01_anc_follower_chaos_possessed',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Have ${technology(['tech_dwf_civ_6_4'])} and Rank Up and character participated in 4 battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_daughter_of_valaya',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire, Norsca, Wood Elves
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up after 21th level`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_all_men_vagabond',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_all_men_servant',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_marauder_champion',
		}, {
			chance: 10,
			key: 'wh_dlc05_anc_follower_eternal_guard_commander',
		}, {
			chance: 10,
			key: 'wh_dlc05_anc_follower_elder_scout',
		}]
	},
	// #endregion
	// #region Empire, Dark Elves, Dwarfs, High Elves, Lizardmen
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up and faction has 40% trade after 5th turn (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 7,
			key: 'wh_main_anc_follower_empire_coachman',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_guildmaster',
		}, {
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_archivist',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_empire_ferryman',
		}, {
			chance: 10,
			key: 'wh2_main_anc_follower_hef_wine_merchant',
		}, {
			chance: 10,
			key: 'wh2_main_anc_follower_def_merchant',
		}, {
			chance: 3,
			key: 'wh_main_anc_follower_empire_tradesman',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up and faction has 40% trade after 5th turn (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 7,
			key: 'wh_main_anc_follower_all_men_smuggler',
		}]
	},
	// #endregion
	// #region Empire
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			turnOwnRegion,
			text: () => `Rank Up (4 turn own) and character has won 3 battles`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_empire_scribe',
		}]
	},
	// #endregion
	// #region Empire, Lizardmen
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			turnOwnRegion: false,
			text: () => `Rank Up (4 turn enemy)`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_empire_rat_catcher',
		}, {
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_zoat',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in ${region([
				'wh_main_troll_country_zoishenk',
				'wh_main_troll_country_erengrad',
				'wh_main_northern_oblast_fort_straghov',
				'wh_main_northern_oblast_fort_ostrosk',
				'wh_main_eastern_oblast_praag',
				'wh_main_eastern_oblast_volksgrad',
				'wh_main_southern_oblast_zavastra',
				'wh_main_southern_oblast_kislev',
				'wh_main_southern_oblast_fort_jakova'
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_all_men_kislevite_kossar',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in ${region(['wh_main_the_wasteland_marienburg'])}`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_fisherman',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_empire_seaman',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in ${region(['wh_main_the_wasteland_marienburg'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_empire_marine',
		}, {
			chance: 15,
			key: 'wh_main_anc_follower_all_men_boatman',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in region belonging to Vampires`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_all_men_initiate',
		}, {
			chance: 7,
			key: 'wh_main_anc_follower_empire_bone_picker',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_all_men_zealot',
		}]
	},
	// #endregion
	// #region Bretonnia, Beastmen, Empire, Norsca, Wood Elves
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up before 11th level`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc08_anc_follower_mountain_scout',
		}, {
			chance: 5,
			key: 'wh_dlc05_anc_follower_young_stag',
		}, {
			chance: 1,
			key: 'wh_main_anc_follower_all_men_tollkeeper',
		}, {
			chance: 2,
			key: 'wh_dlc03_anc_follower_beastmen_flying_spy',
		}, {
			chance: 5,
			key: 'wh_dlc05_anc_follower_hawk_companion',
		}]
	},
	// #endregion
	// #region Bretonnia, Dark Elves, Dwarfs, Empire, Greenskins, High Elves, Lizardmen, Skaven, Vampires
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_idol_carva',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_undead_black_cat',
		}, {
			chance: 15,
			key: 'wh_main_anc_follower_undead_poltergeist',
		}, {
			chance: 15,
			key: 'wh2_main_anc_follower_hef_food_taster',
		}, {
			chance: 8,
			key: 'wh_main_anc_follower_all_men_bailiff',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_empire_agitator',
		}, {
			chance: 15,
			key: 'wh2_main_anc_follower_lzd_attendant',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_cathy_slave_dancers',
		}, {
			chance: 12,
			key: 'wh_main_anc_follower_dwarfs_choir_master',
		}, {
			chance: 15,
			key: 'wh2_main_anc_follower_def_bodyguard',
		}, {
			chance: 10,
			key: 'wh2_main_anc_follower_skv_saboteur',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_teller_of_tales',
		}, {
			chance: 12,
			key: 'wh_main_anc_follower_empire_burgher',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up and have in/out tradable resource “Marble”`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_stonemason',
		}]
	},
	// #endregion
	// #region Empire
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			turnOwnRegion,
			text: () => `Rank Up in region (2 turn own) with less than -25 public order and have (12 <= level <= 20)`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_empire_noble',
		}]
	},
	// #endregion
	// #region Greenskins
	{
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent_subtype: ['grn_night_goblin_shaman'], },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_shroom_gathera',
		}, {
			chance: 4,
			key: 'wh_main_anc_follower_greenskins_squig_mascot',
		}]
	},
	// #endregion
	// #region Bretonnia, Chaos, Dwarfs, Empire, Norsca, Vampires
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up while not reasearching anything`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_all_student',
		}, {
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_archivist',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire, Greenskins, Norsca
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in army while raiding`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_bat-winged_loony',
		}, {
			chance: 20,
			key: 'wh_dlc08_anc_follower_dragonbone_raiders',
		}, {
			chance: 8,
			key: 'wh_main_anc_follower_all_men_outlaw',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_empire_thief',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in region, which has ${building_exists(['wh_main_dwf_resource_gems_1', 'wh_main_dwf_resource_gems_2', 'wh_main_dwf_resource_gems_3', 'wh_main_dwf_resource_gems_4'])}`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_dwarfs_jewelsmith',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in region, which has ${building_exists(['wh_main_dwf_resource_gold_1', 'wh_main_dwf_resource_gold_2', 'wh_main_dwf_resource_gold_3', 'wh_main_dwf_resource_gold_4'])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_goldsmith',
		}]
	},
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in region, which has ${building_exists(['wh_main_dwf_resource_iron_1', 'wh_main_dwf_resource_iron_2', 'wh_main_dwf_resource_iron_3', 'wh_main_dwf_resource_iron_4'])}`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_miner',
		}]
	},
	// #endregion
	// #region Empire
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in region, which has ${building_exists(['wh_main_emp_resource_timber_1', 'wh_main_emp_resource_timber_2', 'wh_main_emp_resource_timber_3'])}`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_empire_woodsman',
		}]
	},
	// #endregion
	// #region Bretonia, Empire, Dwarfs, Greenskins
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in region with untainted < 70%`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_bretonnia_court_jester',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_gobbo_ranta',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_dwarfen_tattooist',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_empire_light_college_acolyte',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent_subtype: ['dwf_runesmith'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up outside of army`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_dwarfs_runebearer',
		}]
	},
	// #endregion
	// #region Beastmen, Bretonnia, Chaos, Dark Elves, Empire, Greenskins, Norsca
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Declare war this turn and Rank Up and character has won 4 offensive battles`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc03_anc_follower_beastmen_flayer',
		}, {
			chance: 8,
			key: 'wh2_main_anc_follower_def_diplomat',
		}, {
			chance: 18,
			key: 'wh_dlc01_anc_follower_chaos_barbarian',
		}, {
			chance: 50,
			key: 'wh_main_anc_follower_greenskins_backstabba',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_marauder_champion',
		}, {
			chance: 14,
			key: 'wh_main_anc_follower_all_men_outrider',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in army while in tunnelling stance`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_dwarfs_shieldbreaker',
		}]
	},
	// #endregion
	// #region Vampire
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up in army with mercenaries`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_undead_grave_digger',
		}]
	},
	// #endregion
	// #region Greenskins, Norsca
	{
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['wizard'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up outside of army`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_seer',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_shamans_lacky',
		}]
	},
	// #endregion
	// #region Beastmen, Bretonnia, Chaos, Empire, Dwarfs, Greenskins, High Elves, Norsca, Wood Elves
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up and character has won 6 offensive battles`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh2_main_anc_follower_hef_bard',
		}, {
			chance: 8,
			key: 'wh_main_anc_follower_dwarfs_dwarf_bride',
		}, {
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_magister',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_all_men_valet',
		}, {
			chance: 5,
			key: 'wh_dlc05_anc_follower_hunting_hound',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_pit_boss',
		}]
	},
	// #endregion
	// #region Beastmen, Chaos, Dark Elves, Dwarfs, Greenskins, Lizardmen, Skaven, Norsca
	{
		event: Events.CharacterSackedSettlement,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Sack settlement`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_kurgan_chieftain',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_slave_worker',
			repeat: 2,
		}, {
			chance: 30,
			key: 'wh2_main_anc_follower_def_slave',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_kurgan_slave_merchant',
		}, {
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_collector',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_bully',
		}, {
			chance: 25,
			key: 'wh2_main_anc_follower_skv_artefact_hunter',
		}, {
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_artefact_hunter',
		}, {
			chance: 6,
			key: 'wh_dlc01_anc_follower_chaos_darksoul',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_dwarfs_prospector',
		}]
	},
	// #endregion
	// #region Greenskins
	{
		event: Events.CharacterSackedSettlement,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Sack settlement while having negative income`
		}],
		ancillaryList: [{
			chance: 30,
			key: 'wh_main_anc_follower_greenskins_snotling_scavengers',
		}]
	},
	// #endregion
	// #region Beastmen, Chaos, Norsca
	{
		event: Events.CharacterSackedSettlement,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Declare war this turn and sack settlement`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_dlc01_anc_follower_chaos_slave_master',
		}]
	},
	// #endregion
	// #region Greenskins
	{
		event: Events.CharacterTurnEnd,
		condition: [{
			forbid: {
				agent: ['colonel'],
				agent_subtype: ['dlc07_brt_green_knight']
			},
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
	},
	// #endregion
	// #region Empire, Norsca, Vampires, Wood Elves
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc05_anc_follower_wardancer_drummer',
		}, {
			chance: 5,
			key: 'wh_dlc08_anc_follower_beserker',
		}, {
			chance: 3,
			key: 'wh_main_anc_follower_norsca_berserker',
		}, {
			chance: 4,
			key: 'wh_main_anc_follower_empire_apprentice_wizard',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_empire_hunter',
		}, {
			chance: 4,
			key: 'wh2_dlc11_anc_follower_cst_travelling_necromancer',
		}, {
			chance: 5,
			key: 'wh_dlc08_anc_follower_mammoth',
		}, {
			chance: 3,
			key: 'wh_main_anc_follower_undead_corpse_thief',
		}, {
			chance: 6,
			key: 'wh_main_anc_follower_empire_camp_follower',
		}]
	},
	// #endregion
	// #region Beastmen, Empire, Wood Elves
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win battle (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_empire_charcoal_burner',
		}, {
			chance: 4,
			key: 'wh_dlc03_anc_follower_beastmen_pox_carrier',
		}, {
			chance: 5,
			key: 'wh_dlc05_anc_follower_royal_standard_bearer',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win battle, which features ${unit(['wh_main_grn_mon_trolls'])}`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_dwarfs_troll_slayer',
		}]
	},
	// #endregion
	// #region Empire, Greenskins, Vampires
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win battle, while having negative income`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_empire_peasant',
		}, {
			chance: 40,
			key: 'wh_main_anc_follower_greenskins_swindla',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_undead_dreg',
		}, {
			chance: 25,
			key: 'wh_main_anc_follower_undead_warp_stone_hunter',
		}]
	},
	// #endregion
	// #region Empire
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			prevent,
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 4,
			key: 'wh_main_anc_follower_empire_messenger',
		}]
	},
	// #endregion
	// #region Chaos, Dwarfs, Empire, Norsca, Vampires
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win battle, while having less than 3000 in treasury`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_empire_entertainer',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_skaeling_trader',
		}, {
			chance: 15,
			key: 'wh_dlc01_anc_follower_chaos_demagogue',
		}, {
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_cooper',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_undead_treasurer',
		}]
	},
	// #endregion
	// #region Dwarfs, Skaven, Wood Elves
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win siege battle`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_dwarfs_sapper',
		}, {
			chance: 5,
			key: 'wh2_main_anc_follower_skv_engineering_student',
		}, {
			chance: 5,
			key: 'wh_dlc05_anc_follower_vauls_anvil_smith',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_grn_greenskins'] },
			text: () => `Lose/draw battle as attacker`
		}, {
			onlyMainLord,
			against: { culture: ['wh_main_grn_greenskins'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_dwarfs_grudgekeeper',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_vmp_vampire_counts'] },
			text: () => `Lose/draw battle as attacker`
		}, {
			onlyMainLord,
			against: { culture: ['wh_main_vmp_vampire_counts'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_all_men_grave_robber',
		}]
	},
	// #endregion
	// #region Bretonnia, Dwarfs, Lizardmen, Skaven, Vampires
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia'] },
			text: () => `Win battle as attacker`
		}, {
			onlyMainLord,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_reckoner',
		}, {
			chance: 8,
			key: 'wh_main_anc_follower_bretonnia_squire',
		}, {
			chance: 33,
			key: 'wh2_main_anc_follower_skv_slave_human',
		}, {
			chance: 50,
			key: 'wh2_main_anc_follower_lzd_sacrificial_victim_human',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_undead_mortal_informer',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire
	{
		event: Events.CharacterCompletedBattle,
		condition: [{
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia'] },
			prevent,
			text: () => `Win battle as attacker`
		}, {
			onlyMainLord,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_all_men_militiaman',
		}]
	},
	// #endregion
	// #region Greenskins
	{
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win battle, while having negative income`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_snotling_scavengers',
		}, {
			chance: 40,
			key: 'wh_main_anc_follower_greenskins_swindla',
		}]
	},
	// #endregion
	// #region Beastmen, Bretonnia, Empire
	{
		event: Events.HeroCharacterParticipatedInBattle,
		condition: [{
			allowed: { agent: ['wizard'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_dlc03_anc_follower_beastmen_bray_shamans_familiar',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_all_hedge_wizard',
		}]
	},
	// #endregion
];