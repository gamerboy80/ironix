exports.run = (client, message, args, interaction) => {

  if (
    Object.keys(client.leveluproles.get(message.guild.id)) != "" &&
    typeof client.leveluproles.get(message.guild.id) === "object"
  ) {
    var levelUpRolesList = "";
    Object.keys(client.leveluproles.get(message.guild.id)).forEach((e, i) => {
      levelUpRolesList =
        levelUpRolesList +
        "<@&" +
        client.leveluproles.get(message.guild.id)[e] +
        ">: Level " +
        e +
        "\n";
    });
    message.channel.send({
      embed: {
        color: 0x51c878,
        description: "LEVEL UP ROLES: \n\n" + levelUpRolesList,
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL(),
        },
      },
    });
  } else {
    message.channel.send({
      embed: {
        color: 0xc85151,
        description: "Thre are no level up roles!",
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

exports.category = "Settings";
