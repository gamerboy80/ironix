exports.run = (client, message, args) => {
    if (client.aliases.get(message.author.id).length != 0) {
      message.channel.send({
        embed: {
          color: 0x51c878,
          description:
            "Your aliases are: ``" +
            Object.entries(client.aliases.get(message.author.id)).map(arrayInside => arrayInside.join(": ")).join(", ") +
            "``",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
    } else {
      message.channel.send({
        embed: {
          color: 0xc85151,
          description: "You don't have aliases set.",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
    }
};

exports.category = "Utility";
