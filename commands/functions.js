exports.run = (client, message, args) => {
  var enabled = [];
  var disabled = [];

  if (message.member.hasPermission("MANAGE_GUILD")) {
    if(client.disabledFunctions.get(message.guild.id) != "") {
      disabled = client.disabledFunctions.get(message.guild.id)
  client.tADisabled.forEach((e, i) => {
    if(client.disabledFunctions.get(message.guild.id).indexOf(e) < 0) {
      enabled.push(e);
    }
    });
  if(client.disabledFunctions.get(message.guild.id).sort().toString() == client.tADisabled.sort().toString()) {
enabled = ["Nothing!"];
  }
    } else {
      enabled = client.tADisabled;
      disabled = ["Nothing!"];
    }
    message.channel.send({
      embed: {
        color: 0x51c878,
        description:
          "This server has these functions enabled: ``" +
          enabled.sort().toString().replace(/,/g, ", ") +
          "`` and these disabled: ``" +
          disabled.sort().toString().replace(/,/g, ", ") +
          "``.",
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
