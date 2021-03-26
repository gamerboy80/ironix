exports.run = (client, message, args, interaction) => {

  const embed = new (require("discord.js").MessageEmbed)().setColor(0x51c878);
    if(!client.commands.get(args[0] || "".toLowerCase())) {
      if(args[0]) {
        message.channel.send({
        embed: {
          color: 0xc85151,
          description: "Command not found!",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
        return;
      }
  var d = client.disabledFunctions.get(message.guild.id);
  var a = {};
  a.Disabled = [];
  Array.from(client.commands.keys()).forEach((cmd) => {
    var cmd1 = client.commands.get(cmd);
    client.disabledFunctions.get(message.guild.id).forEach((e, i) => {
      if(e != "blocklist" && e != "mailfilter" && e != "filters") {
      if (client[e].includes(cmd)) {
        if (!a.Disabled) {
          a.Disabled = [];
        }
        if(!a.Disabled.includes(cmd)) {
        a.Disabled.push(cmd);
      }
      }
    }
    });
    if (!a[cmd1.category]) { a[cmd1.category] = [] };
    if(!a.Disabled.includes(cmd)) {
  a[cmd1.category].push(cmd);
}
  });

  var c = Object.keys(a);
  c.sort(function(a, b) {
    return (
      (client.config.categories.indexOf(a) != -1
        ? client.config.categories.indexOf(a)
        : 999) -
      (client.config.categories.indexOf(b) != -1
        ? client.config.categories.indexOf(b)
        : 999)
    );
  });
  c.forEach((bruh) => {
    if (bruh == "Owner")
      return;
    embed.addField(
      bruh,
      a[bruh].length > 0 ? "`" + a[bruh].join("` `") + "`" : "`Nothing!`"
    );
  });
  embed.setTitle("Normal commands");
} else {
  if(client.commands.get(args[0].toLowerCase()).category != "Owner") {
  if(client.commands.get(args[0].toLowerCase()).syntax) {
    embed.setDescription("SYNTAX: " + client.commands.get(args[0].toLowerCase()).syntax);
  } else {
    embed.setDescription("SYNTAX: " + args[0].toLowerCase())
  }
} else {
  var d = client.disabledFunctions.get(message.guild.id);
  var a = {};
  a.Disabled = [];
  Array.from(client.commands.keys()).forEach((cmd) => {
    var cmd1 = client.commands.get(cmd);
    client.disabledFunctions.get(message.guild.id).forEach((e, i) => {
      if(e != "blocklist" && e != "mailfilter" && e != "filters") {
      if (client[e].includes(cmd)) {
        if (!a.Disabled) {
          a.Disabled = [];
        }
        if(!a.Disabled.includes(cmd)) {
        a.Disabled.push(cmd);
      }
      }
    }
    });
    if (!a[cmd1.category]) { a[cmd1.category] = [] };
    if(!a.Disabled.includes(cmd)) {
  a[cmd1.category].push(cmd);
}
  });

  var c = Object.keys(a);
  c.sort(function(a, b) {
    return (
      (client.config.categories.indexOf(a) != -1
        ? client.config.categories.indexOf(a)
        : 999) -
      (client.config.categories.indexOf(b) != -1
        ? client.config.categories.indexOf(b)
        : 999)
    );
  });
  c.forEach((bruh) => {
    if (bruh == "Owner")
      return;
    embed.addField(
      bruh,
      a[bruh].length > 0 ? "`" + a[bruh].join("` `") + "`" : "`Nothing!`"
    );
  });
}
}
  embed.setFooter(
    `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
    message.author.displayAvatarURL()
  );
  message.channel.send({ embed });
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

exports.category = "Info";
exports.syntax = "help [optional command]";
exports.specialSlash = [{
    name: 'Command',
    description: 'Description',
    type: 3,
    required: false
  }]