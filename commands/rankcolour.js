exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
  var isColor = require("is-color");
  if (isColor(args.join(" "))) {
    client.rankcolour.set(message.author.id, args.join(" "));
    message.channel.send({
      embed: {
        color: 0x51c878,
        description: "Rank card colour changed succesfully!",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL(),
        },
      },
    });
  } else {
    if(args.join("") == "" && client.rankcolour.get(message.author.id) != "") {
      client.rankcolour.set(message.author.id, "");
      message.channel.send({
      embed: {
        color: 0x51c878,
        description: "Rank card colour resetted succesfully!",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL(),
        },
      },
    });
    } else {
    message.channel.send({
      embed: {
        color: 0xc85151,
        description: "Not a correct HTML colour or you didn't put anything while your rank colour is the default one.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL(),
        },
      },
    });
  }
  }
};

exports.category = "Rank";
exports.syntax = "rankColour [optional colour]"
exports.specialSlash = [{
    name: 'Colour',
    description: 'Description',
    type: 3,
    required: false
  }];