exports.run = (client, message, args) => {
  if(!client.disabledFunctions.get(message.guild.id).includes("moderation")) {
    if(!client.disabledFunctions.get(message.guild.id).includes("mute")) {
  const fs = require("fs");
  var prefix = client.prefixes.get(message.guild.id);
  function getIdFromMention(mention) {
    if (!mention) {
      return;
    }

    if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);

      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }

      return mention;
    }
  }

  if (message.member.hasPermission("KICK_MEMBERS")) {
    if (message.mentions.members.first()) {
      if (args[0]) {
        client.users.fetch(getIdFromMention(args[0])).then(user => {
          const muteRole = message.guild.roles.cache.find(r => r.name == "Muted-IX");
          if (client.mutes.get(message.guild.id).includes(user.id)) {
            
            if (Array.isArray(client.mutes.get(message.guild.id))) {
                    client.mutes.set(
          message.guild.id,
          client.mutes
            .get(message.guild.id)
            .filter(e => e !== user.id)
        );
                  } else {
                    client.mutes.set(message.guild.id, []);
                  }

                  var thing = client.tempMutes.get(message.guild.id) || {}; // probably copy this MAYBE

 delete thing[user.id];

 client.tempMutes.set(message.guild.id, thing);
            
            message.guild.members.cache.get(user.id).roles.remove(muteRole.id);

            client.users.fetch(user.id).then(usera => {
              usera
                .createDM().catch(console.log)
                .then(dm =>
                  dm.send(
                    "**" +
                      message.member.user.tag +
                      "** unmuted you" +
                      ".\n***Please, don't answer this message***"
                  ).catch(console.log)
                );
            });

            message.channel.send({
              embed: {
                color: 0x51c878,
                description:
                  user.tag +
                  " was unmuted successfully.",
                footer: {
                  text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            });
          } else {
            if(message.guild.members.cache.get(user.id).roles.cache.has(muteRole.id)) {
              message.guild.members.cache.get(user.id).roles.remove(muteRole.id);

            client.users.fetch(user.id).then(usera => {
              usera
                .createDM().catch(console.log)
                .then(dm => {
                  if(dm != undefined) {
                  dm.send(
                    "**" +
                      message.member.user.tag +
                      "** unmuted you" +
                      ".\n***Please, don't answer this message***"
                  ).catch(console.log);
                }
                }
                );
            });

            message.channel.send({
              embed: {
                color: 0x51c878,
                description:
                  user.tag +
                  " was unmuted successfully.",
                footer: {
                  text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            });
            } else {
            message.channel.send({
              embed: {
                color: 0xc85151,
                description: "This user isn't muted!",
                footer: {
                  text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            });
          }
          }
        });
      }
    } else {
      message.channel.send({
        embed: {
          color: 0xc85151,
          description:
            "Invalid syntax | CORRECT SYNTAX: " + prefix + "unmute [mention]",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
    }
  } else {
    message.channel.send({
      embed: {
        color: 0xc85151,
        description:
          "You need ``Kick Members`` permission for using this command.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL()
        }
      }
    });
  }
}
}
};

exports.category = "Moderation";
exports.neededPerms = ["MANAGE_ROLES"];