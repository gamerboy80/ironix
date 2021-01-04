exports.run = (client, message, args) => {
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

      return mention;
    }
  }

  if (message.mentions.members.first()) {
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
          color: 0xc85151,
          description:
            "Invalid syntax | CORRECT SYNTAX: " + prefix + "userInfo [user]",
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
          "Invalid syntax | CORRECT SYNTAX: " + prefix + "userInfo [user]",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL(),
        },
      },
    });
  }
};

exports.category = "Utility";
