exports.run = (client, message, args) => {
  if (!client.disabledFunctions.get(message.guild.id).includes("fun")) {
    if (!client.disabledFunctions.get(message.guild.id).includes("messeveryone")) {
if (message.member.hasPermission("MANAGE_GUILD")) {
  if(message.guild.members.cache.size < 20) {
    message.guild.members.cache.forEach(member => { 
      member.setNickname(require('random-words')()).catch(error => console.log(error));
  });
      message.channel.send({
      embed: {
        color: 0x51c878,
        description:
          "Members nicknames messed up successfully!",
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
          "This command only works in servers with less than 20 members.",
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
}
}
};

exports.category = "Fun";
