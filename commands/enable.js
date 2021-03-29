exports.run = (client, message, args, interaction) => {
	var prefix = client.prefixes.get(message.guild.id);
	if (Array.isArray(client.disabledFunctions.get(message.guild.id)) == false) {
		client.disabledFunctions.set(message.guild.id, []);
	}

	if (message.member.hasPermission("MANAGE_GUILD")) {
		if (args[0] != undefined) {
			args[0] = args[0].toLowerCase();
			if (args[0] == "*") {
				client.disabledFunctions.set(message.guild.id, []);
				message.channel.send({
					embed: {
						color: 0x51c878,
						description: "All functions enabled successfully!",
						footer: {
							text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
							icon_url: message.author.displayAvatarURL(),
						},
					},
				});
			} else {
				if (client.tADisabled.includes(args[0])) {
					if (
						client.disabledFunctions
							.get(message.guild.id)
							.includes(args.join(" ")) == true
					) {
						client.disabledFunctions.set(
							message.guild.id,
							client.disabledFunctions
								.get(message.guild.id)
								.filter((e) => e !== args.join(" "))
						);
						message.channel.send({
							embed: {
								color: 0x51c878,
								description: "Function re-enabled succesfully!",
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
								description: "That function isn't disabled.",
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
							description: "This function doesn't exist.",
							footer: {
								text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
								icon_url: message.author.displayAvatarURL(),
							},
						},
					});
				}
			}
		} else {
			message.channel.send({
				embed: {
					color: 0xc85151,
					description:
						"Invalid syntax | CORRECT SYNTAX: " + prefix + "enable [function]",
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

exports.category = "Settings";
exports.syntax = "enable [function]";
exports.specialSlash = [
	{
		name: "Function",
		description: "Description",
		type: 3,
		required: true,
	},
];
