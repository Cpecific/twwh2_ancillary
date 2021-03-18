
-- Ancillary Declarations

--[[ wh2_dlc09_trig_tmb_acolyte_of_sokth ]]--

function wh2_dlc09_trig_tmb_acolyte_of_sokth_impl (context)
		return not context:character():has_ancillary("wh2_dlc09_anc_follower_tmb_acolyte_of_sokth")
end 

events.CharacterLootedSettlement[#events.CharacterLootedSettlement+1] =
function (context)
	if wh2_dlc09_trig_tmb_acolyte_of_sokth_impl(context) then
		effect.ancillary("wh2_dlc09_anc_follower_tmb_acolyte_of_sokth", 25,  context)
	end
end

--[[ wh2_dlc09_trig_tmb_charnel_valley_necrotect ]]--

function wh2_dlc09_trig_tmb_charnel_valley_necrotect_impl (context)
		return context:character():has_region() and context:character():region():settlement():get_climate() == "climate_mountain" and not context:character():has_ancillary("wh2_dlc09_anc_follower_tmb_charnel_valley_necrotect")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_dlc09_trig_tmb_charnel_valley_necrotect_impl(context) then
		effect.ancillary("wh2_dlc09_anc_follower_tmb_charnel_valley_necrotect", 35,  context)
	end
end

--[[ wh2_dlc09_trig_tmb_cultist_of_usirian ]]--

function wh2_dlc09_trig_tmb_cultist_of_usirian_impl (context)
		return context:character():has_region() and context:character():region():religion_proportion("wh_main_religion_untainted") < 0.7 and not context:character():has_ancillary("wh2_dlc09_anc_follower_tmb_cultist_of_usirian")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_dlc09_trig_tmb_cultist_of_usirian_impl(context) then
		effect.ancillary("wh2_dlc09_anc_follower_tmb_cultist_of_usirian", 25,  context)
	end
end

--[[ wh2_dlc09_trig_tmb_dog_headed_ushabti ]]--

function wh2_dlc09_trig_tmb_dog_headed_ushabti_impl (context)
		return cm:char_is_general(context:character()) and not context:character():won_battle() and (context:pending_battle():attacker() == context:character() and context:pending_battle():defender():faction():culture() == "wh2_dlc09_tmb_tomb_kings") or (context:pending_battle():defender() == context:character() and context:pending_battle():attacker():faction():culture() == "wh2_dlc09_tmb_tomb_kings") and not context:character():has_ancillary("wh2_dlc09_anc_follower_tmb_dog_headed_ushabti")
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh2_dlc09_trig_tmb_dog_headed_ushabti_impl(context) then
		effect.ancillary("wh2_dlc09_anc_follower_tmb_dog_headed_ushabti", 20,  context)
	end
end

--[[ wh2_dlc09_trig_tmb_high_born_of_khemri ]]--

function wh2_dlc09_trig_tmb_high_born_of_khemri_impl (context)
		return cm:char_is_general_with_army(context:character()) and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and context:character():region():public_order() < -20 and not context:character():has_ancillary("wh2_dlc09_anc_follower_tmb_high_born_of_khemri")
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_dlc09_trig_tmb_high_born_of_khemri_impl(context) then
		effect.ancillary("wh2_dlc09_anc_follower_tmb_high_born_of_khemri", 40,  context)
	end
end

--[[ wh2_dlc09_trig_tmb_legionnaire_of_asaph ]]--

function wh2_dlc09_trig_tmb_legionnaire_of_asaph_impl (context)
		return context:mission_result_failure() and not context:character():has_ancillary("wh2_dlc09_anc_follower_tmb_legionnaire_of_asaph")
end 

events.CharacterCharacterTargetAction[#events.CharacterCharacterTargetAction+1] =
function (context)
	if wh2_dlc09_trig_tmb_legionnaire_of_asaph_impl(context) then
		effect.ancillary("wh2_dlc09_anc_follower_tmb_legionnaire_of_asaph", 20,  context)
	end
end

--[[ wh2_dlc09_trig_tmb_priest_of_ptra ]]--

function wh2_dlc09_trig_tmb_priest_of_ptra_impl (context)
		return context:character():has_region() and context:character():region():owning_faction():culture() == "wh_main_vmp_vampire_counts" and not context:character():has_ancillary("wh2_dlc09_anc_follower_tmb_priest_of_ptra")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_dlc09_trig_tmb_priest_of_ptra_impl(context) then
		effect.ancillary("wh2_dlc09_anc_follower_tmb_priest_of_ptra", 15,  context)
	end
end

--[[ wh2_dlc09_trig_tmb_skeletal_labourer ]]--

function wh2_dlc09_trig_tmb_skeletal_labourer_impl (context)
		return not context:character():has_ancillary("wh2_dlc09_anc_follower_tmb_skeletal_labourer")
end 

events.CharacterSackedSettlement[#events.CharacterSackedSettlement+1] =
function (context)
	if wh2_dlc09_trig_tmb_skeletal_labourer_impl(context) then
		effect.ancillary("wh2_dlc09_anc_follower_tmb_skeletal_labourer", 25,  context)
	end
end

--[[ wh2_dlc09_trig_tmb_tombfleet_taskmaster ]]--

function wh2_dlc09_trig_tmb_tombfleet_taskmaster_impl (context)
		return not context:character():has_ancillary("wh2_dlc09_anc_follower_tmb_tombfleet_taskmaster")
end 

events.CharacterPostBattleRelease[#events.CharacterPostBattleRelease+1] =
function (context)
	if wh2_dlc09_trig_tmb_tombfleet_taskmaster_impl(context) then
		effect.ancillary("wh2_dlc09_anc_follower_tmb_tombfleet_taskmaster", 5,  context)
	end
end

--[[ wh2_dlc09_trig_tmb_ushabti_bodyguard ]]--

function wh2_dlc09_trig_tmb_ushabti_bodyguard_impl (context)
		return char_army_has_unit(context:character(), {"wh2_dlc09_tmb_mon_ushabti_0", "wh2_dlc09_tmb_mon_ushabti_1"}) and not context:character():has_ancillary("wh2_dlc09_anc_follower_tmb_ushabti_bodyguard")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_dlc09_trig_tmb_ushabti_bodyguard_impl(context) then
		effect.ancillary("wh2_dlc09_anc_follower_tmb_ushabti_bodyguard", 10,  context)
	end
end

--[[ wh2_dlc15_trig_character_rank_up_in_pigbarter ]]--

function wh2_dlc15_trig_character_rank_up_in_pigbarter_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():region():name() == "wh2_main_gnoblar_country_pigbarter"
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_dlc15_trig_character_rank_up_in_pigbarter_impl(context) then
		effect.ancillary("wh2_dlc15_anc_follower_mandelour", 100,  context)
	end
end

--[[ wh2_main_trig_character_def_apprentice_assassin ]]--

function wh2_main_trig_character_def_apprentice_assassin_impl (context)
		return not context:character():character_type("colonel") and char_has_tech(context:character(), "tech_def_2_3_3") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_def_murder")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_def_apprentice_assassin_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_apprentice_assassin", 25,  context)
	end
end

--[[ wh2_main_trig_character_def_beastmaster ]]--

function wh2_main_trig_character_def_beastmaster_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_def_beasts")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_def_beastmaster_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_beastmaster", 25,  context)
	end
end

--[[ wh2_main_trig_character_def_cultist ]]--

function wh2_main_trig_character_def_cultist_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_def_pleasure_cult")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_def_cultist_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_cultist", 25,  context)
	end
end

--[[ wh2_main_trig_character_def_daemon_whisperer ]]--

function wh2_main_trig_character_def_daemon_whisperer_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_def_pleasure_cult")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_def_daemon_whisperer_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_daemon_whisperer", 25,  context)
	end
end

--[[ wh2_main_trig_character_def_diplomat_slaanesh ]]--

function wh2_main_trig_character_def_diplomat_slaanesh_impl (context)
		return not context:character():character_type("colonel") and char_has_tech(context:character(), "tech_def_3_3_3") and context:character():has_region() and context:character():region():religion_proportion("wh_main_religion_chaos") > 0.4 and not context:character():has_ancillary("wh2_main_anc_follower_def_diplomat_slaanesh")
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_def_diplomat_slaanesh_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_diplomat_slaanesh", 5,  context)
	end
end

--[[ wh2_main_trig_character_def_fanatic ]]--

function wh2_main_trig_character_def_fanatic_impl (context)
		return context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_def_worship"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_def_fanatic_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_fanatic", 10,  context)
	end
end

--[[ wh2_main_trig_character_def_harem_attendant ]]--

function wh2_main_trig_character_def_harem_attendant_impl (context)
		return context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_def_pleasure_cult"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_def_harem_attendant_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_harem_attendant", 10,  context)
	end
end

