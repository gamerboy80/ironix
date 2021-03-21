exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
  if(!client.disabledFunctions.get(message.guild.id).includes("leave")) {
  message.member
    .kick()
    .then(water => {
      message.channel.send(
        "Goodbye, " +
          message.author.username +
          "#" +
          message.author.discriminator +
          " (" +
          message.author.id +
          ", <@" +
          message.author.id +
          ">)!"
      );
    })
    .catch(water => {
      message.channel.send("The role hierarchy doesn't let me kick you.");
    });
  }
};

exports.category = "Utility";
