exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
  var prefix = client.prefixes.get(message.guild.id);

  if (!client.disabledFunctions.get(message.guild.id).includes("moderation")) {
    if (!client.disabledFunctions.get(message.guild.id).includes("warn")) {
      if (message.member.hasPermission("KICK_MEMBERS")) {
        if(args[0]) {
          try {
            let objectThing = client.warns.get(message.guild.id, args[0].slice(0, 18));
            if(!objectThing[args[0]]) {
              throw "Stop";
            }
            delete objectThing[args[0]];
            client.warns.set(message.guild.id, args[0].slice(0, 18), objectThing);

            message.channel.send({
                embed: {
                  color: 0x51c878,
                  description: "Warn removed successfully.",
                  footer: {
                    text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                    icon_url: message.author.displayAvatarURL(),
                  },
                },
              });
          } catch {
            message.channel.send({
            embed: {
              color: 0xc85151,
              description:
                "Invalid syntax | CORRECT SYNTAX: " +
                prefix +
                "removeWarn [warn id]",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL(),
              },
            },
          });
          }
        } else {
          client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).send({
            embed: {
              color: 0xc85151,
              description:
                "Invalid syntax | CORRECT SYNTAX: " +
                prefix +
                "removeWarn [warn id]",
              footer: {
                text: `Requested by ${interaction.member.user.username}#${interaction.member.user.discriminator} (${interaction.member.user.id})`,
                icon_url: client.users.cache.get(interaction.member.user.id).displayAvatarURL(),
              },
            },
          });
        }
      } else {
        message.channel.send({
          embed: {
            color: 0xc85151,
            description:
              "You need ``Kick Members`` permission for using this command.",
            footer: {
              text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
              icon_url: message.author.displayAvatarURL(),
            },
          },
        });
      }
    }
  }
};

exports.category = "Moderation";
exports.syntax = "removeWarn [warn id]";
exports.specialSlash = [{
    name: 'WarnID',
    description: 'Description',
    type: 3,
    required: true
  }];