exports.run = (client, message, args, interaction) => {
	var prefix = client.prefixes.get(message.guild.id);

	if (!message.member.hasPermission("MANAGE_GUILD")) {
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
		return;
	}
	if (args[0]) {
		var c = message.guild.channels.resolve(b(args[0]));
		if ((message.guild.channels.cache.get(b(args[0])) || {}).type == "text") {
			client.challenges.set(message.guild.id, {
				channel: c.id,
				challenge: 1,
			});
			message.channel.send({
				embed: {
					color: 0x51c878,
					description: "Challenges channel set successfully.",
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
						"setupChallenge [channel mention]",
					footer: {
						text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
						icon_url: message.author.displayAvatarURL(),
					},
				},
			});
		}
	} else {
		if (client.challenges.get(message.guild.id) != undefined) {
			client.challenges.set(message.guild.id, undefined);
			message.channel.send({
				embed: {
					color: 0x51c878,
					description: "Challenges channel removed!",
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
						"setupChallenge [channel mention]",
					footer: {
						text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
						icon_url: message.author.displayAvatarURL(),
					},
				},
			});
		} // make this remove it if you want
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
exports.syntax = "setupChallenge [channel mention]";
exports.specialSlash = [
	{
		name: "Channel",
		description: "Description",
		type: 7,
		required: false,
	},
];
