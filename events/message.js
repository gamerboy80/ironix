module.exports = async (client, message) => {
  // secret obfuscated co

  // Ignore all bots
  if (message.author.bot) return;

  if(message.channel.type == "dm") { return; }

  var prefix = client.prefixes.get(message.guild.id);
  if (
    message.content == "<@" + client.user.id + ">" ||
    message.content == "<@!" + client.user.id + ">"
  ) {
    message.channel.send(
      "<@" + message.author.id + ">, the prefix is " + prefix
    );
    return;
  }
  if (
    message.content == "<@" + client.user.id + "> help" ||
    message.content == "<@!" + client.user.id + "> help"
  ) {
    client.commands
      .get("help")
      .run(client, message, message.content.slice(prefix.length).split(/ +/g));
    return;
  }

if (!prefix) {
    prefix = client.config.prefix;
    client.prefixes.set(message.guild.id, prefix);
  }

  if (message.content.toLowerCase() == "??resetprefix" || message.content.toLowerCase() == prefix + "resetprefix") {
    if (message.member.hasPermission("MANAGE_GUILD")) {
      client.prefixes.set(message.guild.id, "??");
      message.channel.send({
        embed: {
          color: 0x51c878,
          description: "Prefix reset succesfully!",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL(),
          },
        },
      });
      return;
    } else {
      message.channel.send({
        embed: {
          color: 0xc85151,
          description:
            "You need ``Manage Guild`` permission for using this command.",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL(),
          },
        },
      });
      return;
    }
  }
  let iss;
  let iss2;
  if (!Array.isArray(client.xpblocked.get(message.guild.id))) {
    iss = true;
    iss2 = true;
  } else {
    iss = !client.xpblocked
      .get(message.guild.id)
      .includes(message.channel.id);
      iss2 = !client.xpblocked
      .get(message.guild.id)
      .includes(message.author.id);
  }
  if (!Array.isArray(client.disabledFunctions.get(message.guild.id))) {
    client.disabledFunctions.set(message.guild.id, []);
  }
  if (
    !client.disabledFunctions.get(message.guild.id).includes("rank") &&
    iss === true && iss2 == true
  ) {
    try {
      var idk = client.rankData.get(message.guild.id, message.author.id);
    } catch {
      rankData = {
        time: Date.now(),
        xp: 0,
        level: 0,
      };
      client.rankData.set(message.guild.id, rankData, message.author.id);
    }

    var rankData = client.rankData.get(message.guild.id, message.author.id);

    if (!rankData) {
      rankData = {
        time: Date.now(),
        xp: 0,
        level: 0,
      };
      client.rankData.set(message.guild.id, rankData, message.author.id);
    }

    if (rankData.time + 59999 < Date.now()) {
      rankData.time = Date.now();
      rankData.xp =
        rankData.xp +
        Math.floor(Math.random() * (Math.floor(15) - Math.ceil(25) + 1)) +
        Math.ceil(16);
    }

    var needed = (rankData.level + 1) * 100;
    if (rankData.xp > needed) {
      rankData.xp = rankData.xp - needed;
      rankData.level++;
      if (client.levelUpChannel.get(message.guild.id) == undefined) {
        message.channel.send(
          "Congratulations, <@!" +
            message.author.id +
            ">!, you have leveled up to " +
            rankData.level +
            "!"
        );
      } else {
        if (client.levelUpChannel.get(message.guild.id) == "dms") {
          message.author.send(
            "Congratulations, <@!" +
              message.author.id +
              ">!, you have leveled up to " +
              rankData.level +
              "!"
          );
        } else {
          if (!client.levelUpChannel.get(message.guild.id) == "disabled" && message.guild.channels.cache
              .get(client.levelUpChannel.get(message.guild.id)) != undefined) {
            message.guild.channels.cache
              .get(client.levelUpChannel.get(message.guild.id))
              .send(
                "Congratulations, <@!" +
                  message.author.id +
                  ">!, you have leveled up to " +
                  rankData.level +
                  "!"
              );
          }
        }
      }
    }

    client.rankData.set(message.guild.id, rankData, message.author.id);

    if(typeof client.leveluproles.get(message.guild.id) !== 'object') {
      client.leveluproles.set(message.guild.id, {});
    }

    if(client.leveluproles.get(message.guild.id)[rankData.level] != undefined) {
      try {
        message.guild.members.cache.get(message.author.id).roles.add(client.leveluproles.get(message.guild.id)[rankData.level]);
    } catch {}
    }
  }

  /* if (!rankData) {
    rankData = {
      time: Date.now() - 60000,
      messages: 0,
      level: 0
    }
    client.rankData.set(message.author.id, rankData);
  }
  if ((Date.now() - rankData.time) > 60000) {
    rankData.messages++;
  }
var needed = (Math.round(Math.pow(rankData.level, 2) / 10) + 2) * 10;
  if (rankData.messages > needed) {
    rankData.level++;
    message.channel.send("Congratulations, <@!" + message.author.id + ">!, you have leveled up to " + rankData.level + "!");
  }
  rankData.time = Date.now();
  client.rankData.set(message.author.id, rankData); */

  // filters

  if (!client.disabledFunctions.get(message.guild.id).includes("filters")) {
    require("fs").readdir("./filters/", (err, files) => {
      if (err) return console.error(err);
      files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let filterName = file.split(".")[0];
        let args = message.content.split(/ +/g);
        if(Array.isArray(client.filters.get(filterName).neededPerms)) {
        client.filters.get(filterName).neededPerms.forEach(perm => {
          if(message.guild.members.cache.get(client.user.id).hasPermission(perm)) {
            client.filters.get(filterName).run(client, message, args);
          }
        });
    } else {
      client.filters.get(filterName).run(client, message, args);
    }
      });
    });
  }

  // Ignore messages not starting with the prefix (in config.json)
  if (
    message.content /*.toLowerCase()*/
      .indexOf(prefix) !== 0
  )
    return;

  // Our standard argument/command name definition.
  const args = message.content
    .slice(prefix.length)
    //.trim()
    .split(/ +/g);
  let command = args.shift().toLowerCase();
  if(client.aliases.get(message.author.id)) {
  if(client.aliases.get(message.author.id)[command]) { command = client.aliases.get(message.author.id)[command] }
}

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  if(!Array.from(client.usersOnCountdown.keys()).includes(message.author.id)) {
client.usersOnCountdown.set(message.author.id);
  if(Array.isArray(cmd.neededPerms)) {
        cmd.neededPerms.forEach(perm => {
          if(message.guild.members.cache.get(client.user.id).hasPermission(perm)) {
            cmd.run(client, message, args);
          } else {
            message.channel.send({
        embed: {
          color: 0xc85151,
          description: "Missing permissions: ``" + cmd.neededPerms.join(", ") + "``.",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
            throw {};
          }
        });
    } else {
      cmd.run(client, message, args);
    }
    setTimeout(() => {
      client.usersOnCountdown.delete(message.author.id);
    }, 1000);
  }
};
