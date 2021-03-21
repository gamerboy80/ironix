exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
  if (message.member.hasPermission("MANAGE_GUILD")) {
    let blockedL = [];
    if(client.xpblocked.get(message.guild.id) != undefined) {
    if(client.xpblocked.get(message.guild.id) != "") {
    client.xpblocked.get(message.guild.id).forEach((c, i) => {
      if (message.guild.channels.cache.get(c) != undefined) {
        blockedL.push("#" + message.guild.channels.cache.get(c).name);
      } else {
        if (message.guild.members.cache.get(c) != undefined) {
          blockedL.push("@" + message.guild.members.cache.get(c).user.tag);
        }
      }
    });
  }
  }

    if (blockedL != "") {
      message.channel.send({
        embed: {
          color: 0x51c878,
          description:
            "This server channels/members blocked from gaining XP are: ``" +
            blockedL.toString().replace(/,/g, ", ") +
            "``",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL(),
          },
        },
      });
    } else {
      message.channel.send({
        embed: {
          color: 0xc85151,
          description:
            "This server doesn't have any channel/member blocked from gaining XP!",
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
          "You need ``Manage Guild`` permission for using this command.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL()
        }
      }
    });
  }
};

exports.category = "Settings";
