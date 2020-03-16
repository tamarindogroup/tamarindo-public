function fixRegisterPage () {
	// var buttonContainers = document.querySelectorAll(".fweu-button-container");
	// for (var i = 0; i < buttonContainers.length; i++) {
	// 	buttonContainers[i].innerHTML = "<a href=\"#register class=\"fweu-button w-inline-block\"><p class=\"fweu-button-text\">Register</p></a>"
	// }
	// var ps = document.querySelectorAll("p");
	// for (var i = 0; i < ps.length; i++) {
	// 	if (ps[i].innerHTML == "") {
	// 		ps[i].remove();
	// 	}
	// }

	$("p:empty").remove()

}

fixRegisterPage ()