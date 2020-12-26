var subcultureList = Object.keys(data)

var el = document.getElementById('content')
var subcultureListEl = document.getElementById('subculture-list')

var curSelectedKey = null
function setActive(subcultureKey, set) {
	if (!subcultureKey) { return; }
	subcultureListEl.children[ subcultureList.indexOf(subcultureKey) ].classList[set ? 'add' : 'remove']('active')
}
function setSubculture(subcultureKey) {
	if (curSelectedKey === subcultureKey) { return; }
	el.innerHTML = subcultureKey ? data[ subcultureKey ] : '';
	setActive(curSelectedKey, false);
	setActive(curSelectedKey = subcultureKey, true);
}
function processHash() {
	var key = location.hash.substr(1);
	setSubculture(typeof data[ key ] !== "undefined" ? key : null);
}
window.onhashchange = processHash;
processHash();