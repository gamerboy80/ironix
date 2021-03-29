exports.run = (client, message, args, interaction) => {
	if (!client.disabledFunctions.get(message.guild.id).includes("music")) {
		if (
			message.member.roles.cache.find((role) => role.name === "Music Master") ||
			message.member.hasPermission("MANAGE_GUILD")
		) {
			if (message.guild.members.cache.get(client.user.id).voice.channel) {
				message.guild.members.cache.get(client.user.id).voice.channel.leave();
				client.queue[message.guild.id] = [];
				message.channel.send({
					embed: {
						color: 0x51c878,
						description: "Stopped.",
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
						description: "I'm not in a VC!",
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
						"You need Music Master role or `MANAGE_GUILD` permission!",
					footer: {
						text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
						icon_url: message.author.displayAvatarURL(),
					},
				},
			});
		}
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

exports.category = "Music";
