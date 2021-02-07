const discord = require("discord.js");
const client = new discord.Client({ fetchAllMembers: true, ws: { properties: { $browser: "Discord iOS" } } });
const enmap = require("enmap"); 
client.config = require("./config.json");
const needle = require("needle");
const fs = require("fs");
var clone = require("lodash.clonedeep");

// LEADERBOARD START

// require stuff
const express = require("express"),
  app = express(),
  server = require("http").Server(app);

// start server listening
server.listen(3000);

// IMPORTANT PART

app.use(express.static(__dirname + "/public/"));

function getHtmlStart(webTitle) {
  return (
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>`+ webTitle + `</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/all.css">
</head>
<body>
    <div class="container">
        <nav>
            <ul>
                <li><a href="/">Ironix</a></li>
                <li class="verticalSeparator"></li>
                <li><a href="/" id="home">Home</a></li>
                <li><a href="/features" id="features">Features</a></li>
                <li style="display: none;" id="otherLi"><a href="#" id="other" >Other</a></li>
            </ul>
            <div class="horizontalSeparator"></div>
        </nav>
    `
  );
}
var htmlEnd = `</div>
    <script src="/js/script.js"></script>
</body>
</html>`;

app.get("/leaderboard*", (req, res) => {
  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  var guildId = req.url.toString().slice(13);

  var htmlStart = getHtmlStart(
    "Ironix | " +
      (client.guilds.cache.get(guildId).name || `Guild not found`) +
      ` - Leaderboard`
  );

  if (client.rankData.get(guildId) != undefined) {
    var memberArray = [];
    var memberLevels = [];
    memberArray = Object.keys(client.rankData.get(guildId));
    memberLevels = memberArray.map(function(e) {
      return client.rankData.get(guildId, e).level;
    });
    memberLevelsToRankCheck = memberArray.map(function(e) {
      return (
        client.rankData.get(guildId, e).level.toString() +
        ".1" +
        client.rankData.get(guildId, e).xp.toString() +
        "1"
      );
    });
    var sortedArray = memberLevelsToRankCheck
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => b - a);
    var memberRanks = memberLevelsToRankCheck.map(
      (v) => sortedArray.findIndex((e) => e == v) + 1
    );

    var membersXp = memberArray.map(function(e) {
      return kFormatter(client.rankData.get(guildId, e).xp);
    });

    var membersNeededXp = memberArray.map(function(e) {
      return kFormatter((client.rankData.get(guildId, e).level + 1) * 100);
    });

    var membersObjectPrePre = {};
    memberArray.forEach(
      (e, i) =>
        (membersObjectPrePre[e] = {
          username:
            client.users.cache.get(e) != undefined
              ? client.users.cache.get(e).tag
              : `Username not found`,
          rank: memberRanks[i],
          level: memberLevels[i],
          xp: membersXp[i],
          neededXp: membersNeededXp[i],
        })
    );

    var membersObjectPre = Object.entries(membersObjectPrePre);

    membersObjectPre.sort(function(a, b) {
      return a[1].rank - b[1].rank;
    });

    var membersObject = Object.fromEntries(membersObjectPre);

    var leaderboardPage =
      `<div class="marginedContainer"><h1 class="leaderboardTitle">` +
      client.guilds.cache.get(guildId).name +
      ` - Leaderboard</h1>`;

    Object.keys(membersObject).forEach((e, i) => {
      const user = membersObject[e];
      const userId = Object.keys(membersObject)[i];
      const avatarUrl =
        client.users.cache.get(userId) != undefined
          ? client.users.cache.get(userId).displayAvatarURL()
          : "https://cdn.discordapp.com/embed/avatars/1.png";
      leaderboardPage =
        leaderboardPage +
        `<h3 class="leaderboardItem"><img class="avatar" src="` +
        avatarUrl +
        `"><p class="usernameLeaderboard">` +
        user.username +
        `</p>: RANK: #` +
        user.rank +
        ` | LEVEL: ` +
        user.level +
        ` | XP: ` +
        user.xp +
        `/` +
        user.neededXp +
        `</h3>`;
    });
    res.send(htmlStart + leaderboardPage + "</div>" + htmlEnd);
  } else {
    var htmlStart = getHtmlStart("Ironix | Error");
    res.status(404).send(
      htmlStart +
        `<p class="bigTitle">Error 404 - Guild not found</p>` +
        htmlEnd
    );
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/features*", (req, res) => {
  res.sendFile(__dirname + "/public/features.html");
});

app.get("/invite*", (req, res) => {
  res.redirect(
    "https://discord.com/api/oauth2/authorize?client_id=715986550596567121&permissions=8&scope=bot"
  );
});

app.get("/ultra-secret-easter-egg-surprised-ironix-face*", (req, res) => {
  res.sendFile(__dirname + "/public/game.html");
});
app.get("/get-commands-list*", (req, res) => {
  const commandsList = [];
  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let commandName = file.split(".")[0];
      commandsList.push(commandName);
    });
    res.send(commandsList.toString());
  });
});

