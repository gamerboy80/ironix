exports.run = (client, message, args, interaction) => {

	if(client.ableUsers.get(message.author.id) != true) {
		client.ableUsers.set(message.author.id, true)
 message.channel.send({
              embed: {
                color: 0x51c878,
                description: "Thanks for agreeing to our [Privacy Policy](https://ironix.emeraldteam.ga/privacy)! Welcome to Ironix!",
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
                description: "You already agreed our [Privacy Policy](https://ironix.emeraldteam.ga/privacy)!",
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
