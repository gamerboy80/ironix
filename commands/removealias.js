exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
  var prefix = client.prefixes.get(message.guild.id);
  if (typeof client.aliases.get(message.author.id) !== 'object') {
    client.aliases.set(message.author.id, {});
  }

    if (args[0] != undefined) {
      if (
        client.aliases.get(message.author.id)[args.join(" ")]
      ) {
        const preto = client.aliases.get(message.author.id);
        delete preto[args.join(" ")];
        client.aliases.set(
          message.author.id,
          preto
            
        );
        message.channel.send({
          embed: {
            color: 0x51c878,
            description: "Alias removed!",
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
            description: "That alias doesn't exist.",
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
            "removeAlias [alias]",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
    }
};

exports.category = "Utility";
exports.syntax = "removeAlias [alias]"
exports.specialSlash = [{
    name: 'Alias',
    description: 'Description',
    type: 3,
    required: true
  }];