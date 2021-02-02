exports.run = (client, message, args) => {
    message.channel.send("Here you go! " + client.config.websiteDomain + "/leaderboard/" + message.guild.id + " 🎩");
};

exports.category = "Rank";