exports.run = (client, message, args, interaction) => {

  if(!client.disabledFunctions.get(message.guild.id).includes("fun")) {
  if(!client.disabledFunctions.get(message.guild.id).includes("animals")) {
    if(!client.disabledFunctions.get(message.guild.id).includes("fox")) {
  const fs = require("fs");
  const needle = require("needle");
  const url = "https://randomfox.ca/floof/";
  const options = { json: true };

  needle(url, options, (error, res, body) => {
    if (error) {
      return console.log(error);
    }

    if (!error && res.statusCode == 200) {
      const foxUrl = body;
      const embed = new (require("discord.js")).MessageEmbed();
      embed.setImage(foxUrl.image);
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

exports.category = "Fun";
