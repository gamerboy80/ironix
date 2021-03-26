exports.run = (client, message, args, interaction) => {

 if(client.optedOut.get(message.author.id) != true) {
 message.channel.send({
              embed: {
                color: 0xc85151,
                description: 'You already opted-in!',
                footer: {
                  text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                  icon_url: message.author.displayAvatarURL(),
                },
              },
            });
} else {
  client.optedOut.set(message.author.id, false)
  message.channel.send({
              embed: {
                color: 0x51c878,
                description: 'Thanks for opting-in into "bug reports" optional data collecton!',
                footer: {
                  text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                  icon_url: message.author.displayAvatarURL(),
                },
              },
            });
}
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                  embeds: [ response ]
                }
            },
        });
}
};

exports.category = "Privacy";
