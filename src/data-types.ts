// #region (sub)culture
export type SubCultureType =
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
	'wh2_main_sc_skv_skaven';
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
	'wh_dlc05_vmp_red_duke',
	'wh_dlc05_vmp_vampire_shadow',
	'wh_dlc05_wef_branchwraith',
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
	'wh_dlc08_nor_shaman_sorcerer_death',
	'wh_dlc08_nor_shaman_sorcerer_fire',
	'wh_dlc08_nor_shaman_sorcerer_metal',
	'wh_dlc08_nor_skin_wolf_werekin',
	'wh_dlc08_nor_throgg',
	'wh_dlc08_nor_wulfrik',
	'wh_dlc08_vmp_terrorgheist_boss',
	'wh_dlc08_wef_forest_dragon_boss',
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
	'wh2_dlc11_cst_admiral_tech_01',
	'wh2_dlc11_cst_admiral_tech_02',
	'wh2_dlc11_cst_admiral_tech_03',
	'wh2_dlc11_cst_admiral_tech_04',
	'wh2_dlc11_cst_aranessa',
	'wh2_dlc11_cst_cylostra',
	'wh2_dlc11_cst_fleet_captain',
	'wh2_dlc11_cst_fleet_captain_death',
	'wh2_dlc11_cst_fleet_captain_deep',
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
	'wh2_dlc13_emp_cha_huntsmarshal_0',
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
	'wh2_main_def_black_ark',
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
	'wh2_main_hef_prince_alastar',
	'wh2_main_hef_princess',
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
] as const;
// cultures
const cultures = [
	'*',
	'wh_dlc03_bst_beastmen',
	'wh_dlc05_wef_wood_elves',
	'wh_dlc08_nor_norsca',
	'wh_main_brt_bretonnia',
	'wh_main_chs_chaos',
	'wh_main_dwf_dwarfs',
	'wh_main_emp_empire',
	'wh_main_grn_greenskins',
	'wh_main_vmp_vampire_counts',
	'wh2_dlc09_tmb_tomb_kings',
	'wh2_dlc11_cst_vampire_coast',
	'wh2_main_def_dark_elves',
	'wh2_main_hef_high_elves',
	'wh2_main_lzd_lizardmen',
	'wh2_main_rogue',
	'wh2_main_skv_skaven',
] as const;
export const culture_min_loc: { [K in CultureType]: string } = {
	'*': '*',
	'wh_dlc03_bst_beastmen': 'bst',
	'wh_dlc05_wef_wood_elves': 'wef',
	'wh_dlc08_nor_norsca': 'nor',
	'wh_main_brt_bretonnia': 'brt',
	'wh_main_chs_chaos': 'chs',
	'wh_main_dwf_dwarfs': 'dwf',
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
};
// campaigns
const campaign_loc = {
	'main_warhammer': 'Mortal Empires',
	'wh2_main_great_vortex': 'Vortex',
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
export type AgentType = keyof typeof agent_loc;
export type AgentSubtype = typeof agent_subtypes[number];
export type CultureType = typeof cultures[number];
export type CampaignType = keyof typeof campaign_loc;
export type UnitCasteType = typeof unit_castes[number];
export interface ICondition {
	/** Юзер должен быть осторожен, когда читает данный кондишн */
	careful?: boolean;
	/** Глупые разработчики CA */
	bug?: boolean;
	/** Условие предотвращает выдачу ancillary, если такой уже есть у character */
	prevent?: boolean;
	/** Уникальный ancillary; prevent по умолчанию */
	unique?: boolean;
	/** В lua прямо прописано, что нельзя давать ancillary to AI */
	onlyPlayer?: boolean;
	/** Для createTrigger with event = CharacterTurn and text with chain_or_superchain */
	turnOwnRegion?: boolean;
	// turnEnemy?: boolean;
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
export interface IAncillary {
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
	condition: ICondition[];
	ancillaryList: IAncillary[];
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
	CharacterCapturedSettlementUnopposed,
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
	GarrisonOccupiedEvent,
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
	SettlementOccupied,
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