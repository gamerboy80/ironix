exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
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

      
    }
    return mention;
  }

  
    if (true) {
      if (getIdFromMention(args[0]) != undefined) {
if (message.member.hasPermission("KICK_MEMBERS")) {
        var warnsList = new (require("discord.js")).MessageEmbed()
  .setColor('#51c878')
  .setDescription('WARNS:')
  .setFooter(`Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`, message.author.displayAvatarURL());;

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

          Object.keys(memberData).forEach((e, i) => {
            warnsList.addField("Warn ID: " + e, "Moderator: <@!" + memberData[e].moderator + "> | Reason: `" + memberData[e].reason + "` | Date: `" + new Date(memberData[e].date) + "`");
          });

          message.channel.send(warnsList);

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
      } else {
        var warnsList = new (require("discord.js")).MessageEmbed()
  .setColor('#51c878')
  .setDescription('WARNS:')
  .setFooter(`Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`, message.author.displayAvatarURL());;

        let memberData;
        try {
          memberData = client.warns.get(message.guild.id, message.author.id);
        } catch {}

        if (memberData == undefined) {
          message.channel.send({
            embed: {
              color: 0xc85151,
              description: "You don't have warns!",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL(),
              },
            },
          });
        } else {

          Object.keys(memberData).forEach((e, i) => {
            warnsList.addField("Warn ID: " + e, "Moderator: <@!" + memberData[e].moderator + "> | Reason: `" + memberData[e].reason + "` | Date: `" + new Date(memberData[e].date) + "`");
          });

          message.channel.send(warnsList);

        }
      }
    } else {
      var warnsList = new (require("discord.js")).MessageEmbed()
  .setColor('#51c878')
  .setDescription('WARNS:')
  .setFooter(`Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`, message.author.displayAvatarURL());;

        let memberData;
        try {
          memberData = client.warns.get(message.guild.id, message.author.id);
        } catch {}

        if (memberData == undefined) {
          message.channel.send({
            embed: {
              color: 0xc85151,
              description: "You don't have warns!",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL(),
              },
            },
          });
        } else {

          Object.keys(memberData).forEach((e, i) => {
            warnsList.addField("Warn ID: " + e, "Moderator: <@!" + memberData[e].moderator + "> | Reason: `" + memberData[e].reason + "` | Date: `" + new Date(memberData[e].date) + "`");
          });

          message.channel.send(warnsList);

        }
    }
};

exports.category = "Moderation";
exports.syntax = "warns [optional user]";
exports.specialSlash = [{
    name: 'User',
    description: 'Description',
    type: 6,
    required: false
  }];