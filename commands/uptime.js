exports.run = (client, message, args, interaction) => {

  if (process.platform == "win32") {
    require("child_process").exec(
      "wmic path Win32_OperatingSystem get LastBootUpTime",
      (err, stdout, stderr) => {
        const dateOnly = stdout
          .toString()
          .slice(14)
          .trim()
          .split(".")[0];
        const yearReady = dateOnly.slice(0, 4) + "-" + dateOnly.slice(4);
        const monthReady = yearReady.slice(0, 7) + "-" + yearReady.slice(7);
        const dayReady = monthReady.slice(0, 10) + " " + monthReady.slice(10);
        const hourReady = dayReady.slice(0, 13) + ":" + dayReady.slice(13);
        const whenTurnedOn = hourReady.slice(0, 16) + ":" + hourReady.slice(16);

        const date = new Date(whenTurnedOn).getTime();
        const now = new Date().getTime();
        const distance = now - date;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const timeOn =
          (days.toString().length == 2 ? days : "0" + days) +
          ":" +
          (hours.toString().length == 2 ? hours : "0" + hours) +
          ":" +
          (minutes.toString().length == 2 ? minutes : "0" + minutes) +
          ":" +
          (seconds.toString().length == 2 ? seconds : "0" + seconds);

        message.channel.send(
          "Our server is running since " +
            whenTurnedOn +
            " (" +
            /\((.*)\)/.exec(new Date().toString())[1] +
            "). So, it was running for " +
            timeOn
        );
      }
    );
  } else if (process.platform == "linux") {
    require("child_process").exec("uptime -s", (err, stdout, stderr) => {
      const whenTurnedOn = stdout.toString().trim();

      const date = new Date(whenTurnedOn).getTime();
      const now = new Date().getTime();
      const distance = now - date;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const timeOn =
        (days.toString().length == 2 ? days : "0" + days) +
        ":" +
        (hours.toString().length == 2 ? hours : "0" + hours) +
        ":" +
        (minutes.toString().length == 2 ? minutes : "0" + minutes) +
        ":" +
        (seconds.toString().length == 2 ? seconds : "0" + seconds);

      message.channel.send(
        "Our server is running since " +
          whenTurnedOn +
          " (" +
          /\((.*)\)/.exec(new Date().toString())[1] +
          "). So, it was running for " +
          timeOn
      );
    });
  }
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

exports.category = "Info";
