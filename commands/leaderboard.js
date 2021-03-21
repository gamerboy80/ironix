exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
    message.channel.send("Here you go! " + client.config.websiteDomain + "/leaderboard/" + message.guild.id + " 🎩");
};

exports.category = "Rank";