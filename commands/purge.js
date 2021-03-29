exports.run = (client, message, args, interaction) => {
	if (!client.disabledFunctions.get(message.guild.id).includes("moderation")) {
		if (!client.disabledFunctions.get(message.guild.id).includes("purge")) {
			if (message.member.hasPermission("MANAGE_MESSAGES")) {
				if (args.length === 1) {
					var amount = Number(args[0]);
					if (isNaN(amount) || amount === 0 || amount > 100) {
						message.channel.send({
							embed: {
								color: 0xc85151,
								description: "You can only purge in between 1-100 messages!",
								footer: {
									text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
									icon_url: message.author.displayAvatarURL(),
								},
							},
						});
					} else {
						message.channel.bulkDelete(amount + 1).then(() => {
							if (amount == 1) {
								message.channel
									.send({
										embed: {
											color: 0x51c878,
											description: "Deleted " + amount + " message.",
											footer: {
												text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
												icon_url: message.author.displayAvatarURL(),
											},
										},
									})
									.then((m) => m.delete({ timeout: 1000 }));
							} else {
								message.channel
									.send({
										embed: {
											color: 0x51c878,
											description: "Deleted " + amount + " messages.",
											footer: {
												text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
												icon_url: message.author.displayAvatarURL(),
											},
										},
									})
									.then((m) => m.delete({ timeout: 1000 }));
							}
						});
					}
				} else {
					message.channel.send({
						embed: {
							color: 0xc85151,
							description: "You can only purge in between 1-100 messages!",
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
							"You need ``Manage Messages`` permission for using this command.",
						footer: {
							text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
							icon_url: message.author.displayAvatarURL(),
						},
					},
				});
			}
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

exports.category = "Moderation";
exports.neededPerms = ["MANAGE_MESSAGES"];
exports.syntax = "purge [messages]";
exports.specialSlash = [
	{
		name: "Messages",
		description: "Description",
		type: 4,
		required: true,
	},
];
