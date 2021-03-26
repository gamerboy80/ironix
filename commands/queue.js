exports.run = (client, message, args, interaction) => {

	if(!client.disabledFunctions.get(message.guild.id).includes("music")) {
  if(client.queue[message.guild.id]) {
  	if(client.queue[message.guild.id].length != 0) {
  		var listElements = [];
  		client.queue[message.guild.id].forEach((video, i) => {
  			listElements.push("#" + i + " - [" + video.title + "](" + video.url + ") by " + video.author + " - " + video.duration)
  		});
  	message.channel.send({
          embed: {
            color: 0x51c878,
            title: "Queue - Volume: " + (client.dispatcher[message.guild.id].volume * 100) + "%",
            description: listElements.join("\n"),
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
            description: "There's nothing in the queue!",
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
            description: "There's nothing in the queue!",
            footer: {
              text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
              icon_url: message.author.displayAvatarURL()
            }
          }
        });
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
