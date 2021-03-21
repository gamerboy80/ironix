exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
  if (!client.config.owners.includes(message.author.id)) {
    return;
  }
  if (client.config.debug == "false") {
   return; 
  }
  message.delete();
  message.channel.send(args.join(" "));
};

exports.category = "Owner";
