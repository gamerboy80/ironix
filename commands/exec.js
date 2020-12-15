exports.run = (client, message, args) => {
  if (client.config.owners.includes(message.author.id)) {
    require("child_process").exec(args.join(" "), (err, stdout, stderr) => {
      if(err != null) {
        if(err.toString() != "") {
      message.channel
        .send(err.toString());
      }
    }
      if(stderr != null) {
        if(stderr.toString() != "") {
      message.channel
        .send(stderr.toString());
      }
    }
        if(stdout != null) {
          if(stdout.toString() != "") {
      message.channel
        .send(stdout.toString());
      }
      }

    });
  }
};

exports.category = "Owner";
