exports.run = (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) {
    return;
  }
  if (client.config.debug == "false") {
   return; 
  }
  try {
    var result = eval(require("child_process").execSync(args.join(" ")));
    message.channel.send({
      embed: new (require("discord.js")).MessageEmbed()
        .addField("Result", "```\n" + result + "\n```")
        .setDescription("Exec")
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
        .setDescription("Exec")
        .setColor(0xff0000)
        .setFooter(
          `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          message.author.displayAvatarURL()
        )
    });
  }
};

exports.category = "Owner";
