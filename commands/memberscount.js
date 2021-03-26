exports.run = (client, message, args, interaction) => {

  if (
    !client.disabledFunctions.get(message.guild.id).includes("memberscount")
  ) {
    const membersEB = message.guild.members.cache.filter((member) => !member.user.bot)
      .size;
    const membersIB = message.guild.members.cache.size;
    const membersENB = message.guild.members.cache.filter((member) => member.user.bot)
      .size;
    message.channel.send({
      embed: {
        color: 0x51c878,
        description:
          "Humans: " +
          membersEB +
          "\n Bots: " +
          membersENB +
          "\n Total: " +
          membersIB,
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL(),
        },
      },
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

exports.category = "Utility";
// I totally didn't copy-paste it from my old bot
