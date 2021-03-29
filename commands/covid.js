const needle = require("needle"); // hi, I broke some cammnds so I will be fixing them now, don't worry

exports.run = (client, message, args, interaction) => {
	if (!client.disabledFunctions.get(message.guild.id).includes("covid")) {
		needle.get(
			"https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true",
			(err, resp, body) => {
				if (err) console.error(err);
				const embed = new (require("discord.js").MessageEmbed)();
				var totalCases = 0;
				var totalRecovered = 0;
				var totalDead = 0;
				var totalTested = 0;
				body.forEach((area) => {
					totalCases =
						totalCases + (typeof area.infected == "string" ? 0 : area.infected);
					totalRecovered =
						totalRecovered +
						(typeof area.recovered == "string" ? 0 : area.recovered);
					totalDead =
						totalDead + (typeof area.deceased == "string" ? 0 : area.deceased);
					totalTested =
						totalTested + (typeof area.tested == "string" ? 0 : area.tested);
				});
				embed.setDescription("COVID-19 Statistics");
				embed
					.addField("Total Cases (Reported)", totalCases)
					.addField("Total Recovered (Reported)", totalRecovered)
					.addField("Total Dead (Reported)", totalDead)
					.addField("Total Tested (Reported)", totalTested)
					.setFooter(
						`Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
						message.author.displayAvatarURL()
					);
				message.channel.send({ embed });
			}
		);
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

exports.category = "Utility";
