import { ITrigger, Events, IGetChance, IDataCulture, IDataSpawn } from './data-types';
import {
	agent,
	building_exists,
	chain_or_superchain,
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
Events.CharacterPostBattleRelease;
Events.CharacterPostBattleSlaughter;
Events.CharacterRankUp;
Events.CharacterRazedSettlement;
Events.CharacterSackedSettlement;
Events.CharacterTurnEnd;
Events.CharacterTurnStart;
Events.HeroCharacterParticipatedInBattle;

const BugsWH2 = {
	assist_army: 'CA wrongly checks “Assist Army”, which always returns false',
	char_army_has_unit: 'in function *char_army_has_unit*, if second parameter is table, function will always return false',
	pb_against_culture: {
		value: false,
		description: `Will work, only if Main Attacker/Defender is of specified "against: culture"`
	},
	battle_featured_unit: {
		value: false,
		description: `function *battle_featured_unit* only checks Main Attacker/Defender armies`,
	},
} as const;

export const dataCultureMap: IDataCulture = new Map([
	['wh2_dlc09_tmb_tomb_kings', {
		title: 'Tomb Kings',
	}],
	['wh_main_brt_bretonnia', {
		title: 'Bretonnia',
		description: `Almost all triggers (not only Bretonia's) forbid "Green Knight" character from satisfying condition.`,
	}],
	['wh_main_emp_empire', {
		title: 'Empire, Kislev, Southern Realms',
	}],
	['wh2_main_def_dark_elves', {
		title: 'Dark Elves',
	}],
	['wh2_main_hef_high_elves', {
		title: 'High Elves',
		description: `All hero triggers forbid "Hand of the Shadow Crown" character from satisfying condition.`,
	}],
	['wh2_main_lzd_lizardmen', {
		title: 'Lizardmen',
	}],
	['wh2_main_skv_skaven', {
		title: 'Skaven',
	}],
	['wh_dlc03_bst_beastmen', {
		title: 'Beastmen',
	}],
	['wh2_dlc11_cst_vampire_coast', {
		title: 'Vampire Coast',
	}],
	['wh_main_chs_chaos', {
		title: 'Chaos',
	}],
	['wh_dlc08_nor_norsca', {
		title: 'Norsca',
	}],
	['wh_main_vmp_vampire_counts', {
		title: 'Vampire Counts',
	}],
	['wh_main_grn_greenskins', {
		title: 'Greenskins, Savage Orcs',
	}],
	['wh_main_dwf_dwarfs', {
		title: 'Dwarfs',
	}],
	['wh_dlc05_wef_wood_elves', {
		title: 'Wood Elves',
	}],
]);

export const getChance: IGetChance = context => {
	return undefined;
};
export const spawn_unique_subtype: IDataSpawn = {
	wh2_dlc15_grn_goblin_great_shaman_raknik: { forename: 'names_name_385074324', surname: 'names_name_464146333' },
	wh2_dlc15_grn_orc_warboss_oglok: { forename: 'names_name_340548085', surname: 'names_name_1551329109' },

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
			"wh2_main_anc_armour_worlds_edge_armour"
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
			"wh2_dlc11_anc_armour_seadragon_buckler"
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
			"wh2_dlc11_anc_armour_armour_of_the_depth"
		],
	},

	enchanted_item: {
		common: [
			"wh_dlc07_anc_enchanted_item_sacrament_of_the_lady",
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
			"wh2_main_anc_enchanted_item_whip_of_agony"
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
			"wh2_dlc11_anc_enchanted_item_pyrotechnic_compound"
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
			"wh2_dlc11_anc_enchanted_item_black_buckthorns_treasure_map"
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
			"wh_main_anc_mark_of_chaos_mark_of_nurgle",
			"wh_main_anc_mark_of_chaos_mark_of_slaanesh",
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
			"wh2_dlc11_anc_magic_standard_rookie_gunner"
		],

		uncommon: [
			"wh_dlc03_anc_mark_of_chaos_slug_skin",
			"wh_main_anc_magic_standard_banner_of_lost_holds",
			"wh_main_anc_magic_standard_razor_standard",
			"wh_main_anc_magic_standard_steel_standard",
			"wh_main_anc_magic_standard_war_banner",
			"wh_main_anc_mark_of_chaos_mark_of_khorne",
			"wh_main_anc_mark_of_chaos_mark_of_tzeentch",
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
			"wh2_dlc11_anc_magic_standard_torn_banner_of_pilgrims"
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
			"wh_main_anc_rune_master_rune_of_slowness",
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
			"wh2_dlc11_anc_magic_standard_ships_colors"
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
			"wh_main_anc_talisman_dawnstone"
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
			"wh2_dlc11_anc_talisman_jellyfish_in_a_jar"
		],

		rare: [
			"wh_main_anc_talisman_talisman_of_preservation",
			"wh_main_anc_talisman_the_white_cloak_of_ulric",
			"wh_dlc08_anc_talisman_headband_of_berserker",
			"wh2_main_anc_talisman_deathmask",
			"wh2_main_anc_talisman_ring_of_hotek",
			"wh2_main_anc_talisman_the_black_amulet",
			"wh2_main_anc_talisman_vambraces_of_defence",
			"wh2_dlc11_anc_talisman_kraken_fang"
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
			"wh2_main_anc_weapon_web_of_shadows"
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
			"wh2_main_anc_weapon_the_star_lance",
			"wh2_main_anc_weapon_the_white_sword",
			"wh2_main_anc_weapon_warlock_augmented_weapon",
			"wh2_main_anc_weapon_weeping_blade"
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
			"wh2_dlc11_anc_weapon_masamune"
		],
	},

	arcane_item: {
		common: [
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
			"wh2_dlc10_anc_arcane_item_scroll_of_the_amber_trance"
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
			"wh2_dlc10_anc_arcane_item_scroll_of_fear_of_aramar"
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
			"wh2_dlc10_anc_arcane_item_scroll_of_arnizipals_black_horror"
		]
	}
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
			text: () => `Rank Up in region with [[nowr]]untainted < 70%[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_dlc09_anc_follower_tmb_cultist_of_usirian',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH2.pb_against_culture,
			onlyMainLord,
			allowed: { agent: ['general'] },
			against: { culture: ['wh2_dlc09_tmb_tomb_kings'] },
			text: () => `Lose/draw battle as attacker`
		}, {
			bug: BugsWH2.pb_against_culture,
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
		event: Events.CharacterPostBattleRelease,
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
			// but maybe will not return false for general? what returns general:is_embedded_in_military_force() ??
			bug: BugsWH2.char_army_has_unit,
			hasArmy,
			prevent,
			text: () => `Rank Up, while ${unit([
				'wh2_dlc09_tmb_mon_ushabti_0',
				'wh2_dlc09_tmb_mon_ushabti_1'
			])} is in the army`
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
			hasRegion,
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
			hasRegion,
			turnOwnRegion,
			text: () => `Have ${technology(['tech_def_2_3_3'])} and spend a turn in own region, which has ${chain_or_superchain(['wh2_main_def_murder'])} (every 5th turn)`
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
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			prevent,
			text: () => `Have ${technology(['tech_def_3_3_3'])} and spend a turn in region with [[nowr]]chaos > 40%[[/nowr]]`
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
			text: () => `Have ${technology(['tech_def_2_3_0'])} and Rank Up when faction has 40% trade`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh2_main_anc_follower_def_organ_merchant',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			text: () => `Have ${technology(['tech_def_1_2_0'])} and Rank Up when faction has 20% trade and more than 2000 in treasury`
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
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Have ${technology(['tech_def_2_2_0'])} and Rank Up after 10th level`
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
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_hef_port'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_admiral',
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
			allowed: { culture: ['wh2_main_lzd_lizardmen'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
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
			// text: () => `Have ${technology(['tech_lzd_4_4'])} and Rank Up in region (1 turn own), with major settlement`
			text: () => `Have ${technology(['tech_lzd_4_4'])} and Rank Up in region (1 turn own) with ${chain_or_superchain([
				'wh_main_sch_settlement_major',
				'wh_main_sch_settlement_major_coast',
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_architect',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			allowed: { pooled_resource: ['wh2_main_ritual_currency'] },
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_lzd_scrying'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_astrologer',
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
			text: () => `Have ${technology(['tech_lzd_1_6'])} and Rank Up in region (1 turn own), which has ${chain_or_superchain([
				'wh2_main_sch_military2_stables',
				'wh2_main_sch_military1_barracks'
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_cleaner',
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
			allowed: { culture: ['wh2_main_lzd_lizardmen'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
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
		event: Events.CharacterCompletedBattle,
		condition: [{
			allowed: { pooled_resource: ['wh2_main_ritual_currency'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 4,
			key: 'wh2_main_anc_follower_lzd_librarian',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			hasRegion,
			turnOwnRegion,
			text: () => `Have ${technology(['tech_lzd_4_6'])} and Rank Up in region (1 turn own) with ${chain_or_superchain([
				'wh_main_sch_settlement_major',
				'wh_main_sch_settlement_major_coast',
			])}`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_metallurgist',
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
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_skv_order'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_bell_polisher',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 1,
			key: 'wh2_main_anc_follower_skv_chemist',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			bug: BugsWH2.assist_army,
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Perform successful action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_clerk',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
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
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Have ${technology(['tech_skv_4_1'])} and win battle`
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
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Win battle`
		}],
		ancillaryList: [{
			chance: 1,
			key: 'wh2_main_anc_follower_skv_messenger',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { pooled_resource: ['wh2_main_ritual_currency'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up when faction has 40% trade after turn 5 (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_skv_sculptor',
		}]
	}, {
		event: Events.CharacterTurnStart,
		condition: [{
			forbid: { agent: ['colonel'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_skv_assassins'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_skv_trainee_assassin',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH2.pb_against_culture,
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_dwf_dwarfs'] },
			text: () => `Win battle as attacker`
		}, {
			bug: BugsWH2.pb_against_culture,
			onlyMainLord,
			against: { culture: ['wh_main_dwf_dwarfs'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 50,
			key: 'wh2_main_anc_follower_hef_beard_weaver',
		}, {
			chance: 11,
			key: 'wh2_main_anc_follower_skv_sacrificial_victim_dwarf',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH2.pb_against_culture,
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh2_main_lzd_lizardmen'] },
			text: () => `Win battle as attacker`
		}, {
			bug: BugsWH2.pb_against_culture,
			onlyMainLord,
			against: { culture: ['wh2_main_lzd_lizardmen'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 11,
			key: 'wh2_main_anc_follower_skv_sacrificial_victim_lizardman',
		}]
	}, {
		event: Events.CharacterCompletedBattle,
		condition: [{
			bug: BugsWH2.pb_against_culture,
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh2_main_skv_skaven'] },
			text: () => `Win battle as attacker`
		}, {
			bug: BugsWH2.pb_against_culture,
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
			hasRegion,
			turnOwnRegion,
			text: () => `Spend a turn in own region, which has ${chain_or_superchain(['wh2_main_special_everqueen_court'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh2_main_anc_follower_hef_priestess_isha',
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
			hasRegion,
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
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
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
			allowed: { culture: ['wh_dlc03_bst_beastmen'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			prevent,
			text: () => `Raze settlement`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc03_anc_follower_beastmen_doe',
		}]
	}, {
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
			bug: BugsWH2.pb_against_culture,
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia'] },
			text: () => `Win battle as attacker`
		}, {
			bug: BugsWH2.pb_against_culture,
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
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
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
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
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
			hasRegion,
			text: () => `Rank Up in untainted province`
		}],
		ancillaryList: [{
			chance: 3,
			key: 'wh_dlc01_anc_follower_chaos_zealot',
		}, {
			chance: 3,
			key: 'wh_main_anc_follower_undead_carrion',
		}, {
			chance: 3,
			key: 'wh_dlc01_anc_follower_chaos_cultist',
		}, {
			chance: 3,
			key: 'wh_dlc03_anc_follower_beastmen_herdstone_keeper',
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
			bug: BugsWH2.assist_army,
			text: () => `Perform critical success action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh2_main_anc_follower_def_organ_merchant',
		}, {
			chance: 8,
			key: 'wh2_main_anc_follower_def_gravedigger',
		}, {
			chance: 5,
			key: 'wh2_main_anc_follower_hef_assassin',
		}, {
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_huscarl',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_undead_flesh_golem',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_dog_boy_scout',
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
			bug: BugsWH2.assist_army,
			forbid: {
				agent_subtype: ['dlc07_brt_green_knight', 'wh2_dlc10_hef_shadow_walker'],
			},
			text: () => `Fail an action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 13,
			key: 'wh_main_anc_follower_all_men_bodyguard',
		}, {
			chance: 25,
			key: 'wh2_main_anc_follower_hef_counterspy',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_undead_possessed_mirror',
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
			bug: BugsWH2.assist_army,
			text: () => `Perform critical success action against another character other than “Assist Army”`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_all_men_rogue',
		}]
	}, {
		event: Events.CharacterCharacterTargetAction,
		condition: [{
			forbid: {
				agent_subtype: ['dlc07_brt_green_knight', 'wh2_dlc10_hef_shadow_walker'],
			},
			onlyPlayer,
			text: () => `Perform successfull action against another character (every 2nd+1 turn (odd))`
		}, {
			bug: BugsWH2.assist_army,
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
			hasArmy,
			text: () => `Complete battle, while ${unit(['wh_main_grn_mon_trolls'])} is in the army`
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
			chance: 13,
			key: 'wh_main_anc_follower_empire_watchman',
		}, {
			chance: 9,
			key: 'wh2_main_anc_follower_skv_scavenger_1',
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
			hasRegion,
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
	}, {
		event: Events.CharacterTurnEnd,
		condition: [{
			forbid: {
				agent: ['colonel'],
				agent_subtype: ['dlc07_brt_green_knight']
			},
			hasRegion,
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
			chance: 15,
			key: 'wh_main_anc_follower_greenskins_serial_loota',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_dwarfs_treasure_hunter',
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
			key: 'wh_dlc08_anc_follower_kurgan_slave_merchant',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_empire_jailer',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_undead_manservant',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_skaeling_trader',
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
			hasArmy,
			text: () => `Loot settlement and have more than 10 units in your army`
		}],
		ancillaryList: [{
			chance: 6,
			key: 'wh_main_anc_follower_empire_barber_surgeon',
		}, {
			chance: 6,
			key: 'wh2_main_anc_follower_skv_scribe',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire
	{
		event: Events.CharacterLootedSettlement,
		condition: [{
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasArmy,
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
			key: 'wh_main_anc_follower_empire_road_warden',
		}, {
			chance: 5,
			key: 'wh_dlc05_anc_follower_dryad_spy',
		}, {
			chance: 25,
			key: 'wh2_main_anc_follower_hef_scout',
		}, {
			chance: 25,
			key: 'wh_main_anc_follower_undead_warlock',
		}, {
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_army_beast_hunter',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire, Dark Elves, High Elves
	{
		event: Events.CharacterPostBattleSlaughter,
		condition: [{
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasArmy,
			text: () => `Post Battle: ${post_battle_captive_option('kill')}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_dlc05_anc_follower_forest_spirit',
		}, {
			chance: 5,
			key: 'wh2_main_anc_follower_def_slave_trader',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_all_men_ogres_pit_fighter',
		}, {
			chance: 5,
			key: 'wh2_main_anc_follower_hef_raven_keeper',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_baernsonlings_berserker',
		}, {
			chance: 5,
			key: 'wh2_main_anc_follower_def_fimir_balefiend',
		}]
	},
	// #endregion
	// #region Beastmen, Chaos, Coast, Dwarfs, Norsca
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasRegion: 'sea',
			text: () => `Rank Up on sea`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_whalers',
		}, {
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_shipwright',
		}, {
			chance: 10,
			key: 'wh2_dlc11_anc_follower_cst_siren',
		}, {
			chance: 12,
			key: 'wh_dlc01_anc_follower_chaos_oar_slave',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasArmy,
			text: () => `Rank Up and have an ability to recruit ${unit(['wh_main_dwf_art_cannon'])}`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_dwarfs_powder_mixer',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasRegion,
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
			hasRegion,
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
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent_subtype: ['grn_goblin_great_shaman'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			turnOwnRegion,
			text: () => `Rank Up (4 turn own) and character has won 3 battles`
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
			hasArmy,
			text: () => `Rank Up, while ${unit(['wh_main_chs_mon_chaos_warhounds_0'])} is in the army`
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
			hasArmy,
			text: () => `Rank Up, while ${unit(['wh_main_dwf_inf_slayers'])} is in the army`
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
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] }, // only for 1st unit
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
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] }, // only for 1st unit
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
			chance: 10,
			key: 'wh_dlc08_anc_follower_marauder_champion',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_all_men_servant',
		}, {
			chance: 10,
			key: 'wh_dlc05_anc_follower_eternal_guard_commander',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_all_men_vagabond',
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
			text: () => `Rank Up when faction has 40% trade after 5th turn (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_guildmaster',
		}, {
			chance: 10,
			key: 'wh2_main_anc_follower_hef_wine_merchant',
		}, {
			chance: 10,
			key: 'wh2_main_anc_follower_def_merchant',
		}, {
			chance: 10,
			key: 'wh2_main_anc_follower_lzd_archivist',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_empire_ferryman',
		}, {
			chance: 7,
			key: 'wh_main_anc_follower_empire_coachman',
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
			text: () => `Rank Up when faction has 40% trade after 5th turn (every 5th turn)`
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
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_zoat',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_empire_rat_catcher',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasRegion,
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
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasRegion,
			text: () => `Rank Up in ${region(['wh_main_the_wasteland_marienburg'])}`
		}],
		ancillaryList: [{
			chance: 5,
			key: 'wh_main_anc_follower_empire_seaman',
		}, {
			chance: 8,
			key: 'wh_main_anc_follower_all_men_fisherman',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasRegion,
			text: () => `Rank Up in ${region(['wh_main_the_wasteland_marienburg'])} (every 5th turn)`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_all_men_boatman',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_empire_marine',
		}]
	}, {
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasRegion,
			text: () => `Rank Up in region, which belongs to ${culture(['wh_main_vmp_vampire_counts'], true)}`
		}],
		ancillaryList: [{
			chance: 7,
			key: 'wh_main_anc_follower_empire_bone_picker',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_all_men_initiate',
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
			key: 'wh_dlc05_anc_follower_young_stag',
		}, {
			chance: 5,
			key: 'wh_dlc05_anc_follower_hawk_companion',
		}, {
			chance: 5,
			key: 'wh_dlc08_anc_follower_mountain_scout',
		}, {
			chance: 2,
			key: 'wh_dlc03_anc_follower_beastmen_flying_spy',
		}, {
			chance: 1,
			key: 'wh_main_anc_follower_all_men_tollkeeper',
		}]
	},
	// #endregion
	// #region Bretonnia, Dark Elves, Dwarfs, Empire, Greenskins, High Elves, Lizardmen, Skaven, Vampires
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasRegion,
			turnOwnRegion,
			text: () => `Rank Up in region (1 turn own) with less than -20 public order`
		}],
		ancillaryList: [{
			chance: 12,
			key: 'wh_main_anc_follower_dwarfs_choir_master',
		}, {
			chance: 10,
			key: 'wh2_main_anc_follower_skv_saboteur',
		}, {
			chance: 15,
			key: 'wh_main_anc_follower_undead_poltergeist',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_idol_carva',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_undead_black_cat',
		}, {
			chance: 15,
			key: 'wh2_main_anc_follower_hef_food_taster',
		}, {
			chance: 15,
			key: 'wh2_main_anc_follower_lzd_attendant',
		}, {
			chance: 8,
			key: 'wh_main_anc_follower_all_men_bailiff',
		}, {
			chance: 15,
			key: 'wh2_main_anc_follower_def_bodyguard',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_empire_agitator',
		}, {
			chance: 12,
			key: 'wh_main_anc_follower_empire_burgher',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_cathy_slave_dancers',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_teller_of_tales',
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
			hasRegion,
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
			chance: 4,
			key: 'wh_main_anc_follower_greenskins_squig_mascot',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_shroom_gathera',
		}]
	},
	// #endregion
	// #region Bretonnia, Chaos, Dwarfs, Empire, Norsca, Vampires
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Rank Up, while not reasearching anything`
		}],
		ancillaryList: [{
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_archivist',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_all_student',
		}]
	},
	// #endregion
	// #region Bretonnia, Empire, Greenskins, Norsca
	{
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasArmy,
			text: () => `Rank Up, while in raiding stance`
		}],
		ancillaryList: [{
			chance: 20,
			key: 'wh_dlc08_anc_follower_dragonbone_raiders',
		}, {
			chance: 13,
			key: 'wh_main_anc_follower_empire_thief',
		}, {
			chance: 8,
			key: 'wh_main_anc_follower_all_men_outlaw',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_bat-winged_loony',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
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
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
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
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
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
	},
	// #endregion
	// #region Empire
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
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
	},
	// #endregion
	// #region Bretonia, Empire, Dwarfs, Greenskins
	{
		event: Events.CharacterRankUp,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasRegion,
			text: () => `Rank Up in region with [[nowr]]untainted < 70%[[/nowr]]`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_main_anc_follower_bretonnia_court_jester',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_dwarfen_tattooist',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_gobbo_ranta',
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
			chance: 50,
			key: 'wh_main_anc_follower_greenskins_backstabba',
		}, {
			chance: 14,
			key: 'wh_main_anc_follower_all_men_outrider',
		}, {
			chance: 8,
			key: 'wh2_main_anc_follower_def_diplomat',
		}, {
			chance: 10,
			key: 'wh_dlc03_anc_follower_beastmen_flayer',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_marauder_champion',
		}, {
			chance: 18,
			key: 'wh_dlc01_anc_follower_chaos_barbarian',
		}]
	},
	// #endregion
	// #region Dwarfs
	{
		event: Events.CharacterRankUp,
		condition: [{
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasArmy,
			text: () => `Rank Up, while in tunneling stance`
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
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasArmy,
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
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_shamans_lacky',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_seer',
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
			chance: 5,
			key: 'wh_main_anc_follower_all_men_valet',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_greenskins_pit_boss',
		}, {
			chance: 8,
			key: 'wh2_main_anc_follower_hef_bard',
		}, {
			chance: 8,
			key: 'wh_main_anc_follower_dwarfs_dwarf_bride',
		}, {
			chance: 5,
			key: 'wh_dlc05_anc_follower_hunting_hound',
		}, {
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_magister',
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
			chance: 10,
			key: 'wh_dlc08_anc_follower_slave_worker',
			repeat: 2,
		}, {
			chance: 30,
			key: 'wh2_main_anc_follower_def_slave',
		}, {
			chance: 25,
			key: 'wh2_main_anc_follower_lzd_artefact_hunter',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_dwarfs_prospector',
		}, {
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_kurgan_chieftain',
		}, {
			chance: 10,
			key: 'wh_dlc08_anc_follower_kurgan_slave_merchant',
		}, {
			chance: 6,
			key: 'wh_dlc01_anc_follower_chaos_darksoul',
		}, {
			chance: 25,
			key: 'wh2_main_anc_follower_skv_artefact_hunter',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_bully',
		}, {
			chance: 5,
			key: 'wh_dlc01_anc_follower_chaos_collector',
		}]
	},
	// #endregion
	// #region Greenskins
	{
		event: Events.CharacterSackedSettlement,
		condition: [{
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			text: () => `Sack settlement and have negative income`
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
			chance: 6,
			key: 'wh_main_anc_follower_empire_camp_follower',
		}, {
			chance: 5,
			key: 'wh_dlc08_anc_follower_beserker',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_empire_hunter',
		}, {
			chance: 5,
			key: 'wh_dlc08_anc_follower_mammoth',
		}, {
			chance: 4,
			key: 'wh2_dlc11_anc_follower_cst_travelling_necromancer',
		}, {
			chance: 3,
			key: 'wh_main_anc_follower_norsca_berserker',
		}, {
			chance: 5,
			key: 'wh_dlc05_anc_follower_wardancer_drummer',
		}, {
			chance: 4,
			key: 'wh_main_anc_follower_empire_apprentice_wizard',
		}, {
			chance: 3,
			key: 'wh_main_anc_follower_undead_corpse_thief',
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
			chance: 4,
			key: 'wh_dlc03_anc_follower_beastmen_pox_carrier',
		}, {
			chance: 8,
			key: 'wh_main_anc_follower_empire_charcoal_burner',
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
			bug: BugsWH2.battle_featured_unit,
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			hasArmy,
			text: () => `Win battle, which featured ${unit(['wh_main_grn_mon_trolls'])}`
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
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 25,
			key: 'wh_main_anc_follower_undead_warp_stone_hunter',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_undead_dreg',
		}, {
			chance: 25,
			key: 'wh_main_anc_follower_empire_peasant',
		}, {
			chance: 40,
			key: 'wh_main_anc_follower_greenskins_swindla',
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
			text: () => `Win battle and have less than 3000 in treasury`
		}],
		ancillaryList: [{
			chance: 10,
			key: 'wh_dlc08_anc_follower_skaeling_trader',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_undead_treasurer',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_empire_entertainer',
		}, {
			chance: 15,
			key: 'wh_dlc01_anc_follower_chaos_demagogue',
		}, {
			chance: 15,
			key: 'wh_main_anc_follower_dwarfs_cooper',
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
			key: 'wh2_main_anc_follower_skv_engineering_student',
		}, {
			chance: 5,
			key: 'wh_main_anc_follower_dwarfs_sapper',
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
			bug: BugsWH2.pb_against_culture,
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_grn_greenskins'] },
			text: () => `Lose/draw battle as attacker`
		}, {
			bug: BugsWH2.pb_against_culture,
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
			bug: BugsWH2.pb_against_culture,
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_vmp_vampire_counts'] },
			text: () => `Lose/draw battle as attacker`
		}, {
			bug: BugsWH2.pb_against_culture,
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
			bug: BugsWH2.pb_against_culture,
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia'] },
			text: () => `Win battle as attacker`
		}, {
			bug: BugsWH2.pb_against_culture,
			onlyMainLord,
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia'] },
			text: () => `Complete battle as defender`
		}],
		ancillaryList: [{
			chance: 8,
			key: 'wh_main_anc_follower_bretonnia_squire',
		}, {
			chance: 10,
			key: 'wh_main_anc_follower_dwarfs_reckoner',
		}, {
			chance: 50,
			key: 'wh2_main_anc_follower_lzd_sacrificial_victim_human',
		}, {
			chance: 33,
			key: 'wh2_main_anc_follower_skv_slave_human',
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
			bug: BugsWH2.pb_against_culture,
			onlyMainLord,
			allowed: { agent: ['general'] },
			forbid: { agent_subtype: ['dlc07_brt_green_knight'] },
			against: { culture: ['wh_main_emp_empire', 'wh_main_brt_bretonnia'] },
			prevent,
			text: () => `Win battle as attacker`
		}, {
			bug: BugsWH2.pb_against_culture,
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
			text: () => `Win battle and have negative income`
		}],
		ancillaryList: [{
			chance: 40,
			key: 'wh_main_anc_follower_greenskins_swindla',
		}, {
			chance: 20,
			key: 'wh_main_anc_follower_greenskins_snotling_scavengers',
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
			chance: 20,
			key: 'wh_main_anc_follower_all_hedge_wizard',
		}, {
			chance: 15,
			key: 'wh_dlc03_anc_follower_beastmen_bray_shamans_familiar',
		}]
	},
	// #endregion
];