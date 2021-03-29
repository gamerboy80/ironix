exports.run = (client, message, args, interaction) => {
	if (message.member.hasPermission("MANAGE_GUILD")) {
		var prefix = client.prefixes.get(message.guild.id);
		if (!typeof client.leveluproles.get(message.guild.id) === "object") {
			client.leveluproles.set(message.guild.id, {});
		}
		if (args[0] in client.leveluproles.get(message.guild.id)) {
			const tempArray = client.leveluproles.get(message.guild.id);
			delete tempArray[[args[0]]];
			client.leveluproles.set(message.guild.id, tempArray);
			message.channel.send({
				embed: {
					color: 0x51c878,
					description: "Level up role removed successfully.",
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
						"addleveluprole [Level Number]",
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
exports.syntax = "addleveluprole [Level Number]";
exports.specialSlash = [
	{
		name: "LevelNumber",
		description: "Description",
		type: 3,
		required: true,
	},
];
