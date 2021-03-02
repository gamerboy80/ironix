const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const ojsama = require("ojsama");
const fs = require("fs");
const { uniqBy } = require("lodash");
exports.run = (client, message, args) => {
  var prefix = client.prefixes.get(message.guild.id);
	if (args[0]) {
			axios
				.get(`https://osu.ppy.sh/osu/${args[0]}`)
				.then((resp) => {
					bruh(resp.data, message, args);
				})
				.catch((err) => {
					console.error(err);
					message.channel.send({
          embed: {
            color: 0xc85151,
            description: "Something went terribly wrong, please try again later.",
            footer: {
              text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
              icon_url: message.author.displayAvatarURL()
            }
          }
        });
				});
	} else message.channel.send({
        embed: {
          color: 0xc85151,
          description:
            "Invalid syntax | CORRECT SYNTAX: " +
            prefix +
            "osuPP [beatmap id]",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL(),
          },
        },
      });
};

exports.owner = true;
function bruh(map, message, args) {
	const parser = new ojsama.parser();
	parser.feed(map);
	const embed = new MessageEmbed();
	var stars = new ojsama.diff().calc({
		map: parser.map,
		mods: ojsama.modbits.from_string(args[1] ? args[1].toUpperCase() : ""),
	});
	var calc = ojsama
		.ppv2({ stars, acc_percent: args[2] ? parseFloat(args[2]) : 100 })
		.toString();
	var aaaa = uniqBy((args[1] ? args[1].toUpperCase() : "").match(/.{2}/g)).join(
        ""
    );
    embed.setTitle(
        `${parser.map.artist} - ${parser.map.title} ${aaaa ? "+" : ""}${aaaa}`
    );
	embed.setDescription(calc.slice(0, calc.indexOf(" (")));
	embed.setFooter(
		`Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
		message.author.avatarURL()
	);
	embed.setColor("51c878");
	message.channel.send(embed);
}
exports.category = "Utility";