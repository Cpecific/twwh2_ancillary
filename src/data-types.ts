import type { IEntry } from "./ron-db";

// #region (sub)culture
export type SubCultureType =
	'filter_all' |
	'wh_dlc03_sc_bst_beastmen' |
	'wh_dlc05_sc_wef_wood_elves' |
	'wh_main_sc_brt_bretonnia' |
	'wh_main_sc_chs_chaos' |
	'wh_main_sc_nor_norsca' |
	'wh_main_sc_dwf_dwarfs' |
	'wh_main_sc_emp_empire' |
	'wh_main_sc_ksl_kislev' |
	'wh_main_sc_teb_teb' |
	'wh_main_sc_grn_greenskins' |
	'wh_main_sc_grn_savage_orcs' |
	'wh_main_sc_vmp_vampire_counts' |
	'wh2_dlc09_rogue_black_creek_raiders' |
	'wh2_dlc09_rogue_dwellers_of_zardok' |
	'wh2_dlc09_rogue_eyes_of_the_jungle' |
	'wh2_dlc09_rogue_pilgrims_of_myrmidia' |
	'wh2_dlc09_sc_tmb_tomb_kings' |
	// 'wh2_dlc11_brt_bretonnia_dil' |
	'wh2_dlc11_cst_harpoon_the_sunken_land_corsairs' |
	'wh2_dlc11_cst_rogue_bleak_coast_buccaneers' |
	'wh2_dlc11_cst_rogue_boyz_of_the_forbidden_coast' |
	'wh2_dlc11_cst_rogue_freebooters_of_port_royale' |
	'wh2_dlc11_cst_rogue_grey_point_scuttlers' |
	'wh2_dlc11_cst_rogue_terrors_of_the_dark_straights' |
	'wh2_dlc11_cst_rogue_the_churning_gulf_raiders' |
	'wh2_dlc11_cst_rogue_tyrants_of_the_black_ocean' |
	'wh2_dlc11_cst_shanty_dragon_spine_privateers' |
	'wh2_dlc11_cst_shanty_middle_sea_brigands' |
	'wh2_dlc11_cst_shanty_shark_straight_seadogs' |
	'wh2_dlc11_sc_cst_vampire_coast' |
	// 'wh2_dlc11_def_dark_elves_dil' |
	// 'wh2_dlc11_emp_empire_dil' |
	// 'wh2_dlc11_nor_norsca_dil' |
	// 'wh2_dlc11_nor_norsca_qb4' |
	'wh2_main_sc_def_dark_elves' |
	'wh2_main_sc_hef_high_elves' |
	'wh2_main_sc_lzd_lizardmen' |
	'wh2_main_rogue_abominations' |
	'wh2_main_rogue_beastcatchas' |
	'wh2_main_rogue_bernhoffs_brigands' |
	'wh2_main_rogue_black_spider_tribe' |
	'wh2_main_rogue_boneclubbers_tribe' |
	'wh2_main_rogue_celestial_storm' |
	'wh2_main_rogue_college_of_pyrotechnics' |
	'wh2_main_rogue_doomseekers' |
	'wh2_main_rogue_gerhardts_mercenaries' |
	'wh2_main_rogue_heirs_of_mourkain' |
	'wh2_main_rogue_hung_warband' |
	'wh2_main_rogue_hunters_of_kurnous' |
	'wh2_main_rogue_jerrods_errantry' |
	'wh2_main_rogue_mangy_houndz' |
	'wh2_main_rogue_mengils_manflayers' |
	'wh2_main_rogue_morrsliebs_howlers' |
	'wh2_main_rogue_pirates_of_the_far_sea' |
	'wh2_main_rogue_pirates_of_the_southern_ocean' |
	'wh2_main_rogue_pirates_of_trantio' |
	'wh2_main_rogue_scions_of_tesseninck' |
	'wh2_main_rogue_scourge_of_aquitaine' |
	'wh2_main_rogue_stuff_snatchers' |
	'wh2_main_rogue_teef_snatchaz' |
	'wh2_main_rogue_the_wandering_dead' |
	'wh2_main_rogue_tor_elithis' |
	'wh2_main_rogue_troll_skullz' |
	'wh2_main_rogue_vashnaar' |
	'wh2_main_rogue_vauls_expedition' |
	'wh2_main_rogue_worldroot_rangers' |
	'wh2_main_rogue_wrath_of_nature' |
	'wh2_main_sc_skv_skaven' |
	'wh3_main_pro_sc_kho_khorne' |
	'wh3_main_pro_sc_ksl_kislev' |
	'wh3_main_pro_sc_tze_tzeentch' |
	'wh3_main_sc_cth_cathay' |
	'wh3_main_sc_dae_daemons' |
	'wh3_main_sc_kho_khorne' |
	'wh3_main_sc_ksl_kislev' |
	'wh3_main_sc_nur_nurgle' |
	'wh3_main_sc_ogr_ogre_kingdoms' |
	'wh3_main_sc_sla_slaanesh' |
	'wh3_main_sc_tze_tzeentch';
// #endregion

/**
 * `agent`
 * • узнать тип героя (касту), можно через
 * agent_culture_details[agent === key && culture === ?]
 * main_units[key = associated_unit].caste
 * 
 * `agent_subtypes` - содержит всякие уникальные юниты:
 * lord, agent, mounts (bodyguard присобаченные к ancillary), уникальные юниты (супер карнозавр для миссий норски)
 * • узнать какой тип agent, можно через (тут как бэ гарантируется, что будут только lord и hero)
 * character_skill_node_sets[agent_subtype_key === key].agent_key
 * • узнать касту, можно через (но тут ещё есть касты melee_infantry, monster; что, в общем-то, может и не относиться к агенту/лорду)
 * main_units[unit === associated_unit_override].caste
 * 
 * `agent_subtype_subculture_overrides` - не особо важная таблица, в `agent_subtypes` уже содержится вся нужная инфа
 */

