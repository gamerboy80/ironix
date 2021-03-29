exports.run = (client, message, args, interaction) => {
	var prefix = client.prefixes.get(message.guild.id);
	if (Array.isArray(client.blocklist.get(message.guild.id)) == false) {
		client.blocklist.set(message.guild.id, []);
	}

	if (message.member.hasPermission("MANAGE_GUILD")) {
		if (args[0] != undefined) {
			if (
				client.blocklist.get(message.guild.id).includes(args.join(" ")) == true
			) {
				client.blocklist.set(
					message.guild.id,
					client.blocklist
						.get(message.guild.id)
						.filter((e) => e !== args.join(" "))
				);
				message.channel.send({
					embed: {
						color: 0x51c878,
						description: "Word deleted from the blocklist succesfully!",
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
						description: "That word isn't blocklisted.",
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
						"Invalid syntax | CORRECT SYNTAX: " +
						prefix +
						"removeblocklist [word]",
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
exports.syntax = "removeblocklist [word]";
exports.specialSlash = [
	{
		name: "Word",
		description: "Description",
		type: 3,
		required: true,
	},
];
