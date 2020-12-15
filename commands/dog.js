exports.run = (client, message, args) => {
  if(!client.disabledFunctions.get(message.guild.id).includes("fun")) {
  if(!client.disabledFunctions.get(message.guild.id).includes("animals")) {
    if(!client.disabledFunctions.get(message.guild.id).includes("dog")) {
  const fs = require("fs");
  const request = require("request");
  const url = "https://dog.ceo/api/breeds/image/random";
  const options = { json: true };

  request(url, options, (error, res, body) => {
    if (error) {
      return console.log(error);
    }

    if (!error && res.statusCode == 200) {
      const dogUrl = body;
      const embed = new (require("discord.js")).MessageEmbed();
      embed.setImage(dogUrl.message);
      embed.setFooter(
        `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
        message.author.displayAvatarURL()
      );
      message.channel.send({ embed });
    }
  });
  }
}
}
};

exports.category = "Fun";
// NEVER GONNA GIVE YOU UP, NEVER GONNA LET YOU DOWN, NEVER GONNA RUN AROUND AND DESERT YOU!
