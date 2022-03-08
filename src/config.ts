type CurrentGameType = 'warhammer_2' | 'warhammer_3';
type GameDataType = {
	index?: boolean;
	short_key: string;
	title: string;
	schema_file: string;
}
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
export { data, dataCultureMap, getChance } from './data-warhammer_3';
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