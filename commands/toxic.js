exports.run = (client, message, args) => {
  const Perspective = require("perspective-api-client");
  const perspective = new Perspective({ apiKey: client.config.perspective });

  (async () => {
    var toxicity = (await perspective.analyze(args.join(" "))).attributeScores
      .TOXICITY.summaryScore.value;

    message.channel.send({
      embed: {
        color: 0x51c878,
        description: "Toxicity: " + toxicity,
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL(),
        },
      },
    });
  })();
};

exports.category = "Utility";
