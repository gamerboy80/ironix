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
    if (args[0] != undefined) {
      args[0] = args[0].toLowerCase();
      if(args[0] == "*") {
        client.disabledFunctions.set(message.guild.id, client.tADisabled);
        message.channel.send({
            embed: {
              color: 0x51c878,
              description: "All functions disabled successfully!",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL()
              }
            }
          });
      } else {
      if(client.tADisabled.includes(args[0])){
      if (Array.isArray(client.disabledFunctions.get(message.guild.id))) {
        var fcifwk = Array.from(client.disabledFunctions.get(message.guild.id));
        if (fcifwk.includes(args.join(" ")) == false) {
          var pre = client.disabledFunctions.get(message.guild.id);
          pre.push(args.join(" ").toLowerCase());
          client.disabledFunctions.set(message.guild.id, pre);
          message.channel.send({
            embed: {
              color: 0x51c878,
              description: "Function disabled successfully!",
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
              description: "That function is already disabled!",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL()
              }
            }
          });
          return;
        }
      } else {
        client.disabledFunctions.set(message.guild.id, []);
        var pre = client.disabledFunctions.get(message.guild.id);
        pre.push(args.join(" ").toLowerCase());
        client.disabledFunctions.set(message.guild.id, pre);
        message.channel.send({
          embed: {
            color: 0x51c878,
            description: "Function disabled successfully!",
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
            "This function doesn't exist.",
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
            "Invalid syntax | CORRECT SYNTAX: " +
            prefix +
            "disable [function]",
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
  };
exports.category = "Settings";
exports.syntax = "disable [function]";
exports.specialSlash = [{
    name: 'Function',
    description: 'Description',
    type: 3,
    required: true
  }]