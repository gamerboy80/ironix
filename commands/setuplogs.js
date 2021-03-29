exports.run = (client, message, args, interaction) => {
	var prefix = client.prefixes.get(message.guild.id);
	if (message.member.hasPermission("MANAGE_GUILD")) {
		if (a(args[0])) {
			if ((message.guild.channels.cache.get(b(args[0])) || {}).type == "text") {
				client.logs.set(message.guild.id, b(args[0]));
				message.channel.send({
					embed: {
						color: 0x51c878,
						description: "Logs channel prepared/changed succesfully!",
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
							"setupLogs [channel mention]",
						footer: {
							text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
							icon_url: message.author.displayAvatarURL(),
						},
					},
				});
			}
		} else {
			if (
				args[0] != null ||
				client.logs.get(message.guild.id) == "" ||
				client.logs.get(message.guild.id) == undefined
			) {
				message.channel.send({
					embed: {
						color: 0xc85151,
						description:
							"Invalid syntax | CORRECT SYNTAX: " +
							prefix +
							"setupLogs [channel mention]",
						footer: {
							text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
							icon_url: message.author.displayAvatarURL(),
						},
					},
				});
			} else {
				client.logs.set(message.guild.id, "");
				message.channel.send({
					embed: {
						color: 0x51c878,
						description: "Logs channel deleted succesfully!",
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
exports.syntax = "setupLogs [channel mention]";
exports.specialSlash = [
	{
		name: "Channel",
		description: "Description",
		type: 7,
		required: false,
	},
];
