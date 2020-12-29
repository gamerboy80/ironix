var optionsListPre = ["help", "disable", "enable", "functions", "levelUpChannel", "resetPrefix", "setPrefix", "setupLogs", "setupSuggest", "addBlocklist", "emptyBlocklist", "removeBlocklist", "showBlocklist", "ban", "kick", "mute", "purge", "unBan", "unMute", "warn", "warnings", "approve", "deny", "suggest", "covid", "faq", "leave", "membersCount", "ping", "poll", "addLevelUpRole", "blockXP", "leaderboard", "rank", "rankColour", "removeLevelUpRole", "showBlockedXP", "showLevelUpRoles", "unBlockXP", "bird", "cat", "dog", "fox", "meme", "minesweeper", "rps", "credits", "help", "info", "uptime"];
var optionsList = [];

optionsListPre.forEach((e, i) => {
	optionsList.push("??" + e);
	optionsList.push("");
});

var inOption = -1;

var typeBackI = 0;

var toSlice = 1;

var typing = 0;

function typeDelete() {
	typing = 1;

	if (document.getElementById("commandExamples").innerHTML != "&nbsp;") {
		document.getElementById("commandExamples").innerHTML = optionsList[inOption].slice(0, Number('-' + toSlice));
		if(!document.getElementById("commandExamples").innerHTML.length > 0) {
			document.getElementById("commandExamples").innerHTML = "&nbsp;";
		}
		toSlice++;
		setTimeout(typeDelete, 100);
	} else {
		inOption++;
		toSlice = 1;
		typing = 0;
		if(inOption > optionsList.length - 1) {
			inOption = 0;
		}
	}
}

function typeBack() {
	typing = 1;
	if (typeBackI < optionsList[inOption].length) {
		document.getElementById("commandExamples").innerHTML += optionsList[inOption].charAt(typeBackI);
		typeBackI++;
		setTimeout(typeBack, 100);
	} else {
		typeBackI = 0;
		typing = 0;
	}
}

setInterval(() => {
	if(typing == 0) {
		typeDelete();
	}
	if(typing == 0) {
		typeBack();
	}
}, 500)


if(window.location.pathname == "/") {
	document.getElementById('home').classList.add('active');
} else if(window.location.pathname == "/features") {
	document.getElementById('features').classList.add('active');
} else {
	document.getElementById('other').classList.add('active');
	document.getElementById('otherLi').style.display = "inline-block";
}