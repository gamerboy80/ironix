exports.run = (client, message, args, interaction) => {
	var prefix = client.prefixes.get(message.guild.id);
	if (message.member.hasPermission("MANAGE_GUILD")) {
		if (a(args[0])) {
			if ((message.guild.channels.cache.get(b(args[0])) || {}).type == "text") {
				client.levelUpChannel.set(message.guild.id, b(args[0]));
				message.channel.send({
					embed: {
						color: 0x51c878,
						description: "Level up channel prepared/changed succesfully!",
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
						description:
							"Invalid syntax | CORRECT SYNTAX: " +
							prefix +
							"levelUpChannel [channel mention / dms / disabled]",
						footer: {
							text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
							icon_url: message.author.displayAvatarURL(),
						},
					},
				});
			}
		} else {
			if (args[0] == "dms") {
				client.levelUpChannel.set(message.guild.id, "dms");
				message.channel.send({
					embed: {
						color: 0x51c878,
						description: "Level up channel prepared/changed succesfully!",
						footer: {
							text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
							icon_url: message.author.displayAvatarURL(),
						},
					},
				});
			} else {
				if (args[0] == "disabled") {
					client.levelUpChannel.set(message.guild.id, "disabled");
					message.channel.send({
						embed: {
							color: 0x51c878,
							description: "Level up channel prepared/changed succesfully!",
							footer: {
								text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
								icon_url: message.author.displayAvatarURL(),
							},
						},
					});
				} else {
					if (
						args[0] != null ||
						client.levelUpChannel.get(message.guild.id) == "" ||
						client.levelUpChannel.get(message.guild.id) == undefined
					) {
						message.channel.send({
							embed: {
								color: 0xc85151,
								description:
									"Invalid syntax | CORRECT SYNTAX: " +
									prefix +
									"levelUpChannel [channel mention / dms / disabled]",
								footer: {
									text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
									icon_url: message.author.displayAvatarURL(),
								},
							},
						});
					} else {
						client.levelUpChannel.set(message.guild.id, "");
						message.channel.send({
							embed: {
								color: 0x51c878,
								description: "Level up channel restored succesfully!",
								footer: {
									text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
									icon_url: message.author.displayAvatarURL(),
								},
							},
						});
					}
				}
			}
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

	function a(s) {
		if (!interaction) {
			return /<#[0-9]{18}>/.test(s + "");
		} else {
			return true;
		}
	}

	function b(s) {
		if (!interaction) {
			return s.slice(2).slice(0, -1);
		} else {
			return s;
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

exports.category = "Settings";
exports.syntax = "levelUpChannel [channel mention / dms / disabled]";
exports.specialSlash = [
	{
		name: "Channel",
		description: "Description",
		type: 7,
		required: false,
	},
];