app.get("*", (req, res) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).sendFile(__dirname + "/public/500.html");
});

// LEADERBOARD END

client.clone = clone;
client.suggestions = new enmap({ name: "suggestions" });
client.logs = new enmap({ name: "logs" });
client.prefixes = new enmap({ name: "prefixes" });
client.blocklist = new enmap({ name: "blocklist" });
client.rankData = new enmap({ name: "rankData" });
client.bans = new enmap({ name: "bans" });
client.mutes = new enmap({ name: "mutes" });
client.tempMutes = new enmap({ name: "tempMutes" });
client.tempBans = new enmap({ name: "tempBans" });
client.levelUpChannel = new enmap({ name: "levelUpChannel" });
client.disabledFunctions = new enmap({ name: "disabledFunctions" });
client.patest = new enmap({ name: "patest" });
client.warns = new enmap({ name: "warns" });
client.leveluproles = new enmap({ name: "leveluproles" });
client.inspection = new enmap({ name: "inspection" });
client.toxicLimit = new enmap({ name: "toxicLimit" });
client.notAnalyze = new enmap({ name: "notAnalyze" });
client.usersOnCountdown = new enmap({ name: "usersOnCountdown" });
client.tADisabled = [
  "blocklist",
  "kick",
  "ban",
  "mute",
  "purge",
  "covid",
  "leave",
  "rank",
  "memberscount",
  "poll",
  "suggest",
  "animals",
  "rps",
  "minesweeper",
  "meme",
  "bingimage",
  "mailfilter",
  "fun",
  "bird",
  "cat",
  "dog",
  "fox",
  "moderation",
  "filters",
  "warn",
];
client.xpblocked = new enmap({ name: "xpblocked" });
client.rankcolour = new enmap({ name: "rankcolour" });

client.kick = ["kick"];
client.ban = ["ban", "unban"];
client.mute = ["mute", "unmute"];
client.purge = ["purge"];
client.covid = ["covid"];
client.leave = ["leave"];
client.rank = [
  "rank",
  "addleveluprole",
  "removeleveluprole",
  "showleveluproles",
];
client.memberscount = ["memberscount"];
client.poll = ["poll"];
client.suggest = ["suggest"];
client.animals = ["bird", "cat", "dog", "fox", "pig"];
client.rps = ["rps"];
client.minesweeper = ["minesweeper"];
client.meme = ["meme"];
client.bingimage = ["bingimage"];
client.fun = [
  "bingimage",
  "bird",
  "cat",
  "dog",
  "fox",
  "meme",
  "minesweeper",
  "rps",
  "pig",
];
client.bird = ["bird"];
client.cat = ["cat"];
client.dog = ["dog"];
client.fox = ["fox"];
client.warn = ["warn"];
client.pig = ["pig"];
client.moderation = [
  "kick",
  "permban",
  "permmute",
  "purge",
  "tempban",
  "tempmute",
  "unban",
  "unmute",
  "warn",
  "warnings",
];
client.toxicity = ["toxicity"];

client.wasFiltered = null;
client.version = "1.6.4";

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new enmap();
client.filters = new enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName.toLowerCase(), props);
  });
});
fs.readdir("./filters/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./filters/${file}`);
    let filterName = file.split(".")[0];
    console.log(`Attempting to load filter ${filterName}`);
    client.filters.set(filterName.toLowerCase(), props);
  });
});

client.on("guildCreate", async (guild) => {
  client.blocklist.set(guild.id, []);
  client.disabledFunctions.set(guild.id, []);
  if (guild.roles.cache.find((r) => r.name === "Muted-IX") == null) {
    guild
      .roles.create({
        data: {
          name: "Muted-IX",
          color: "GRAY",
      }
      })
      .then((role) => {
        const muteRole = role;
        muteRole.setPosition(
          guild.roles.cache.find((r) => r.name == "Ironix").position - 1
        );
        guild.channels.cache.forEach((channel) => {
          if (channel.manageable) {
            if (channel.type === "text") {
              channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
              });
            } else {
              if (channel.type === "voice") {
                channel.createOverwrite(muteRole, {
                  SPEAK: false,
                });
              }
            }
          }
        });
      });
  }
});

client.on("channelCreate", (channel) => {
  if (channel.guild != null && channel.guild != undefined) {
    var role = channel.guild.roles.cache.find((r) => r.name === "Muted-IX");
    if (channel.manageable) {
      if (channel.type === "text") {
        channel.createOverwrite(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        });
      } else {
        if (channel.type === "voice") {
          channel.createOverwrite(role, {
            SPEAK: false,
          });
        }
      }
    }
  }
});

// require("./anti-shutdown.js");

client.login(client.config.token);
