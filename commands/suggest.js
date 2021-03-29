exports.run = (client, message, args, interaction) => {
	if (!client.disabledFunctions.get(message.guild.id).includes("suggest")) {
		var suggestionChannel = client.suggestions.get(message.guild.id);
		if (message.guild.channels.cache.get(suggestionChannel) != undefined) {
			if (args.join("") != "") {
				message.guild.channels.cache
					.get(suggestionChannel)
					.send({
						embed: {
							title: "Suggestion - Pending approval",
							description: args.join(" "),
							footer: {
								text: `Suggested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
								icon_url: message.author.displayAvatarURL(),
							},
						},
					})
					.then((juan) => {
						juan
							.edit(
								new (require("discord.js").MessageEmbed)(
									juan.embeds[0]
								).setFooter(
									juan.embeds[0].footer.text + " • Suggestion ID: " + juan.id,
									juan.embeds[0].footer.iconURL
								)
							)
							.then((aMessage) => {
								aMessage
									.react("✅")
									.then(() => aMessage.react("🇽"))
									.then(() => {
										message.channel.send({
											embed: {
												color: 0x51c878,
												description: "Message suggested succesfully!",
												footer: {
													text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
													icon_url: message.author.displayAvatarURL(),
												},
											},
										});
									});
							});
					});
			} else {
				var prefix = client.prefixes.get(message.guild.id);
				message.channel.send({
					embed: {
						color: 0xc85151,
						description:
							"Invalid syntax | CORRECT SYNTAX: " +
							prefix +
							"suggest [suggestion]",
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
						"Uh, oh. It looks like the suggestions weren't set up or the channel was removed, please contact this server staff so they can re-set it up.",
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

exports.category = "Suggestions";
exports.syntax = "suggest [suggestion]";
exports.specialSlash = [
	{
		name: "Suggestion",
		description: "Description",
		type: 3,
		required: true,
	},
];
