exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}
  if(!client.disabledFunctions.get(message.guild.id).includes("fun")) {
  if(!client.disabledFunctions.get(message.guild.id).includes("rps")) {
  const answerInNumbers = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1) + 1)) + Math.ceil(1);
  if (args[0] != undefined) {
    if (
      (args[0] == args.join(" ") && args[0].toLowerCase() == "rock") ||
      args[0].toLowerCase() == "paper" ||
      args[0].toLowerCase() == "scissors"
    ) {
      if (args[0].toLowerCase() == "rock" && answerInNumbers == 1) {
        message.channel.send("You selected rock and I selected rock. Draw.");
      }
      if (args[0].toLowerCase() == "rock" && answerInNumbers == 2) {
        message.channel.send("You selected rock and I selected paper. I won.");
      }
      if (args[0].toLowerCase() == "rock" && answerInNumbers == 3) {
        message.channel.send(
          "You selected rock and I selected scissors. You won."
        );
      }
      if (args[0].toLowerCase() == "paper" && answerInNumbers == 1) {
        message.channel.send(
          "You selected paper and I selected rock. You won."
        );
      }
      if (args[0].toLowerCase() == "paper" && answerInNumbers == 2) {
        message.channel.send("You selected paper and I selected paper. Draw.");
      }
      if (args[0].toLowerCase() == "paper" && answerInNumbers == 3) {
        message.channel.send(
          "You selected paper and I selected scissors. I won"
        );
      }
      if (args[0].toLowerCase() == "scissors" && answerInNumbers == 1) {
        message.channel.send(
          "You selected scissors and I selected rock. I won."
        );
      } // oh! hi, lol
      if (args[0].toLowerCase() == "scissors" && answerInNumbers == 2) {
        message.channel.send(
          "You selected scissors and I selected paper. You won."
        );
      }
      if (args[0].toLowerCase() == "scissors" && answerInNumbers == 3) {
        message.channel.send(
          "You selected scissors and I selected scissors. Draw."
        );
      }
    } else {
      message.channel.send("Please select rock, paper or scissors.");
    }
  } else {
    message.channel.send("Please select rock, paper or scissors.");
  }
}
}
};

exports.category = "Fun";
exports.syntax = "rps [rock / paper / scissors]";
exports.specialSlash = [{
    name: 'RockPaperScissors',
    description: 'Description',
    type: 3,
    required: true
  }];