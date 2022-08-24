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
		common: [
			"wh_dlc03_anc_armour_blackened_plate",
			"wh_dlc03_anc_armour_ramhorn_helm",
			"wh_dlc05_anc_armour_the_helm_of_the_hunt",
			"wh_dlc07_anc_armour_cuirass_of_fortune",
			"wh_main_anc_armour_charmed_shield",
			"wh_main_anc_armour_dragonhelm",
			"wh_main_anc_armour_enchanted_shield",
			"wh_main_anc_armour_gamblers_armour",
			"wh_main_anc_armour_glittering_scales",
			"wh_main_anc_armour_shield_of_ptolos",
			"wh_main_anc_armour_spellshield",
			"wh2_main_anc_armour_armour_of_darkness",
			"wh2_main_anc_armour_cloak_of_hag_graef",
			"wh2_main_anc_armour_dragonscale_shield",
			"wh2_main_anc_armour_helm_of_fortune",
			"wh2_main_anc_armour_shadow_armour",
			"wh2_main_anc_armour_shield_of_distraction",
			"wh2_main_anc_armour_shield_of_the_merwyrm",
			"wh2_main_anc_armour_the_bane_shield",
			"wh2_main_anc_armour_worlds_edge_armour",
			"wh3_main_anc_armour_greatskull",
			"wh3_main_anc_armour_quicksilver_armour"
		],

		uncommon: [
			"wh_dlc03_anc_armour_pelt_of_the_shadowgave",
			"wh_dlc07_anc_armour_armour_of_the_midsummer_sun",
			"wh_main_anc_armour_armour_of_fortune",
			"wh_main_anc_armour_armour_of_silvered_steel",
			"wh_main_anc_armour_helm_of_discord",
			"wh_main_anc_armour_helm_of_many_eyes",
			"wh_main_anc_armour_nightshroud",
			"wh_dlc08_anc_armour_helm_of_reavers",
			"wh2_main_anc_armour_armour_of_the_stars",
			"wh2_main_anc_armour_sacred_stegadon_helm_of_itza",
			"wh2_main_anc_armour_shield_of_ghrond",
			"wh2_main_anc_armour_shield_of_the_mirrored_pool",
			"wh2_main_anc_armour_the_maiming_shield",
			"wh2_main_anc_armour_warpstone_armour",
			"wh2_dlc11_anc_armour_seadragon_buckler",
			"wh3_main_anc_armour_great_bear_pelt",
			"wh3_main_anc_armour_shield_of_sacrifice",
			"wh3_main_anc_armour_gut_maw",
			"wh3_main_anc_armour_mastodon_armour",
			"wh3_main_anc_armour_laminate_shield",
			"wh3_dlc20_anc_armour_bronze_armour_of_zhrakk"
		],

		rare: [
			"wh_dlc03_anc_armour_trollhide",
			"wh_dlc07_anc_armour_gilded_cuirass",
			"wh_dlc07_anc_armour_the_grail_shield",
			"wh_main_anc_armour_armour_of_destiny",
			"wh_main_anc_armour_armour_of_gork",
			"wh_main_anc_armour_magnificent_armour_of_borek_beetlebrow",
			"wh_main_anc_armour_the_armour_of_meteoric_iron",
			"wh_main_anc_armour_tricksters_helm",
			"wh_dlc08_anc_armour_blood_stained_armour_of_morkar",
			"wh_dlc08_anc_armour_huskarl_plates",
			"wh_dlc08_anc_armour_mammoth_hide_cape",
			"wh2_main_anc_armour_armour_of_caledor",
			"wh2_main_anc_armour_armour_of_eternal_servitude",
			"wh2_main_anc_armour_armour_of_living_death",
			"wh2_main_anc_armour_hide_of_the_cold_ones",
			"wh2_dlc11_anc_armour_the_gunnarsson_kron",
			"wh2_dlc11_anc_armour_armour_of_the_depth",
			"wh3_main_anc_armour_frost_shard_armour",
			"wh3_main_anc_armour_iron_ice_armour",
			"wh3_main_anc_armour_wyrm_harness",
			"wh3_main_anc_armour_armour_of_khorne",
			"wh3_main_anc_armour_bullgut",
			"wh3_main_anc_armour_obsidian_armour",
			"wh3_main_anc_armour_robes_of_shang_yang",
			"wh3_main_anc_armour_scales_of_the_celestial_court",
			"wh3_main_anc_armour_ascendant_celestial_armour",
			"wh3_main_anc_armour_shield_of_the_nan_gau",
			"wh3_main_anc_armour_fused_armour",
			"wh3_main_anc_armour_null_plate",
			"wh3_main_anc_armour_void_armour",
			"wh3_main_anc_armour_weird_plate"
		],
	},

	enchanted_item: {
		common: [
			"wh_main_anc_enchanted_item_featherfoe_torc",
			"wh_main_anc_enchanted_item_ironcurse_icon",
			"wh_main_anc_enchanted_item_potion_of_foolhardiness",
			"wh_main_anc_enchanted_item_potion_of_speed",
			"wh_main_anc_enchanted_item_potion_of_strength",
			"wh_main_anc_enchanted_item_potion_of_toughness",
			"wh_main_anc_enchanted_item_ruby_ring_of_ruin",
			"wh_main_anc_enchanted_item_silver_horn_of_vengeance",
			"wh_main_anc_enchanted_item_the_terrifying_mask_of_eee",
			"wh2_main_anc_enchanted_item_blood_statuette_of_spite",
			"wh2_main_anc_enchanted_item_carnosaur_pendant",
			"wh2_main_anc_enchanted_item_curse_charm_of_tepok",
			"wh2_main_anc_enchanted_item_dragonfly_of_quicksilver",
			"wh2_main_anc_enchanted_item_dragonhorn",
			"wh2_main_anc_enchanted_item_pipes_of_piebald",
			"wh2_main_anc_enchanted_item_portents_of_verminous_doom",
			"wh2_main_anc_enchanted_item_radiant_gem_of_hoeth",
			"wh2_main_anc_enchanted_item_talisman_of_loec",
			"wh2_main_anc_enchanted_item_the_guiding_eye",
			"wh2_main_anc_enchanted_item_venom_of_the_firefly_frog",
			"wh2_main_anc_enchanted_item_whip_of_agony",
			"wh3_main_anc_enchanted_item_steppe_hunters_horn",
			"wh3_main_anc_enchanted_item_greyback_pelt",
			"wh3_main_anc_enchanted_item_rock_eye",
			"wh3_main_anc_enchanted_item_astromancers_spyglass"
		],

		uncommon: [
			"wh_dlc05_anc_enchanted_item_hail_of_doom_arrow",
			"wh_dlc07_anc_enchanted_item_holy_icon",
			"wh_main_anc_enchanted_item_crown_of_command",
			"wh_main_anc_enchanted_item_fiery_ring_of_thori",
			"wh_main_anc_enchanted_item_healing_potion",
			"wh_main_anc_enchanted_item_pendant_of_slaanesh",
			"wh_main_anc_enchanted_item_rod_of_flaming_death",
			"wh_main_anc_enchanted_item_van_horstmanns_speculum",
			"wh_dlc08_anc_enchanted_item_manticore_horn",
			"wh2_main_anc_enchanted_item_cloak_of_beards",
			"wh2_main_anc_enchanted_item_divine_plaque_of_protection",
			"wh2_main_anc_enchanted_item_folariaths_robe",
			"wh2_main_anc_enchanted_item_khaines_ring_of_fury",
			"wh2_main_anc_enchanted_item_skalm",
			"wh2_main_anc_enchanted_item_the_book_of_the_phoenix",
			"wh2_main_anc_enchanted_item_the_cloak_of_feathers",
			"wh2_main_anc_enchanted_item_the_horn_of_kygor",
			"wh2_main_anc_enchanted_item_war_drum_of_xahutec",
			"wh2_dlc09_anc_enchanted_item_cloak_of_the_dunes",
			"wh2_dlc09_anc_enchanted_item_golden_deathmask_of_kharnut",
			"wh2_dlc11_anc_enchanted_item_moonshine",
			"wh2_dlc11_anc_enchanted_item_pyrotechnic_compound",
			"wh3_main_anc_enchanted_item_saint_annushkas_finger_bone",
			"wh3_main_anc_enchanted_item_brahmir_statue",
			"wh3_main_anc_enchanted_item_daemon_killer_scars",
			"wh3_main_anc_enchanted_item_jade_lion",
			"wh3_main_anc_enchanted_item_celestial_silk_robe",
			"wh3_main_anc_enchanted_item_cloak_of_the_moon_wind",
			"wh3_main_anc_enchanted_item_fan_of_the_magister",
			"wh3_main_anc_enchanted_item_jar_of_all_souls",
			"wh3_main_anc_enchanted_item_alchemists_elixir_of_venom",
			"wh3_main_anc_enchanted_item_alchemists_mask",
			"wh3_main_anc_enchanted_item_alchemists_elixir_of_iron_skin",
			"wh3_main_anc_enchanted_item_icon_of_the_spirit_dragon",
			"wh3_dlc20_anc_enchanted_item_blasphemous_amulet",
			"wh3_dlc20_anc_enchanted_item_doom_totem",
			"wh3_dlc20_anc_item_armour_of_damnation",
			"wh3_dlc20_anc_item_crown_of_everlasting_conquest",
			"wh3_dlc20_anc_enchanted_item_the_beguiling_gem",
			"wh3_dlc20_anc_item_the_festering_shroud"
		],

		rare: [
			"wh_dlc03_anc_enchanted_item_horn_of_the_first_beast",
			"wh_dlc03_anc_enchanted_item_shard_of_the_herdstone",
			"wh_dlc07_anc_enchanted_item_mane_of_the_purebreed",
			"wh_main_anc_enchanted_item_chalice_of_chaos",
			"wh_main_anc_enchanted_item_skull_wand_of_kaloth",
			"wh_main_anc_enchanted_item_the_other_tricksters_shard",
			"wh_dlc08_anc_enchanted_item_frost_wyrm_scale",
			"wh_dlc08_anc_enchanted_item_vial_of_troll_blood",
			"wh2_main_anc_enchanted_item_black_dragon_egg",
			"wh2_main_anc_enchanted_item_cloak_of_twilight",
			"wh2_main_anc_enchanted_item_moranions_wayshard",
			"wh2_main_anc_enchanted_item_ring_of_corin",
			"wh2_main_anc_enchanted_item_rubric_of_dark_dimensions",
			"wh2_main_anc_enchanted_item_skavenbrew",
			"wh2_dlc11_anc_enchanted_item_black_buckthorns_treasure_map",
			"wh3_main_anc_enchanted_item_balalaika_of_the_arari",
			"wh3_main_anc_enchanted_item_ever_full_kovsh",
			"wh3_main_anc_enchanted_item_fistful_of_laurels",
			"wh3_main_anc_enchanted_item_the_rock_of_inevitability",
			"wh3_main_anc_enchanted_item_alchemists_elixir_of_puissance",
			"wh3_main_anc_enchanted_item_catalytic_kiln",
			"wh3_main_anc_enchanted_item_cleansing_water",
			"wh3_main_anc_enchanted_item_kite_of_the_uttermost_airs",
			"wh3_main_anc_enchanted_item_crackleblaze",
			"wh3_main_anc_enchanted_item_the_chromatic_tome",
			"wh3_main_anc_enchanted_item_the_portalglyph",
			"wh3_main_anc_enchanted_item_bloodstone",
			"wh3_main_anc_enchanted_item_deaths_head",
			"wh3_main_anc_enchanted_item_enthralling_musk"
		],
	},

	banner: {
		common: [
			"wh_dlc03_anc_magic_standard_banner_of_outrage",
			"wh_dlc03_anc_mark_of_chaos_gnarled_hide",
			"wh_dlc03_anc_mark_of_chaos_gouge_tusks",
			"wh_dlc03_anc_mark_of_chaos_many_limbed_fiend",
			"wh_dlc03_anc_mark_of_chaos_shadow_hide",
			"wh_dlc03_anc_mark_of_chaos_uncanny_senses",
			"wh_dlc07_anc_magic_standard_errantry_banner",
			"wh_dlc07_anc_magic_standard_twilight_banner",
			"wh_main_anc_magic_standard_banner_of_eternal_flame",
			"wh_main_anc_magic_standard_banner_of_rage",
			"wh_main_anc_magic_standard_banner_of_swiftness",
			"wh_main_anc_magic_standard_blasted_standard",
			"wh_main_anc_magic_standard_gleaming_pennant",
			"wh_main_anc_magic_standard_griffon_banner",
			"wh_main_anc_magic_standard_lichbone_pennant",
			"wh_main_anc_magic_standard_scarecrow_banner",
			"wh_main_anc_magic_standard_standard_of_discipline",
			"wh_main_anc_magic_standard_the_screaming_banner",
			"wh_main_anc_rune_ancestor_rune",
			"wh_main_anc_rune_master_rune_of_courage",
			"wh_dlc08_anc_magic_standard_banner_of_wolfclaw",
			"wh_dlc08_anc_magic_standard_black_iron_reavers",
			"wh_dlc08_anc_magic_standard_crimson_reapers",
			"wh_dlc08_anc_magic_standard_drake_hunters",
			"wh2_main_anc_magic_standard_banner_of_ellyrion",
			"wh2_main_anc_magic_standard_banner_of_the_under_empire",
			"wh2_main_anc_magic_standard_banner_of_verminous_scurrying",
			"wh2_main_anc_magic_standard_dwarf_hide_banner",
			"wh2_main_anc_magic_standard_huanchis_blessed_totem",
			"wh2_main_anc_magic_standard_lion_standard",
			"wh2_main_anc_magic_standard_sea_serpent_standard",
			"wh2_main_anc_magic_standard_the_blood_banner",
			"wh2_dlc11_anc_magic_standard_dead_mans_chest",
			"wh2_dlc11_anc_magic_standard_boatswain",
			"wh2_dlc11_anc_magic_standard_corpse_surgeon",
			"wh2_dlc11_anc_magic_standard_rookie_gunner",
			"wh3_main_anc_magic_standard_father_niklas_mantle",
			"wh3_main_anc_magic_standard_bull_standard",
			"wh3_main_anc_magic_standard_standard_of_wei_jin"
		],

		uncommon: [
			"wh_dlc03_anc_mark_of_chaos_slug_skin",
			"wh_main_anc_magic_standard_banner_of_lost_holds",
			"wh_main_anc_magic_standard_razor_standard",
			"wh_main_anc_magic_standard_steel_standard",
			"wh_main_anc_magic_standard_war_banner",
			"wh_main_anc_rune_master_rune_of_groth_one-eye",
			"wh_main_anc_rune_master_rune_of_grungni",
			"wh_main_anc_rune_master_rune_of_sanctuary",
			"wh_main_anc_rune_master_rune_of_stoicism",
			"wh_main_anc_rune_strollaz_rune",
			"wh2_main_anc_magic_standard_banner_of_murder",
			"wh2_main_anc_magic_standard_grand_banner_of_clan_superiority",
			"wh2_main_anc_magic_standard_shroud_of_dripping_death",
			"wh2_main_anc_magic_standard_standard_of_hag_graef",
			"wh2_main_anc_magic_standard_sun_standard_of_chotec",
			"wh2_dlc09_anc_magic_standard_banner_of_the_hidden_dead",
			"wh2_dlc09_anc_magic_standard_standard_of_the_undying_legion",
			"wh2_dlc11_anc_magic_standard_bloodied_banner_of_slayers",
			"wh2_dlc11_anc_magic_standard_burnt_banner_of_knights",
			"wh2_dlc11_anc_magic_standard_holed_banner_of_militia",
			"wh2_dlc11_anc_magic_standard_torn_banner_of_pilgrims",
			"wh3_main_anc_magic_standard_banner_of_praag",
			"wh3_main_anc_magic_standard_standard_of_the_empty_steppe",
			"wh3_main_anc_magic_standard_banner_of_hellfire",
			"wh3_main_anc_magic_standard_banner_of_unholy_victory",
			"wh3_main_anc_magic_standard_cannibal_totem",
			"wh3_main_anc_magic_standard_great_icon_of_despair",
			"wh3_main_anc_magic_standard_icon_of_endless_war",
			"wh3_main_anc_magic_standard_ragbanner",
			"wh3_main_anc_magic_standard_skull_totem",
			"wh3_main_anc_magic_standard_standard_of_chaos_glory",
			"wh3_main_anc_magic_standard_serene_cloud_prayer_flag",
			"wh3_main_anc_magic_standard_banner_of_change",
			"wh3_main_anc_magic_standard_banner_of_ecstacy",
			"wh3_main_anc_magic_standard_great_standard_of_sundering",
			"wh3_main_anc_magic_standard_icon_of_eternal_virulence",
			"wh3_main_anc_magic_standard_icon_of_sorcery",
			"wh3_main_anc_magic_standard_siren_standard",
			"wh3_main_anc_magic_standard_standard_of_nan_gau",
			"wh3_main_anc_magic_standard_standard_of_seeping_decay"
		],

		rare: [
			"wh_dlc03_anc_magic_standard_manbane_standard",
			"wh_dlc03_anc_magic_standard_the_beast_banner",
			"wh_dlc03_anc_magic_standard_totem_of_rust",
			"wh_dlc03_anc_mark_of_chaos_crown_of_horns",
			"wh_dlc05_anc_magic_standard_the_banner_of_the_eternal_queen",
			"wh_dlc05_anc_magic_standard_the_banner_of_the_hunter_king",
			"wh_dlc07_anc_magic_standard_banner_of_defence",
			"wh_dlc07_anc_magic_standard_valorous_standard",
			"wh_main_anc_magic_standard_banner_of_the_barrows",
			"wh_main_anc_magic_standard_morks_war_banner",
			"wh_main_anc_magic_standard_rampagers_standard",
			"wh_main_anc_magic_standard_rangers_standard",
			"wh_main_anc_magic_standard_spider_banner",
			"wh_main_anc_magic_standard_the_bad_moon_banner",
			"wh_main_anc_magic_standard_wailing_banner",
			"wh_main_anc_rune_master_rune_of_battle",
			"wh_main_anc_rune_master_rune_of_stromni_redbeard",
			"wh_main_anc_rune_master_rune_of_valaya",
			"wh2_main_anc_magic_standard_banner_of_the_world_dragon",
			"wh2_main_anc_magic_standard_battle_banner",
			"wh2_main_anc_magic_standard_dread_banner",
			"wh2_main_anc_magic_standard_horn_of_isha",
			"wh2_main_anc_magic_standard_hydra_banner",
			"wh2_main_anc_magic_standard_sacred_banner_of_the_horned_rat",
			"wh2_main_anc_magic_standard_skavenpelt_banner",
			"wh2_main_anc_magic_standard_storm_banner",
			"wh2_main_anc_magic_standard_the_jaguar_standard",
			"wh2_main_anc_magic_standard_totem_of_prophecy",
			"wh2_dlc11_anc_magic_standard_ships_colors",
			"wh3_main_anc_magic_standard_dragonhide_banner",
			"wh3_main_anc_magic_standard_rune_maw",
			"wh3_main_anc_magic_standard_standard_of_shang_yang",
			"wh3_main_anc_magic_standard_revered_banner_of_the_ancestors",
			"wh3_main_anc_magic_standard_bastion_standard",
			"wh3_main_anc_magic_standard_flag_of_grand_cathay"
		],
	},

	talisman: {
		common: [
			"wh_main_anc_talisman_dragonbane_gem",
			"wh_main_anc_talisman_luckstone",
			"wh_main_anc_talisman_pidgeon_plucker_pendant",
			"wh2_main_anc_enchanted_item_talisman_of_loec",
			"wh_main_anc_talisman_seed_of_rebirth",
			"wh2_main_anc_talisman_rival_hide_talisman",
			"wh_main_anc_talisman_obsidian_trinket",
			"wh_main_anc_talisman_opal_amulet",
			"wh_main_anc_talisman_talisman_of_protection",
			"wh2_main_anc_talisman_amulet_of_fire",
			"wh_dlc07_anc_talisman_dragons_claw",
			"wh2_main_anc_talisman_pearl_of_infinite_blackness",
			"wh_main_anc_talisman_dawnstone",
			"wh3_main_anc_talisman_jet_amulet",
			"wh3_main_anc_talisman_cathayan_jet",
			"wh3_main_anc_talisman_jade_blood_pendant",
			"wh3_main_anc_talisman_spangleshard"
		],

		uncommon: [
			"wh_dlc03_anc_talisman_chalice_of_dark_rain",
			"wh_dlc07_anc_talisman_siriennes_locket",
			"wh_main_anc_talisman_obsidian_amulet",
			"wh_main_anc_talisman_obsidian_lodestone",
			"wh_main_anc_talisman_talisman_of_endurance",
			"wh_dlc08_anc_talisman_lootbag_of_marauders",
			"wh_dlc08_anc_talisman_slave_chain",
			"wh_dlc08_anc_talisman_wolf_teeth_amulet",
			"wh2_main_anc_talisman_amulet_of_itzl",
			"wh2_main_anc_talisman_aura_of_quetzl",
			"wh2_main_anc_talisman_crown_of_black_iron",
			"wh2_main_anc_talisman_foul_pendant",
			"wh2_main_anc_talisman_glyph_necklace",
			"wh2_main_anc_talisman_golden_crown_of_atrazar",
			"wh2_main_anc_talisman_loremasters_cloak",
			"wh2_main_anc_talisman_ring_of_darkness",
			"wh2_main_anc_talisman_sacred_incense",
			"wh2_main_anc_talisman_shadow_magnet_trinket",
			"wh2_main_anc_talisman_talisman_of_saphery",
			"wh2_dlc11_anc_talisman_blackpearl_eye",
			"wh2_dlc11_anc_talisman_jellyfish_in_a_jar",
			"wh3_main_anc_talisman_star_iron_ring",
			"wh3_main_anc_talisman_wyrdstone_necklace",
			"wh3_main_anc_talisman_greedy_fist",
			"wh3_main_anc_talisman_jade_amulet",
			"wh3_main_anc_talisman_gnoblar_thiefstone"
		],

		rare: [
			"wh_main_anc_talisman_talisman_of_preservation",
			"wh_main_anc_talisman_the_white_cloak_of_ulric",
			"wh_dlc08_anc_talisman_headband_of_berserker",
			"wh2_main_anc_talisman_deathmask",
			"wh2_main_anc_talisman_ring_of_hotek",
			"wh2_main_anc_talisman_the_black_amulet",
			"wh2_main_anc_talisman_vambraces_of_defence",
			"wh2_dlc11_anc_talisman_kraken_fang",
			"wh3_main_anc_talisman_blizzard_broach",
			"wh3_main_anc_talisman_blood_of_the_motherland",
			"wh3_main_anc_talisman_crystal_of_kunlan",
			"wh3_main_anc_talisman_collar_of_khorne",
			"wh3_main_anc_talisman_crystal_pendant",
			"wh3_main_anc_talisman_fractured_clasp",
			"wh3_main_anc_talisman_jewel_of_denial",
			"wh3_main_anc_talisman_ring_of_sensation",
			"wh3_main_anc_talisman_spore_censer",
			"wh3_main_anc_talisman_tarnished_torque",
			"wh3_main_anc_talisman_the_bloody_shackle",
			"wh3_main_anc_talisman_vile_seed",
			"wh3_main_anc_talisman_warp_mirror"
		],
	},

	weapon: {
		common: [
			"wh_dlc03_anc_weapon_everbleed",
			"wh_dlc05_anc_weapon_the_bow_of_loren",
			"wh_dlc07_anc_weapon_sword_of_the_quest",
			"wh_dlc07_anc_weapon_the_wyrmlance",
			"wh_main_anc_weapon_berserker_sword",
			"wh_main_anc_weapon_biting_blade",
			"wh_main_anc_weapon_gold_sigil_sword",
			"wh_main_anc_weapon_relic_sword",
			"wh_main_anc_weapon_shrieking_blade",
			"wh_main_anc_weapon_sword_of_battle",
			"wh_main_anc_weapon_sword_of_might",
			"wh_main_anc_weapon_sword_of_striking",
			"wh_main_anc_weapon_sword_of_swift_slaying",
			"wh_main_anc_weapon_tormentor_sword",
			"wh_main_anc_weapon_warrior_bane",
			"wh2_main_anc_weapon_blade_of_nurglitch",
			"wh2_main_anc_weapon_burning_blade_of_chotec",
			"wh2_main_anc_weapon_dagger_of_sotek",
			"wh2_main_anc_weapon_deathpiercer",
			"wh2_main_anc_weapon_dwarfbane",
			"wh2_main_anc_weapon_foe_bane",
			"wh2_main_anc_weapon_heartseeker",
			"wh2_main_anc_weapon_sword_of_the_hornet",
			"wh2_main_anc_weapon_web_of_shadows",
			"wh3_main_anc_weapon_ursuns_claws",
			"wh3_main_anc_weapon_blade_of_blood",
			"wh3_main_anc_weapon_blood_cleaver",
			"wh3_main_anc_weapon_skull_plucker",
			"wh3_main_anc_weapon_the_tenderiser",
			"wh3_main_anc_weapon_plague_flail"
		],

		uncommon: [
			"wh_dlc03_anc_weapon_axes_of_khorgor",
			"wh_dlc03_anc_weapon_hunting_spear",
			"wh_dlc03_anc_weapon_the_brass_cleaver",
			"wh_dlc03_anc_weapon_the_steel_claws",
			"wh_dlc07_anc_weapon_sword_of_the_ladys_champion",
			"wh_main_anc_weapon_fencers_blades",
			"wh_main_anc_weapon_filth_mace",
			"wh_main_anc_weapon_hellfire_sword",
			"wh_main_anc_weapon_ogre_blade",
			"wh_main_anc_weapon_skabscrath",
			"wh_main_anc_weapon_sword_of_anti-heroes",
			"wh_main_anc_weapon_sword_of_strife",
			"wh_main_anc_weapon_the_hammer_of_karak_drazh",
			"wh_dlc08_anc_weapon_fimir_hammer",
			"wh_dlc08_anc_weapon_troll_fang_dagger",
			"wh2_main_anc_weapon_blade_of_corruption",
			"wh2_main_anc_weapon_blade_of_darting_steel",
			"wh2_main_anc_weapon_caledors_bane",
			"wh2_main_anc_weapon_crimson_death",
			"wh2_main_anc_weapon_dagger_of_hotek",
			"wh2_main_anc_weapon_the_white_sword",
			"wh2_main_anc_weapon_warlock_augmented_weapon",
			"wh2_main_anc_weapon_weeping_blade",
			"wh3_main_anc_weapon_etherblade",
			"wh3_main_anc_weapon_firestorm_blade",
			"wh3_main_anc_weapon_torment_blade",
			"wh3_main_anc_weapon_vorpal_shard",
			"wh3_dlc20_anc_weapon_sword_of_change",
		],

		rare: [
			"wh_dlc03_anc_weapon_axe_of_men",
			"wh_dlc03_anc_weapon_mangelder",
			"wh_dlc03_anc_weapon_primeval_club",
			"wh_dlc03_anc_weapon_stonecrusher_mace",
			"wh_dlc05_anc_weapon_daiths_reaper",
			"wh_dlc05_anc_weapon_the_spirit_sword",
			"wh_dlc07_anc_weapon_the_silver_lance_of_the_blessed",
			"wh_main_anc_weapon_bashas_axe_of_stunty_smashin",
			"wh_main_anc_weapon_battleaxe_of_the_last_waaagh",
			"wh_main_anc_weapon_giant_blade",
			"wh_main_anc_weapon_obsidian_blade",
			"wh_main_anc_weapon_red_axe_of_karak_eight_peaks",
			"wh_main_anc_weapon_runefang",
			"wh_main_anc_weapon_sword_of_bloodshed",
			"wh_main_anc_weapon_the_mace_of_helsturm",
			"wh_dlc08_anc_weapon_flaming_axe_of_cormac",
			"wh2_main_anc_weapon_blade_of_bel_korhadris",
			"wh2_main_anc_weapon_blade_of_leaping_gold",
			"wh2_main_anc_weapon_blade_of_revered_tzunki",
			"wh2_main_anc_weapon_blade_of_ruin",
			"wh2_main_anc_weapon_bow_of_the_seafarer",
			"wh2_main_anc_weapon_chillblade",
			"wh2_main_anc_weapon_executioners_axe",
			"wh2_main_anc_weapon_hydra_blade",
			"wh2_main_anc_weapon_scimitar_of_the_sun_resplendent",
			"wh2_main_anc_weapon_stegadon_war_spear",
			"wh2_main_anc_weapon_the_blade_of_realities",
			"wh2_main_anc_weapon_the_fellblade",
			"wh2_main_anc_weapon_the_piranha_blade",
			"wh2_main_anc_weapon_venom_sword",
			"wh2_main_anc_weapon_warpforged_blade",
			"wh2_dlc11_anc_weapon_double_barrel",
			"wh2_dlc11_anc_weapon_lucky_levis_hookhand",
			"wh2_dlc11_anc_weapon_masamune",
			"wh3_main_anc_weapon_axe_of_tor",
			"wh3_main_anc_weapon_frost_shard_glaive",
			"wh3_main_anc_weapon_the_rime_blade",
			"wh3_main_anc_weapon_wyrmspike",
			"wh3_main_anc_weapon_dazhs_brazier",
			"wh3_main_anc_weapon_axe_of_khorne",
			"wh3_main_anc_weapon_siegebreaker",
			"wh3_main_anc_weapon_the_eternal_blade",
			"wh3_main_anc_weapon_thundermace",
			"wh3_main_anc_weapon_bale_sword",
			"wh3_main_anc_weapon_lash_of_despair",
			"wh3_main_anc_weapon_staff_of_change",
			"wh3_main_anc_weapon_staff_of_nurgle",
			"wh3_main_anc_weapon_silver_moon_bow",
			"wh3_main_anc_weapon_ascendant_celestial_blade",
			"wh3_main_anc_weapon_jade_blade_of_the_great_fleet",
			"wh3_main_anc_weapon_serpent_fang",
			"wh3_main_anc_weapon_nuku_chos_crossbow",
			"wh3_main_anc_weapon_vermillion_blade",
			"wh3_main_anc_weapon_blade_of_xen_wu",
			"wh3_main_anc_weapon_spirit_qilin_spear",
			"wh3_main_anc_weapon_dawn_glaive",
			"wh3_main_anc_weapon_hellblade",
			"wh3_dlc20_anc_weapon_aether_sword",
			"wh3_dlc20_anc_weapon_axe_of_khorne",
			"wh3_dlc20_anc_weapon_rapier_of_ecstacy"
		],
	},

	arcane_item: {
		common: [
			"wh_dlc07_anc_arcane_item_sacrament_of_the_lady",
			"wh_main_anc_arcane_item_book_of_arkhan",
			"wh_main_anc_arcane_item_channelling_staff",
			"wh_main_anc_arcane_item_earthing_rod",
			"wh_main_anc_arcane_item_power_scroll",
			"wh_main_anc_arcane_item_power_stone",
			"wh_main_anc_arcane_item_sceptre_of_stability",
			"wh_main_anc_arcane_item_scroll_of_shielding",
			"wh_main_anc_arcane_item_skull_of_katam",
			"wh_main_anc_arcane_item_wand_of_jet",
			"wh_dlc03_anc_arcane_item_jagged_dagger",
			"wh_dlc03_anc_arcane_item_hagtree_fetish",
			"wh2_main_anc_arcane_item_scrying_stone",
			"wh2_main_anc_arcane_item_warpstone_tokens",
			"wh2_main_anc_arcane_item_warp_energy_condenser",
			"wh2_main_anc_arcane_item_diadem_of_power",
			"wh2_main_anc_arcane_item_itxi_grubs",
			"wh2_main_anc_arcane_item_plaque_of_dominion",
			"wh2_main_anc_arcane_item_rod_of_the_storm",
			"wh2_main_anc_arcane_item_darkstar_cloak",
			"wh2_main_anc_arcane_item_tome_of_furion",
			"wh2_dlc10_anc_arcane_item_scroll_of_blast",
			"wh2_dlc10_anc_arcane_item_scroll_of_speed_of_lykos",
			"wh2_dlc10_anc_arcane_item_scroll_of_the_amber_trance",
			"wh3_main_anc_arcane_item_bangstick",
			"wh3_main_anc_arcane_item_wand_of_whimsey"
		],

		uncommon: [
			"wh_main_anc_arcane_item_forbidden_rod",
			"wh_main_anc_arcane_item_staff_of_damnation",
			"wh_main_anc_arcane_item_tricksters_shard",
			"wh2_main_anc_arcane_item_cube_of_darkness",
			"wh2_main_anc_arcane_item_cupped_hands_of_the_old_ones",
			"wh2_main_anc_arcane_item_the_seerstaff_of_saphery",
			"wh2_main_anc_arcane_item_the_tricksters_pendant",
			"wh2_main_anc_arcane_item_starwood_staff",
			"wh2_dlc10_anc_arcane_item_scroll_of_assault_of_stone",
			"wh2_dlc10_anc_arcane_item_scroll_of_fear_of_aramar",
			"wh3_main_anc_arcane_item_snowflake_pendant",
			"wh3_main_anc_arcane_item_halfling_cookbook",
			"wh3_main_anc_arcane_item_skullmantle",
			"wh3_main_anc_arcane_item_maw_shard",
			"wh3_main_anc_arcane_item_scrolls_of_astromancy"
		],

		rare: [
			"wh_main_anc_arcane_item_black_periapt",
			"wh_main_anc_arcane_item_book_of_ashur",
			"wh_main_anc_arcane_item_lucky_shrunken_head",
			"wh_main_anc_arcane_item_scroll_of_leeching",
			"wh_dlc03_anc_arcane_item_staff_of_darkoth",
			"wh_dlc03_anc_arcane_item_skull_of_rarkos",
			"wh2_main_anc_arcane_item_warpstorm_scroll",
			"wh2_main_anc_arcane_item_black_staff",
			"wh2_main_anc_arcane_item_book_of_hoeth",
			"wh2_main_anc_arcane_item_the_vortex_shard",
			"wh2_main_anc_arcane_item_the_gem_of_sunfire",
			"wh2_dlc10_anc_arcane_item_scroll_of_arnizipals_black_horror",
			"wh3_main_anc_arcane_item_mirror_of_the_ice_queen",
			"wh3_main_anc_arcane_item_gastuvas_egg",
			"wh3_main_anc_arcane_item_gruts_sickle",
			"wh3_main_anc_arcane_item_hellheart",
			"wh3_main_anc_arcane_item_cloak_of_po_mei",
			"wh3_main_anc_arcane_item_staff_of_wu_xing",
			"wh3_main_anc_arcane_item_abhorrent_lodestone",
			"wh3_main_anc_arcane_item_prismatic_amplifier",
			"wh3_main_anc_arcane_item_rod_of_command",
			"wh3_main_anc_arcane_item_sceptre_of_entropy",
			"wh3_main_anc_arcane_item_void_pendulum",
			"wh3_dlc20_anc_arcane_item_rod_of_torment"
		]
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
		event: Events.CharacterCompletedBattle,
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
			text: () => `Rank Up, while not reasearching anything after 1st turn`
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
			text: () => `Rank Up, while not reasearching anything after 1st turn`
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
			text: () => `Win battle`
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
			text: () => `Perform (critical) successfull action against another character other than “Assist Army”`
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