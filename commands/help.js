exports.run = (client, message, args) => {
  const Pagination = require('discord-paginationembed');
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

  var scrollyDatabase = [];
  var scrollyEmbeds = [];

  c.forEach((bruh) => {
    if (bruh == "Owner")
      return;
    scrollyDatabase.push({ [bruh]: a[bruh].length > 0 ? "`" + a[bruh].join("` `") + "`" : "`Nothing!`" });
  });

  scrollyDatabase.forEach((e, i) => {
    const embed = new (require("discord.js").MessageEmbed)().setColor(16711680);
    embed.setTitle('DM me "help" for full list!');
    embed.addField(Object.keys(scrollyDatabase[i]) + " - Page " + (i + 1) + " of " + scrollyDatabase.length, Object.values(scrollyDatabase[i]));
    embed.setFooter(
    `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
    message.author.displayAvatarURL()
  );
    scrollyEmbeds.push(embed);
  });

  
  new Pagination.Embeds()
  .setArray(scrollyEmbeds)
  .setAuthorizedUsers([message.author.id])
  .setChannel(message.channel)
  .setPage(1)
  .setDisabledNavigationEmojis(['delete'])
  .build();
};

exports.category = "Info";
