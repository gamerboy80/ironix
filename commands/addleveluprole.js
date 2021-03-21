exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
  if (message.member.hasPermission("MANAGE_GUILD")) {
    var prefix = client.prefixes.get(message.guild.id);
    if (!isNaN(args[0]) && message.guild.roles.cache.get(args[1]) != undefined) {
      if(!typeof client.leveluproles.get(message.guild.id) === 'object') { client.leveluproles.set(message.guild.id, {}); }
      const tempArray = client.leveluproles.get(message.guild.id);
      tempArray[[args[0]]] = args[1];
      client.leveluproles.set(message.guild.id, tempArray);
      message.channel.send({
          embed: {
            color: 0x51c878,
            description: "Level up role added successfully.",
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
            "Invalid syntax | CORRECT SYNTAX: " +
            prefix +
            "addleveluprole [Level Number] [Role ID]",
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
          "You need ``Manage Guild`` permission for using this command.",
        footer: {
          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.displayAvatarURL(),
        },
      },
    });
  }
};

exports.category = "Settings";
exports.syntax = "addleveluprole [Level Number] [Role ID]";
exports.specialSlash = [{
    name: 'LevelNumber',
    description: 'Description',
    type: 4,
    required: true
  },{
    name: 'Role',
    description: 'Description',
    type: 8,
    required: true
  }];