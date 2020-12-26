exports.run = (client, message, args) => {
  if(!client.disabledFunctions.get(message.guild.id).includes("fun")) {
  if(!client.disabledFunctions.get(message.guild.id).includes("meme")) {
  if (message.channel.nsfw == true) {
    const randomR = require("random-puppy");
  const event = randomR("Memes").then(url => {
      if(url.endsWith(".mp4") == false) {
      const embed = new (require("discord.js")).MessageEmbed()
        .setFooter(
          `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          message.author.displayAvatarURL()
        )
        .setImage(url);
      message.channel.send({ embed });
      return;
    } else {
      message.channel.send(
      "Error. Please try again."
    );
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
        
