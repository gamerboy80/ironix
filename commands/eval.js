exports.run = (client, message, args) => {
  if (!client.config.owners.includes(message.author.id) && !client.config.debug == "true") {
    /* message.channel.send({
      embed: new (require("discord.js")).MessageEmbed()
        .addField("Error", "You aren't an owner!")
        .setDescription("Eval")
        .setFooter(
          `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
        message.author.displayAvatarURL()
        )
    }); */
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
};

exports.category = "Owner";
