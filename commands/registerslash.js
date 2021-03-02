exports.run = (client, message, args) => {
  if (message.member.hasPermission("MANAGE_GUILD")) {

    message.channel.send("Please wait...");

    var errors = [];
    var done = [];

      Array.from(client.slashCommands).map(thing => thing[0]).forEach(commandName => {
    if(!client.slashCommands.get(commandName).special) {
      try {
  client.api.applications(client.user.id).guilds(message.guild.id).commands.post({data: {
    name: commandName,
    description: 'Description'
}}).then(() => done.push(commandName));
} catch(error) {
  console.log(error);
errors.push(error);
}
} else {
  try {
    done.push(commandName);
    client.api.applications(client.user.id).guilds(message.guild.id).commands.post(client.slashCommands.get(commandName).special);
} catch(error) {
errors.push(error);
  console.log(error);

  }
}
});
      (function sendFinishMessage() {
        if(done.length == Array.from(client.slashCommands).map(thing => thing[0]).length) {
if(errors.length == 0) {
    message.channel.send({
      embed: {
        color: 0x51c878,
        description: "Slash commands were registered successfully!",
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
          "There was an error registering the slash commands.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL()
        }
      }
    });
  }
  } else {
    setTimeout(sendFinishMessage, 50);
  } 
})();
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

exports.category = "Settings";
