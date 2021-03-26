exports.run = (client, message, args, interaction) => {

  if (!client.config.owners.includes(message.author.id)) {
    return;
  }
  if (client.config.debug == "false") {
   return; 
  }
  message.delete();
  message.channel.send(args.join(" "));
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

exports.category = "Owner";
