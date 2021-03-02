exports.run = (client, message, args) => {
  var prefix = client.prefixes.get(message.guild.id);
    if (client.commands.get(args[1])) {
      if (typeof client.aliases.get(message.author.id) === 'object') {
        if (!client.aliases.get(message.author.id)[args[0]]) {
          var pre = client.aliases.get(message.author.id);
          pre[args[0].toLowerCase()] = args[1];
          client.aliases.set(message.author.id, pre);
          message.channel.send({
            embed: {
              color: 0x51c878,
              description: "Word aliasesed successfully!",
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
              description: "That word is already aliasesed!",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL()
              }
            }
          });
          return;
        }
      } else {
        client.aliases.set(message.author.id, {});
        var pre = client.aliases.get(message.author.id);
          pre[args[0].toLowerCase()] = args[1];
          client.aliases.set(message.author.id, pre);
          message.channel.send({
            embed: {
              color: 0x51c878,
              description: "Word aliasesed successfully!",
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
            "addAlias [alias name] [command name]",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
    }
};

exports.category = "Utility";
