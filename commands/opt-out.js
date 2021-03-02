exports.run = (client, message, args) => {
 if(client.optedIn.get(message.author.id) != true) {
  client.optedIn.set(message.author.id, false)
 message.channel.send({
              embed: {
                color: 0xc85151,
                description: 'You already opted-out!',
                footer: {
                  text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                  icon_url: message.author.displayAvatarURL(),
                },
              },
            });
} else {
  message.channel.send({
              embed: {
                color: 0x51c878,
                description: "It's sad to see you not wanting to help us anymore :(",
                footer: {
                  text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                  icon_url: message.author.displayAvatarURL(),
                },
              },
            });
}
};

exports.category = "Privacy";