--[[ wh2_main_trig_character_def_harem_keeper ]]--

function wh2_main_trig_character_def_harem_keeper_impl (context)
		return context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_def_pleasure_cult"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_def_harem_keeper_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_harem_keeper", 10,  context)
	end
end

--[[ wh2_main_trig_character_def_musician_choirmaster ]]--

function wh2_main_trig_character_def_musician_choirmaster_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_def_farm")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_def_musician_choirmaster_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_musician_choirmaster", 25,  context)
	end
end

--[[ wh2_main_trig_character_def_musician_drum ]]--

function wh2_main_trig_character_def_musician_drum_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_def_order")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_def_musician_drum_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_musician_drum", 25,  context)
	end
end

--[[ wh2_main_trig_character_def_musician_flute ]]--

function wh2_main_trig_character_def_musician_flute_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_def_pleasure_cult")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_def_musician_flute_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_musician_flute", 25,  context)
	end
end

--[[ wh2_main_trig_character_def_organ_merchant ]]--

function wh2_main_trig_character_def_organ_merchant_impl (context)
		return char_has_tech(context:character(), "tech_def_2_3_0") and context:character():faction():trade_value_percent() > 40
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_def_organ_merchant_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_organ_merchant", 6,  context)
	end
end

--[[ wh2_main_trig_character_def_overseer ]]--

function wh2_main_trig_character_def_overseer_impl (context)
		return char_has_tech(context:character(), "tech_def_1_2_0") and context:character():faction():trade_value_percent() > 20 and context:character():faction():treasury() > 2000
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_def_overseer_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_overseer", 7,  context)
	end
end

--[[ wh2_main_trig_character_def_propagandist ]]--

function wh2_main_trig_character_def_propagandist_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_def_worship")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_def_propagandist_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_propagandist", 25,  context)
	end
end

--[[ wh2_main_trig_character_def_servant ]]--

function wh2_main_trig_character_def_servant_impl (context)
		return char_has_tech(context:character(), "tech_def_2_2_0") and (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():rank() > 10
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_def_servant_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_servant", 50,  context)
	end
end

--[[ wh2_main_trig_character_hef_admiral ]]--

function wh2_main_trig_character_hef_admiral_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_hef_port")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_hef_admiral_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_admiral", 25,  context)
	end
end

--[[ wh2_main_trig_character_hef_counsellor ]]--

function wh2_main_trig_character_hef_counsellor_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_hef_court")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_hef_counsellor_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_counsellor", 25,  context)
	end
end

--[[ wh2_main_trig_character_hef_minstrel ]]--

function wh2_main_trig_character_hef_minstrel_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_hef_order")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_hef_minstrel_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_minstrel", 25,  context)
	end
end

--[[ wh2_main_trig_character_hef_poisoner ]]--

function wh2_main_trig_character_hef_poisoner_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_hef_mages")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_hef_poisoner_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_poisoner", 25,  context)
	end
end

--[[ wh2_main_trig_character_hef_trappist ]]--

function wh2_main_trig_character_hef_trappist_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_hef_mages")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_hef_trappist_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_trappist", 25,  context)
	end
end

--[[ wh2_main_trig_character_lizardmen_won_20_battles ]]--

function wh2_main_trig_character_lizardmen_won_20_battles_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():culture() == "wh2_main_lzd_lizardmen" and context:character():battles_won() > 19
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh2_main_trig_character_lizardmen_won_20_battles_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_clerk", 7,  context)
	end
end

--[[ wh2_main_trig_character_lzd_architect ]]--

function wh2_main_trig_character_lzd_architect_impl (context)
		return char_has_tech(context:character(), "tech_lzd_4_4") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh_main_sch_settlement_major") or (region_has_chain_or_superchain(context:character():region(), "wh_main_sch_settlement_major_coast")))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_lzd_architect_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_architect", 10,  context)
	end
end

--[[ wh2_main_trig_character_lzd_astrologer ]]--

function wh2_main_trig_character_lzd_astrologer_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_lzd_scrying")) and context:character():faction():has_pooled_resource("wh2_main_ritual_currency") and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_lzd_astrologer_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_astrologer", 25,  context)
	end
end

--[[ wh2_main_trig_character_lzd_astronomer ]]--

function wh2_main_trig_character_lzd_astronomer_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_lzd_worship_oldones")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_lzd_astronomer_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_astronomer", 25,  context)
	end
end

--[[ wh2_main_trig_character_lzd_cleaner ]]--

function wh2_main_trig_character_lzd_cleaner_impl (context)
		return char_has_tech(context:character(), "tech_lzd_1_6") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_sch_military2_stables") or (region_has_chain_or_superchain(context:character():region(), "wh2_main_sch_military1_barracks")))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_lzd_cleaner_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_cleaner", 10,  context)
	end
end

--[[ wh2_main_trig_character_lzd_defence_expert ]]--

function wh2_main_trig_character_lzd_defence_expert_impl (context)
		return context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_sch_defence_major_lzd"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_lzd_defence_expert_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_defence_expert", 10,  context)
	end
end

--[[ wh2_main_trig_character_lzd_fan_waver ]]--

function wh2_main_trig_character_lzd_fan_waver_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():culture() == "wh2_main_lzd_lizardmen" and context:character():battles_won() > 3
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh2_main_trig_character_lzd_fan_waver_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_fan_waver", 5,  context)
	end
end

--[[ wh2_main_trig_character_lzd_gardener ]]--

function wh2_main_trig_character_lzd_gardener_impl (context)
		return context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_sch_defence_major_lzd"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_lzd_gardener_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_gardener", 10,  context)
	end
end

--[[ wh2_main_trig_character_lzd_librarian ]]--

function wh2_main_trig_character_lzd_librarian_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and context:character():faction():has_pooled_resource("wh2_main_ritual_currency")
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh2_main_trig_character_lzd_librarian_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_librarian", 4,  context)
	end
end

--[[ wh2_main_trig_character_lzd_metallurgist ]]--

function wh2_main_trig_character_lzd_metallurgist_impl (context)
		return char_has_tech(context:character(), "tech_lzd_4_6") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh_main_sch_settlement_major") or (region_has_chain_or_superchain(context:character():region(), "wh_main_sch_settlement_major_coast")))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_lzd_metallurgist_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_metallurgist", 10,  context)
	end
end

--[[ wh2_main_trig_character_lzd_temple_cleaner ]]--

function wh2_main_trig_character_lzd_temple_cleaner_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_lzd_worship_sotek")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_lzd_temple_cleaner_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_temple_cleaner", 25,  context)
	end
end

--[[ wh2_main_trig_character_lzd_veteran_warrior ]]--

function wh2_main_trig_character_lzd_veteran_warrior_impl (context)
		return context:character():has_region() and context:character():turns_in_own_regions() > 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_sch_defence_minor"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_lzd_veteran_warrior_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_veteran_warrior", 1,  context)
	end
end

--[[ wh2_main_trig_character_sacked_settlement_high_elves ]]--

function wh2_main_trig_character_sacked_settlement_high_elves_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:garrison_residence():faction():culture() == "wh2_main_hef_high_elves"
end 

events.CharacterSackedSettlement[#events.CharacterSackedSettlement+1] =
function (context)
	if wh2_main_trig_character_sacked_settlement_high_elves_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_slave_skv", 33,  context)
	end
end

--[[ wh2_main_trig_character_skv_bell_polisher ]]--

function wh2_main_trig_character_skv_bell_polisher_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_skv_order")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_skv_bell_polisher_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_bell_polisher", 25,  context)
	end
end

--[[ wh2_main_trig_character_skv_chemist ]]--

function wh2_main_trig_character_skv_chemist_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle()
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh2_main_trig_character_skv_chemist_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_chemist", 1,  context)
	end
end

--[[ wh2_main_trig_character_skv_clerk ]]--

function wh2_main_trig_character_skv_clerk_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:mission_result_success() and not context:ability() == "assist_army"
end 

events.CharacterCharacterTargetAction[#events.CharacterCharacterTargetAction+1] =
function (context)
	if wh2_main_trig_character_skv_clerk_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_clerk", 25,  context)
	end
end

--[[ wh2_main_trig_character_skv_female ]]--

function wh2_main_trig_character_skv_female_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_skv_farm")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_skv_female_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_female", 25,  context)
	end
end

--[[ wh2_main_trig_character_skv_hell_pit_attendant ]]--

function wh2_main_trig_character_skv_hell_pit_attendant_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and char_has_tech(context:character(), "tech_skv_4_1") 
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh2_main_trig_character_skv_hell_pit_attendant_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_hell_pit_attendant", 25,  context)
	end
end

--[[ wh2_main_trig_character_skv_mechanic ]]--

function wh2_main_trig_character_skv_mechanic_impl (context)
		return context:character():won_battle() and context:character():character_type("engineer")
