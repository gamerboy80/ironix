exports.run = async (client, message, args) => {
  if (!client.disabledFunctions.get(message.guild.id).includes("rank")) {
    (async () => {
      function getIdFromMention(mention) {
        if (!mention) {
          return;
        }

        if (mention.startsWith("<@") && mention.endsWith(">")) {
          mention = mention.slice(2, -1);

          if (mention.startsWith("!")) {
            mention = mention.slice(1);
          }

          return mention;
        }
      }

      function createUUID() {
        var dt = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function(c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
          }
        );
        return uuid;
      }

      function kFormatter(num) {
        return Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
          : Math.sign(num) * Math.abs(num);
      }

      function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === "undefined") {
          stroke = true;
        }
        if (typeof radius === "undefined") {
          radius = 5;
        }
        if (typeof radius === "number") {
          radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
          var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
          for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
          }
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(
          x + width,
          y + height,
          x + width - radius.br,
          y + height
        );
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
          ctx.fill();
        }
        if (stroke) {
          ctx.stroke();
        }
      }

      function has(e, k, p) {
        if (p) {
          try {
            return e.has(k, p);
          } catch {
            return false;
          }
        } else {
          return e.has(k);
        }
      }

      if (args[0] == undefined) {
        var rankData = client.rankData.get(message.guild.id, message.author.id);
        if (!rankData) {
          message.channel.send(
            "You aren't ranked yet. Send some messages first, then try again."
          );
        } else {
          var memberArray = [];
          var memberLevels = [];
          memberArray = Object.keys(client.rankData.get(message.guild.id));
          memberLevels = memberArray.map(function(e) {
            return client.rankData.get(message.guild.id, e).level;
          });
          memberLevelsToRankCheck = memberArray.map(function(e) {
            return (
              Number(client.rankData.get(message.guild.id, e).level) +
              Number(client.rankData.get(message.guild.id, e).xp)
            );
          });
          var sortedArray = memberLevelsToRankCheck
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort((a, b) => b - a);
          var memberRanks = memberLevelsToRankCheck.map(
            (v) => sortedArray.findIndex((e) => e == v) + 1
          );
          var rank = "#" + memberRanks[memberArray.indexOf(message.author.id)];

          var level = rankData.level;
          var xp = kFormatter(rankData.xp);
          var neededXp = kFormatter((rankData.level + 1) * 100);
          var slideWidth =
            (678 * ((rankData.xp * 100) / ((rankData.level + 1) * 100))) / 100;

          const { registerFont, createCanvas, loadImage } = require("canvas");

          registerFont("./assets/Montserrat-Medium.ttf", {
            family: "Montserrat",
            weight: "normal",
          });
          registerFont("./assets/Montserrat-Bold.ttf", {
            family: "Montserrat",
            weight: "bold",
          });

          const canvas = createCanvas(934, 382);
          const ctx = canvas.getContext("2d");

          const dots = await loadImage("./assets/dots.png");
          ctx.drawImage(dots, 0, 0);

          ctx.fillStyle = client.rankcolour.get(message.author.id) || "#2D9CDB";
          ctx.fillRect(0, 0, 10, 382);

          ctx.font = "bold 24px Montserrat";
          ctx.fillStyle = "white";
          ctx.textAlign = "right";
          ctx.fillText("Level " + level + "   Rank " + rank, 934 - 47, 193);
          ctx.textAlign = "start";
          ctx.fillStyle = "white";
          ctx.font = "bold 38px Montserrat";
          ctx.fillText(message.member.user.username, 51, 215);
          ctx.font = "normal 38px Montserrat";
          ctx.fillStyle = "#999999";
          ctx.fillText(
            "#" + message.member.user.discriminator,
            60 + ctx.measureText(message.member.user.username).width,
            215
          );

          ctx.fillStyle = "#cccccc";
          ctx.font = "normal 24px Montserrat";

          ctx.textAlign = "right";
          ctx.fillText(xp + `/` + neededXp, 934 - 47, 223);
          ctx.textAlign = "start";

          ctx.fillStyle = "white";
          roundRect(ctx, 51, 279, 836, 5, 4, true);

          ctx.fillStyle = client.rankcolour.get(message.author.id) || "#2D9CDB";
          roundRect(ctx, 51, 279, slideWidth, 5, 4, true);

          const canvas2 = createCanvas(80, 80);
          const ctx2 = canvas2.getContext("2d");  

          const img = await loadImage(message.author.displayAvatarURL({ format: 'png' }));

          ctx2.drawImage(img, 0, 0, 80, 80);

          ctx2.globalCompositeOperation = "destination-in";
          ctx2.beginPath();
          ctx2.arc(40, 40, 40, 0, 2 * Math.PI, true);
          ctx2.fill();

          ctx.drawImage(canvas2, 51, 84);

          var base64Data = canvas
            .toDataURL()
            .replace(/^data:image\/png;base64,/, "");

          var rankName = createUUID() + ".png";

          require("fs").writeFile(rankName, base64Data, "base64", function(
            err
          ) {
            message.channel.send({ files: [{ attachment: rankName, name: rankName }] }).then(() => {
              require("fs").unlink(rankName, function(err) {});
            });
          });
        }
      } else if (message.mentions.members.first()) {
        var rankData = client.rankData.get(message.guild.id, message.author.id);

        if(!message.guild.members.cache.get(getIdFromMention(args[0])).user.bot) {

        if (!rankData) {
          message.channel.send(
            "This user isn't ranked yet. Wait for this user to send some messages first, then try again."
          );
        } else {

        }
      } else {
        message.channel.send(
            "Bots can't be ranked."
          );
      }
      }
    })();
  }
};

exports.category = "Rank";
