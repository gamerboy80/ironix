exports.run = (client, message, args) => {
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
