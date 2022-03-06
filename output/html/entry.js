((function () {
	var bFprevent = window.bFprevent,
		bFnormal = window.bFnormal;
	var el = document.getElementById('content');
	var subcultureListEl = document.getElementById('subculture-list');
	var linkList = [];
	for (var i = 0; i < subcultureListEl.children.length; ++i) {
		var child = subcultureListEl.children[i];
		linkList.push(child.getAttribute('href').substr(1));
	}

	var curSelectedKey = null;
	var bExtra = false;
	function setActive(subcultureKey, set) {
		if (!subcultureKey) { return; }
		subcultureListEl.children[linkList.indexOf(subcultureKey)].classList[set ? 'add' : 'remove']('active');
	}
	function generateTrigger(trigger, idx, params) {
		var appliedToText = params.appliedToText;
		var chance = trigger[0];
		var tgDescList = trigger[1];
		var tgHiddenText = '';
		var tgDescText = '';
		var scip = false;
		for (var i = 0; i < tgDescList.length; ++i) {
			var b = tgDescList[i];
			var text = b[0], flags = b[1];
			var bug;
			if (typeof b[2] !== 'undefined') {
				bug = b[2];
				if (typeof bug === 'string') {
					bug = { value: true, description: bug };
				} else {
					bug = { value: bug[0], description: bug[1] };
				}
			} else {
				bug = { value: false, description: '' };
			}
			text = text.replace(/^\((.+)\)\n/gm, '<div class="desc">($1)</div>')
			text = text.replace(/\n/g, '<br/>');
			// #region
			// text = text.replace(/\{(.*?)\}(\s?)/g, function(_, q, space) {
			// 	if (!bExtra) { return ''; }
			// 	var qList = q.split(',');
			// 	if (qList.length === 0) {
			// 		return '';
			// 	}
			// 	var ret = [];
			// 	for (const val of qList) {
			// 		switch (val) {
			// 			case 'normal':
			// 				ret.push('with normal character');
			// 		}
			// 	}
			// 	if (ret.length === 0) { return ''; }
			// 	return '(' + ret.join('; ') + ')' + space;
			// });
			// #endregion
			text = text.trim();

			var title = [];
			var cl = ['tg-description'];
			if (bug.description) { title.push('BUG: ' + bug.description); }
			// console.log(bug.description)
			if (bug.value) {
				cl.push('dimmed');
				text = '<s>' + text + '</s>';
			} else {
				scip = true;
				if (bug.description) { cl.push('has_title'); }
			}
			var fl = [];
			if (bFprevent && flags & 1) { fl.push('prevent'); }
			if (bFnormal && flags & 2) { fl.push('normal'); }
			if (i > 0) { tgDescText += '<div class="separator"></div>'; }
			tgDescText += '<div' + (cl.length > 0 ? ' class="' + cl.join(' ') + '"' : '');
			if (title.length > 0) {
				tgDescText += ' title="' + title.join('\n').replace(/\"/g, '&quot;') + '"';
			}
			tgDescText += '>';
			if (fl.length > 0) {
				tgDescText += '<div class="flag-container"><div class="flag-transform">';
				tgDescText += '<div class="flag-item flag--' + fl.join('"></div><div class="flag-item flag--') + '"></div>';
				tgDescText += '</div></div>';
			}
			tgDescText += text + '</div>';
		}
		// tgDescText = '<div class="tg-hidden">' + tgDescText + '</div>' + '<div class="tg-wrap">' + tgDescText + '</div>';

		var cl = [];
		if (!scip) { cl.push('dimmed'); }
		// 		var text = '<td' + (cl.length > 0 ? ' class="' + cl.join(' ') + '"' : '') + '>' + (idx === 0 ? appliedToText + '<br/>' : '') + chance + '%</td>\n\
		// <td class="trigger-condition-list">'+ tgDescText + '</td>';
		var text = '<div class="tg-result-row">\
	<div class="tg-chance'+ (!scip ? ' dimmed' : '') + '">' + (idx === 0 ? appliedToText + '<br/>' : '') + chance + '%</div>\
	<div class="tg-condition-list">'+ tgDescText + '</div>\
</div>';
		return {
			scip: scip,
			text: text,
		};
	};
	function generateAncillary(json) {
		var string = '';
		var ancillaryIcon = json[0];
		var ancillaryName = json[1];
		var k = 2;
		var effectList = [];
		while (typeof json[k] !== 'object') {
			effectList.push(json[k++]);
		}
		var appliedToIcon = json[k++].map(function (src) {
			return '<img src="output/html/' + src + '" />';
		});
		var appliedToText = appliedToIcon.length > 0 ? appliedToIcon.join('') + '\n' : '';
		var triggerList = [];
		while (k < json.length) {
			var chance = json[k++];
			var tgDescList = [];
			while (k < json.length && typeof json[k] !== 'number') {
				var desc = json[k++];
				if (typeof desc === 'string') { desc = [desc, 0, false]; }
				tgDescList.push(desc);
			}
			triggerList.push([chance, tgDescList]);
		}
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

		var cl = (scip ? '' : ' dimmed');
		// 		string += '<tr>\
		// <td class="ancillary-icon'+ cl + '" rowspan="' + tgResult.length + '"><img class="ancillary-icon" src="output/html/' + ancillaryIcon + '" /></td>\
		// <td class="ancillary-name'+ cl + '" rowspan="' + tgResult.length + '">' + ancillaryName + '</td>\
		// <td class="effect-list'+ cl + '" rowspan="' + tgResult.length + '">' + effectList.join('<br/>') + '</td>\
		// '+ tgResult[0] + '\
		// </tr>';
		// 		if (tgResult.length > 1) {
		// 			string += tgResult
		// 				.slice(1)
		// 				.map(function (string) { return '<tr>' + string + '</tr>'; })
		// 				.join('');
		// 		}
		string += '<div class="row">\
<div class="ancillary-icon'+ cl + '">\
<span class="ancillary-name">' + ancillaryName + '</span>\
<img src="output/html/' + ancillaryIcon + '" />\
</div>\
<div class="effect-list'+ cl + '"><div class="effect-row' + (effectList[0].substr(0, 1) === '(' ? ' effect-row--desc' : '') + '">' + effectList.join('</div><div class="effect-row">') + '</div></div>\
<div class="tg-result">'+ tgResult.join('') + '</div>\
</div>';
		return string;
	}
	function generateContent(data) {
		var string = '';
		for (var i = 0; i < data.ancillaryList.length; ++i) {
			var json = data.ancillaryList[i];
			string += generateAncillary(json);
		}
		return string;
	}
	function generateHTML(data) {
		var string = '';
		// string += '<div id="page_title">';
		string += '<h1>' + data.title + '</h1>';
		// string += '<label class="noselect">Show extra info</label>';
		// string += '</div>';
		if (typeof data.description !== 'undefined') {
			string += '<div id="page_description">' + data.description + '</div>';
		}
		// 720px [40, 110, 240, 42, *]
		// 		string += '\n<table>\
		// <thead>\
		// <th width="5.5%"></th>\
		// <th width="15.27%"></th>\
		// <th width="33.3%"></th>\
		// <th width="7.5%"></th>\
		// <th></th>\
		// </thead>\
		// <tbody>'
		// 		string += generateContent(data);
		// 		string += '</tbody></table>';
		string += '\n<div class="table">';
		string += generateContent(data);
		string += '</div>';
		return string;
	}
	function setData(data) {
		el.innerHTML = data ? generateHTML(data) : '';
		// var el_content = el.children[1].lastChild; // tbody
		// var el_ce = document.createElement('input'); // checkbox_extra
		// el_ce.type = 'checkbox';
		// el_ce.checked = bExtra;
		// el_ce.onchange = function (ev) {
		// 	bExtra = this.checked;
		// 	el_content.innerHTML = generateContent(data);
		// };
		// el.children[0].children[1].prepend(el_ce);
	}
	function setSubculture(subcultureKey) {
		if (curSelectedKey === subcultureKey) { return; }
		setData(subcultureKey ? data[subcultureKey] : null);
		setActive(curSelectedKey, false);
		setActive(curSelectedKey = subcultureKey, true);
	}
	function processHash() {
		var key = location.hash.substr(1);
		setSubculture(typeof data[key] !== 'undefined' ? key : null);
	}
	window.onhashchange = processHash;
	processHash();
})());