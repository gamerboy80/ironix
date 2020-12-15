exports.run = (client, message, args) => {
    message.channel.send("Here you go! https://soon.soon/leaderboard/" + message.guild.id + " 🎩");
};

exports.category = "Rank";