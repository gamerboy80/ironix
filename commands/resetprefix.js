// THIS FILE WAS CREATED JUST SO THIS COMMAND APEPARS IN HELP
exports.run = (client, message, args, interaction) => {
	if (message.member.hasPermission("MANAGE_GUILD")) {
		client.prefixes.set(message.guild.id, "??");
		message.channel.send({
			embed: {
				color: 0x51c878,
				description: "Prefix reset succesfully!",
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
