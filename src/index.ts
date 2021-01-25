import fs from 'fs';
import glob from 'glob';
import iterate from 'iterare';
import { isEqual } from 'lodash';
import path from 'path';
import {
	AncillaryInfo,
	DB,
	findAncillary,
	getCulture,
	getCultureSubcultureList,
	getEffectDesc,
	getFactionListSorted,
	getSubcultureSubset,
	IParsed,
	parseTrigger,
	toCultureKey
} from './build-data';
import { isEqualShuffle, toArray, unique, toMap } from './common';
import { data } from './data';
import { CultureType, ITrigger, SubCultureType } from './data-types';
import { schema, locFileController, IEntry } from './ron-db';
// import phantomProxy from 'phantom-proxy';


const cultureDataMap = new Map([
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
		title: 'Chaos, Norsca',
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

fs.mkdirSync(path.join(__dirname, '../output/steamworkshop'), { recursive: true });

// !STEAM
async function outputSteam() {
	const parsed = new Map<CultureType, Map<string, IParsed>>();
	for (const trigger of data) {
		for (const ancData of trigger.ancillaryList) {
			const ancillary = findAncillary(ancData.key);
			for (const cultureKey of ancillary.cultureList) {
				if (!parsed.has(cultureKey)) {
					parsed.set(cultureKey, new Map());
				}
				const cultureMap = parsed.get(cultureKey)!;
				const requestSubcultureSubset = getSubcultureSubset(cultureKey, ancillary.subcultureList);

				parseTrigger({
					parsed: cultureMap,
					group: {
						by: 'culture',
						cultureKey,
						subcultureSubset: requestSubcultureSubset,
					},
					trigger,
					requestSubcultureSubset,
				});
			}
		}
	}
	let writtenCultureList: CultureType[] = [];
	for (const [cultureKey, cultureMap] of parsed) {
		let string = '';
		const culture = getCulture(cultureKey)!;
		const cultureData = cultureDataMap.get(cultureKey)!;
		const allSubcultureList = getCultureSubcultureList(cultureKey);
		console.log(cultureKey, allSubcultureList);
		// string += `[h1]${c['@name']}[/h1]\n`;
		if (typeof cultureData.description !== 'undefined') {
			string += `${cultureData.description}\n`;
		}
		string += `[table]`;
		string += `[tr]
[th]/////////////////////////[/th]
[th]//////////////////////////////////////////////////////////[/th]
[th]////////[/th]
[th]///////////////////////////////////////////////////////////[/th]
[/tr]`;
		for (const [ancillaryKey, parsed] of cultureMap) {
			const { ancillaryInfo, tirggerList } = parsed;
			const ancillary = findAncillary(ancillaryKey);
			const effectList = await Promise.all(ancillary.effectList.map(v => getEffectDesc(v)));
			const subcultureSubset = getSubcultureSubset(cultureKey, ancillary.subcultureList);

			let steamChanceIcon: string[] = [];
			if (ancillaryInfo.hasLord) {
				if (ancillaryInfo.incompleteLord) {
					steamChanceIcon.push(`[previewicon=21642549;sizeOriginal,inline;character_general_ability.png][/previewicon]`);
				} else {
					steamChanceIcon.push(`[previewicon=21641941;sizeOriginal,inline;battle_general_ability.png][/previewicon]`);
				}
			}
			if (ancillaryInfo.hasHero) {
				if (ancillaryInfo.incompleteHero) {
					steamChanceIcon.push(`[previewicon=21642086;sizeOriginal,inline;character_agent.png][/previewicon]`);
				} else {
					steamChanceIcon.push(`[previewicon=21641943;sizeOriginal,inline;campaign_agent.png][/previewicon]`);
				}
			}
			let steamChanceText = steamChanceIcon.length > 0 ? steamChanceIcon.join('') + '\n' : '';

			let myInfo: string[] = [];
			ancillaryInfo.narrow.length > 0 && myInfo.push(ancillaryInfo.narrow.join(', '));

			if (!isEqualShuffle(subcultureSubset, allSubcultureList)) {
				myInfo.unshift(subcultureSubset
					.map(subcultureKey => (
						DB.cultures_subcultures.getEntry([subcultureKey])!['@name'] as string
					)).join(', '));
			}
			const tgResult = tirggerList.map(({ chance, repeat, triggerDesc }, idx) => {
				const tgDescList = triggerDesc.map(v => {
					let text = v.text;
					if ((v.top.allowed.length + v.top.against.length + v.top.forbid.length) > 0) {
						let top = v.top.allowed.slice();
						if (v.top.against.length > 0) {
							top = top.concat([`against: ${v.top.against.join(', ')}`]);
						}
						if (v.top.forbid.length > 0) {
							top = top.concat([`Forbid:: ${v.top.forbid[0]}`, ...v.top.forbid.slice(1)]);
						}
						text = `(${top.join('; ')})\n${text}`;
					}
					if (!v.c.prevent) {
						text = `*${text}`;
					}
					return text;
				});
				return `[td]${idx === 0 ? steamChanceText : ''}${chance}%${typeof repeat === 'undefined' ? '' : `\nx${repeat}`}[/td]
[td]${unique(tgDescList).join(';\n')}[/td]`;
			});

			// myInfo = myInfo.map(v => `(only for: ${v})`);
			myInfo = myInfo.map(v => `(${v})`);
			string += `[tr]
[td]${ancillary.ancillary['@onscreen_name']}[/td]
[td]${[...myInfo, ...effectList].join('\n')}[/td]
${tgResult[0]}
[/tr]`;
			if (tgResult.length > 1) {
				string += tgResult
					.slice(1)
					.map(string => `
[tr]
[td][/td]
[td][/td]
${string}
[/tr]`)
					.join('');
			}
		}
		string += `[/table]`;

		const filename = path.join(__dirname, '../output/steamworkshop', `${cultureKey}.txt`);
		let content: string | null = null;
		try {
			content = fs.readFileSync(filename, { encoding: 'utf-8' });
		} catch (e) { }
		if (content !== string) {
			writtenCultureList.push(cultureKey);
			fs.writeFileSync(filename, string);
		}
	}
	console.log('@writtenCultureList', writtenCultureList);
}

// !HTML
async function outputHTML() {
	// subculture > ancillary > parsed
	const parsed = new Map<SubCultureType, Map<string, IParsed>>();
	const {
		cultureMap,
		playableFactionList,
	} = getFactionListSorted();
	for (const [cultureKey, { subcultureList }] of cultureMap) {
		for (const subcultureKey of subcultureList) {
			if (!parsed.has(subcultureKey)) {
				parsed.set(subcultureKey, new Map());
			}
		}
	}
	for (const trigger of data) {
		for (const ancData of trigger.ancillaryList) {
			const ancillary = findAncillary(ancData.key);
			for (const subcultureKey of ancillary.subcultureList) {
				if (!parsed.has(subcultureKey)) {
					parsed.set(subcultureKey, new Map());
				}
				const cultureMap = parsed.get(subcultureKey)!;
				const cultureKey = toCultureKey(subcultureKey);
				const requestSubcultureSubset = [subcultureKey];

				parseTrigger({
					parsed: cultureMap,
					group: {
						by: 'subculture',
						cultureKey,
						subculture: subcultureKey,
					},
					trigger,
					requestSubcultureSubset,
				});
			}
		}
	}
	type OutputEntry = {
		title: string;
		description: string | undefined;
		ancillaryList: JsonEntry[];
	}
	type JsonEntry = [
		ancillaryIcon: string,
		ancillaryName: string,
		effectList: string[],
		appliedToIcon: string[],
		triggerList: JsonTriggerEntry[],
	]
	type JsonTriggerEntry = [
		chance: number,
		conditionList: string[]
	]
	// @ts-ignore
	const output: { [K in SubCultureType]: OutputEntry; } = {};
	const requiredImageSet = new Set<string>();
	const getIconSrc = (src: string): string => {
		if (/^output\/html\//.test(src)) { return src; }
		src = src.replace(/\\/, '/');
		requiredImageSet.add(src);
		src = `output/html/game/${src}`;
		return src;
	}
	for (const [subcultureKey, subcultureMap] of parsed) {
		if (subcultureMap.size === 0) { continue; }
		let jsonList: JsonEntry[] = [];
		const cultureKey = toCultureKey(subcultureKey);
		const culture = getCulture(cultureKey)!;
		const cultureData = cultureDataMap.get(cultureKey)!;
		const subcultureRow = DB.cultures_subcultures.getEntry([subcultureKey])!;
		for (const [ancillaryKey, parsed] of subcultureMap) {
			const { ancillaryInfo, tirggerList } = parsed;
			const ancillary = findAncillary(ancillaryKey);
			const effectList = (await Promise.all(
				ancillary.effectList.map(v => getEffectDesc(v, {
					color: 'html',
					image: 'html',
				}))
			)).map(v => (
				v
					.replace(/\n/g, '<br/>')
					.replace(/\<img(.*?) src\=\"(.*?)\"(.*?)\>/g, (_, before, src, after) => {
						return `<img${before} src="${getIconSrc(src)}"${after}>`;
					})
			));

			let appliedToIcon: string[] = [];
			if (ancillaryInfo.hasLord) {
				if (ancillaryInfo.incompleteLord) {
					appliedToIcon.push(`character_general_ability.png`);
				} else {
					appliedToIcon.push(`battle_general_ability.png`);
				}
			}
			if (ancillaryInfo.hasHero) {
				if (ancillaryInfo.incompleteHero) {
					appliedToIcon.push(`character_agent.png`);
				} else {
					appliedToIcon.push(`campaign_agent.png`);
				}
			}

			let myInfo: string[] = [];
			ancillaryInfo.narrow.length > 0 && myInfo.push(ancillaryInfo.narrow.join(', '));

			const tgResult = tirggerList.map(({ chance, triggerDesc }, idx): JsonTriggerEntry => {
				const tgDescList = triggerDesc.map(v => {
					let text = v.text;
					if ((v.top.allowed.length + v.top.against.length + v.top.forbid.length) > 0) {
						let top = v.top.allowed.slice();
						if (v.top.against.length > 0) {
							top = top.concat([`against: ${v.top.against.join(', ')}`]);
						}
						if (v.top.forbid.length > 0) {
							top = top.concat([`Forbid:: ${v.top.forbid[0]}`, ...v.top.forbid.slice(1)]);
						}
						text = `(${top.join('; ')})\n${text}`;
					}
					if (!v.c.prevent) {
						text = `*${text}`;
					}
					return text;
				});
				return [
					chance,
					unique(tgDescList)
				];
			});

			myInfo = myInfo.map(v => `(${v})`);

			let json: JsonEntry = [
				getIconSrc(ancillary.icon),
				ancillary.ancillary['@onscreen_name'] as string,
				[...myInfo, ...effectList],
				appliedToIcon,
				tgResult,
			];
			jsonList.push(json);
		}
		output[subcultureKey] = {
			title: subcultureRow['@name'] as string,
			description: cultureData.description,
			ancillaryList: jsonList,
		};
	}
	const inputGameFolder = path.join(__dirname, '../input');
	const outputGameFolder = path.join(__dirname, '../output/html/game');
	await new Promise(resolve => glob(path.join(outputGameFolder, 'ui/**/*'), (err, fileList) => {
		for (const filepath of fileList) {
			if (!fs.lstatSync(filepath).isFile()) { continue; }
			const src = filepath.substr(outputGameFolder.length + 1).replace(/\\/g, '/');
			if (requiredImageSet.has(src)) {
				requiredImageSet.delete(src);
			} else {
				fs.unlinkSync(filepath);
			}
		}
		resolve(null);
	}));
	// console.log({ copyFiles: requiredImageSet });
	for (const src of requiredImageSet) {
		const from = path.join(inputGameFolder, src);
		const to = path.join(outputGameFolder, src);
		try {
			fs.mkdirSync(path.dirname(to), { recursive: true });
			fs.copyFileSync(from, to, fs.constants.COPYFILE_EXCL);
		} catch (e) {
			console.log(e);
		}
	}

	const subcultureList = (Object.keys(output) as SubCultureType[])
		.map(subcultureKey => ({
			subcultureKey,
			playable: cultureMap.get(toCultureKey(subcultureKey))!
				.factionMap.get(subcultureKey)!
				.some(factionKey => playableFactionList.includes(factionKey)),
		}));
	let string = `<html>
<head>
<title>Ultimate Ancillary Guide</title>
<link rel="stylesheet" href="output/html/style.css" />
</head>
<body>
<div id="root">
	<div id="content"></div>
	<div id="subculture-list">
${subcultureList.map(v => {
		const subcultureRow = DB.cultures_subcultures.getEntry([v.subcultureKey])!;
		let classList: string[] = [];
		if (!v.playable) { classList.push('not-playable'); }
		return `<a ${classList.length > 0 ? `class="${classList.join(' ')}" ` : ''}href="#${v.subcultureKey}">${subcultureRow['@name']}</a>
`;
	}).join('')}
	</div>
</div>
<script>
data = ${JSON.stringify(output, null, '\t')}
</script>
<script src="output/html/entry.js"></script>
</body>
</html>`;

	// fs.writeFileSync(path.join(__dirname, '../output/html', `index.html`), string);
	fs.writeFileSync(path.join(__dirname, '..', `index.html`), string);
}

Promise.all([
	outputSteam(),
	outputHTML(),
]).then(() => console.log('END'))