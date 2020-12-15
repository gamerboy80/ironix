exports.run = (client, message, args) => {
  if (message.member.hasPermission("MANAGE_GUILD")) {
    client.prefixes.set(message.guild.id, args.join(" "));
    message.channel.send({
      embed: {
        color: 0x51c878,
        description: "Prefix changed succesfully!",
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
        description:
          "You need ``Manage Guild`` permission for using this command.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL()
        }
      }
    });
  }
  /*if (message.member.hasPermission("MANAGE_GUILD")) {
  const fs = require("fs");

  fs.readFile("prefixes/" + message.guild.id + ".txt", function(err, data) {
    if (err) {
      throw err;
    }

    const newValue = args.join(" ");

    fs.writeFile("prefixes/" + message.guild.id + ".txt", newValue, function(
      err
    ) {
      if (err) {
        throw err;
        message.channel.send({
          embed: {
            color: 0xc85151,
            description:
              "There was an error trying to change the prefix.",
            footer: {
                    text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                    icon_url: message.author.displayAvatarURL()
                  }
          }
        });
      } else {
        message.channel.send({
          embed: {
            color: 0x51c878,
            description: "Prefix changed succesfully!",
            footer: {
                    text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                    icon_url: message.author.displayAvatarURL()
                  }
          }
        });
      }
    });
  });
  } else {
    message.channel.send({
      embed: {
        color: 0xc85151,
        description: "Only staff members can use this command.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL()
        }
      }
    });
  }*/
};

exports.category = "Settings";
