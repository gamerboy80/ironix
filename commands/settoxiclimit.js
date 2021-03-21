exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
  var prefix = client.prefixes.get(message.guild.id);
  if (message.member.hasPermission("MANAGE_GUILD")) {
    if (!isNaN(Number(args[0])) && Number(args[0]) != 0) {
      client.toxicLimit.set(message.guild.id, Number(args[0]));
      message.channel.send({
        embed: {
          color: 0x51c878,
          description: "Toxic limit changed succesfully!",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
    } else {
      if(args[0] != null || client.toxicLimit.get(message.guild.id) == "" || client.toxicLimit.get(message.guild.id) == undefined) {
      message.channel.send({
        embed: {
          color: 0xc85151,
          description:
            "Invalid syntax | CORRECT SYNTAX: " +
            prefix +
            "setToxicLimit [toxic limit (0.x)]",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
    } else {
      client.toxicLimit.set(message.guild.id, 0.8);
      message.channel.send({
        embed: {
          color: 0x51c878,
          description: "Toxic limit resetted succesfully!",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
    }
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
exports.syntax = "setToxicLimit [toxic limit (0.x)]";
exports.specialSlash = [{
    name: 'ToxicLimit',
    description: 'Description',
    type: 3,
    required: true
  }];