  exports.run = (client, message, args) => {
  const embed = new (require("discord.js")).MessageEmbed()
    .setTitle("Bot Info")
    .addField("Version", client.version)
    .addField("Library", "Discord.JS 12")
    .addField("Invite", client.config.websiteDomain + "/invite")
    .addField("Contact us", "Ironix@outlook.com.ar")
    .setFooter(
      `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
      message.author.displayAvatarURL()
    );
  message.channel.send({ embed });
};

exports.category = "Info";
