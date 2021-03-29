exports.run = (client, message, args, interaction) => {
	if (typeof client.aliases.get(message.author.id) !== "object") {
		client.aliases.set(message.author.id, {});
	}

	if (message.member.hasPermission("MANAGE_GUILD")) {
		if (Object.keys(client.aliases.get(message.author.id)).length != 0) {
			client.aliases.set(message.author.id, {});
			message.channel.send({
				embed: {
					color: 0x51c878,
					description: "Aliases emptied succesfully!",
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
					description: "You have no alias!",
					footer: {
						text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
						icon_url: message.author.displayAvatarURL(),
					},
				},
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
					icon_url: message.author.displayAvatarURL(),
				},
			},
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
