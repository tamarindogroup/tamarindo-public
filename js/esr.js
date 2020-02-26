window.onload = function() {

	var headerWrapper = document.querySelector(".header-wrap.mh-clearfix");
	headerWrapper.className += " esr-top-header";
var newDiv = document.createElement('div');
	newDiv.setAttribute('class', 'tg-div');
var newA = document.createElement('a');
	newA.setAttribute('class', 'tg-link');
	newA.setAttribute('href', 'http://www.tamarindogroup.com');

	newA.appendChild(newDiv);
	headerWrapper.appendChild(newA);

}