end 

events.HeroCharacterParticipatedInBattle[#events.HeroCharacterParticipatedInBattle+1] =
function (context)
	if wh2_main_trig_character_skv_mechanic_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_mechanic", 10,  context)
	end
end

--[[ wh2_main_trig_character_skv_messenger ]]--

function wh2_main_trig_character_skv_messenger_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle()
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh2_main_trig_character_skv_messenger_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_messenger", 1,  context)
	end
end

--[[ wh2_main_trig_character_skv_sculptor ]]--

function wh2_main_trig_character_skv_sculptor_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():trade_value_percent() > 40 and context:character():model():turn_number() > 5 and context:character():model():turn_number() % 5 == 0 and context:character():faction():has_pooled_resource("wh2_main_ritual_currency")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_character_skv_sculptor_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_sculptor", 5,  context)
	end
end

--[[ wh2_main_trig_character_skv_trainee_assassin ]]--

function wh2_main_trig_character_skv_trainee_assassin_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_skv_assassins")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_character_skv_trainee_assassin_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_trainee_assassin", 25,  context)
	end
end

--[[ wh2_main_trig_character_won_battle_against_dwarfs ]]--

function wh2_main_trig_character_won_battle_against_dwarfs_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and cm:char_is_general(context:character()) and context:character():won_battle() and (context:pending_battle():attacker() == context:character() and context:pending_battle():defender():faction():culture() == "wh_main_dwf_dwarfs") or (context:pending_battle():defender() == context:character() and context:pending_battle():attacker():faction():culture() == "wh_main_dwf_dwarfs")
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh2_main_trig_character_won_battle_against_dwarfs_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_sacrificial_victim_dwarf", 11,  context)
		effect.ancillary("wh2_main_anc_follower_hef_beard_weaver", 50,  context)
	end
end

--[[ wh2_main_trig_character_won_battle_against_lizardmen ]]--

function wh2_main_trig_character_won_battle_against_lizardmen_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and cm:char_is_general(context:character()) and context:character():won_battle() and (context:pending_battle():attacker() == context:character() and context:pending_battle():defender():faction():culture() == "wh2_main_lzd_lizardmen") or (context:pending_battle():defender() == context:character() and context:pending_battle():attacker():faction():culture() == "wh2_main_lzd_lizardmen")
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh2_main_trig_character_won_battle_against_lizardmen_impl(context) then
		effect.ancillary("wh2_main_anc_follower_skv_sacrificial_victim_lizardman", 11,  context)
	end
end

--[[ wh2_main_trig_character_won_battle_against_skaven ]]--

function wh2_main_trig_character_won_battle_against_skaven_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and cm:char_is_general(context:character()) and context:character():won_battle() and (context:pending_battle():attacker() == context:character() and context:pending_battle():defender():faction():culture() == "wh2_main_skv_skaven") or (context:pending_battle():defender() == context:character() and context:pending_battle():attacker():faction():culture() == "wh2_main_skv_skaven")
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh2_main_trig_character_won_battle_against_skaven_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_sacrificial_victim_skv", 11,  context)
	end
end

--[[ wh2_main_trig_general_constructed_building_hef_court_of_the_everqueen ]]--

function wh2_main_trig_general_constructed_building_hef_court_of_the_everqueen_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_special_everqueen_court")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_general_constructed_building_hef_court_of_the_everqueen_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_priestess_isha", 25,  context)
	end
end

--[[ wh2_main_trig_general_constructed_building_hef_dragon_keep ]]--

function wh2_main_trig_general_constructed_building_hef_dragon_keep_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_hef_dragons")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_general_constructed_building_hef_dragon_keep_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_dragon_tamer", 25,  context)
	end
end

--[[ wh2_main_trig_general_constructed_building_hef_dragon_lair ]]--

function wh2_main_trig_general_constructed_building_hef_dragon_lair_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_hef_dragons")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_general_constructed_building_hef_dragon_lair_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_dragon_armourer", 25,  context)
	end
end

--[[ wh2_main_trig_general_constructed_building_hef_ellyrian_royal_stables ]]--

function wh2_main_trig_general_constructed_building_hef_ellyrian_royal_stables_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_special_ellyrian_stables")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_general_constructed_building_hef_ellyrian_royal_stables_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_horsemaster", 25,  context)
	end
end

--[[ wh2_main_trig_general_constructed_building_hef_hall_of_dragons ]]--

function wh2_main_trig_general_constructed_building_hef_hall_of_dragons_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_special_hall_of_dragons")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_general_constructed_building_hef_hall_of_dragons_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_priest_vaul", 25,  context)
	end
end

--[[ wh2_main_trig_general_constructed_building_hef_library_of_hoeth ]]--

function wh2_main_trig_general_constructed_building_hef_library_of_hoeth_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_special_tower_of_hoeth")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_general_constructed_building_hef_library_of_hoeth_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_librarian", 25,  context)
	end
end

--[[ wh2_main_trig_general_constructed_building_hef_shrine_of_asuryan ]]--

function wh2_main_trig_general_constructed_building_hef_shrine_of_asuryan_impl (context)
		return not context:character():character_type("colonel") and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_hef_worship")) and context:character():model():turn_number() % 5 == 0
end 

