exports.run = (client, message, args) => {
  const embed = new (require("discord.js").MessageEmbed)().setColor(16711680);
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
  embed.setFooter(
    `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
    message.author.displayAvatarURL()
  );
  message.channel.send({ embed });
}; /*
    }),
    t.setFooter(
      `Requested by ${r.author.username}#${r.author.discriminator} (${r.author.id})`,
      r.author.displayAvatarURL()
    );
  r.channel.send({ embed: t });
}),
  (exports.category = "Utility");

function _(s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
} */

/* exports.run = (client, message, args) => {
  const embed = new (require("discord.js")).MessageEmbed();
  embed.setColor(0xff0000);
  client.config.categories.forEach(category => {
    var filtered = client.commands.filter(cmd => cmd.category == category);
    var filteredcmds = filtered.keyArray();
    // console.log(filteredcmds);
    // console.log(filtered);
    embed.addField(
      category,
      filteredcmds.length > 0 ? "`" + filteredcmds.join("` `") + "`" : "`none`"
    );
  });
  embed.setFooter(
    `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`
  );
  message.channel.send({ embed });
};

exports.category = "Utility";
*/
/* (exports.run = (e, r, o) => {
  const t = new (require("discord.js")).MessageEmbed();
  t.setColor(16711680),
    e.config.categories.forEach(ca => {
    if(ca != "Owner") {
      var o = e.commands.filter(e => e.category == ca).keyArray();
      t.addField(ca, o.length > 0 ? "`" + o.join("` `") + "`" : "`Nothing!`");
    } /* else { if(e.config.owners.includes(r.author.id) && r.guild.id == 602261727740035073 || r.guild.id == 651201327786885169) {
      var o = e.commands.filter(e => e.category == ca).keyArray();
      t.addField(ca, o.length > 0 ? "`" + o.join("` `") + "`" : "`Nothing!`");
    } } */ /* exports.run = (client, message, args) => {
  var commands = {};
  client.commands.keyArray().forEach(key => {
    var cmd = client.commands.get(key);
    if (!commands[cmd.category]) commands[cmd.category] = [];
    commands[cmd.category].push(key);
  });
  const embed = new (require("discord.js")).MessageEmbed()
    .setFooter(
      `Requested by ${message.author.tag} (${message.author.id})`,
      message.author.displayAvatarURL()
    )
    .setColor(0xff0000);
  if (!client.config.owners.includes(message.author.id)) delete commands.Owner;
  delete commands["Cooming soon"];
  Object.keys(commands).forEach(key =>
    embed.addField(key, "`" + commands[key].join("` `") + "`")
  );

  message.channel.send({ embed });
}; */

/*
exports.run = (client, message, args) => {
    const embed = new (require("discord.js")).MessageEmbed().setColor(16711680);
    var d = client.disabledFunctions.get(message.guild.id);
    var a = {};
    a.Disabled = [];
    Array.from(client.commands.keys()).forEach(cmd => {
        var cmd1 = client.commands.get(cmd);
        if (!a[cmd1.category]) a[cmd1.category] = [];
        if (!d.includes(cmd) && !d.includes(cmd1.category)) {
            a[cmd1.category].push(cmd);
        } else {
            if (!a.Disabled) a.Disabled = [];
            a.Disabled.push(cmd);
        }
    });
    var c = Object.keys(a);
    c.sort(function(a, b) {
        return (client.config.categories.indexOf(a) != -1 ? client.config.categories.indexOf(a) : 999) - (client.config.categories.indexOf(b) != -1 ? client.config.categories.indexOf(b) : 999)
    });
    c.forEach(bruh => {
        if (bruh == "Owner" && !client.config.owners.includes(message.author.id)) return;
        embed.addField(bruh, a[bruh].length > 0 ? "`" + a[bruh].join("` `") + "`" : "`Nothing!`");
    });
    embed.setFooter(
      `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
      message.author.displayAvatarURL()
    );
    message.channel.send({embed});
}
*/

exports.category = "Info";
