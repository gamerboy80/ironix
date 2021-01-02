exports.run = (client, message, args) => {
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
      if (getIdFromMention(args[0]) != undefined) {

        var warnsList = "";

        let memberData;

        try {
          memberData = client.warns.get(message.guild.id, getIdFromMention(args[0]));
        } catch {}

        if (memberData == undefined) {
          message.channel.send({
            embed: {
              color: 0xc85151,
              description: "This user doesn't have warns!",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL(),
              },
            },
          });
        } else {

          for (var i = 0; i < Object.keys(memberData).length; i++) {
            warnsList = warnsList + "Warn ID: `" + (getIdFromMention(args[0]) + i) + "` | Moderator: <@!" + memberData[(getIdFromMention(args[0]) + i).toString()].moderator + "> | Reason: `" + memberData[(getIdFromMention(args[0]) + i).toString()].reason + "` | Date: `" + new Date(memberData[(getIdFromMention(args[0]) + i).toString()].date) + "`\n\n";
          }

          message.channel.send({
            embed: {
              color: 0x51c878,
              description: "WARNS: \n\n" + warnsList,
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL(),
              },
            },
          });

        }
      } else {
        message.channel.send({
            embed: {
              color: 0xc85151,
              description:
                "Invalid syntax | CORRECT SYNTAX: " +
                prefix +
                "warnings [user]",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL(),
              },
            },
          });
      }
    } else {
      message.channel.send({
            embed: {
              color: 0xc85151,
              description:
                "Invalid syntax | CORRECT SYNTAX: " +
                prefix +
                "warnings [user]",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL(),
              },
            },
          });
    }
  }
};

exports.category = "Moderation";
