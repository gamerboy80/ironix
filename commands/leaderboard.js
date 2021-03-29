exports.run = (client, message, args, interaction) => {
	message.channel.send(
		"Here you go! " +
			client.config.websiteDomain +
			"/leaderboard/" +
			message.guild.id +
			" 🎩"
	);
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

exports.category = "Rank";
