exports.run = (client, message, args) => {
  if(!client.disabledFunctions.get(message.guild.id).includes("moderation")) {
  if(!client.disabledFunctions.get(message.guild.id).includes("kick")) {
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

  if (message.member.permissions.has("KICK_MEMBERS")) {
    if (message.mentions.members.first()) {
      if (args[0]) {
        client.users.fetch(getIdFromMention(args[0])).then(user => {
          const preMessageReady = args;
          preMessageReady.shift();
          const messageReady = preMessageReady.join(" ");
          if (message.guild.members.cache.get(user.id).kickable) {
            if (messageReady != "") {
              try {
              client.users.fetch(user.id).then(usera => {
                usera
                  .createDM()
                  .then(dm =>
                    dm.send(
                      "**" +
                        message.member.user.tag +
                        "** kicked you because: **" +
                        messageReady +
                        ".**\n***Please, don't answer this message***"
                    )
                  )
                  .then(() => {
                    message.guild.members.cache.get(user.id).kick();
                  })
                  .catch(a => {
                    message.guild.members.cache.get(user.id).kick();
                  });
              });
            } catch {}

              message.channel.send({
                embed: {
                  color: 0x51c878,
                  description:
                    user.tag +
                    " was kicked successfully.",
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
                  description:
                    "Invalid syntax | CORRECT SYNTAX: " +
                    prefix +
                    "kick [mention] [reason]",
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
                description: "You can't kick this user!",
                footer: {
                  text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            });
          }
        });
      }
    } else {
      message.channel.send({
        embed: {
          color: 0xc85151,
          description:
            "Invalid syntax | CORRECT SYNTAX: " +
            prefix +
            "kick [mention] [reason]",
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
