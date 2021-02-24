exports.run = (client, message, args) => {
  if(!client.disabledFunctions.get(message.guild.id).includes("toxicity")) {

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
      return preFinalString.join("");
    }

    if(message.guild.channels.cache.get(client.inspection.get(message.guild.id)) != undefined) {
    if(Array.isArray(client.notAnalyze.get(message.guild.id)) == false) {
      client.notAnalyze.set(message.guild.id, [])
    }
    if(!client.notAnalyze.get(message.guild.id).includes(message.content)) {
  const Perspective = require("perspective-api-client");
  const perspective = new Perspective({ apiKey: client.config.perspective });

  const limit = client.toxicLimit.get(message.guild.id) || 0.8;

  (async () => {
    let toxicity;
    let toxicityB;

    try {
     toxicity = (await perspective.analyze(args.join(" "))).attributeScores
      .TOXICITY.summaryScore.value;
    } catch {
      toxicity = 0;
    }
    try {
      toxicityB = (await perspective.analyze(args.join(" ").split("").reverse().join(""))).attributeScores
      .TOXICITY.summaryScore.value;
    } catch {
      toxicityB = 0;
    }

    try {
     toxicityC = (await perspective.analyze(cyrillicToThingo(args.join(" ")))).attributeScores
      .TOXICITY.summaryScore.value;
    } catch {
      toxicityC = 0;
    } 

    try {
      toxicityD = (await perspective.analyze(cyrillicToThingo(args.join(" ").split("").reverse().join("")))).attributeScores
      .TOXICITY.summaryScore.value;
    } catch {
      toxicityD = 0;
    }

    if(toxicity > limit || toxicityB > limit || toxicityC > limit || toxicityD > limit) {
      message.guild.channels.cache.get(client.inspection.get(message.guild.id)).send({
      embed: {
        color: 0x51c878,
        description:
          "Is this message toxic? `" + message.content + "`\nIronix detected a posibility of " + biggestToxicity(toxicity, toxicityB, toxicityC, toxicityD),
        footer: {
          text: `Message by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL()
        }
      }
    }).then(inspectMsg => message.delete().then(m => m.channel.send("<@!" + message.author.id + ">'s message sent to inspection.")).then(messageSentT => {
        client.commands.get("mute").run(client, messageSentT, ["<@!" + message.author.id + ">", "perm", "toxicity was detected"]);

        inspectMsg.react("✅").then(() => inspectMsg.react("❌"));

        const filter = (reaction, user) => {return ['✅', '❌'].includes(reaction.emoji.name) && user.id != client.user.id; };

        inspectMsg.awaitReactions(filter, { max: 1, time: 3600000, errors: ['time'] })
  .then(collected => {
    const reaction = collected.first();

    if (reaction.emoji.name === '❌') {
      inspectMsg.delete();
      messageSentT.edit(message.content + "\n - <@!" + message.author.id + ">");
      client.commands.get("unmute").run(client, messageSentT, ["<@!" + message.author.id + ">"]);
      const notAnalyzePre = client.notAnalyze.get(message.guild.id);
      notAnalyzePre.push(message.content);
      client.notAnalyze.set(message.guild.id, notAnalyzePre);
    } else {
      inspectMsg.delete();
    }
  });

  setTimeout(() => inspectMsg.delete(), 3600000);


    }));
    }
  })();
}
}
}
};

function biggestToxicity(a, b, c, d) {
  let arrayOfProccesable = [];
  if(a != undefined) arrayOfProccesable.push(a);
  if(b != undefined) arrayOfProccesable.push(b);
  if(c != undefined) arrayOfProccesable.push(c);
  if(d != undefined) arrayOfProccesable.push(d);
  return (Math.max.apply(null, arrayOfProccesable) * 100) + "%";
}
exports.neededPerms = ["MANAGE_MESSAGES"];