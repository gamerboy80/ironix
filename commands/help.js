exports.run = (client, message, args) => {
  const embed = new (require("discord.js").MessageEmbed)().setColor(0x51c878);
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
  embed.setTitle("Normal commands");
  message.channel.send({ embed });
};

exports.category = "Info";