// agents
export const agent_loc = {
	'champion': 'Hero Champion',
	'colonel': 'Colonel',
	'dignitary': 'Dignitary',
	'engineer': 'Hero Engineer',
	'general': 'Lord',
	'minister': 'Minister',
	'runesmith': 'Hero Runesmith',
	'spy': 'Hero Spy',
	'wizard': 'Hero Wizard',
} as const;
// agent_subtypes
const agent_subtypes = [
	'brt_damsel',
	'brt_damsel_beasts',
	'brt_damsel_life',
	'brt_lord',
	'brt_louen_leoncouer',
	'brt_paladin',
	'chs_archaon',
	'chs_chaos_sorcerer_death',
	'chs_chaos_sorcerer_fire',
	'chs_chaos_sorcerer_metal',
	'chs_exalted_hero',
	'chs_kholek_suneater',
	'chs_lord',
	'chs_lord_of_change',
	'chs_prince_sigvald',
	'chs_sorcerer_lord_death',
	'chs_sorcerer_lord_fire',
	'chs_sorcerer_lord_metal',
	'default',
	'dlc03_bst_beastlord',
	'dlc03_bst_bray_shaman_beasts',
	'dlc03_bst_bray_shaman_death',
	'dlc03_bst_bray_shaman_shadows',
	'dlc03_bst_bray_shaman_wild',
	'dlc03_bst_gorebull',
	'dlc03_bst_graktar',
	'dlc03_bst_khazrak',
	'dlc03_bst_malagor',
	'dlc03_emp_amber_wizard',
	'dlc03_emp_boris_todbringer',
	'dlc04_emp_arch_lector',
	'dlc04_emp_volkmar',
	'dlc04_vmp_helman_ghorst',
	'dlc04_vmp_strigoi_ghoul_king',
	'dlc04_vmp_vlad_con_carstein',
	'dlc05_bst_morghur',
	'dlc05_emp_grey_wizard',
	'dlc05_emp_jade_wizard',
	'dlc05_wef_ancient_treeman',
	'dlc05_wef_durthu',
	'dlc05_wef_glade_lord',
	'dlc05_wef_glade_lord_fem',
	'dlc05_wef_orion',
	'dlc05_wef_spellsinger_beasts',
	'dlc05_wef_spellsinger_life',
	'dlc05_wef_spellsinger_shadow',
	'dlc05_wef_waystalker',
	'dlc06_dwf_belegar',
	'dlc06_dwf_master_engineer_ghost',
	'dlc06_dwf_runelord',
	'dlc06_dwf_runesmith_ghost',
	'dlc06_dwf_thane_ghost_1',
	'dlc06_dwf_thane_ghost_2',
	'dlc06_grn_night_goblin_warboss',
	'dlc06_grn_skarsnik',
	'dlc06_grn_wurrzag_da_great_prophet',
	'dlc07_brt_alberic',
	'dlc07_brt_fay_enchantress',
	'dlc07_brt_green_knight',
	'dlc07_brt_prophetess_beasts',
	'dlc07_brt_prophetess_heavens',
	'dlc07_brt_prophetess_life',
	'dlc07_chs_chaos_sorcerer_shadow',
	'dlc07_chs_sorcerer_lord_shadow',
	'dlc08_nor_kihar',
	'dwf_lord',
	'dwf_master_engineer',
	'dwf_runesmith',
	'dwf_thane',
	'dwf_thorgrim_grudgebearer',
	'dwf_ungrim_ironfist',
	'emp_balthasar_gelt',
	'emp_bright_wizard',
	'emp_captain',
	'emp_celestial_wizard',
	'emp_karl_franz',
	'emp_light_wizard',
	'emp_lord',
	'emp_warrior_priest',
	'emp_witch_hunter',
	'grn_azhag_the_slaughterer',
	'grn_goblin_big_boss',
	'grn_goblin_great_shaman',
	'grn_grimgor_ironhide',
	'grn_night_goblin_shaman',
	'grn_orc_shaman',
	'grn_orc_warboss',
	'ksl_captain',
	'ksl_celestial_wizard',
	'ksl_lord',
	'nor_chaos_sorcerer_metal',
	'nor_marauder_chieftain',
	'nor_sorcerer_lord_metal',
	'pro01_dwf_grombrindal',
	'pro02_vmp_isabella_von_carstein',
	'teb_bright_wizard',
	'teb_captain',
	'teb_lord',
	'vmp_banshee',
	'vmp_heinrich_kemmler',
	'vmp_lord',
	'vmp_mannfred_von_carstein',
	'vmp_master_necromancer',
	'vmp_necromancer',
	'vmp_vampire',
	'vmp_wight_king',
	'wh2_dlc09_skv_tretch_craventail',
	'wh2_dlc09_tmb_arkhan',
	'wh2_dlc09_tmb_khalida',
	'wh2_dlc09_tmb_khatep',
	'wh2_dlc09_tmb_liche_priest_death',
	'wh2_dlc09_tmb_liche_priest_light',
	'wh2_dlc09_tmb_liche_priest_nehekhara',
	'wh2_dlc09_tmb_liche_priest_shadow',
	'wh2_dlc09_tmb_necrotect',
	'wh2_dlc09_tmb_necrotect_ritual',
	'wh2_dlc09_tmb_settra',
	'wh2_dlc09_tmb_tomb_king',
	'wh2_dlc09_tmb_tomb_king_alkhazzar_ii',
	'wh2_dlc09_tmb_tomb_king_lahmizzash',
	'wh2_dlc09_tmb_tomb_king_rakhash',
	'wh2_dlc09_tmb_tomb_king_setep',
	'wh2_dlc09_tmb_tomb_king_thutep',
	'wh2_dlc09_tmb_tomb_king_wakhaf',
	'wh2_dlc09_tmb_tomb_prince',
	'wh2_dlc10_def_crone_hellebron',
	'wh2_dlc10_def_mon_war_hydra_boss',
	'wh2_dlc10_def_sorceress_beasts',
	'wh2_dlc10_def_sorceress_death',
	'wh2_dlc10_def_supreme_sorceress_beasts',
	'wh2_dlc10_def_supreme_sorceress_dark',
	'wh2_dlc10_def_supreme_sorceress_death',
	'wh2_dlc10_def_supreme_sorceress_fire',
	'wh2_dlc10_def_supreme_sorceress_shadow',
	'wh2_dlc10_hef_alarielle',
	'wh2_dlc10_hef_alith_anar',
	'wh2_dlc10_hef_handmaiden',
	'wh2_dlc10_hef_mage_heavens',
	'wh2_dlc10_hef_mage_shadows',
	'wh2_dlc10_hef_shadow_walker',
	'wh2_dlc10_lzd_mon_carnosaur_boss',
	'wh2_dlc10_nor_phoenix_flamespyre_boss',
	'wh2_dlc10_skv_mon_hell_pit_abomination_boss',
	'wh2_dlc11_cst_admiral',
	'wh2_dlc11_cst_admiral_death',
	'wh2_dlc11_cst_admiral_deep',
	'wh2_dlc11_cst_admiral_fem',
	'wh2_dlc11_cst_admiral_fem_death',
	'wh2_dlc11_cst_admiral_fem_deep',
	'wh2_dlc11_cst_admiral_fem_vampires',
	'wh2_dlc11_cst_admiral_tech_01',
	'wh2_dlc11_cst_admiral_tech_02',
	'wh2_dlc11_cst_admiral_tech_03',
	'wh2_dlc11_cst_admiral_tech_04',
	'wh2_dlc11_cst_admiral_vampires',
	'wh2_dlc11_cst_aranessa',
	'wh2_dlc11_cst_cylostra',
	'wh2_dlc11_cst_fleet_captain',
	'wh2_dlc11_cst_fleet_captain_death',
	'wh2_dlc11_cst_fleet_captain_deep',
	'wh2_dlc11_cst_fleet_captain_vampires',
	'wh2_dlc11_cst_ghost_paladin',
	'wh2_dlc11_cst_gunnery_wight',
	'wh2_dlc11_cst_harkon',
	'wh2_dlc11_cst_mourngul',
	'wh2_dlc11_cst_noctilus',
	'wh2_dlc11_def_lokhir',
	'wh2_dlc11_vmp_bloodline_blood_dragon',
	'wh2_dlc11_vmp_bloodline_lahmian',
	'wh2_dlc11_vmp_bloodline_necrarch',
	'wh2_dlc11_vmp_bloodline_strigoi',
	'wh2_dlc11_vmp_bloodline_von_carstein',
	'wh2_dlc12_lzd_lord_kroak',
	'wh2_dlc12_lzd_lord_kroak_boss',
	'wh2_dlc12_lzd_red_crested_skink_chief',
	'wh2_dlc12_lzd_red_crested_skink_chief_legendary',
	'wh2_dlc12_lzd_tehenhauin',
	'wh2_dlc12_lzd_tiktaqto',
	'wh2_dlc12_lzd_tlaqua_skink_chief',
	'wh2_dlc12_lzd_tlaqua_skink_priest_beasts',
	'wh2_dlc12_lzd_tlaqua_skink_priest_heavens',
	'wh2_dlc12_skv_ikit_claw',
	'wh2_dlc12_skv_warlock_master',
	'wh2_dlc13_emp_cha_huntsmarshal',
	'wh2_dlc13_emp_cha_huntsmarshal_0',
	'wh2_dlc13_emp_cha_markus_wulfhart',
	'wh2_dlc13_emp_cha_markus_wulfhart_0',
	'wh2_dlc13_emp_hunter_doctor_hertwig_van_hal',
	'wh2_dlc13_emp_hunter_jorek_grimm',
	'wh2_dlc13_emp_hunter_kalara_of_wydrioth',
	'wh2_dlc13_emp_hunter_rodrik_l_anguille',
	'wh2_dlc13_lzd_gor_rok',
	'wh2_dlc13_lzd_kroxigor_ancient',
	'wh2_dlc13_lzd_kroxigor_ancient_horde',
	'wh2_dlc13_lzd_nakai',
	'wh2_dlc13_lzd_red_crested_skink_chief_horde',
	'wh2_dlc13_lzd_saurus_old_blood_horde',
	'wh2_dlc13_lzd_skink_chief_horde',
	'wh2_dlc13_lzd_slann_mage_priest_fire',
	'wh2_dlc13_lzd_slann_mage_priest_fire_horde',
	'wh2_dlc13_lzd_slann_mage_priest_high',
	'wh2_dlc13_lzd_slann_mage_priest_high_horde',
	'wh2_dlc13_lzd_slann_mage_priest_life',
	'wh2_dlc13_lzd_slann_mage_priest_life_horde',
	'wh2_dlc14_brt_henri_le_massif',
	'wh2_dlc14_brt_repanse',
	'wh2_dlc14_def_high_beastmaster',
	'wh2_dlc14_def_malus_darkblade',
	'wh2_dlc14_def_malus_darkblade_mp',
	'wh2_dlc14_def_master',
	'wh2_dlc14_dummy_tzarkan',
	'wh2_dlc14_skv_deathmaster_snikch',
	'wh2_dlc14_skv_eshin_sorcerer',
	'wh2_dlc14_skv_master_assassin',
	'wh2_dlc15_grn_goblin_great_shaman_raknik',
	'wh2_dlc15_grn_grom_the_paunch',
	'wh2_dlc15_grn_orc_warboss_oglok',
	'wh2_dlc15_grn_river_troll_hag',
	'wh2_dlc15_hef_archmage_beasts',
	'wh2_dlc15_hef_archmage_death',
	'wh2_dlc15_hef_archmage_fire',
	'wh2_dlc15_hef_archmage_heavens',
	'wh2_dlc15_hef_archmage_high',
	'wh2_dlc15_hef_archmage_life',
	'wh2_dlc15_hef_archmage_light',
	'wh2_dlc15_hef_archmage_metal',
	'wh2_dlc15_hef_archmage_shadows',
	'wh2_dlc15_hef_black_dragon_boss_imrik',
	'wh2_dlc15_hef_eltharion',
	'wh2_dlc15_hef_forest_dragon_boss_imrik',
	'wh2_dlc15_hef_imrik',
	'wh2_dlc15_hef_mage_beasts',
	'wh2_dlc15_hef_mage_death',
	'wh2_dlc15_hef_mage_fire',
	'wh2_dlc15_hef_mage_metal',
	'wh2_dlc15_hef_moon_dragon_boss_imrik',
	'wh2_dlc15_hef_star_dragon_boss_imrik',
	'wh2_dlc15_hef_sun_dragon_boss_imrik',
	'wh2_dlc16_skv_chieftain',
	'wh2_dlc16_skv_ghoritch',
	'wh2_dlc16_skv_ghoritch_boss',
	'wh2_dlc16_skv_packmaster',
	'wh2_dlc16_skv_throt_the_unclean',
	'wh2_dlc16_wef_ariel',
	'wh2_dlc16_wef_coeddil',
	'wh2_dlc16_wef_coeddil_qb',
	'wh2_dlc16_wef_drycha',
	'wh2_dlc16_wef_malicious_ancient_treeman_beasts',
	'wh2_dlc16_wef_malicious_ancient_treeman_life',
	'wh2_dlc16_wef_malicious_ancient_treeman_shadows',
	'wh2_dlc16_wef_malicious_branchwraith_beasts',
	'wh2_dlc16_wef_malicious_branchwraith_life',
	'wh2_dlc16_wef_malicious_branchwraith_shadows',
	'wh2_dlc16_wef_sisters_of_twilight',
	'wh2_dlc16_wef_spellweaver_beasts',
	'wh2_dlc16_wef_spellweaver_dark',
	'wh2_dlc16_wef_spellweaver_high',
	'wh2_dlc16_wef_spellweaver_life',
	'wh2_dlc16_wef_spellweaver_shadows',
	'wh2_dlc17_bst_doombull',
	'wh2_dlc17_bst_taurox',
	'wh2_dlc17_bst_wargor',
	'wh2_dlc17_dwf_thane_ghost_artifact',
	'wh2_dlc17_dwf_thorek',
	'wh2_dlc17_lzd_mon_dread_saurian_qb_boss',
	'wh2_dlc17_lzd_oxyotl',
	'wh2_dlc17_lzd_skink_oracle_troglodon',
	'wh2_dlc17_vmp_kevon_lloydstein',
	'wh2_main_def_black_ark',
	'wh2_main_def_black_ark_blessed_dread',
	'wh2_main_def_death_hag',
	'wh2_main_def_dreadlord',
	'wh2_main_def_dreadlord_fem',
	'wh2_main_def_khainite_assassin',
	'wh2_main_def_malekith',
	'wh2_main_def_morathi',
	'wh2_main_def_sorceress_dark',
	'wh2_main_def_sorceress_fire',
	'wh2_main_def_sorceress_shadow',
	'wh2_main_hef_loremaster_of_hoeth',
	'wh2_main_hef_mage_high',
	'wh2_main_hef_mage_life',
	'wh2_main_hef_mage_light',
	'wh2_main_hef_noble',
	'wh2_main_hef_prince',
	'wh2_main_hef_princess',
	'wh2_main_hef_prince_alastar',
	'wh2_main_hef_teclis',
	'wh2_main_hef_tyrion',
	'wh2_main_lzd_kroq_gar',
	'wh2_main_lzd_lord_mazdamundi',
	'wh2_main_lzd_saurus_old_blood',
	'wh2_main_lzd_saurus_scar_veteran',
	'wh2_main_lzd_skink_chief',
	'wh2_main_lzd_skink_priest_beasts',
	'wh2_main_lzd_skink_priest_heavens',
	'wh2_main_lzd_slann_mage_priest',
	'wh2_main_lzd_slann_mage_priest_horde',
	'wh2_main_skv_assassin',
	'wh2_main_skv_grey_seer_plague',
	'wh2_main_skv_grey_seer_ruin',
	'wh2_main_skv_lord_skrolk',
	'wh2_main_skv_plague_priest',
	'wh2_main_skv_plague_priest_ritual',
	'wh2_main_skv_queek_headtaker',
	'wh2_main_skv_warlock_engineer',
	'wh2_main_skv_warlock_engineer_ritual',
	'wh2_main_skv_warlord',
	'wh2_pro07_emp_amethyst_wizard',
	'wh2_pro08_neu_felix',
	'wh2_pro08_neu_gotrek',
	'wh2_pro09_grn_black_orc_big_boss',
	'wh2_twa02_wef_glade_captain',
	'wh2_twa03_def_rakarth',
	'wh2_twa04_bst_great_bray_shaman_beasts',
	'wh2_twa04_bst_great_bray_shaman_death',
	'wh2_twa04_bst_great_bray_shaman_shadows',
	'wh2_twa04_bst_great_bray_shaman_wild',
	'wh3_demo_kho_cha_exalted_bloodthirster',
	'wh3_demo_nur_exalted_great_unclean_one_nurgle',
	'wh3_main_cth_alchemist',
	'wh3_main_cth_astromancer',
	'wh3_main_cth_dragon_blooded_shugengan_yang',
	'wh3_main_cth_dragon_blooded_shugengan_yin',
	'wh3_main_cth_lord_caravan_master',
	'wh3_main_cth_lord_magistrate_yang',
	'wh3_main_cth_lord_magistrate_yin',
	'wh3_main_cth_miao_ying',
	'wh3_main_cth_zhao_ming',
	'wh3_main_dae_belakor',
	'wh3_main_dae_daemon_prince',
	'wh3_main_dae_daemon_prince_khorne',
	'wh3_main_dae_daemon_prince_khorne_fe',
	'wh3_main_dae_daemon_prince_nurgle',
	'wh3_main_dae_daemon_prince_nurgle_fe',
	'wh3_main_dae_daemon_prince_slaanesh',
	'wh3_main_dae_daemon_prince_slaanesh_fe',
	'wh3_main_dae_daemon_prince_tzeentch',
	'wh3_main_dae_daemon_prince_tzeentch_fe',
	'wh3_main_kho_bloodreaper',
	'wh3_main_kho_cultist',
	'wh3_main_kho_exalted_bloodthirster',
	'wh3_main_kho_herald_of_khorne',
	'wh3_main_kho_herald_of_khorne_khorne_spawned_army',
	'wh3_main_kho_skarbrand',
	'wh3_main_ksl_ataman',
	'wh3_main_ksl_boris',
	'wh3_main_ksl_boyar',
	'wh3_main_ksl_frost_maiden_ice',
	'wh3_main_ksl_frost_maiden_tempest',
	'wh3_main_ksl_ice_witch_ice',
	'wh3_main_ksl_ice_witch_tempest',
	'wh3_main_ksl_katarin',
	'wh3_main_ksl_kostaltyn',
	'wh3_main_ksl_patriarch',
	'wh3_main_nur_cultist',
	'wh3_main_nur_cultist_plague_ritual',
	'wh3_main_nur_exalted_great_unclean_one_death',
	'wh3_main_nur_exalted_great_unclean_one_nurgle',
	'wh3_main_nur_herald_of_nurgle_death',
	'wh3_main_nur_herald_of_nurgle_nurgle',
	'wh3_main_nur_kugath',
	'wh3_main_nur_plagueridden_death',
	'wh3_main_nur_plagueridden_nurgle',
	'wh3_main_ogr_butcher_beasts',
	'wh3_main_ogr_butcher_great_maw',
	'wh3_main_ogr_firebelly',
	'wh3_main_ogr_greasus_goldtooth',
	'wh3_main_ogr_hunter',
	'wh3_main_ogr_skrag_the_slaughterer',
	'wh3_main_ogr_slaughtermaster_beasts',
	'wh3_main_ogr_slaughtermaster_great_maw',
	'wh3_main_ogr_tyrant',
	'wh3_main_ogr_tyrant_camp',
	'wh3_main_pro_kho_bloodthirster',
	'wh3_main_pro_kho_cultist',
	'wh3_main_pro_kho_herald_of_khorne',
	'wh3_main_pro_ksl_boyar',
	'wh3_main_pro_ksl_cha_yuri_0_1',
	'wh3_main_pro_ksl_cha_yuri_0_2',
	'wh3_main_pro_ksl_cha_yuri_0_3',
	'wh3_main_pro_ksl_frost_maiden_ice',
	'wh3_main_pro_ksl_gerik_0',
	'wh3_main_pro_ksl_patriarch',
	'wh3_main_pro_ksl_sergi_0',
	'wh3_main_pro_ksl_yuri_0',
	'wh3_main_pro_ksl_yuri_1',
	'wh3_main_pro_ksl_yuri_2',
	'wh3_main_pro_ksl_yuri_3',
	'wh3_main_pro_ksl_yuri_4',
	'wh3_main_pro_slavin_0',
	'wh3_main_pro_tze_cultist',
	'wh3_main_pro_tze_herald_of_tzeentch_tzeentch',
	'wh3_main_sla_alluress_shadow',
	'wh3_main_sla_alluress_slaanesh',
	'wh3_main_sla_cultist',
	'wh3_main_sla_exalted_keeper_of_secrets_shadow',
	'wh3_main_sla_exalted_keeper_of_secrets_slaanesh',
	'wh3_main_sla_herald_of_slaanesh_shadow',
	'wh3_main_sla_herald_of_slaanesh_slaanesh',
	'wh3_main_sla_herald_of_slaanesh_slaanesh_disciple_army',
	'wh3_main_sla_nkari',
	'wh3_main_tze_cultist',
	'wh3_main_tze_exalted_lord_of_change_metal',
	'wh3_main_tze_exalted_lord_of_change_tzeentch',
	'wh3_main_tze_herald_of_tzeentch_metal',
	'wh3_main_tze_herald_of_tzeentch_tzeentch',
	'wh3_main_tze_iridescent_horror_metal',
	'wh3_main_tze_iridescent_horror_tzeentch',
	'wh3_main_tze_kairos',
	'wh3_prologue_apostles_of_change_chaos_knights',
	'wh3_prologue_general_test',
	'wh3_survival_dae_cha_belakor_01',
	'wh3_survival_kho_cha_daemon_prince_of_khorne',
	'wh3_survival_kho_cha_daemon_prince_of_khorne_fe',
	'wh3_survival_nur_cha_daemon_prince_of_nurgle',
	'wh3_survival_nur_cha_daemon_prince_of_nurgle_fe',
	'wh3_survival_sla_cha_daemon_prince_of_slaanesh',
	'wh3_survival_sla_cha_daemon_prince_of_slaanesh_fe',
	'wh3_survival_tze_cha_daemon_prince_of_tzeentch',
	'wh3_survival_tze_cha_daemon_prince_of_tzeentch_fe',
	'wh_dlc01_chs_kholek_suneater',
	'wh_dlc01_chs_prince_sigvald',
	'wh_dlc01_chs_sorcerer_lord_death',
	'wh_dlc01_chs_sorcerer_lord_fire',
	'wh_dlc01_chs_sorcerer_lord_metal',
	'wh_dlc01_nor_sorcerer_lord_metal',
	'wh_dlc03_bst_beastlord',
	'wh_dlc03_bst_bray_shaman_beasts',
	'wh_dlc03_bst_bray_shaman_death',
	'wh_dlc03_bst_bray_shaman_shadows',
	'wh_dlc03_bst_bray_shaman_wild',
	'wh_dlc03_bst_gorebull',
	'wh_dlc03_bst_khazrak',
	'wh_dlc03_bst_malagor',
	'wh_dlc03_emp_amber_wizard',
	'wh_dlc03_emp_boris_todbringer',
	'wh_dlc04_emp_arch_lector',
	'wh_dlc04_emp_volkmar',
	'wh_dlc04_vmp_helman_ghorst',
	'wh_dlc04_vmp_strigoi_ghoul_king',
	'wh_dlc04_vmp_vlad_con_carstein',
	'wh_dlc05_bst_morghur',
	'wh_dlc05_emp_grey_wizard',
	'wh_dlc05_emp_jade_wizard',
	'wh_dlc05_vmp_red_duke',
	'wh_dlc05_vmp_vampire_shadow',
	'wh_dlc05_wef_ancient_treeman',
	'wh_dlc05_wef_branchwraith',
	'wh_dlc05_wef_durthu',
	'wh_dlc05_wef_glade_lord',
	'wh_dlc05_wef_glade_lord_fem',
	'wh_dlc05_wef_orion',
	'wh_dlc05_wef_spellsinger_beasts',
	'wh_dlc05_wef_spellsinger_life',
	'wh_dlc05_wef_spellsinger_shadow',
	'wh_dlc05_wef_waystalker',
	'wh_dlc06_dwf_belegar',
	'wh_dlc06_dwf_master_engineer_ghost',
	'wh_dlc06_dwf_runelord',
	'wh_dlc06_dwf_runesmith_ghost',
	'wh_dlc06_dwf_thane_ghost_1',
	'wh_dlc06_dwf_thane_ghost_2',
	'wh_dlc06_grn_night_goblin_warboss',
	'wh_dlc06_grn_skarsnik',
	'wh_dlc06_grn_wurrzag_da_great_prophet',
	'wh_dlc07_brt_alberic',
	'wh_dlc07_brt_damsel_beasts',
	'wh_dlc07_brt_damsel_life',
	'wh_dlc07_brt_fay_enchantress',
	'wh_dlc07_brt_green_knight',
	'wh_dlc07_brt_prophetess_beasts',
	'wh_dlc07_brt_prophetess_heavens',
	'wh_dlc07_brt_prophetess_life',
	'wh_dlc07_chs_chaos_sorcerer_shadow',
	'wh_dlc07_chs_sorcerer_lord_shadow',
	'wh_dlc08_bst_cygor_boss',
	'wh_dlc08_chs_challenger_khorne',
	'wh_dlc08_chs_challenger_nurgle',
	'wh_dlc08_chs_challenger_slaanesh',
	'wh_dlc08_chs_challenger_tzeentch',
	'wh_dlc08_chs_dragon_ogre_shaggoth_boss',
	'wh_dlc08_grn_giant_boss',
	'wh_dlc08_grn_venom_queen_boss',
	'wh_dlc08_nor_arzik',
	'wh_dlc08_nor_fimir_balefiend_fire',
	'wh_dlc08_nor_fimir_balefiend_shadow',
	'wh_dlc08_nor_frost_wyrm_boss',
	'wh_dlc08_nor_kihar',
	'wh_dlc08_nor_shaman_sorcerer_death',
	'wh_dlc08_nor_shaman_sorcerer_fire',
	'wh_dlc08_nor_shaman_sorcerer_metal',
	'wh_dlc08_nor_skin_wolf_werekin',
	'wh_dlc08_nor_throgg',
	'wh_dlc08_nor_wulfrik',
	'wh_dlc08_vmp_terrorgheist_boss',
	'wh_dlc08_wef_forest_dragon_boss',
	'wh_main_brt_damsel_heavens',
	'wh_main_brt_lord',
	'wh_main_brt_louen_leoncouer',
	'wh_main_brt_paladin',
	'wh_main_chs_archaon',
	'wh_main_chs_chaos_sorcerer_death',
	'wh_main_chs_chaos_sorcerer_fire',
	'wh_main_chs_chaos_sorcerer_metal',
	'wh_main_chs_exalted_hero',
	'wh_main_chs_lord',
	'wh_main_chs_lord_of_change',
	'wh_main_dwf_lord',
	'wh_main_dwf_master_engineer',
	'wh_main_dwf_runesmith',
	'wh_main_dwf_thane',
	'wh_main_dwf_thorgrim_grudgebearer',
	'wh_main_dwf_ungrim_ironfist',
	'wh_main_emp_balthasar_gelt',
	'wh_main_emp_bright_wizard',
	'wh_main_emp_captain',
	'wh_main_emp_celestial_wizard',
	'wh_main_emp_karl_franz',
	'wh_main_emp_light_wizard',
	'wh_main_emp_lord',
	'wh_main_emp_warrior_priest',
	'wh_main_emp_witch_hunter',
	'wh_main_grn_azhag_the_slaughterer',
	'wh_main_grn_goblin_big_boss',
	'wh_main_grn_goblin_great_shaman',
	'wh_main_grn_grimgor_ironhide',
	'wh_main_grn_night_goblin_shaman',
	'wh_main_grn_orc_shaman',
	'wh_main_grn_orc_warboss',
	'wh_main_nor_chaos_sorcerer_metal',
	'wh_main_nor_marauder_chieftain',
	'wh_main_teb_bright_wizard',
	'wh_main_teb_captain',
	'wh_main_teb_lord',
	'wh_main_vmp_banshee',
	'wh_main_vmp_heinrich_kemmler',
	'wh_main_vmp_lord',
	'wh_main_vmp_mannfred_von_carstein',
	'wh_main_vmp_master_necromancer',
	'wh_main_vmp_necromancer',
	'wh_main_vmp_vampire_death',
	'wh_main_vmp_wight_king',
	'wh_pro01_dwf_grombrindal',
	'wh_pro02_vmp_isabella_von_carstein',
] as const;
// cultures
export const culture_min_loc = {
	'*': '*',
	'wh_dlc03_bst_beastmen': 'bst',
	'wh_dlc05_wef_wood_elves': 'wef',
	'wh_dlc08_nor_norsca': 'nor',
	'wh_main_brt_bretonnia': 'brt',
	'wh_main_chs_chaos': 'chs',
	'wh_main_dwf_dwarfs': 'dwf',
	'wh3_dlc23_chd_chaos_dwarfs': 'chd',
	'wh_main_emp_empire': 'emp',
	'wh_main_grn_greenskins': 'grn',
	'wh_main_vmp_vampire_counts': 'vmp',
	'wh2_dlc09_tmb_tomb_kings': 'tmb',
	'wh2_dlc11_cst_vampire_coast': 'cst',
	'wh2_main_def_dark_elves': 'def',
	'wh2_main_hef_high_elves': 'hef',
	'wh2_main_lzd_lizardmen': 'lzd',
	'wh2_main_rogue': 'rogue',
	'wh2_main_skv_skaven': 'skv',
	'wh3_main_cth_cathay': 'cth',
	'wh3_main_dae_daemons': 'dae',
	'wh3_main_kho_khorne': 'kho',
	'wh3_main_ksl_kislev': 'ksl',
	'wh3_main_nur_nurgle': 'nur',
	'wh3_main_ogr_ogre_kingdoms': 'ogr',
	'wh3_main_pro_ksl_kislev': false, // 'pro_ksl',
	'wh3_main_sla_slaanesh': 'sla',
	'wh3_main_tze_tzeentch': 'tze',
};
const cultures = Object.keys(culture_min_loc) as (keyof typeof culture_min_loc)[];
// campaigns
const campaign_loc = {
	'main_warhammer': 'Mortal Empires',
	'wh2_main_great_vortex': 'Vortex',
	'wh3_main_prologue': 'Prologue',
	'wh3_main_combi': 'Vortex',
	'wh3_main_chaos': 'Chaos',
} as const;
// unit_castes (caste, @localised_name)
const unit_castes = [
	'chariot',
	'generic',
	'hero',
	'lord',
	'melee_cavalry',
	'melee_infantry',
	'missile_cavalry',
	'missile_infantry',
	'monster',
	'monstrous_cavalry',
	'monstrous_infantry',
	'war_beast',
	'warmachine',
] as const;
// corruption
export const corruption_loc = {
	wh3_main_corruption_vampiric: 'Vampiric',
	wh3_main_corruption_chaos: 'Chaos',
	wh3_main_corruption_skaven: 'Skaven',
	wh3_main_corruption_khorne: 'Khorne',
	wh3_main_corruption_nurgle: 'Nurgle',
	wh3_main_corruption_tzeentch: 'Tzeentch',
	wh3_main_corruption_slaanesh: 'Slaanesh',
} as const;
export type AgentType = keyof typeof agent_loc;
export type AgentSubtype = typeof agent_subtypes[number];
export type CultureType = typeof cultures[number];
export type CampaignType = keyof typeof campaign_loc;
export type UnitCasteType = typeof unit_castes[number];
export type CorruptionType = keyof typeof corruption_loc;
type BugType = { value: boolean; description: string; };
export type _BugType = boolean | string | BugType | BugType[];
export const TransformBug = (v: _BugType | undefined): BugType => {
	if (typeof v === 'object') {
		if (v instanceof Array) {
			let value = false;
			let description: string[] = [];
			for (const q of v) {
				if (q.value) { value = true; }
				description.push(q.description);
			}
			return { value, description: description.join(';\n\n') };
		}
		return v;
	} else if (typeof v === 'string') {
		return { value: true, description: v };
	} else if (typeof v === 'boolean') {
		return { value: v, description: '' };
	} else { // if (typeof v === 'undefined')
		return { value: false, description: '' };
	}
};
export interface IDataCondition {
	/** Юзер должен быть осторожен, когда читает данный кондишн */
	careful?: boolean;
	/** Глупые разработчики CA
	 * Кондишн никогда не вызывается (alwaysFalse)
	 * За исключением, если не указывать как Array
	 */
	bug?: _BugType;
	/** Условие предотвращает выдачу ancillary, если такой уже есть у character */
	prevent?: boolean;
	/** Уникальный ancillary; prevent по умолчанию */
	unique?: boolean;
	/** В lua прямо прописано, что нельзя давать ancillary to AI */
	onlyPlayer?: boolean;
	/** Баг от CA. Только атакующий/защищающийся генерал вернёт true */
	onlyMainLord?: boolean;
	/** Для createTrigger with event = CharacterTurn and text with chain_or_superchain */
	turnOwnRegion?: boolean;
	// turnEnemy?: boolean;
	/** Для normal */
	hasRegion?: boolean | 'sea';
	hasArmy?: boolean; // wh_main_anc_follower_greenskins_shroom_gathera
	canEquip?: boolean;
	// TODO "with reinforcing army" -> allowed: agent: general hasArmy
	// TODO "in the opposing force" or character_won_battle_against_unit BUG
	// TODO  in region (1 turn own)
	// TODO  and win a battle
	// TODO "Rank Up and have an ability to recruit" (char_can_recruit_unit) -> allowed: agent: general hasArmy
	allowed?:// AllowedFor[] |
	{
		//default?: AllowedFor[];
		agent?: AgentType[];
		agent_subtype?: AgentSubtype[];
		culture?: CultureType[];
		subculture?: SubCultureType[];
		pooled_resource?: string[];
	};
	forbid?: {
		agent?: AgentType[];
		agent_subtype?: AgentSubtype[];
	};
	against?: {
		culture?: CultureType[];
		subculture?: SubCultureType[];
	}
	text: () => string;
}
export interface IDataAncillary {
	/** В условии допущена роковая ошибка, которая не позволит получить данный фолловер */
	impossible?: boolean;
	// cultureList: CultureType[];
	// title: string;
	// effectList: string[];
	chance: number;
	key: string;
	/** if for some reason CA decided to repeat the same drop with the same chance */
	repeat?: number;
}
export interface ITrigger {
	event: Events;
	condition: IDataCondition[];
	ancillaryList: IDataAncillary[];
}

