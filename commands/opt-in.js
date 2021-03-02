exports.run = (client, message, args) => {
	if(client.optedIn.get(message.author.id) != true) {
		client.optedIn.set(message.author.id, true)
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
} else {
	message.channel.send({
              embed: {
                color: 0xc85151,
                description: "You already opted-in!",
                footer: {
                  text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                  icon_url: message.author.displayAvatarURL(),
                },
              },
            });
}
};

exports.category = "Privacy";
