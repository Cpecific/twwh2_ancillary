var subcultureList = Object.keys(data)

var el = document.getElementById('content')
var subcultureListEl = document.getElementById('subculture-list')

var curSelectedKey = null
function setActive(subcultureKey, set) {
	if (!subcultureKey) { return; }
	subcultureListEl.children[subcultureList.indexOf(subcultureKey)].classList[set ? 'add' : 'remove']('active')
}
function generateHTML(data) {
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
		var ancillaryIcon = json[0];
		var ancillaryName = json[1];
		var effectList = json[2];
		var appliedToIcon = json[3].map(src => `<img src="output/html/${src}" />`);
		var appliedToText = appliedToIcon.length > 0 ? appliedToIcon.join('') + '\n' : '';
		var triggerList = json[4];
		var tgResult = [];
		for (var idx = 0; idx < triggerList.length; ++idx) {
			var b = triggerList[idx];
			var chance = b[0];
			var tgDescList = b[1];

			tgResult[idx] = `<td>${idx === 0 ? `${appliedToText}<br/>` : ''}${chance}%</td>
<td class="trigger-condition-list"><div>${tgDescList.map(v => v.replace(/\n/g, '<br/>')).join('</div><div>')}</div></td>`;
		}

		string += `<tr>
<td class="ancillary-icon" rowspan="${tgResult.length}"><img class="ancillary-icon" src="${ancillaryIcon}" /></td>
<td class="ancillary-name" rowspan="${tgResult.length}">${ancillaryName}</td>
<td class="effect-list" rowspan="${tgResult.length}">${effectList.join('<br/>')}</td>
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
	}
	string += `</tbody></table>`;
	return string;
}
function setSubculture(subcultureKey) {
	if (curSelectedKey === subcultureKey) { return; }
	el.innerHTML = subcultureKey ? generateHTML(data[subcultureKey]) : '';
	setActive(curSelectedKey, false);
	setActive(curSelectedKey = subcultureKey, true);
}
function processHash() {
	var key = location.hash.substr(1);
	setSubculture(typeof data[key] !== 'undefined' ? key : null);
}
window.onhashchange = processHash;
processHash();