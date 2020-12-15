module.exports = async (client, message) => {
  if(message.author.bot == false) {
    if(client.wasFiltered != true) {
  var key1;
  if (
    message.guild.channels.cache.get(client.logs.get(message.guild.id)) != undefined
  ) {
    if (
      message.guild.channels.cache.get(client.logs.get(message.guild.id)) != undefined
    ) {
      var res;
    if(message.content.length > 1024) {
      res = await require("node-fetch")(
        "https://hastebin.com/documents",
        {
          method: "POST",
          body: message.content,
          headers: { "Content-Type": "text/plain" }
        }
      ).then(res => res.json().then(json => { key1 = json[Object.keys(json)[0]]; }));
  }

      const embed = new (require("discord.js").MessageEmbed)()
    .setColor(0x51c878)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter("User ID: " + message.author.id)
     .setTimestamp((new Date((Number(message.id) / 4194304) + 1420070400000)))
    .setDescription("**Message deleted in <#" + message.channel.id + ">**")
    .addField("Deleted message:\n", ((message.content.length > 1024) ? "[Open message in a new tab]" + "(https://hastebin.com/" + key1  + ")" : message.content));

   message.guild.channels.cache
                  .get(client.logs.get(message.guild.id)).send({ embed });
    }
  }
} else {
  client.wasFiltered = null;
  }
}
};
