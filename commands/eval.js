exports.run = (client, message, args, interaction) => {

  if (!client.config.owners.includes(message.author.id)) {
    return;
  }
  if (client.config.debug == "false") {
   return; 
  }
  try {
    var result = eval(args.join(" "));
    message.channel.send({
      embed: new (require("discord.js")).MessageEmbed()
        .addField("Result", "```\n" + result + "\n```")
        .setDescription("Eval")
        .setColor(0x00ff00)
        .setFooter(
          `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          message.author.displayAvatarURL()
        )
    });
  } catch (e) {
    // console.error(e);
    message.channel.send({
      embed: new (require("discord.js")).MessageEmbed()
        .addField("Error", "```\n" + e + "\n```")
        .setDescription("Eval")
        .setColor(0xff0000)
        .setFooter(
          `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          message.author.displayAvatarURL()
        )
    });
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

exports.category = "Owner";
