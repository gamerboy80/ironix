exports.run = (client, message, args, interaction) => {

var prefix = client.prefixes.get(message.guild.id);

	var { channel, challenge } = client.challenges.get(message.guild.id);
	if (channel) {
		if (!(args.length >= 4 && !isNaN(args[3]))) {
			message.channel.send({
      embed: {
        color: 0xc85151,
        description:
            "Invalid syntax | CORRECT SYNTAX: " +
            prefix +
            "challenge [type] [rules] [challenge] [deadline in days] [answer format] [extra info]\nUse _ to separate (example: write 'hello world' as 'hello_world') and use | to separate rules.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL()
        }
      }
    });
			return;
		}
		message.guild.channels
			.resolve(channel)
			.send(
				`**Challenge ${challenge} - ${getFormattedDate(
					new Date(Date.now() + args[3] * 86400000)
				)}**\n\n` +
					`**Challenge Type**: ${args[0].replace(/_/g, " ")}\n` +
					`**Challenge Rules**: ${args[1]
						.replace(/\|/g, ", ")
						.replace(/_/g, " ")}\n` +
					`**Challenge**: ${args[2].replace(/_/g, " ")}\n` +
					`**Deadline**: ${args[3]} days\n` +
					`**Answer Format**: ${args[4].replace(/_/g, " ")}\n\n` +
					`${args[5] ? "**Extra Info**: " + args[5].replace(/_/, " ") : ""}`
			);
		if (channel !== message.channel.id)
			message.channel.send({
                embed: {
                  color: 0x51c878,
                  description: "Challenge sent successfully.",
                  footer: {
                    text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                    icon_url: message.author.displayAvatarURL(),
                  },
                },
              });
		else message.delete();
		client.challenges.set(message.guild.id, {
			channel,
			challenge: challenge++,
		});
	} else
		message.channel.send({
      embed: {
        color: 0xc85151,
        description:
            "No challenges command set.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL()
        }
      }
    });
};
function getFormattedDate(date) {
	let year = date.getFullYear();
	let month = date.getMonth().toString();
	let day = date.getDate().toString();
	//.padStart(2, "0");
	return `${month}/${day}/${year} ${date.getHours().toString()}:00`;
  if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                  embeds: [ response ]
                }
            },
        });
}
};
exports.category = "Challenges";
exports.syntax = "challenge [type] [rules] [challenge] [deadline in days] [answer format] [extra info]\nUse _ to separate (example: write 'hello world' as 'hello_world') and use | to separate rules.";
exports.specialSlash = [{
    name: 'Type',
    description: 'Description',
    type: 3,
    required: true
  }, {
    name: 'Rules',
    description: 'Description',
    type: 3,
    required: true
  }, {
    name: 'Challenge',
    description: 'Description',
    type: 3,
    required: true
  }, {
    name: 'Deadline',
    description: 'Description',
    type: 3,
    required: true
  }, {
    name: 'AnswerFormat',
    description: 'Description',
    type: 3,
    required: true
  }, {
    name: 'ExtraInfo',
    description: 'Description',
    type: 3,
    required: false
  }]