
type IterateType<T> = { [K: string]: T } | Map<string, T>
export function* iterate<T>(map: IterateType<T>) {
	if (map instanceof Map) {
		for (const [k, v] of map) {
			yield [k, v] as const;
		}
		return;
	}
	for (const k in map) {
		const v = map[k];
		yield [k, v] as const;
	}
}
export function toMap<T>(map: IterateType<T>) {
	const output = new Map<string, T>();
	for (const [k, v] of iterate(map)) {
		output.set(k, v);
	}
	return output;
}
export function toArray<T>(map: IterateType<T>) {
	const output: (readonly [string, T])[] = [];
	for (const kv of iterate(map)) {
		output.push(kv);
	}
	return output;
}
export function unique<T>(array: T[]) {
	return array.filter((v, idx, self) => (
		self.indexOf(v) === idx
	));
}
export function isEqualShuffle<T>(a: T[], b: T[]) {
	return (
		a.length === b.length
		&& a.every(v => (
			b.includes(v)
		))
	);
}
export function addMap<K, V>(map: Map<K, V[]>, key: K, value: V) {
	let v: V[];
	if (map.has(key)) {
		v = map.get(key)!;
	} else {
		map.set(key, v = []);
	}
	v.push(value);
}
export function deleteItem(arr: string[], item: string): boolean {
	for (let i = 0; i < arr.length; ++i) {
		if (arr[i] === item) {
			arr.splice(i, 1);
			return true;
		}
	}
	return false;
}
export const intersect = <T>(cultureKey: T[], subcultureList: T[]) => {
	return subcultureList
		.filter(subcultureKey => cultureKey.includes(subcultureKey));
};