export interface IGetChance {
	// (trigger: ITrigger, ancillary: IDataAncillary): number | undefined | void;
	(context: IContext): number | undefined;
}
export interface IEffect {
	row: IEntry;
	effect: IEntry;
	scope: IEntry | null;
}
export interface ICAncillary {
	ancillary: IEntry;
	icon: string;
	agentList: string[];
	effectList: IEffect[];
	toAgent: AgentType[];
	toAgentSubtype: AgentSubtype[];

	subcultureList: SubCultureType[];
	cultureList: CultureType[];
}
export type ICGroupBy = {
	by: 'culture';
	cultureKey: CultureType;
	subcultureSubset: SubCultureType[];
} | {
	by: 'subculture';
	cultureKey: CultureType;
	subculture: SubCultureType;
}
export interface IContext {
	ancillary: ICAncillary;
	ancData: IDataAncillary;
	group: ICGroupBy;
	trigger: ITrigger;
	event: Events;
	condition: IDataCondition;
	campaign?: CampaignType;
}
export type IDataCulture = Map<CultureType, {
	title: string;
	description?: string;
}>
export interface IDataSpawn {
	[K: string]: {
		forename: string;
		surname: string;
	};
}

export const enum Events {
	AdviceCleared,
	AdviceDismissed,
	AdviceFinishedTrigger,
	AdviceIssued,
	AdviceLevelChanged,
	AdviceNavigated,
	AdviceSuperseded,
	AreaCameraEntered,
	AreaEntered,
	AreaExited,
	ArmyBribeAttemptFailure,
	ArmySabotageAttemptFailure,
	ArmySabotageAttemptSuccess,
	BattleAideDeCampEvent,
	BattleBoardingActionCommenced,
	BattleCommandingShipRouts,
	BattleCommandingUnitRouts,
	BattleCompleted,
	BattleCompletedCameraMove,
	BattleConflictPhaseCommenced,
	BattleDeploymentPhaseCommenced,
	BattleFortPlazaCaptureCommenced,
	BattleSessionEnded,
	BattleShipAttacksEnemyShip,
	BattleShipCaughtFire,
	BattleShipMagazineExplosion,
	BattleShipRouts,
	BattleShipRunAground,
	BattleShipSailingIntoWind,
	BattleShipSurrendered,
	BattleTimeTrigger,
	BattleUnitAttacksBuilding,
	BattleUnitAttacksEnemyUnit,
	BattleUnitAttacksWalls,
	BattleUnitCapturesBuilding,
	BattleUnitDestroysBuilding,
	BattleUnitRouts,
	BattleUnitUsingBuilding,
	BattleUnitUsingWall,
	BuildingCardSelected,
	BuildingCompleted,
	BuildingConstructionIssuedByPlayer,
	BuildingInfoPanelOpenedCampaign,
	CameraMoverCancelled,
	CameraMoverFinished,
	CampaignArmiesMerge,
	CampaignBuildingDamaged,
	CampaignCoastalAssaultOnCharacter,
	CampaignCoastalAssaultOnGarrison,
	CampaignEffectsBundleAwarded,
	CampaignSessionEnded,
	CampaignSettlementAttacked,
	CampaignTimeTrigger,
	CharacterAncillaryGained,
	CharacterAssignedToPost,
	CharacterAttacksAlly,
	CharacterBecomesFactionLeader,
	CharacterBesiegesSettlement,
	CharacterBlockadedPort,
	CharacterBrokePortBlockade,
	CharacterBuildingCompleted,
	CharacterCanLiberate,
	CharacterCandidateBecomesMinister,
	CharacterCapturedSettlementUnopposed, // TODO only for lord?
	CharacterCharacterTargetAction,
	CharacterComesOfAge,
	CharacterCompletedBattle,
	CharacterConvalescedOrKilled,
	CharacterCreated,
	CharacterDamagedByDisaster,
	CharacterDeselected,
	CharacterDiscovered,
	CharacterDisembarksNavy,
	CharacterEmbarksNavy,
	CharacterEntersAttritionalArea,
	CharacterEntersGarrison,
	CharacterFactionCompletesResearch,
	CharacterFamilyRelationDied,
	CharacterFinishedMovingEvent,
	CharacterGarrisonTargetAction,
	CharacterInfoPanelOpened,
	CharacterLeavesGarrison,
	CharacterLootedSettlement,
	CharacterMarriage,
	CharacterMilitaryForceTraditionPointAllocated,
	CharacterMilitaryForceTraditionPointAvailable,
	CharacterParticipatedAsSecondaryGeneralInBattle,
	CharacterPerformsActionAgainstFriendlyTarget,
	CharacterPerformsSettlementOccupationDecision,
	CharacterPostBattleCaptureOption,
	CharacterPostBattleEnslave,
	CharacterPostBattleRelease,
	CharacterPostBattleSlaughter,
	CharacterPromoted,
	CharacterRankUp,
	CharacterRankUpNeedsAncillary,
	CharacterRazedSettlement,
	CharacterRelativeKilled,
	CharacterReplacingGeneral,
	CharacterSackedSettlement,
	CharacterSelected,
	CharacterSettlementBesieged,
	CharacterSettlementBlockaded,
	CharacterSkillPointAllocated,
	CharacterSkillPointAvailable,
	CharacterSuccessfulArmyBribe,
	CharacterSuccessfulConvert,
	CharacterSuccessfulDemoralise,
	CharacterSuccessfulInciteRevolt,
	CharacterTurnEnd,
	CharacterTurnStart,
	CharacterWaaaghOccurred,
	CharacterWithdrewFromBattle,
	ClanBecomesVassal,
	ClimatePhaseChange,
	ComponentCreated,
	ComponentLClickUp,
	ComponentLinkClicked,
	ComponentLinkMouseOver,
	ComponentMouseOn,
	ComponentMoved,
	ComponentRClickUp,
	ConvertAttemptFailure,
	CustomLoadingScreenCreated,
	DebugCharacterEvent,
	DebugFactionEvent,
	DebugRegionEvent,
	DemoraliseAttemptFailure,
	DilemmaChoiceMadeEvent,
	DilemmaIssuedEvent,
	DilemmaOrIncidentStarted,
	DillemaOrIncidentStarted,
	DiplomacyNegotiationStarted,
	DiplomaticOfferRejected,
	DuelDemanded,
	DummyEvent,
	EncylopediaEntryRequested,
	EventMessageOpenedBattle,
	EventMessageOpenedCampaign,
	FactionAboutToEndTurn,
	FactionBecomesLiberationProtectorate,
	FactionBecomesLiberationVassal,
	FactionBecomesWorldLeader,
	FactionBeginTurnPhaseNormal,
	FactionCapturesWorldCapital,
	FactionCivilWarOccured,
	FactionCookedDish,
	FactionEncountersOtherFaction,
	FactionFameLevelUp,
	FactionGovernmentTypeChanged,
	FactionHordeStatusChange,
	FactionJoinsConfederation,
	FactionLeaderDeclaresWar,
	FactionLeaderIssuesEdict,
	FactionLeaderSignsPeaceTreaty,
	FactionLiberated,
	FactionRoundStart,
	FactionSubjugatesOtherFaction,
	FactionTurnEnd,
	FactionTurnStart,
	FirstTickAfterNewCampaignStarted,
	FirstTickAfterWorldCreated,
	ForceAdoptsStance,
	ForcePlagueStateChanged,
	ForeignSlotBuildingCompleteEvent,
	ForeignSlotBuildingDamagedEvent,
	ForeignSlotManagerDiscoveredEvent,
	ForeignSlotManagerRemovedEvent,
	FortSelected,
	FrontendScreenTransition,
	GarrisonAttackedEvent,
	GarrisonOccupiedEvent, // TODO only for lord?
	GarrisonResidenceCaptured,
	GarrisonResidenceExposedToFaction,
	GovernorAssignedCharacterEvent,
	GovernorshipTaxRateChanged,
	HaveCharacterWithinRangeOfPositionMissionEvaluationResultEvent,
	HelpPageIndexGenerated,
	HeroCharacterParticipatedInBattle,
	HistoricBattleEvent,
	HistoricalCharacters,
	HistoricalEvents,
	HudRefresh,
	ImprisonmenRejectiontEvent,
	ImprisonmentEvent,
	IncidentEvent,
	IncidentFailedEvent,
	IncidentOccuredEvent,
	InciteRevoltAttemptFailure,
	IncomingMessage,
	LandTradeRouteRaided,
	LoadingGame,
	LoadingScreenAfterEnvCreated,
	LoadingScreenDismissed,
	LocationEntered,
	LocationUnveiled,
	MPLobbyChatCreated,
	MapIconMoved,
	MilitaryForceBuildingCompleteEvent,
	MilitaryForceCreated,
	MilitaryForceDevelopmentPointChange,
	MissionCancelled,
	MissionFailed,
	MissionGenerationFailed,
	MissionIssued,
	MissionNearingExpiry,
	MissionSucceeded,
	ModelCreated,
	MovementPointsExhausted,
	MultiTurnMove,
	NegativeDiplomaticEvent,
	NewCampaignStarted,
	NewCharacterEnteredRecruitmentPool,
	NewSession,
	NominalDifficultyLevelChangedEvent,
	PanelAdviceRequestedBattle,
	PanelAdviceRequestedCampaign,
	PanelClosedBattle,
	PanelClosedCampaign,
	PanelOpenedBattle,
	PanelOpenedCampaign,
	PendingActionsMaskReset,
	PendingBankruptcy,
	PendingBattle,
	PooledResourceEffectChangedEvent,
	PositiveDiplomaticEvent,
	PreBattle,
	PrisonActionTakenEvent,
	RealTimeTrigger,
	RecruitmentItemIssuedByPlayer,
	RegionAbandonedWithBuildingEvent,
	RegionFactionChangeEvent,
	RegionGainedDevlopmentPoint,
	RegionIssuesDemands,
	RegionPlagueStateChanged,
	RegionRebels,
	RegionRiots,
	RegionSelected,
	RegionStrikes,
	RegionTurnEnd,
	RegionTurnStart,
	RegionWindsOfMagicChanged,
	ResearchCompleted,
	ResearchStarted,
	RitualCancelledEvent,
	RitualCompletedEvent,
	RitualEvent,
	RitualStartedEvent,
	RitualsCompletedAndDelayedEvent,
	SabotageAttemptFailure,
	SabotageAttemptSuccess,
	SavingGame,
	ScriptedAgentCreated,
	ScriptedAgentCreationFailed,
	ScriptedCharacterUnhidden,
	ScriptedCharacterUnhiddenFailed,
	ScriptedForceCreated,
	SeaTradeRouteRaided,
	SettlementDeselected,
	SettlementOccupied, // TODO only for lord?
	SettlementSelected,
	ShortcutPressed,
	ShortcutTriggered,
	SiegeLifted,
	SlotOpens,
	SlotRoundStart,
	SlotSelected,
	SlotTurnStart,
	StartRegionPopupVisible,
	StartRegionSelected,
	TechnologyInfoPanelOpenedCampaign,
	TestEvent,
	TooltipAdvice,
	TradeLinkEstablished,
	TradeNodeConnected,
	TradeRouteEstablished,
	TriggerPostBattleAncillaries,
	UICreated,
	UIDestroyed,
	UITriggerScriptEvent,
	UngarrisonedFort,
	UniqueAgentDespawned,
	UniqueAgentSpawned,
	UnitCompletedBattle,
	UnitCreated,
	UnitDisbanded,
	UnitDisembarkCompleted,
	UnitEffectPurchased,
	UnitMergedAndDestroyed,
	UnitSelectedCampaign,
	UnitTrained,
	UnitTurnEnd,
	VictoryConditionFailed,
	VictoryConditionMet,
	WorldCreated,
	historical_events,
};