exports.run = (client, message, args) => {
  if(!client.disabledFunctions.get(message.guild.id).includes("fun")) {
  if(!client.disabledFunctions.get(message.guild.id).includes("meme")) {
  if (message.channel.nsfw == true) {
    const randomR = require("random-puppy");
    var time;
    var time = 0;
    const event = randomR.all("Memes");
    event.on("data", url => {
      if (time == 0) {
        const embed = new (require("discord.js")).MessageEmbed()
          .setFooter(
            `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            message.author.displayAvatarURL()
          )
          .setImage(url);
        message.channel.send({ embed });
        time = 1;
      }
    });
  } else {
    message.channel.send(
      "The SapphireTeam cannot verify the content to be displayed and for preventing a violation of Discord Guidelines, this command is only enabled on channels marked as NSFW."
    );
  }
}
}
};

exports.category = "Fun";
        
