exports.run = (client, message, args) => {
	require("needle").get(
		"https://discordapp.com/api/v8/guilds/" +
			message.guild.id +
			"/member-verification",
		{
			headers: {
				Authorization: "Bot " + client.config.token,
			},
		},
		(error, response, body) => {
			if (error) {
				message.channel.send({
					embed: {
						color: 0xc85151,
						description: "There was an error getting the rules.",
						footer: {
							text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
							icon_url: message.author.displayAvatarURL(),
						},
					},
				});
				return;
			}
			if(body.form_fields[0].values[Number(args[0]) - 1]) {
				message.channel.send({
					embed: {
						color: 0x51c878,
						description:
							"**" + args[0] + ".** " + body.form_fields[0].values[Number(args[0]) - 1],
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
							"That rule doesn't exist!",
						footer: {
							text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
							icon_url: message.author.displayAvatarURL(),
						},
					},
				});
			}
		}
	);
};

exports.category = "Utility";
