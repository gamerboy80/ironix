exports.run = (client, message, args) => {
  var prefix = client.prefixes.get(message.guild.id);
  if (Array.isArray(client.xpblocked.get(message.guild.id)) == false) {
    client.xpblocked.set(message.guild.id, []);
  }

  if (message.member.hasPermission("MANAGE_GUILD")) {
    if (args[0] != undefined) {
      if (
        client.xpblocked.get(message.guild.id).includes(getChannelOrMemberId(args.join(" "))) == true
      ) {
        client.xpblocked.set(
          message.guild.id,
          client.xpblocked
            .get(message.guild.id)
            .filter(e => e !== getChannelOrMemberId(args.join(" ")))
        );
        message.channel.send({
          embed: {
            color: 0x51c878,
            description: "Channel/member removed from gaining XP blocklist.",
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
            description: "That channel/member doesn't have gaining XP blocked.",
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
            "Invalid syntax | CORRECT SYNTAX: " +
            prefix +
            "unblockXP [channel / member]",
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
          "You need ``Manage Guild`` permission for using this command.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL()
        }
      }
    });
  }

  function getChannelOrMemberId(s) {
    if(s.slice(2).startsWith("!")) {
      return s.slice(3).slice(0, -1);
    } else {
      return s.slice(2).slice(0, -1);
    }
  }

};

exports.category = "Rank";
