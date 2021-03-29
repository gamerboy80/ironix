exports.run = (client, message, args, interaction) => {
	if (message.member.hasPermission("MANAGE_GUILD")) {
		if (client.blocklist.get(message.guild.id).length != 0) {
			message.channel.send({
				embed: {
					color: 0x51c878,
					description:
						"This server blocklist is: ``" +
						client.blocklist
							.get(message.guild.id)
							.toString()
							.replace(/,/g, ", ") +
						"``",
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
					description: "This server doesn't have a blocklist",
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

exports.category = "Blocklist";
