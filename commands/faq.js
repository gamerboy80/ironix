exports.run = (client, message, args) => {
  const embed = new (require("discord.js")).MessageEmbed()
    .setTitle("Frequently Asked Questions")
    .addField("Why credits message goes to DMs?", "As we link a memes subreddit which can have NSFW content, we decided to send credits embed to DMs instead of the server as this content may be inappropiate for some users.")
    .addField("Can I contribute to the project?", "Of course and it would be appreciated. Ironix, is fully open source and you can contribute to it in our [GitHub](https://github.com/SapphireVideos/ironix).")
    .addField("Can I self host Ironix?", "Sure! Ironix can be self-hosted thanks to our open source nature. You can find instructions in our [GitHub](https://github.com/SapphireVideos/ironix).")
    .setFooter(
      `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
      message.author.displayAvatarURL()
    );
  message.channel.send({ embed });
};

exports.category = "Utility";
