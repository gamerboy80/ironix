exports.run = (client, message, args) => {
  var difference;

  var startTime = new Date();
  message.channel
    .send("Getting ping...")
    .then(m => {
      var endTime = new Date();
      difference = endTime - startTime;
      m.delete();
    })
    .then(jfw => {
      message.channel.send({
        embed: {
          color: 0x51c878,
          description: "Pong!\n\n" + difference + " ms",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
    });
};

exports.category = "Utility";
