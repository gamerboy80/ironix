var points = 0;
function ironixClicked() {
	points++;
	document.getElementById("points").innerHTML = points + " points";
	if (points == 100) {
		alert("GG, you won the most boring game!");
	}
}
