exports.run = (client, message, args) => {
  if(!client.disabledFunctions.get(message.guild.id).includes("blocklist")) {
  function reverseString(str) {
      return str.split("").reverse().join("");
    }
  
  var mm;
  if (Array.isArray(client.blocklist.get(message.guild.id))) {
    client.blocklist.get(message.guild.id).forEach((e, i) => {
      if (
        message.content
          .toLowerCase()
          .includes(client.blocklist.get(message.guild.id)[i]) ||
        message.content
          .toLowerCase()
          .replace(/\W/g, "")
          .replace(/_/g, "")
          .includes(client.blocklist.get(message.guild.id)[i]) ||
        reverseString(message.content.toLowerCase()).includes(
          client.blocklist.get(message.guild.id)[i]
        ) ||
        reverseString(
          message.content
            .toLowerCase()
            .replace(/\W/g, "")
            .replace(/_/g, "")
        ).includes(client.blocklist.get(message.guild.id)[i])
      ) {
        client.wasFiltered = true;
        message.delete().then(m =>
          message.channel
            .send("<@" + message.author.id + ">, this word is blocklisted!")
            .then(async mmm => {
              mm = mmm;
              if (
                message.guild.channels.cache.get(client.logs.get(message.guild.id)) !=
                undefined
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
    .setDescription("**Blocklisted word said in <#" + message.channel.id + ">**")
    .addField("Filtered message:\n", ((message.content.length > 1024) ? "[Open message in a new tab]" + "(https://hastebin.com/" + key1  + ")" : message.content))
    .addField("Filtered word:\n", client.blocklist.get(message.guild.id)[i]);

    message.guild.channels.cache
                  .get(client.logs.get(message.guild.id)).send({ embed });
              }
            })
            .then(mmmm => mm.delete({ timeout: 3000 }))
        );
      }
    });
  } else {
    client.blocklist.set(message.guild.id, []);
    client.blocklist.get(message.guild.id).forEach((e, i) => {
      if (
        message.content
          .toLowerCase()
          .includes(client.blocklist.get(message.guild.id)[i]) ||
        message.content
          .toLowerCase()
          .replace(/\W/g, "")
          .replace(/_/g, "")
          .includes(client.blocklist.get(message.guild.id)[i]) ||
        reverseString(message.content.toLowerCase()).includes(
          client.blocklist.get(message.guild.id)[i]
        ) ||
        reverseString(
          message.content
            .toLowerCase()
            .replace(/\W/g, "")
            .replace(/_/g, "")
        ).includes(client.blocklist.get(message.guild.id)[i])
      ) {
        client.wasFiltered = true;
        message.delete().then(m =>
          message.channel
            .send("<@" + message.author.id + ">, this word is blocklisted!")
            .then(async mmm => {
              mm = mmm;
              if (
                message.guild.channels.cache.get(client.logs.get(message.guild.id)) !=
                undefined
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
    .setTimestamp(message.createdAt)
    .setDescription("**Blocklisted word said in <#" + message.channel.id + ">**")
    .addField("Filtered message:\n", ((message.content.length > 1024) ? "[Open message in a new tab]" + "(https://hastebin.com/" + key1  + ")" : message.content))
    .addField("Filtered word:\n", client.blocklist.get(message.guild.id)[i]);

    message.guild.channels.cache
                  .get(client.logs.get(message.guild.id)).send({ embed });
              }
            })
            .then(mmmm => mm.delete({ timeout: 3000 }))
        );
      }
    });
  }
  }
};
exports.neededPerms = ["MANAGE_MESSAGES"];