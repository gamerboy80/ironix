exports.run = (client, message, args) => {
  const embed = new (require("discord.js")).MessageEmbed()
    .setTitle("This bot couldn't be possible without the help of")
    .addField("Our library", "https://discord.js.org/")
    .addField("Where we get its daily image", "https://www.bing.com/")
    .addField("Where we get bird photos", "https://www.reddit.com/r/birdpics/")
    .addField("Where we get cat photos", "https://thecatapi.com/")
    .addField("Where we get dogs photos", "https://dog.ceo/api/breeds/image/random")
    .addField("Where we get foxes photos", "https://randomfox.ca/floof/")
    .addField(
      "Where we get info about the Covid-19",
      "https://apify.com/covid-19"
    )
    .addField("Where we get memes", "https://www.reddit.com/r/Memes/")
        .addField("Owners", "Sapphire 🌈#8305 (590286395143356417), what if#8183 (181244076970999808)")
  .addField(
      "String writers",
      "Zen01#1337 (105430930134462464), Alur2020#5471 (754763473006624808)"
    )
    .addField("Our Logo & Rank Card Designer", "https://twitter.com/zeealeid")
    .addField(
      "Our Beta Testers",
      "cat107#5775 (564243464905031690), Zen01#1337 (105430930134462464), Alur2020#5471 (754763473006624808)"
    )
    .addField(
      "The Users",
      "You (Thanks for being our inspiration to keep creating)"
    )
    .setFooter(
      `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
      message.author.displayAvatarURL()
    );
    try {
  message.author.send({ embed }).then(() =>  message.channel.send("I DMed you!")).catch(() => message.channel.send("I tried but failed to DM you!"));
} catch {}
  
};
exports.category = "Info";
