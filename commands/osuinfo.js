exports.run = (client, message, args, interaction) => {
	var prefix = client.prefixes.get(message.guild.id);
	const osu = require("node-osu");
	const osuApi = new osu.Api(client.config.osu);
	osuApi.apiCall("/get_user", { u: args.join(" ") }).then((user) => {
		if (user[0]) {
			message.channel.send({
				embed: {
					color: 0x51c878,
					title: user[0].username,
					fields: [
						{
							name: "Rank",
							value:
								"#" +
								user[0].pp_rank +
								" - #" +
								user[0].pp_country_rank +
								" (" +
								user[0].country +
								")",
						},
						{
							name: "Level",
							value: user[0].level,
						},
						{
							name: "PP",
							value: user[0].pp_raw,
						},
						{
							name: "Accuracy",
							value: user[0].accuracy + "%",
						},
						{
							name: "Playcount",
							value: user[0].playcount,
						},
					],
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
						"Invalid syntax | CORRECT SYNTAX: " + prefix + "osuInfo [username]",
					footer: {
						text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
						icon_url: message.author.displayAvatarURL(),
					},
				},
			});
		}
	});
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

exports.category = "Utility";
exports.syntax = "osuInfo [username]";
exports.specialSlash = [
	{
		name: "Username",
		description: "Description",
		type: 3,
		required: true,
	},
];
