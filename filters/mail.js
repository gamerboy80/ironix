exports.run = (client, message, args) => {
  if (!client.disabledFunctions.get(message.guild.id).includes("mailfilter")) {
    function reverseString(str) {
      return str.split("").reverse().join("");
    }

    var mm;
    var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (
      message.content.toLowerCase().match(regex) ||
      message.content
        .toLowerCase()
        .replace(/\W/g, "")
        .replace(/_/g, "")
        .match(regex) ||
      reverseString(message.content.toLowerCase()).match(regex) ||
      reverseString(
        message.content
          .toLowerCase()
          .replace(/\W/g, "")
          .replace(/_/g, "")
      ).match(regex)
    ) {
      client.wasFiltered = true;
      message.delete().then((m) =>
        message.channel
          .send("<@" + message.author.id + ">, no mails allowed!")
          .then(async (mmm) => {
            mm = mmm;
            if (
              message.guild.channels.cache.get(client.logs.get(message.guild.id)) !=
              undefined
            ) {
              const embed = new (require("discord.js").MessageEmbed)()
                .setColor(0x51c878)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setFooter("User ID: " + message.author.id)
                .setTimestamp(
                  new Date(Number(message.id) / 4194304 + 1420070400000)
                )
                .setDescription(
                  "**Mail said in <#" +
                    message.channel.id +
                    ">**\nWe will hide it for privacy reasons."
                );

              message.guild.channels.cache
                .get(client.logs.get(message.guild.id))
                .send({ embed });
            }
          })
          .then((mmmm) => mm.delete({ timeout: 3000 }))
      );
    }
  }
};
exports.neededPerms = ["MANAGE_MESSAGES"];