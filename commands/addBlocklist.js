exports.run = (client, message, args) => {
  var prefix = client.prefixes.get(message.guild.id);
  if (message.member.hasPermission("MANAGE_GUILD")) {
    if (args.join(" ") != "") {
      if (Array.isArray(client.blocklist.get(message.guild.id))) {
        var fcifwk = Array.from(client.blocklist.get(message.guild.id));
        if (fcifwk.includes(args.join(" ")) == false) {
          if(!args.join(" ").includes("``")) {
          var pre = client.blocklist.get(message.guild.id);
          pre.push(args.join(" ").toLowerCase());
          client.blocklist.set(message.guild.id, pre);
          message.channel.send({
            embed: {
              color: 0x51c878,
              description: "Word blocklisted successfully!",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL()
              }
            }
          });
        } else {
          message.channel.send({
            embed: {
              color: 0xc85151,
              description: "You can't blocklist this word because it includes ``",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL()
              }
            }
          });
        }
        } else {
          message.channel.send({
            embed: {
              color: 0xc85151,
              description: "That word is already blocklisted!",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL()
              }
            }
          });
          return;
        }
      } else {
        client.blocklist.set(message.guild.id, []);
        var pre = client.blocklist.get(message.guild.id);
        pre.push(args.join(" ").toLowerCase());
        client.blocklist.set(message.guild.id, pre);
        message.channel.send({
          embed: {
            color: 0x51c878,
            description: "Word blocklisted successfully!",
            footer: {
              text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
              icon_url: message.author.displayAvatarURL()
            }
          }
        });
      }
    } else {
      message.channel.send({
        embed: {
          color: 0xc85151,
          description:
            "Invalid syntax | CORRECT SYNTAX: " +
            prefix +
            "addblocklist [word]",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
    }
  } else {
    message.channel.send({
      embed: {
        color: 0xc85151,
        description:
          "You need ``Manage Guild`` permission for using this command.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL()
        }
      }
    });
  }
};

exports.category = "blocklist";