events.CharacterTurnStart[#events.CharacterTurnStart+1] =
function (context)
	if wh2_main_trig_general_constructed_building_hef_shrine_of_asuryan_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_shrine_keeper", 25,  context)
	end
end

--[[ wh2_main_trig_general_constructed_building_lzd_old_ones ]]--

function wh2_main_trig_general_constructed_building_lzd_old_ones_impl (context)
		return context:character():has_region() and context:character():turns_in_own_regions() >= 2 and (region_has_chain_or_superchain(context:character():region(), "wh2_main_sch_support2_worship"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh2_main_trig_general_constructed_building_lzd_old_ones_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_acolyte_priest", 1,  context)
	end
end

--[[ wh_dlc03_trig_character_lost_battle_has_bst_warhounds ]]--

function wh_dlc03_trig_character_lost_battle_has_bst_warhounds_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and not context:character():won_battle() and (char_army_has_unit(context:character(), "wh_dlc03_bst_inf_chaos_warhounds_1") or char_army_has_unit(context:character(), "wh_dlc03_bst_inf_chaos_warhounds_0"))
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_dlc03_trig_character_lost_battle_has_bst_warhounds_impl(context) then
		effect.ancillary("wh_dlc03_anc_follower_beastmen_chieftains_pet", 35,  context)
	end
end

--[[ wh_dlc03_trig_character_rank_up_can_recruit_bst_spawn ]]--

function wh_dlc03_trig_character_rank_up_can_recruit_bst_spawn_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and char_can_recruit_unit(context:character(), "wh_dlc03_bst_mon_chaos_spawn_0")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_dlc03_trig_character_rank_up_can_recruit_bst_spawn_impl(context) then
		effect.ancillary("wh_dlc03_anc_follower_beastmen_spawn_wrangler", 8,  context)
	end
end

--[[ wh_dlc03_trig_character_razed_settlement_not_doe ]]--

function wh_dlc03_trig_character_razed_settlement_not_doe_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():culture() == "wh_dlc03_bst_beastmen" and not context:character():has_ancillary("wh_dlc03_anc_follower_beastmen_doe")
end 

events.CharacterRazedSettlement[#events.CharacterRazedSettlement+1] =
function (context)
	if wh_dlc03_trig_character_razed_settlement_not_doe_impl(context) then
		effect.ancillary("wh_dlc03_anc_follower_beastmen_doe", 5,  context)
	end
end

--[[ wh_dlc03_trig_character_razed_settlement_not_ungor_whelp ]]--

function wh_dlc03_trig_character_razed_settlement_not_ungor_whelp_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():battles_won() > 5 and not context:character():faction():ancillary_exists("wh_dlc03_anc_follower_beastmen_ungor_whelp")
end 

events.CharacterRazedSettlement[#events.CharacterRazedSettlement+1] =
function (context)
	if wh_dlc03_trig_character_razed_settlement_not_ungor_whelp_impl(context) then
		effect.ancillary("wh_dlc03_anc_follower_beastmen_ungor_whelp", 3,  context)
	end
end

--[[ wh_dlc03_trig_hero_won_battle_against_men ]]--

function wh_dlc03_trig_hero_won_battle_against_men_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and (not context:character():model():pending_battle():defender():won_battle() and (context:character():model():pending_battle():defender():faction():culture() == "wh_main_emp_empire" or context:character():model():pending_battle():defender():faction():culture() == "wh_main_brt_bretonnia")) or (not context:character():model():pending_battle():attacker():won_battle() and (context:character():model():pending_battle():attacker():faction():culture() == "wh_main_emp_empire" or context:character():model():pending_battle():attacker():faction():culture() == "wh_main_brt_bretonnia"))
end 

events.HeroCharacterParticipatedInBattle[#events.HeroCharacterParticipatedInBattle+1] =
function (context)
	if wh_dlc03_trig_hero_won_battle_against_men_impl(context) then
		effect.ancillary("wh_dlc03_anc_follower_beastmen_mannish_thrall", 8,  context)
		effect.ancillary("wh2_dlc11_anc_follower_cst_sartosa_navigator", 15,  context)
		effect.ancillary("wh2_dlc11_anc_follower_cst_shipwright", 15,  context)
	end
end

--[[ wh_dlc08_trig_character_rank_up_can_recruit_nor_beasts ]]--

function wh_dlc08_trig_character_rank_up_can_recruit_nor_beasts_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and (char_can_recruit_unit(context:character(), "wh_dlc08_nor_mon_war_mammoth_0") or char_can_recruit_unit(context:character(), "wh_dlc08_nor_mon_war_mammoth_1") or char_can_recruit_unit(context:character(), "wh_dlc08_nor_mon_war_mammoth_2") or char_can_recruit_unit(context:character(), "wh_main_nor_mon_chaos_warhounds_0") or char_can_recruit_unit(context:character(), "wh_main_nor_mon_chaos_warhounds_1"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_dlc08_trig_character_rank_up_can_recruit_nor_beasts_impl(context) then
		effect.ancillary("wh_dlc08_anc_follower_vargs_beast_trainer", 10,  context)
	end
end

--[[ wh_dlc08_trig_character_rank_up_can_recruit_nor_skinwolves ]]--

function wh_dlc08_trig_character_rank_up_can_recruit_nor_skinwolves_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and (char_can_recruit_unit(context:character(), "wh_dlc08_nor_mon_skinwolves_0") or char_can_recruit_unit(context:character(), "wh_dlc08_nor_mon_skinwolves_1"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_dlc08_trig_character_rank_up_can_recruit_nor_skinwolves_impl(context) then
		effect.ancillary("wh_dlc08_anc_follower_baernsonlings_werekin", 10,  context)
	end
end

--[[ wh_dlc08_trig_general_razed_settlement ]]--

function wh_dlc08_trig_general_razed_settlement_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and cm:char_is_general(context:character())
end 

events.CharacterRazedSettlement[#events.CharacterRazedSettlement+1] =
function (context)
	if wh_dlc08_trig_general_razed_settlement_impl(context) then
		effect.ancillary("wh2_dlc11_anc_follower_cst_drawn_chef", 15,  context)
		effect.ancillary("wh_dlc08_anc_follower_baernsonlings_werekin", 5,  context)
	end
end

--[[ wh_main_character_rank_up_untainted_region ]]--

function wh_main_character_rank_up_untainted_region_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():region():majority_religion() == "wh_main_religion_untainted"
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_character_rank_up_untainted_region_impl(context) then
		effect.ancillary("wh_main_anc_follower_undead_carrion", 3,  context)
		effect.ancillary("wh_dlc01_anc_follower_chaos_cultist", 3,  context)
		effect.ancillary("wh_dlc01_anc_follower_chaos_zealot", 3,  context)
		effect.ancillary("wh_dlc03_anc_follower_beastmen_herdstone_keeper", 3,  context)
	end
end

--[[ wh_main_trig_award_magic_item ]]--

function wh_main_trig_award_magic_item_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and cm:char_is_general_with_army(context:character()) and not context:has_stolen_ancillary() and attempt_to_award_random_magical_item(context)
end 

events.TriggerPostBattleAncillaries[#events.TriggerPostBattleAncillaries+1] =
function (context)
	if wh_main_trig_award_magic_item_impl(context) then
	end
end

--[[ wh_main_trig_character_assassinated_character ]]--

function wh_main_trig_character_assassinated_character_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight") and not context:character():character_subtype("wh2_dlc10_hef_shadow_walker") ) and context:mission_result_success() or context:mission_result_critial_success() and not context:ability() == "assist_army"
end 

events.CharacterCharacterTargetAction[#events.CharacterCharacterTargetAction+1] =
function (context)
	if wh_main_trig_character_assassinated_character_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_gravedigger", 8,  context)
		effect.ancillary("wh_main_anc_follower_undead_flesh_golem", 5,  context)
		effect.ancillary("wh2_main_anc_follower_hef_assassin", 5,  context)
		effect.ancillary("wh_dlc01_anc_follower_chaos_huscarl", 5,  context)
		effect.ancillary("wh2_main_anc_follower_skv_pet_wolf_rat", 10,  context)
		effect.ancillary("wh_main_anc_follower_greenskins_dog_boy_scout", 10,  context)
		effect.ancillary("wh2_main_anc_follower_def_organ_merchant", 5,  context)
	end
end

--[[ wh_main_trig_character_assassinated_character_failure ]]--

function wh_main_trig_character_assassinated_character_failure_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight") and not context:character():character_subtype("wh2_dlc10_hef_shadow_walker") ) and context:mission_result_failure() and not context:ability() == "assist_army"
end 

events.CharacterCharacterTargetAction[#events.CharacterCharacterTargetAction+1] =
function (context)
	if wh_main_trig_character_assassinated_character_failure_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_counterspy", 25,  context)
		effect.ancillary("wh_main_anc_follower_all_men_bodyguard", 13,  context)
		effect.ancillary("wh_main_anc_follower_undead_possessed_mirror", 10,  context)
		effect.ancillary("wh_main_anc_follower_dwarfs_candle_maker", 5,  context)
		effect.ancillary("wh2_main_anc_follower_skv_bodyguard", 15,  context)
	end
end

--[[ wh_main_trig_character_assassinated_character_human_even ]]--

function wh_main_trig_character_assassinated_character_human_even_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight") and not context:character():character_subtype("wh2_dlc10_hef_shadow_walker") ) and context:character():model():turn_number() % 2 == 0 and context:character():faction():is_human() and context:mission_result_success() or context:mission_result_critial_success() and not context:ability() == "assist_army"
end 

events.CharacterCharacterTargetAction[#events.CharacterCharacterTargetAction+1] =
function (context)
	if wh_main_trig_character_assassinated_character_human_even_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_rogue", 8,  context)
	end
end

--[[ wh_main_trig_character_assassinated_character_human_odd ]]--

function wh_main_trig_character_assassinated_character_human_odd_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight") and not context:character():character_subtype("wh2_dlc10_hef_shadow_walker") ) and not (context:character():model():turn_number() % 2 == 0) and context:character():faction():is_human() and context:mission_result_success() or context:mission_result_critial_success() and not context:ability() == "assist_army"
end 

events.CharacterCharacterTargetAction[#events.CharacterCharacterTargetAction+1] =
function (context)
	if wh_main_trig_character_assassinated_character_human_odd_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_thug", 8,  context)
	end
end

--[[ wh_main_trig_character_completed_battle_has_grn_trolls ]]--

function wh_main_trig_character_completed_battle_has_grn_trolls_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and char_army_has_unit(context:character(), "wh_main_grn_mon_trolls")
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_character_completed_battle_has_grn_trolls_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_troll_herder", 10,  context)
	end
end

--[[ wh_main_trig_character_hindered_settlement ]]--

function wh_main_trig_character_hindered_settlement_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:mission_result_success()
end 

events.CharacterGarrisonTargetAction[#events.CharacterGarrisonTargetAction+1] =
function (context)
	if wh_main_trig_character_hindered_settlement_impl(context) then
		effect.ancillary("wh_main_anc_follower_empire_watchman", 13,  context)
		effect.ancillary("wh2_main_anc_follower_skv_scavenger_1", 9,  context)
	end
end

--[[ wh_main_trig_character_idle_in_estalia ]]--

function wh_main_trig_character_idle_in_estalia_impl (context)
		return not context:character():character_type("colonel") and (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():faction():culture() == "wh_main_emp_empire" and context:character():action_points_remaining_percent() > 75 and (context:character():region():name() == "wh_main_estalia_bilbali" or context:character():region():name() == "wh_main_estalia_magritta" or context:character():region():name() == "wh_main_estalia_tobaro") and not context:character():has_ancillary("wh_main_anc_follower_empire_estalian_diestro")
end 

events.CharacterTurnEnd[#events.CharacterTurnEnd+1] =
function (context)
	if wh_main_trig_character_idle_in_estalia_impl(context) then
		effect.ancillary("wh_main_anc_follower_empire_estalian_diestro", 6,  context)
	end
end

--[[ wh_main_trig_character_idle_in_the_moot ]]--

function wh_main_trig_character_idle_in_the_moot_impl (context)
		return not context:character():character_type("colonel") and (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():action_points_remaining_percent() > 75 and context:character():region():name() == "wh_main_stirland_the_moot" and not context:character():has_ancillary("wh_main_anc_follower_halfling_fieldwarden")
end 

events.CharacterTurnEnd[#events.CharacterTurnEnd+1] =
function (context)
	if wh_main_trig_character_idle_in_the_moot_impl(context) then
		effect.ancillary("wh_main_anc_follower_halfling_fieldwarden", 6,  context)
	end
end

--[[ wh_main_trig_character_looted_settlement ]]--

function wh_main_trig_character_looted_settlement_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight"))
end 

events.CharacterLootedSettlement[#events.CharacterLootedSettlement+1] =
function (context)
	if wh_main_trig_character_looted_settlement_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_serial_loota", 15,  context)
		effect.ancillary("wh_main_anc_follower_dwarfs_treasure_hunter", 5,  context)
	end
end

--[[ wh_main_trig_character_looted_settlement_belonging_to_emp ]]--

function wh_main_trig_character_looted_settlement_belonging_to_emp_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:garrison_residence():faction():culture() == "wh_main_emp_empire"
end 

events.CharacterLootedSettlement[#events.CharacterLootedSettlement+1] =
function (context)
	if wh_main_trig_character_looted_settlement_belonging_to_emp_impl(context) then
		effect.ancillary("wh_main_anc_follower_undead_manservant", 13,  context)
		effect.ancillary("wh_main_anc_follower_empire_jailer", 13,  context)
		effect.ancillary("wh_dlc08_anc_follower_skaeling_trader", 10,  context)
		effect.ancillary("wh_dlc08_anc_follower_kurgan_slave_merchant", 10,  context)
	end
end

--[[ wh_main_trig_character_looted_settlement_belonging_to_vmp ]]--

function wh_main_trig_character_looted_settlement_belonging_to_vmp_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:garrison_residence():faction():culture() == "wh_main_vmp_vampire_counts"
end 

events.CharacterLootedSettlement[#events.CharacterLootedSettlement+1] =
function (context)
	if wh_main_trig_character_looted_settlement_belonging_to_vmp_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_tomb_robber", 20,  context)
	end
end

--[[ wh_main_trig_character_looted_settlement_large_army ]]--

function wh_main_trig_character_looted_settlement_large_army_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and cm:char_is_general_with_army(context:character()) and context:character():military_force():unit_list():num_items() > 10
end 

events.CharacterLootedSettlement[#events.CharacterLootedSettlement+1] =
function (context)
	if wh_main_trig_character_looted_settlement_large_army_impl(context) then
		effect.ancillary("wh_main_anc_follower_empire_barber_surgeon", 6,  context)
		effect.ancillary("wh2_main_anc_follower_skv_scribe", 6,  context)
	end
end

--[[ wh_main_trig_character_looted_settlement_small_army ]]--

function wh_main_trig_character_looted_settlement_small_army_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and cm:char_is_general_with_army(context:character()) and context:character():military_force():unit_list():num_items() < 10
end 

events.CharacterLootedSettlement[#events.CharacterLootedSettlement+1] =
function (context)
	if wh_main_trig_character_looted_settlement_small_army_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_bounty_hunter", 8,  context)
	end
end

--[[ wh_main_trig_character_lost_battle ]]--

function wh_main_trig_character_lost_battle_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and not context:character():won_battle()
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_character_lost_battle_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_protagonist", 4,  context)
		effect.ancillary("wh_dlc01_anc_follower_chaos_mutant", 6,  context)
		effect.ancillary("wh_main_anc_follower_all_men_soldier", 2,  context)
		effect.ancillary("wh_main_anc_follower_all_men_mercenary", 8,  context)
	end
end

--[[ wh_main_trig_character_participated_in_ambush_battle ]]--

function wh_main_trig_character_participated_in_ambush_battle_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:pending_battle():ambush_battle()
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_character_participated_in_ambush_battle_impl(context) then
		effect.ancillary("wh2_main_anc_follower_hef_scout", 25,  context)
		effect.ancillary("wh_dlc05_anc_follower_dryad_spy", 5,  context)
		effect.ancillary("wh2_main_anc_follower_lzd_army_beast_hunter", 25,  context)
		effect.ancillary("wh_main_anc_follower_undead_warlock", 25,  context)
		effect.ancillary("wh_main_anc_follower_empire_road_warden", 25,  context)
	end
end

--[[ wh_main_trig_character_post_battle_slaughter ]]--

function wh_main_trig_character_post_battle_slaughter_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and cm:char_is_general_with_army(context:character())
end 

events.CharacterPostBattleSlaughter[#events.CharacterPostBattleSlaughter+1] =
function (context)
	if wh_main_trig_character_post_battle_slaughter_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_fimir_balefiend", 5,  context)
		effect.ancillary("wh2_main_anc_follower_def_slave_trader", 5,  context)
		effect.ancillary("wh_main_anc_follower_all_men_ogres_pit_fighter", 5,  context)
		effect.ancillary("wh2_main_anc_follower_hef_raven_keeper", 5,  context)
		effect.ancillary("wh_dlc05_anc_follower_forest_spirit", 5,  context)
		effect.ancillary("wh_dlc08_anc_follower_baernsonlings_berserker", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_at_sea ]]--

function wh_main_trig_character_rank_up_at_sea_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and char_on_sea(context:character())
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_at_sea_impl(context) then
		effect.ancillary("wh_dlc01_anc_follower_chaos_oar_slave", 12,  context)
		effect.ancillary("wh_main_anc_follower_dwarfs_shipwright", 15,  context)
		effect.ancillary("wh2_dlc11_anc_follower_cst_siren", 10,  context)
		effect.ancillary("wh_dlc08_anc_follower_whalers", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_can_recruit_dwf_cannon ]]--

function wh_main_trig_character_rank_up_can_recruit_dwf_cannon_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and char_can_recruit_unit(context:character(), "wh_main_dwf_art_cannon")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_can_recruit_dwf_cannon_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_powder_mixer", 8,  context)
	end
end

--[[ wh_main_trig_character_rank_up_can_recruit_runesmith ]]--

function wh_main_trig_character_rank_up_can_recruit_runesmith_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():region():can_recruit_agent_at_settlement("runesmith")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_can_recruit_runesmith_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_runesmith_apprentice", 20,  context)
	end
end

--[[ wh_main_trig_character_rank_up_can_recruit_spy ]]--

function wh_main_trig_character_rank_up_can_recruit_spy_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():region():can_recruit_agent_at_settlement("spy")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_can_recruit_spy_impl(context) then
		effect.ancillary("wh_main_anc_follower_undead_crone", 13,  context)
	end
end

--[[ wh_main_trig_character_rank_up_dwarf_beer ]]--

function wh_main_trig_character_rank_up_dwarf_beer_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():trade_resource_exists("res_rom_glass")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_dwarf_beer_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_brewmaster", 3,  context)
	end
end

--[[ wh_main_trig_character_rank_up_goblin_shaman ]]--

function wh_main_trig_character_rank_up_goblin_shaman_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():character_subtype("grn_goblin_great_shaman")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_goblin_shaman_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_squig_mascot", 5,  context)
	end
end

--[[ wh_main_trig_character_rank_up_goblin_shaman_idle_won_battles ]]--

function wh_main_trig_character_rank_up_goblin_shaman_idle_won_battles_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():character_subtype("grn_goblin_great_shaman") and context:character():turns_in_own_regions() > 3 and context:character():battles_won() > 2
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_goblin_shaman_idle_won_battles_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_boggart", 5,  context)
	end
end

--[[ wh_main_trig_character_rank_up_has_chs_warhounds ]]--

function wh_main_trig_character_rank_up_has_chs_warhounds_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and char_army_has_unit(context:character(), "wh_main_chs_mon_chaos_warhounds_0")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_has_chs_warhounds_impl(context) then
		effect.ancillary("wh_dlc01_anc_follower_chaos_beast_tamer", 5,  context)
	end
end

--[[ wh_main_trig_character_rank_up_has_dwf_slayers ]]--

function wh_main_trig_character_rank_up_has_dwf_slayers_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and char_army_has_unit(context:character(), "wh_main_dwf_inf_slayers")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_has_dwf_slayers_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_slayer_ward", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_has_grn_night_goblins ]]--

function wh_main_trig_character_rank_up_has_grn_night_goblins_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and char_army_has_unit(context:character(), "wh_main_grn_inf_night_goblins") or char_army_has_unit(context:character(), "wh_main_grn_inf_night_goblin_archers")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_has_grn_night_goblins_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_shroom_gathera", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_has_grn_savage_orcs ]]--

function wh_main_trig_character_rank_up_has_grn_savage_orcs_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and char_army_has_unit(context:character(), "wh_main_grn_inf_savage_orcs") or char_army_has_unit(context:character(), "wh_main_grn_inf_savage_orc_arrer_boyz") or char_army_has_unit(context:character(), "wh_main_grn_cav_savage_orc_boar_boyz")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_has_grn_savage_orcs_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_savage_orc_prodda", 20,  context)
	end
end

--[[ wh_main_trig_character_rank_up_has_tech_spider_worship ]]--

function wh_main_trig_character_rank_up_has_tech_spider_worship_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and char_has_tech(context:character(), "tech_grn_main_4_1") and context:character():battles_fought() > 3
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_has_tech_spider_worship_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_spider-god_priest", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_has_tech_unholy_communion ]]--

function wh_main_trig_character_rank_up_has_tech_unholy_communion_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and char_has_tech(context:character(), "tech_chs_main_3") and context:character():battles_fought() > 3
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_has_tech_unholy_communion_impl(context) then
		effect.ancillary("wh_dlc01_anc_follower_chaos_possessed", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_has_tech_valayas_protection ]]--

function wh_main_trig_character_rank_up_has_tech_valayas_protection_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and char_has_tech(context:character(), "tech_dwf_civ_6_4") and context:character():battles_fought() > 3
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_has_tech_valayas_protection_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_daughter_of_valaya", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_high ]]--

function wh_main_trig_character_rank_up_high_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():rank() > 21
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_high_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_vagabond", 5,  context)
		effect.ancillary("wh_dlc05_anc_follower_eternal_guard_commander", 10,  context)
		effect.ancillary("wh_dlc05_anc_follower_elder_scout", 10,  context)
		effect.ancillary("wh_dlc08_anc_follower_marauder_champion", 10,  context)
		effect.ancillary("wh_main_anc_follower_all_men_servant", 5,  context)
	end
end

--[[ wh_main_trig_character_rank_up_high_trade ]]--

function wh_main_trig_character_rank_up_high_trade_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():trade_value_percent() > 40 and context:character():model():turn_number() > 5 and context:character():model():turn_number() % 5 == 0
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_high_trade_impl(context) then
		effect.ancillary("wh_main_anc_follower_empire_coachman", 7,  context)
		effect.ancillary("wh_main_anc_follower_empire_ferryman", 10,  context)
		effect.ancillary("wh_main_anc_follower_dwarfs_guildmaster", 10,  context)
		effect.ancillary("wh2_main_anc_follower_hef_wine_merchant", 10,  context)
		effect.ancillary("wh2_main_anc_follower_def_merchant", 10,  context)
		effect.ancillary("wh_main_anc_follower_empire_tradesman", 3,  context)
		effect.ancillary("wh2_main_anc_follower_lzd_archivist", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_high_trade_can_equip_smuggler ]]--

function wh_main_trig_character_rank_up_high_trade_can_equip_smuggler_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():trade_value_percent() > 40 and context:character():model():turn_number() > 5 and context:character():model():turn_number() % 5 == 0 and context:character():can_equip_ancillary("wh_main_anc_follower_all_men_smuggler")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_high_trade_can_equip_smuggler_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_smuggler", 7,  context)
	end
end

--[[ wh_main_trig_character_rank_up_idle_won_battles ]]--

function wh_main_trig_character_rank_up_idle_won_battles_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():turns_in_own_regions() > 3 and context:character():battles_won() > 2
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_idle_won_battles_impl(context) then
		effect.ancillary("wh_main_anc_follower_empire_scribe", 13,  context)
	end
end

--[[ wh_main_trig_character_rank_up_in_enemy_territory ]]--

function wh_main_trig_character_rank_up_in_enemy_territory_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():turns_in_enemy_regions() > 3
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_in_enemy_territory_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_zoat", 25,  context)
		effect.ancillary("wh_main_anc_follower_empire_rat_catcher", 13,  context)
	end
end

--[[ wh_main_trig_character_rank_up_in_kislev ]]--

function wh_main_trig_character_rank_up_in_kislev_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and (context:character():region():name() == "wh_main_troll_country_zoishenk" or context:character():region():name() == "wh_main_troll_country_erengrad" or context:character():region():name() == "wh_main_northern_oblast_fort_straghov" or context:character():region():name() == "wh_main_northern_oblast_fort_ostrosk" or context:character():region():name() == "wh_main_eastern_oblast_praag" or context:character():region():name() == "wh_main_eastern_oblast_volksgrad" or context:character():region():name() == "wh_main_southern_oblast_zavastra" or context:character():region():name() == "wh_main_southern_oblast_kislev" or context:character():region():name() == "wh_main_southern_oblast_fort_jakova")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_in_kislev_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_kislevite_kossar", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_in_marienburg ]]--

function wh_main_trig_character_rank_up_in_marienburg_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():region():name() == "wh_main_the_wasteland_marienburg"
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_in_marienburg_impl(context) then
		effect.ancillary("wh_main_anc_follower_empire_seaman", 5,  context)
		effect.ancillary("wh_main_anc_follower_all_men_fisherman", 8,  context)
	end
end

--[[ wh_main_trig_character_rank_up_in_marienburg_5_mul ]]--

function wh_main_trig_character_rank_up_in_marienburg_5_mul_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():region():name() == "wh_main_the_wasteland_marienburg" and context:character():model():turn_number() % 5 == 0
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_in_marienburg_5_mul_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_boatman", 15,  context)
		effect.ancillary("wh_main_anc_follower_empire_marine", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_in_vampire_count_territory ]]--

function wh_main_trig_character_rank_up_in_vampire_count_territory_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():region():owning_faction():culture() == "wh_main_vmp_vampire_counts"
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_in_vampire_count_territory_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_initiate", 5,  context)
		effect.ancillary("wh_main_anc_follower_all_men_zealot", 5,  context)
		effect.ancillary("wh_main_anc_follower_empire_bone_picker", 7,  context)
	end
end

--[[ wh_main_trig_character_rank_up_low ]]--

function wh_main_trig_character_rank_up_low_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():rank() < 11
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_low_impl(context) then
		effect.ancillary("wh_dlc03_anc_follower_beastmen_flying_spy", 2,  context)
		effect.ancillary("wh_dlc05_anc_follower_young_stag", 5,  context)
		effect.ancillary("wh_main_anc_follower_all_men_tollkeeper", 1,  context)
		effect.ancillary("wh_dlc08_anc_follower_mountain_scout", 5,  context)
		effect.ancillary("wh_dlc05_anc_follower_hawk_companion", 5,  context)
	end
end

--[[ wh_main_trig_character_rank_up_low_public_order ]]--

function wh_main_trig_character_rank_up_low_public_order_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():turns_in_own_regions() >= 1 and context:character():region():public_order() < -20
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_low_public_order_impl(context) then
		effect.ancillary("wh_main_anc_follower_undead_black_cat", 20,  context)
		effect.ancillary("wh2_main_anc_follower_skv_saboteur", 10,  context)
		effect.ancillary("wh_dlc08_anc_follower_cathy_slave_dancers", 10,  context)
		effect.ancillary("wh_main_anc_follower_greenskins_idol_carva", 10,  context)
		effect.ancillary("wh_main_anc_follower_dwarfs_choir_master", 12,  context)
		effect.ancillary("wh_main_anc_follower_empire_agitator", 13,  context)
		effect.ancillary("wh_main_anc_follower_undead_poltergeist", 15,  context)
		effect.ancillary("wh_main_anc_follower_empire_burgher", 12,  context)
		effect.ancillary("wh_main_anc_follower_dwarfs_teller_of_tales", 10,  context)
		effect.ancillary("wh_main_anc_follower_all_men_bailiff", 8,  context)
		effect.ancillary("wh2_main_anc_follower_def_bodyguard", 15,  context)
		effect.ancillary("wh2_main_anc_follower_hef_food_taster", 15,  context)
		effect.ancillary("wh2_main_anc_follower_lzd_attendant", 15,  context)
	end
end

--[[ wh_main_trig_character_rank_up_marble ]]--

function wh_main_trig_character_rank_up_marble_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():trade_resource_exists("res_rom_marble")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_marble_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_stonemason", 15,  context)
	end
end

--[[ wh_main_trig_character_rank_up_medium_low_public_order ]]--

function wh_main_trig_character_rank_up_medium_low_public_order_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():turns_in_own_regions() > 1 and context:character():region():public_order() < -25 and context:character():rank() > 11 and context:character():rank() < 21
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_medium_low_public_order_impl(context) then
		effect.ancillary("wh_main_anc_follower_empire_noble", 15,  context)
	end
end

--[[ wh_main_trig_character_rank_up_night_goblin_shaman ]]--

function wh_main_trig_character_rank_up_night_goblin_shaman_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():character_subtype("grn_night_goblin_shaman")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_night_goblin_shaman_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_squig_mascot", 4,  context)
		effect.ancillary("wh_main_anc_follower_greenskins_shroom_gathera", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_not_researching ]]--

function wh_main_trig_character_rank_up_not_researching_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():research_queue_idle()
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_not_researching_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_student", 13,  context)
		effect.ancillary("wh_main_anc_follower_dwarfs_archivist", 15,  context)
	end
end

--[[ wh_main_trig_character_rank_up_raiding ]]--

function wh_main_trig_character_rank_up_raiding_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_military_force() and (context:character():military_force():active_stance() == "MILITARY_FORCE_ACTIVE_STANCE_TYPE_SET_CAMP_RAIDING" or context:character():military_force():active_stance() == "MILITARY_FORCE_ACTIVE_STANCE_TYPE_LAND_RAID")
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_raiding_impl(context) then
		effect.ancillary("wh_main_anc_follower_empire_thief", 13,  context)
		effect.ancillary("wh_dlc08_anc_follower_dragonbone_raiders", 20,  context)
		effect.ancillary("wh_main_anc_follower_greenskins_bat-winged_loony", 20,  context)
		effect.ancillary("wh_main_anc_follower_all_men_outlaw", 8,  context)
	end
end

--[[ wh_main_trig_character_rank_up_region_has_dwf_gems ]]--

function wh_main_trig_character_rank_up_region_has_dwf_gems_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and (context:character():region():building_exists("wh_main_dwf_resource_gems_1") or context:character():region():building_exists("wh_main_dwf_resource_gems_2") or context:character():region():building_exists("wh_main_dwf_resource_gems_3") or context:character():region():building_exists("wh_main_dwf_resource_gems_4"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_region_has_dwf_gems_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_jewelsmith", 25,  context)
	end
end

--[[ wh_main_trig_character_rank_up_region_has_dwf_gold ]]--

function wh_main_trig_character_rank_up_region_has_dwf_gold_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and (context:character():region():building_exists("wh_main_dwf_resource_gold_1") or context:character():region():building_exists("wh_main_dwf_resource_gold_2") or context:character():region():building_exists("wh_main_dwf_resource_gold_3") or context:character():region():building_exists("wh_main_dwf_resource_gold_4"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_region_has_dwf_gold_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_goldsmith", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_region_has_dwf_iron ]]--

function wh_main_trig_character_rank_up_region_has_dwf_iron_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and (context:character():region():building_exists("wh_main_dwf_resource_iron_1") or context:character():region():building_exists("wh_main_dwf_resource_iron_2") or context:character():region():building_exists("wh_main_dwf_resource_iron_3") or context:character():region():building_exists("wh_main_dwf_resource_iron_4"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_region_has_dwf_iron_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_miner", 15,  context)
	end
end

--[[ wh_main_trig_character_rank_up_region_has_timber ]]--

function wh_main_trig_character_rank_up_region_has_timber_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and (context:character():region():building_exists("wh_main_emp_resource_timber_1") or context:character():region():building_exists("wh_main_emp_resource_timber_2") or context:character():region():building_exists("wh_main_emp_resource_timber_3"))
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_region_has_timber_impl(context) then
		effect.ancillary("wh_main_anc_follower_empire_woodsman", 25,  context)
	end
end

--[[ wh_main_trig_character_rank_up_region_high_corruption ]]--

function wh_main_trig_character_rank_up_region_high_corruption_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and context:character():region():religion_proportion("wh_main_religion_untainted") < 0.7
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_region_high_corruption_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_gobbo_ranta", 10,  context)
		effect.ancillary("wh_main_anc_follower_bretonnia_court_jester", 10,  context)
		effect.ancillary("wh_main_anc_follower_dwarfs_dwarfen_tattooist", 10,  context)
		effect.ancillary("wh_main_anc_follower_empire_light_college_acolyte", 5,  context)
	end
end

--[[ wh_main_trig_character_rank_up_runesmith_alone ]]--

function wh_main_trig_character_rank_up_runesmith_alone_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():character_subtype("dwf_runesmith") and not context:character():is_embedded_in_military_force()
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_runesmith_alone_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_runebearer", 20,  context)
	end
end

--[[ wh_main_trig_character_rank_up_started_war ]]--

function wh_main_trig_character_rank_up_started_war_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():started_war_this_turn() and context:character():offensive_battles_won() > 3
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_started_war_impl(context) then
		effect.ancillary("wh_dlc08_anc_follower_marauder_champion", 10,  context)
		effect.ancillary("wh_dlc03_anc_follower_beastmen_flayer", 10,  context)
		effect.ancillary("wh_main_anc_follower_all_men_outrider", 14,  context)
		effect.ancillary("wh_dlc01_anc_follower_chaos_barbarian", 18,  context)
		effect.ancillary("wh2_main_anc_follower_def_diplomat", 8,  context)
		effect.ancillary("wh_main_anc_follower_greenskins_backstabba", 50,  context)
	end
end

--[[ wh_main_trig_character_rank_up_tunnelling ]]--

function wh_main_trig_character_rank_up_tunnelling_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_military_force() and context:character():military_force():active_stance() == "MILITARY_FORCE_ACTIVE_STANCE_TYPE_TUNNELING"
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_tunnelling_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_shieldbreaker", 25,  context)
	end
end

--[[ wh_main_trig_character_rank_up_with_mercs ]]--

function wh_main_trig_character_rank_up_with_mercs_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_military_force() and context:character():military_force():contains_mercenaries()
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_with_mercs_impl(context) then
		effect.ancillary("wh_main_anc_follower_undead_grave_digger", 15,  context)
	end
end

--[[ wh_main_trig_character_rank_up_wizard_alone ]]--

function wh_main_trig_character_rank_up_wizard_alone_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():character_type("wizard") and not context:character():is_embedded_in_military_force()
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_wizard_alone_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_shamans_lacky", 20,  context)
		effect.ancillary("wh_dlc08_anc_follower_seer", 10,  context)
	end
end

--[[ wh_main_trig_character_rank_up_won_offensive_battles ]]--

function wh_main_trig_character_rank_up_won_offensive_battles_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():offensive_battles_won() > 5
end 

events.CharacterRankUp[#events.CharacterRankUp+1] =
function (context)
	if wh_main_trig_character_rank_up_won_offensive_battles_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_dwarf_bride", 8,  context)
		effect.ancillary("wh_dlc01_anc_follower_chaos_magister", 5,  context)
		effect.ancillary("wh2_main_anc_follower_hef_bard", 8,  context)
		effect.ancillary("wh_dlc05_anc_follower_hunting_hound", 5,  context)
		effect.ancillary("wh_main_anc_follower_greenskins_pit_boss", 10,  context)
		effect.ancillary("wh_main_anc_follower_all_men_valet", 5,  context)
	end
end

--[[ wh_main_trig_character_sacked_settlement ]]--

function wh_main_trig_character_sacked_settlement_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight"))
end 

events.CharacterSackedSettlement[#events.CharacterSackedSettlement+1] =
function (context)
	if wh_main_trig_character_sacked_settlement_impl(context) then
		effect.ancillary("wh2_main_anc_follower_def_slave", 30,  context)
		effect.ancillary("wh_dlc01_anc_follower_chaos_kurgan_chieftain", 5,  context)
		effect.ancillary("wh_dlc01_anc_follower_chaos_darksoul", 6,  context)
		effect.ancillary("wh2_main_anc_follower_skv_artefact_hunter", 25,  context)
		effect.ancillary("wh_main_anc_follower_dwarfs_prospector", 5,  context)
		effect.ancillary("wh_dlc08_anc_follower_slave_worker", 10,  context)
		effect.ancillary("wh_main_anc_follower_greenskins_bully", 20,  context)
		effect.ancillary("wh_dlc08_anc_follower_slave_worker", 10,  context)
		effect.ancillary("wh_dlc08_anc_follower_kurgan_slave_merchant", 10,  context)
		effect.ancillary("wh2_main_anc_follower_lzd_artefact_hunter", 25,  context)
		effect.ancillary("wh_dlc01_anc_follower_chaos_collector", 5,  context)
	end
end

--[[ wh_main_trig_character_sacked_settlement_losing_money ]]--

function wh_main_trig_character_sacked_settlement_losing_money_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():losing_money()
end 

events.CharacterSackedSettlement[#events.CharacterSackedSettlement+1] =
function (context)
	if wh_main_trig_character_sacked_settlement_losing_money_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_snotling_scavengers", 30,  context)
	end
end

--[[ wh_main_trig_character_sacked_settlement_started_war ]]--

function wh_main_trig_character_sacked_settlement_started_war_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():faction():started_war_this_turn()
end 

events.CharacterSackedSettlement[#events.CharacterSackedSettlement+1] =
function (context)
	if wh_main_trig_character_sacked_settlement_started_war_impl(context) then
		effect.ancillary("wh_dlc01_anc_follower_chaos_slave_master", 25,  context)
	end
end

--[[ wh_main_trig_character_turn_end_poo ]]--

function wh_main_trig_character_turn_end_poo_impl (context)
		return not context:character():character_type("colonel") and (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():has_region() and has_poo(context:character():region())
end 

events.CharacterTurnEnd[#events.CharacterTurnEnd+1] =
function (context)
	if wh_main_trig_character_turn_end_poo_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_dung_collector", 20,  context)
	end
end

--[[ wh_main_trig_character_won_battle ]]--

function wh_main_trig_character_won_battle_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle()
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_character_won_battle_impl(context) then
		effect.ancillary("wh2_dlc11_anc_follower_cst_travelling_necromancer", 4,  context)
		effect.ancillary("wh_main_anc_follower_norsca_berserker", 3,  context)
		effect.ancillary("wh_main_anc_follower_empire_apprentice_wizard", 4,  context)
		effect.ancillary("wh_main_anc_follower_undead_corpse_thief", 3,  context)
		effect.ancillary("wh_dlc05_anc_follower_wardancer_drummer", 5,  context)
		effect.ancillary("wh_main_anc_follower_empire_camp_follower", 6,  context)
		effect.ancillary("wh_dlc08_anc_follower_mammoth", 5,  context)
		effect.ancillary("wh_main_anc_follower_empire_hunter", 5,  context)
		effect.ancillary("wh_dlc08_anc_follower_beserker", 5,  context)
	end
end

--[[ wh_main_trig_character_won_battle_5_mul ]]--

function wh_main_trig_character_won_battle_5_mul_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and context:character():model():turn_number() % 5 == 0
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_character_won_battle_5_mul_impl(context) then
		effect.ancillary("wh_dlc03_anc_follower_beastmen_pox_carrier", 4,  context)
		effect.ancillary("wh_main_anc_follower_empire_charcoal_burner", 8,  context)
		effect.ancillary("wh_dlc05_anc_follower_royal_standard_bearer", 5,  context)
	end
end

--[[ wh_main_trig_character_won_battle_against_trolls ]]--

function wh_main_trig_character_won_battle_against_trolls_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and battle_featured_unit(context:pending_battle(), "wh_main_grn_mon_trolls")
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_character_won_battle_against_trolls_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_troll_slayer", 20,  context)
	end
end

--[[ wh_main_trig_character_won_battle_losing_money ]]--

function wh_main_trig_character_won_battle_losing_money_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and context:character():faction():losing_money()
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_character_won_battle_losing_money_impl(context) then
		effect.ancillary("wh_main_anc_follower_empire_peasant", 25,  context)
		effect.ancillary("wh_main_anc_follower_greenskins_swindla", 40,  context)
		effect.ancillary("wh_main_anc_follower_undead_dreg", 20,  context)
		effect.ancillary("wh_main_anc_follower_undead_warp_stone_hunter", 25,  context)
	end
end

--[[ wh_main_trig_character_won_battle_no_messenger ]]--

function wh_main_trig_character_won_battle_no_messenger_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and not context:character():has_ancillary("wh_main_anc_follower_empire_messenger")
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_character_won_battle_no_messenger_impl(context) then
		effect.ancillary("wh_main_anc_follower_empire_messenger", 4,  context)
	end
end

--[[ wh_main_trig_character_won_battle_poor ]]--

function wh_main_trig_character_won_battle_poor_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and context:character():faction():treasury() < 3000
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_character_won_battle_poor_impl(context) then
		effect.ancillary("wh_main_anc_follower_undead_treasurer", 20,  context)
		effect.ancillary("wh_main_anc_follower_dwarfs_cooper", 15,  context)
		effect.ancillary("wh_dlc08_anc_follower_skaeling_trader", 10,  context)
		effect.ancillary("wh_main_anc_follower_empire_entertainer", 20,  context)
		effect.ancillary("wh_dlc01_anc_follower_chaos_demagogue", 15,  context)
	end
end

--[[ wh_main_trig_character_won_siege_battle ]]--

function wh_main_trig_character_won_siege_battle_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and context:pending_battle():seige_battle()
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_character_won_siege_battle_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_sapper", 5,  context)
		effect.ancillary("wh_dlc05_anc_follower_vauls_anvil_smith", 5,  context)
		effect.ancillary("wh2_main_anc_follower_skv_engineering_student", 5,  context)
	end
end

--[[ wh_main_trig_general_lost_battle_against_greenskins ]]--

function wh_main_trig_general_lost_battle_against_greenskins_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and cm:char_is_general(context:character()) and not context:character():won_battle() and (context:pending_battle():attacker() == context:character() and context:pending_battle():defender():faction():culture() == "wh_main_grn_greenskins") or (context:pending_battle():defender() == context:character() and context:pending_battle():attacker():faction():culture() == "wh_main_grn_greenskins")
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_general_lost_battle_against_greenskins_impl(context) then
		effect.ancillary("wh_main_anc_follower_dwarfs_grudgekeeper", 20,  context)
	end
end

--[[ wh_main_trig_general_lost_battle_against_vampire_counts ]]--

function wh_main_trig_general_lost_battle_against_vampire_counts_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and cm:char_is_general(context:character()) and not context:character():won_battle() and (context:pending_battle():attacker() == context:character() and context:pending_battle():defender():faction():culture() == "wh_main_vmp_vampire_counts") or (context:pending_battle():defender() == context:character() and context:pending_battle():attacker():faction():culture() == "wh_main_vmp_vampire_counts")
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_general_lost_battle_against_vampire_counts_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_grave_robber", 25,  context)
	end
end

--[[ wh_main_trig_general_won_battle_against_men ]]--

function wh_main_trig_general_won_battle_against_men_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and cm:char_is_general(context:character()) and context:character():won_battle() and (context:pending_battle():attacker() == context:character() and (context:pending_battle():defender():faction():culture() == "wh_main_emp_empire" or context:pending_battle():defender():faction():culture() == "wh_main_brt_bretonnia")) or (context:pending_battle():defender() == context:character() and (context:pending_battle():attacker():faction():culture() == "wh_main_emp_empire" or context:pending_battle():attacker():faction():culture() == "wh_main_brt_bretonnia"))
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_general_won_battle_against_men_impl(context) then
		effect.ancillary("wh2_main_anc_follower_lzd_sacrificial_victim_human", 50,  context)
		effect.ancillary("wh_main_anc_follower_dwarfs_reckoner", 10,  context)
		effect.ancillary("wh2_main_anc_follower_skv_slave_human", 33,  context)
		effect.ancillary("wh_main_anc_follower_bretonnia_squire", 8,  context)
		effect.ancillary("wh_main_anc_follower_undead_mortal_informer", 13,  context)
	end
end

--[[ wh_main_trig_general_won_battle_against_men_not_militiaman ]]--

function wh_main_trig_general_won_battle_against_men_not_militiaman_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and not context:character():has_ancillary("wh_main_anc_follower_all_men_militiaman") and cm:char_is_general(context:character()) and context:character():won_battle() and (context:pending_battle():attacker() == context:character() and (context:pending_battle():defender():faction():culture() == "wh_main_emp_empire" or context:pending_battle():defender():faction():culture() == "wh_main_brt_bretonnia")) or (context:pending_battle():defender() == context:character() and (context:pending_battle():attacker():faction():culture() == "wh_main_emp_empire" or context:pending_battle():attacker():faction():culture() == "wh_main_brt_bretonnia"))
end 

events.CharacterCompletedBattle[#events.CharacterCompletedBattle+1] =
function (context)
	if wh_main_trig_general_won_battle_against_men_not_militiaman_impl(context) then
		effect.ancillary("wh_main_anc_follower_all_men_militiaman", 13,  context)
	end
end

--[[ wh_main_trig_hero_won_battle_losing_money ]]--

function wh_main_trig_hero_won_battle_losing_money_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and context:character():faction():losing_money()
end 

events.HeroCharacterParticipatedInBattle[#events.HeroCharacterParticipatedInBattle+1] =
function (context)
	if wh_main_trig_hero_won_battle_losing_money_impl(context) then
		effect.ancillary("wh_main_anc_follower_greenskins_snotling_scavengers", 20,  context)
		effect.ancillary("wh_main_anc_follower_greenskins_swindla", 40,  context)
	end
end

--[[ wh_main_trig_hero_won_battle_wizard ]]--

function wh_main_trig_hero_won_battle_wizard_impl (context)
		return (not context:character():character_subtype("dlc07_brt_green_knight")) and context:character():won_battle() and context:character():character_type("wizard")
end 

events.HeroCharacterParticipatedInBattle[#events.HeroCharacterParticipatedInBattle+1] =
function (context)
	if wh_main_trig_hero_won_battle_wizard_impl(context) then
		effect.ancillary("wh_dlc03_anc_follower_beastmen_bray_shamans_familiar", 15,  context)
		effect.ancillary("wh_main_anc_follower_all_hedge_wizard", 20,  context)
	end
end

