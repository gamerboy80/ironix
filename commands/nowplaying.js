exports.run = (client, message, args, interaction) => {

  if(!client.disabledFunctions.get(message.guild.id).includes("music")) {
  if(client.queue[message.guild.id]) {
  	message.channel.send({
          embed: {
            color: 0x51c878,
            title: "🔈 " + client.queue[message.guild.id][0].title,
            url: client.queue[message.guild.id][0].url,
            description: "By " + client.queue[message.guild.id][0].author + "\n" + formatFromMs(client.dispatcher[message.guild.id].streamTime) + " / " + client.queue[message.guild.id][0].duration,
            image: {
              url: client.queue[message.guild.id][0].thumbnail
            },
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
            description: "I'm not playing anything!",
            footer: {
              text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
              icon_url: message.author.displayAvatarURL()
            }
          }
        });
  }

function formatFromMs(ms) {

  function fix(value, shouldI) {
  	if(shouldI) {
      if(value.toString().length < 2) {
          return "0" + value;
      } else {
          return value;
      }
  } else {
  	return value;
  }
  }

  let miliseconds = ms % 1000;
  ms = (ms - miliseconds) / 1000;
  let seconds = ms % 60;
  ms = (ms - seconds) / 60;
  let minutes = ms % 60;
  let hours = (ms - minutes) / 60;

  if(fix(hours) != "00") {
  return fix(hours, false) + ':' + fix(minutes, true) + ':' + fix(seconds, true);
} else {
return fix(minutes, false) + ':' + fix(seconds, true);
}
}
}
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

exports.category = "Music";
