exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
	if(!client.disabledFunctions.get(message.guild.id).includes("fun")) {
	if(!client.disabledFunctions.get(message.guild.id).includes("minesweeper")) {
  const Minesweeper = require("discord.js-minesweeper");
  const minesweeper = new Minesweeper({
    rows: 9,
    columns: 9,
    mines: 10,
    emote: "boom"
  });
  message.channel.send(minesweeper.start());
}
}
};

exports.category = "Fun";
