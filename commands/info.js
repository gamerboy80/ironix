exports.run = (client, message, args) => {
  const embed = new (require("discord.js")).MessageEmbed()
    .setTitle("Bot Info")
    .addField("Version", client.version)
    .addField("Library", "Discord.JS 12")
    .addField("Invite", "https://ironix.emeraldvideos.ga/invite")
    .addField("Contact us", "Ironix@outlook.com.ar")
    .addField(
      "Owners",
      "EmeraldVideos#5498 (590286395143356417), ashda7su8ihnwauij#8183 (181244076970999808)"
    )
    .addField(
      "Beta Testers",
      "Zen01#1337 (105430930134462464), Alur2020#5471 (754763473006624808)"
    )
    .setFooter(
      `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
      message.author.displayAvatarURL()
    );
  message.channel.send({ embed });
};

exports.category = "Info";
