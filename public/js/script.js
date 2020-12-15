if(window.location.pathname == "/") {
	document.getElementById('home').classList.add('active');
} else if(window.location.pathname == "/features") {
	document.getElementById('features').classList.add('active');
} else {
	document.getElementById('other').classList.add('active');
	document.getElementById('other').classList.add('other');
}
window.addEventListener("load", function(){
	document.body.classList.remove("loading");
	document.getElementById("html").classList.remove("loading");
	document.getElementById("loadAnimation").classList.remove("loadAnimation");
});