exports.run = (client, message, args) => {
  if(!client.disabledFunctions.get(message.guild.id).includes("blocklist")) {
  function reverseString(str) {
      return str.split("").reverse().join("");
    }

    function cyrillicToThingo(str) {
      const listUpperCyrillic = ["А", "Б", "В", "Г", "Ґ", "Ѓ", "Д", "Ђ", "Є", "Е", "Ё", "Ж", "З", "Ѕ", "И", "І", "Ї", "Й", "Ј", "К", "Л", "Љ", "М", "Н", "Њ", "О", "П", "Р", "С", "Т", "Ћ", "Ќ", "У", "Ў", "Ф", "Х", "Ц", "Ч", "Џ", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"];
      const listDownerCyrillic = ["а", "б", "в", "г", "ґ", "ѓ", "д", "ђ", "є", "е", "ё", "ж", "з", "ѕ", "и", "і", "ї", "й", "ј", "к", "л", "љ", "м", "н", "њ", "о", "п", "р", "с", "т", "ћ", "ќ", "у", "ў", "ф", "х", "ц", "ч", "џ", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"];
      const listUpperThingo = ["A", "B", "B", "R", "R", "R", "A", "H", "E", "E", "E", "X", "E", "S", "N", "I", "I", "N", "J", "K", "N", "B", "M", "H", "H", "O", "N", "P", "C", "T", "H", "K", "Y", "Y", "O", "X", "U", "Y", "U", "W", "W", "B", "B", "B", "E", "O", "R"];
      const listDownerThingo = ["a", "b", "b", "r", "r", "r", "a", "h", "E", "e", "e", "x", "e", "s", "n", "i", "i", "n", "j", "k", "n", "b", "m", "h", "h", "o", "n", "p", "c", "t", "h", "k", "y", "y", "o", "x", "u", "y", "u", "w", "w", "b", "b", "b", "e", "o", "r"];
      let preFinalString = [];
      (str || "").split("").forEach((letter) => {
        if (listDownerCyrillic.indexOf(letter) != -1 || listUpperCyrillic.indexOf(letter) != -1) { 
            preFinalString.push(listDownerCyrillic.indexOf(letter) != -1 ? listDownerThingo[listDownerCyrillic.indexOf(letter)] : listUpperThingo[listUpperCyrillic.indexOf(letter)]);
        } else {
          preFinalString.push(letter);
        }
      });
      return preFinalString.join("").toLowerCase();
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
        ||
        cyrillicToThingo(message.content
          .toLowerCase()
          .includes(client.blocklist.get(message.guild.id)[i])) ||
        cyrillicToThingo(message.content
          .toLowerCase()
          .replace(/\W/g, "")
          .replace(/_/g, "")
          .includes(client.blocklist.get(message.guild.id)[i])) ||
        cyrillicToThingo(reverseString(message.content.toLowerCase()).includes(
          client.blocklist.get(message.guild.id)[i]
        )) ||
        cyrillicToThingo(reverseString(
          message.content
            .toLowerCase()
            .replace(/\W/g, "")
            .replace(/_/g, "")
        ).includes(client.blocklist.get(message.guild.id)[i]))
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
        ||
        cyrillicToThingo(message.content
          .toLowerCase()
          .includes(client.blocklist.get(message.guild.id)[i])) ||
        cyrillicToThingo(message.content
          .toLowerCase()
          .replace(/\W/g, "")
          .replace(/_/g, "")
          .includes(client.blocklist.get(message.guild.id)[i])) ||
        cyrillicToThingo(reverseString(message.content.toLowerCase()).includes(
          client.blocklist.get(message.guild.id)[i]
        )) ||
        cyrillicToThingo(reverseString(
          message.content
            .toLowerCase()
            .replace(/\W/g, "")
            .replace(/_/g, "")
        ).includes(client.blocklist.get(message.guild.id)[i]))
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