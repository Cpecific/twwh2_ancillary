var subcultureList = Object.keys(data)

var el = document.getElementById('content')
var subcultureListEl = document.getElementById('subculture-list')

var curSelectedKey = null
const setActive = (subcultureKey, set) => {
	if (!subcultureKey) { return; }
	subcultureListEl.children[subcultureList.indexOf(subcultureKey)].classList[set ? 'add' : 'remove']('active')
}
const generateTrigger = (trigger, idx, params) => {
	var appliedToText = params.appliedToText;
	var chance = trigger[0];
	var tgDescList = trigger[1];
	var tgDescText = '';
	var scip = false;
	for (var i = 0; i < tgDescList.length; ++i) {
		var b = tgDescList[i];
		var text = b[0], bug = b[1];
		text = text.replace(/\n/g, '<br/>');
		var style = {};
		var title = [];
		if (bug) {
			style.opacity = '.5';
			if (typeof bug === 'string') { title.push('BUG: ' + bug); }
			text = `<s>${text}</s>`;
		} else {
			scip = true;
		}
		tgDescText += '<div';
		if (title.length > 0) {
			tgDescText += ' title="' + title.join('\n').replace(/\"/g, '\\"') + '"';
		}
		if (Object.keys(style).length > 0) {
			tgDescText += ' style="';
			for (const key in style) {
				tgDescText += `${key}: ${style[key]};`
			}
			tgDescText += '"';
		}
		tgDescText += `>${text}</div>`;
	}

	var text = `<td${scip ? '' : ' style="opacity: .5;"'}>${idx === 0 ? `${appliedToText}<br/>` : ''}${chance}%</td>
<td class="trigger-condition-list">${tgDescText}</td>`;
	return {
		scip: scip,
		text: text,
	};
};
const generateAncillary = (json) => {
	var string = '';
	var ancillaryIcon = json[0];
	var ancillaryName = json[1];
	var effectList = json[2];
	var appliedToIcon = json[3].map(src => `<img src="output/html/${src}" />`);
	var appliedToText = appliedToIcon.length > 0 ? appliedToIcon.join('') + '\n' : '';
	var triggerList = json[4];
	var tgResult = [];
	var scip = false; // someConditionIsPossible
	for (var idx = 0; idx < triggerList.length; ++idx) {
		var trigger = triggerList[idx];
		var r = generateTrigger(trigger, idx, {
			appliedToText: appliedToText,
		});
		if (r.scip) { scip = true; }
		tgResult[idx] = r.text;
	}

	scip = scip ? '' : ' style="opacity: .5;"';
	string += `<tr>
<td class="ancillary-icon" rowspan="${tgResult.length}"${scip}><img class="ancillary-icon" src="${ancillaryIcon}" /></td>
<td class="ancillary-name" rowspan="${tgResult.length}"${scip}>${ancillaryName}</td>
<td class="effect-list" rowspan="${tgResult.length}"${scip}>${effectList.join('<br/>')}</td>
${tgResult[0]}
</tr>`;
	if (tgResult.length > 1) {
		string += tgResult
			.slice(1)
			.map(string => `
<tr>
${string}
</tr>`)
			.join('');
	}
	return string;
};
const generateHTML = (data) => {
	var string = '';
	string += `<h1>${data.title}</h1>`;
	if (typeof data.description !== 'undefined') {
		string += `<h5>${data.description}</h5>`;
	}
	string += `\n<table>
<thead>
<th width="40px"></th>
<th width="110px"></th>
<th width="240px"></th>
<th width="42px"></th>
<th></th>
</thead>
<tbody>`;
	for (var i = 0; i < data.ancillaryList.length; ++i) {
		var json = data.ancillaryList[i];
		string += generateAncillary(json);
	}
	string += `</tbody></table>`;
	return string;
}
const setSubculture = (subcultureKey) => {
	if (curSelectedKey === subcultureKey) { return; }
	el.innerHTML = subcultureKey ? generateHTML(data[subcultureKey]) : '';
	setActive(curSelectedKey, false);
	setActive(curSelectedKey = subcultureKey, true);
}
const processHash = () => {
	var key = location.hash.substr(1);
	setSubculture(typeof data[key] !== 'undefined' ? key : null);
}
window.onhashchange = processHash;
processHash();