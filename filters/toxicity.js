exports.run = (client, message, args) => {
  if(!client.disabledFunctions.get(message.guild.id).includes("toxicity")) {
    if(Array.isArray(client.notAnalyze.get(message.guild.id)) == false) {
      client.notAnalyze.set(message.guild.id, [])
    }
    if(!client.notAnalyze.get(message.guild.id).includes(message.content)) {
  const Perspective = require("perspective-api-client");
  const perspective = new Perspective({ apiKey: client.config.perspective });

  const limit = client.toxicLimit.get(message.guild.id) || 0.8;

  (async () => {
    const toxicity = (await perspective.analyze(args.join(" "))).attributeScores
      .TOXICITY.summaryScore.value;
      const toxicityB = (await perspective.analyze(args.join(" ").split("").reverse().join(""))).attributeScores
      .TOXICITY.summaryScore.value;

    if(toxicity > limit || toxicityB > limit) {
      message.guild.channels.cache.get(client.inspection.get(message.guild.id)).send({
      embed: {
        color: 0x51c878,
        description:
          "Is this message toxic? | Wait for the bot to add both reactions before reacting or you will have to unmute manually. `" + message.content + "`",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
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
};
