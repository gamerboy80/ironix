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
      message.channel.send({
        embed: {
          color: 0x51c878,
          author: {
            name: client.users.cache.get(getIdFromMention(args[0])).tag + " (" + getIdFromMention(args[0]) + ")",
          },
          description: "**User info**",
          thumbnail: {
            url: client.users.cache
              .get(getIdFromMention(args[0]))
              .displayAvatarURL(),
          },
          fields: [
            {
              name: "Created on",
              value: client.users.cache.get(getIdFromMention(args[0]))
                .createdAt,
            },
            {
              name: "Joined on",
              value: message.guild.members.cache.get(getIdFromMention(args[0]))
                .joinedAt,
            },
            {
              name: "Permissions",
              value: message.guild.members.cache
                .get(getIdFromMention(args[0]))
                .permissions.toArray()
                .toString()
                .split(",")
                .join(", "),
            },
            {
              name: "Roles",
              value: message.guild.members.cache
                .get(getIdFromMention(args[0]))
                .roles.cache.map((role) => "<@&" + role.id + ">")
                .toString()
                .split(",")
                .join(", "),
            },
          ],
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL(),
          },
        },
      });
    } else {
      message.channel.send({
        embed: {
          color: 0x51c878,
          author: {
            name: message.author.tag + " (" + message.author.id + ")",
          },
          description: "**User info**",
          thumbnail: {
            url: message.author
              .displayAvatarURL(),
          },
          fields: [
            {
              name: "Created on",
              value: message.author
                .createdAt,
            },
            {
              name: "Joined on",
              value: message.member
                .joinedAt,
            },
            {
              name: "Permissions",
              value: message.member
                .permissions.toArray()
                .toString()
                .split(",")
                .join(", "),
            },
            {
              name: "Roles",
              value: message.member
                .roles.cache.map((role) => "<@&" + role.id + ">")
                .toString()
                .split(",")
                .join(", "),
            },
          ],
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
exports.syntax = "userinfo [optional user]"
exports.specialSlash = [{
    name: 'User',
    description: 'Description',
    type: 6,
    required: false
  }];