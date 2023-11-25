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
		if (chance === null) { scip = true; }
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
			text = text.replace(/^\((.+)\)\n/gm, '<div class="desc">$1</div>')
			text = text.replace(/\n/g, '<br/>');
			text = text.trim();

			var title = [];
			var cl = ['tg-description'];
			if (bug.description) { title.push('BUG: ' + bug.description); }
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

		var cl = [];
		if (!scip) { cl.push('dimmed'); }
		if (chance === null) { chance = ''; }
		else { chance = (idx === 0 ? '<br/>' : '') + chance + '%'; }
		if (idx === 0) { chance = appliedToText + chance; }
		var text = '<div class="tg-result-row">\
	<div class="tg-chance'+ (!scip ? ' dimmed' : '') + '">' + chance + '</div>\
	<div class="tg-condition-list">'+ tgDescText + '</div>\
</div>';
		return {
			scip: scip,
			text: text,
		};
	};
	function generateAncillary(json) {
		var string = '';
		var k = 0;
		var flags = 0;
		if (typeof json[0] === 'number') {
			flags = json[k++];
		}
		var ancillaryIcon = json[k++];
		var ancillaryName = json[k++];
		var excludedFactionList = typeof json[k] === 'string' ? 0 : json[k++];
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


		var ecl = 'effect-row';
		if (effectList.length > 0 && effectList[0].substr(0, 1) === '(') {
			ecl += ' effect-row--desc';
			effectList[0] = effectList[0].substr(1, effectList[0].length - 2);
		}
		string += '<div class="row">\n';
		if (excludedFactionList) {
			string += '<div class="ancillary-info ancillary--';
			if (excludedFactionList[0] === '+') {
				string += 'inclusion">Available only for: ' + excludedFactionList.slice(1).join(', ');
			} else {
				string += 'exclusion">Unavailable for: ' + excludedFactionList.join(', ');
			}
			string += '</div>';
		}

		string += '<div class="ancillary-icon' + cl + '">';

		var fl = [];
		if (flags & 1) { fl.push('not_stolen'); }
		if (flags & 2) { fl.push('randomly_dropped'); }
		if (flags & 4) { fl.push('lua_dropped'); }
		if (fl.length > 0) {
			string += '<div class="flag-container"><div class="flag-transform">';
			string += '<div class="flag-item flag--' + fl.join('"></div><div class="flag-item flag--') + '"></div>';
			string += '</div></div>';
		}

		string += '<span class="ancillary-name">' + ancillaryName + '</span>\
<span class="ancillary-name-bg" data="'+ ancillaryName
				.replace(/&/g, '&amp;')
				.replace(/'/g, '&apos;')
				.replace(/"/g, '&quot;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
			+ '"></span>\
<img src="output/html/' + ancillaryIcon + '" />\
</div>\
<div class="effect-list'+ cl + '"><div class="' + ecl + '">' + effectList.join('</div><div class="effect-row">') + '</div></div>\
<div class="tg-result">'+ tgResult.join('') + '</div>\
</div>';
		return string;
	}
	function generateContent(data) {
		var string = '';
		for (var i = 0; i < data.ancillaryList.length; ++i) {
			var json = data.ancillaryList[i];
			if (typeof json === 'string') {
				string += '<div class="row row--title">' + json + '</div>';
			} else {
				string += generateAncillary(json);
			}
		}
		return string;
	}
	function generateHTML(data) {
		var string = '';
		string += '<h1>' + data.title + '</h1>';
		if (typeof data.description !== 'undefined') {
			string += '<div id="page_description">' + data.description + '</div>';
		}
		string += '\n<div class="table">';
		string += generateContent(data);
		string += '</div>';
		return string;
	}
	function setData(data) {
		el.innerHTML = data ? generateHTML(data) : '';
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