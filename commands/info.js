  exports.run = (client, message, args, interaction) => {

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

exports.category = "Info";
