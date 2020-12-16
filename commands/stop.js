exports.run = (client, message, args) => {
  if (client.config.owners.includes(message.author.id))
    message.channel.send("It's now safe to turn off the bot.").then(m => process.exit(0));
  // else message.channel.send("You aren't an owner!");
};

exports.category = "Owner";

// no u
