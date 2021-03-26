exports.run = (client, message, args, interaction) => {

  var prefix = client.prefixes.get(message.guild.id);

  function getIdFromMention(mention) {
    if (!mention) {
      return;
    }

    if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);

      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }

      
    }
    return mention;
  }

    if (getIdFromMention(args[0]) != undefined) {
      const isAnimated = new Promise((resolve, reject) => { require("needle").get(client.users.cache
              .get(getIdFromMention(args[0]))
              .displayAvatarURL({ format: "gif", size: 2048 }), (error, response) => resolve(response.statusCode)) }) == 200;
      message.channel.send({
        embed: {
          color: 0x51c878,
          description: "[WEBP](" + client.users.cache
              .get(getIdFromMention(args[0]))
              .displayAvatarURL({ size: 2048 }) + ") | [PNG](" + client.users.cache
              .get(getIdFromMention(args[0]))
              .displayAvatarURL({ format: "png", size: 2048 }) + ") | [JPG](" + client.users.cache
              .get(getIdFromMention(args[0]))
              .displayAvatarURL({ format: "jpg", size: 2048 }) + ")" + ((isAnimated) ? (" | [GIF](" + client.users.cache
              .get(getIdFromMention(args[0]))
              .displayAvatarURL({ format: "gif", size: 2048 }) + ")") : ("")),
          image: {
            url: ((isAnimated) ? (client.users.cache
              .get(getIdFromMention(args[0]))
              .displayAvatarURL({ format: "gif", size: 2048 })) : (client.users.cache
              .get(getIdFromMention(args[0]))
              .displayAvatarURL({ size: 2048 })))
          },
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL(),
          },
        },
      });
    } else {
      const isAnimated = new Promise((resolve, reject) => { require("needle").get(message.author
              .displayAvatarURL({ format: "gif", size: 2048 }), (error, response) => resolve(response.statusCode)) }) == 200;
      message.channel.send({
        embed: {
          color: 0x51c878,
          description: "[WEBP](" + message.author
              .displayAvatarURL({ size: 2048 }) + ") | [PNG](" + message.author
              .displayAvatarURL({ format: "png", size: 2048 }) + ") | [JPG](" + message.author
              .displayAvatarURL({ format: "jpg", size: 2048 }) + ")" + ((isAnimated) ? (" | [GIF](" + message.author
              .displayAvatarURL({ format: "gif", size: 2048 }) + ")") : ("")),
          image: {
            url: ((isAnimated) ? (message.author
              .displayAvatarURL({ format: "gif", size: 2048 })) : (message.author
              .displayAvatarURL({ size: 2048 })))
          },
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL(),
          },
        },
      });
    }
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                  embeds: [ response ]
                }
            },
        });
}
};

exports.category = "Utility";
exports.syntax = "avatar [optional user]"
exports.specialSlash = [{
    name: 'User',
    description: 'Description',
    type: 6,
    required: false
  }];