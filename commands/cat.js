exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
  if(!client.disabledFunctions.get(message.guild.id).includes("fun")) {
  if(!client.disabledFunctions.get(message.guild.id).includes("animals")) {
    if(!client.disabledFunctions.get(message.guild.id).includes("cat")) {
  const fs = require("fs");
  const needle = require("needle");
  const url = "https://api.thecatapi.com/v1/images/search";
  const options = { json: true, headers: {
    "x-api-key": "05e95866-6350-43ca-b149-29cfceb26f51"
  } };

  needle(url, options, (error, res, body) => {
    if (error) {
      return console.log(error);
    }

    if (!error && res.statusCode == 200) {
      const catUrl = body;
      const embed = new (require("discord.js")).MessageEmbed();
      embed.setImage(catUrl[0].url);
      embed.setFooter(
        `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
        message.author.displayAvatarURL()
      );
      message.channel.send({ embed });
    }
  });
  }
}
}
};

exports.category = "Fun";