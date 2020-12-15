exports.run = (client, message, args) => {
  if (!client.disabledFunctions.get(message.guild.id).includes("suggest")) {
    var prefix = client.prefixes.get(message.guild.id);
    if (message.member.hasPermission("MANAGE_GUILD")) {
      var suggestionChannel = client.suggestions.get(message.guild.id);
      if (message.guild.channels.cache.get(suggestionChannel) != undefined) {
        let juan;
        message.guild.channels.cache
          .get(suggestionChannel)
          .messages
          .fetch()
          .then((mOc) => {
            juan = mOc.get(args[0]);
          })
          .then(() => {
            if (args[0] != "") {
              if (juan != undefined) {
                if (args.join(" ").slice(args[0].length) != "") {
                  if (
                    !juan.embeds[0].title.includes("Approved") &&
                    !juan.embeds[0].title.includes("Denied")
                  ) {
                    juan.edit(
                      new (require("discord.js").MessageEmbed)(juan.embeds[0])
                        .setTitle("Suggestion - Approved")
                        .setColor(0x51c878)
                        .addField(
                          "Reason by " + message.member.user.tag,
                          args.join(" ").slice(args[0].length)
                        )
                    );

                    message.channel.send({
                      embed: {
                        color: 0x51c878,
                        description: "Suggestion approved succesfully!",
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
                        description: "Suggestion already denied/approved.",
                        footer: {
                          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                          icon_url: message.author.displayAvatarURL(),
                        },
                      },
                    });
                  }
                } else {
                  message.channel.send({
                    embed: {
                      color: 0xc85151,
                      description:
                        "Invalid syntax | CORRECT SYNTAX: " +
                        prefix +
                        "approve [Suggestion ID] [reason]",
                      footer: {
                        text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                        icon_url: message.author.displayAvatarURL(),
                      },
                    },
                  });
                }
              } else {
                message.channel.send({
                  embed: {
                    color: 0xc85151,
                    description: "Suggestion not found.",
                    footer: {
                      text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                      icon_url: message.author.displayAvatarURL(),
                    },
                  },
                });
              }
            } else {
              message.channel.send({
                embed: {
                  color: 0xc85151,
                  description:
                    "Invalid syntax | CORRECT SYNTAX: " +
                    prefix +
                    "approve [Suggestion ID] [reason]",
                  footer: {
                    text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                    icon_url: message.author.displayAvatarURL(),
                  },
                },
              });
            }
          });
      } else {
        message.channel.send({
          embed: {
            color: 0xc85151,
            description: "Suggest channel not found.",
            footer: {
              text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
              icon_url: message.author.displayAvatarURL(),
            },
          },
        });
      }
    }
  } else {
    message.channel.send({
      embed: {
        color: 0xc85151,
        description:
          "You need ``Manage Guild`` permission for using this command.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL(),
        },
      },
    });
  }
};

exports.category = "Suggestions";
