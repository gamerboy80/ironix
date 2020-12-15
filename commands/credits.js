exports.run = (client, message, args) => {
  const embed = new (require("discord.js")).MessageEmbed()
    .setTitle("This bot couldn't be possible without the help of")
    .addField("Our library", "https://discord.js.org/")
    .addField("Where we get its daily image", "https://www.bing.com/")
    .addField("The bird images place", "https://www.reddit.com/r/birdpics/")
    .addField("The cat images place", "https://thecatapi.com/")
    .addField("The dog images place", "https://dog.ceo/api/breeds/image/random")
    .addField("The fox images place", "https://randomfox.ca/floof/")
    .addField(
      "Where we get info about the Covid-19",
      "https://apify.com/covid-19"
    )
    .addField("The memes place", "https://www.reddit.com/r/Memes/")
    .addField(
      "The Minesweeper generator",
      "https://www.npmjs.com/package/discord.js-minesweeper"
    )
  .addField("Math helper", "https://twitter.com/InValidFire")
  .addField(
      "String writers and website designers",
      "Zen01#1337 (105430930134462464), Alur2020#5471 (754763473006624808)"
    )
    .addField("Our Logo & Rank Card Designer", "https://twitter.com/zeealeid")
    .addField(
      "Our Beta Testers",
      "Zen01#1337 (105430930134462464), Alur2020#5471 (754763473006624808)"
    )
    .addField(
      "The Users",
      "You (Thanks for being our inspiration to keep creating)"
    )
    .setFooter(
      `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
      message.author.displayAvatarURL()
    );
  message.channel.send({ embed });
};
exports.category = "Info";
