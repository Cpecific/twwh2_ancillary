type CurrentGameType = 'warhammer_2' | 'warhammer_3';
type GameDataType = {
	index?: boolean;
	short_key: string;
	title: string;
	schema_file: string;
}
// TODO check wh2_main_anc_follower_skv_pet_wolf_rat for WH3
// ancillary_to_included_agents:
//     wh2_main_anc_follower_skv_pet_wolf_rat
//     wh2_main_anc_follower_skv_pet_wolf_rat
//     wh2_main_anc_follower_skv_pet_wolf_rat
// ancillaries_included_agent_subtypes:
//     wh2_dlc16_skv_ghoritch
//     wh2_main_skv_assassin
// output: Assassin
// expected: Ghoritch, Assassin
// test: Warlock Engineer, Plague Priest, Assasin, Ghoritch, Assassin

export const game_data = new Map<CurrentGameType, GameDataType>([
	['warhammer_2', {
		short_key: 'wh2',
		title: 'Warhammer 2',
		schema_file: 'schema_wh2.ron',
	}],
	['warhammer_3', {
		index: true,
		short_key: 'wh3',
		title: 'Warhammer 3',
		schema_file: 'schema_wh3.ron',
	}],
]);
export const current_game: CurrentGameType = 'warhammer_3';
export { data, dataCultureMap, getChance, spawn_unique_subtype } from './data-warhammer_3';
import { ca_ancillary_list } from './data-warhammer_3';

export const has_ca_ancillary = (key: string) => {
	for (const k in ca_ancillary_list) {
		// @ts-ignore
		const q = ca_ancillary_list[k];
		for (const g in q) {
			if (q[g].includes(key)) { return true; }
		}
	}
	return false;
};