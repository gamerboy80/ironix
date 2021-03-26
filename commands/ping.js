exports.run = (client, message, args, interaction) => {
    var response;

    var difference;

    var startTime = new Date();
    message.channel
        .send("Getting ping...")
        .then(m => {
            var endTime = new Date();
            difference = endTime - startTime;
            m.delete();
            response = {
                embed: {
                    color: 0x51c878,
                    description: "Pong!\n\n" + difference + " ms",
                    footer: {
                        text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                        icon_url: message.author.displayAvatarURL()
                    }
                }
            };
            if(!interaction) {
            message.channel.send(response);
        } 
        });
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

exports.category = "Utility";