exports.run = (client, message, args, interaction) => {
	if (!client.disabledFunctions.get(message.guild.id).includes("leave")) {
		message.member
			.kick()
			.then((water) => {
				message.channel.send(
					"Goodbye, " +
						message.author.username +
						"#" +
						message.author.discriminator +
						" (" +
						message.author.id +
						", <@" +
						message.author.id +
						">)!"
				);
			})
			.catch((water) => {
				message.channel.send("The role hierarchy doesn't let me kick you.");
			});
	}
	if (interaction) {
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [response],
				},
			},
		});
	}
};

exports.category = "Utility";
