function validJson(a) {
  try {
    JSON.parse(a);
    return true;
  } catch {
    return false;
  }
}

const fs = require("fs");

module.exports = async (client) => {
  /*client.guilds.forEach(guild => {
    fs.readFile("prefixes/" + guild.id + ".txt", (err, file) => {
      if (err) {
        fs.writeFile("prefixes/" + guild.id + ".txt", client.config.prefix, (err) => {
          if (err) console.error(err);
        });
      }
    });
  });*/

  client.usersOnCountdown.clear();
  console.log("Bot logged in.");
  client.user.setActivity("@Ironix help - " + client.version, { type: "PLAYING" });
  require("needle").post(
    "https://ptb.discord.com/api/webhooks/716063243550064750/si9oBNNo1hGMChOrR6Ycim45-9bOfmdNRxUHNKX27nLr6PKkouKBy2Wxf6E6a0lqIlq9",
    {
      content: "<@" + client.user.id + "> finished loading",
    },
    (err, resp, body) => {
      //console.log(body);
    }
  );
  // require("needle").get("https://discordemoji.com/api/", (err, resp, body) => {
  /* if (validJson(body))
      require("fs").writeFileSync("DiscordEmoji.json", JSON.stringify(body));
  });

  client.on("guildCreate", guild => {
    require("fs").writeFile(
      "prefixes/" + guild.id + ".txt",
      require("../config.json").prefix,
      function(err) {
        if (err) {
          throw err;
        }
      }
    );
    require("fs").writeFile(
      "suggest/" + guild.id + ".txt",
      require("../config.json").prefix,
      function(err) {
        if (err) {
          throw err;
        }
      }
    );

    guild
      .createRole({
        name: "Muted-IX",
        color: "GRAY",
        permissions: ["CHANGE_NICKNAME", "VIEW_CHANNEL", "CONNECT", "USE_VAD"]
      })
      .then(role => {
        const muteRole = role;
        client.channels.forEach(channel => {
          if (channel.manageable) {
            if (channel.type === "text") {
              channel.createOverwrite(muteRole, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: false
              });
            } else {
              channel.createOverwrite(muteRole, {
                VIEW_CHANNEL: true,
                SPEAK: false
              });
            }
          }
        });
      });
  });*/

  client.guilds.cache.forEach((guild) => {
    const muteRole = guild.roles.cache.find(r => r.name == "Muted-IX");
    if (typeof client.tempMutes.get(guild.id) === "object") {
      if (
        client.tempMutes.get(guild.id) != undefined
      ) {

        Object.keys(client.tempMutes.get(guild.id)).forEach((e, i) => {
        setTimeout(function() {

          if (Array.isArray(client.mutes.get(guild.id))) {
            client.mutes.set(
              guild.id,
              client.mutes.get(guild.id).filter((e) => e !== e)
            );
          } else {
            client.mutes.set(guild.id, []);
          }

          var thing = client.tempMutes.get(guild.id) || {}; // probably copy this MAYBE

          delete thing[e];

          client.tempMutes.set(guild.id, thing);

          guild.members.cache.get(e).roles.remove(muteRole.id);
        }, Number(
          client.tempMutes.get(guild.id)[
            e
          ].time
        ) - Date.now());
      });
      }
    }
  });

  client.guilds.cache.forEach((guild) => {
    if (typeof client.tempBans.get(guild.id) === "object") {
      if (
       client.tempBans.get(guild.id) != undefined
      ) {

        Object.keys(client.tempBans.get(guild.id)).forEach((e, i) => {
        setTimeout(function() {

          var thing = client.tempBans.get(guild.id) || {}; // probably copy this MAYBE

          delete thing[e];

          client.tempBans.set(guild.id, thing);

          guild.members.unban(e);
        }, Number(
          client.tempBans.get(guild.id)[
            e
          ].time
        ) - Date.now());
      });
      }
    }
  });

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  if(client.commands.get(interaction.data.name)) {
    if(!Array.from(client.usersOnCountdown.keys()).includes(interaction.member.user.id)) {
      client.usersOnCountdown.set(interaction.member.user.id);
      if(Array.isArray(client.commands.get(interaction.data.name).neededPerms)) {
        client.commands.get(interaction.data.name).neededPerms.forEach(perm => {
          if(client.guilds.cache.get(interaction.guild_id).members.cache.get(client.user.id).hasPermission(perm)) {
            try {
    client.commands.get(interaction.data.name).run(client, { guild: client.guilds.cache.get(interaction.guild_id), channel: client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id), member: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id), author: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).user }, (interaction.data.options||[]).map(thing => thing.value), interaction);
  } catch(error) {
            console.log(error);
            
            client.bugCheck({ guild: client.guilds.cache.get(interaction.guild_id), channel: client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id), member: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id), author: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).user }, error);
          }
        } else {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
            client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).send({
        embed: {
          color: 0xc85151,
          description: "Missing permissions: ``" + cmd.neededPerms.join(", ") + "``.",
          footer: {
            text: `Requested by ${interaction.member.user.username}#${interaction.member.user.discriminator} (${interaction.member.user.id})`,
            icon_url: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).displayAvatarURL()
          }
        }
      });
            throw {};
          }
  });
      } else {
        try {
    
  } catch(error) {
            console.log(error);
            
            client.bugCheck({ guild: client.guilds.cache.get(interaction.guild_id), channel: client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id), member: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id), author: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).user }, error);
          }
      }
    setTimeout(() => {
      client.usersOnCountdown.delete(interaction.member.user.id);
    }, 1000);
  }
  }
});

};
