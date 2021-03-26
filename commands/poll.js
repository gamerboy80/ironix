exports.run = (client, message, args, interaction) => {

  if (!client.disabledFunctions.get(message.guild.id).includes("poll")) {
    var prefix = client.prefixes.get(message.guild.id);
    var everyone = /@everyone/g;
    var here = /@here/g;

    var joji =
      "a".repeat(2001);

    function getArguments(string) {
      const args = [];
      let str = string.trim();
      while (str.length) {
        let arg;
        if (str.startsWith('"') && str.indexOf('"', 1) > 0) {
          arg = str.slice(1, str.indexOf('"', 1));
          str = str.slice(str.indexOf('"', 1) + 1);
        } else if (str.startsWith("'") && str.indexOf("'", 1) > 0) {
          // arg = str.slice(1, str.indexOf("'", 1));
          arg = joji;
          str = str.slice(str.indexOf("'", 1) + 1);
        } else if (str.startsWith("```") && str.indexOf("```", 3) > 0) {
          // arg = str.slice(3, str.indexOf("```", 3));
          arg = joji;
          str = str.slice(str.indexOf("```", 3) + 3);
        } else {
          // arg = str.split(/\s+/g)[0].trim();
          arg = joji;
          str = str.slice(arg.length);
        }
        args.push(arg.trim());
        str = str.trim();
      }
      return args;
    }

    function fixedCharAt(str, idx) {
      let ret = "";
      str += "";
      let end = str.length;

      let surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
      while (surrogatePairs.exec(str) != null) {
        let lastIdx = surrogatePairs.lastIndex;
        if (lastIdx - 2 < idx) {
          idx++;
        } else {
          break;
        }
      }

      if (idx >= end || idx < 0) {
        return "";
      }

      ret += str.charAt(idx);

      if (
        /[\uD800-\uDBFF]/.test(ret) &&
        /[\uDC00-\uDFFF]/.test(str.charAt(idx + 1))
      ) {
        // Go one further, since one of the "characters" is part of a surrogate pair
        ret += str.charAt(idx + 1);
      }
      return ret;
    }

    args = getArguments(args.join(" "));

    var countrydodo = 0;

    args.forEach((e, i) => {
      args[i] = args[i]
        .replace(everyone, "[@]everyone")
        .replace(here, "[@]here");
      if (e == "") {
        countrydodo++;
      }
    });
    if (!args.includes(joji) && args.length != 0 && countrydodo == 0) {
      if (args.length == 1) {
        message.channel
          .send("📊 " + args[0])
          .then((message) =>
            message.react("✅").then(() => message.react("🇽"))
          );
      } else {
        if (args.length != 21) {
          var listOO = [];
          var chars = "🇦🇧🇨🇩🇪🇫🇬🇭🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹";
          for (var i = 1; i < args.length; i++) {
            listOO.push(fixedCharAt(chars, i - 1) + " " + args[i]);
          }
          message.channel
            .send("📊 **" + args[0] + "**\n", {
              embed: {
                color: 0x51c878,
                description: listOO.join("\n"),
              },
            })
            .then((message) => {
              for (var i = 0; i < args.length - 1; i++) {
                message.react(fixedCharAt(chars, i));
              }
            });
        } else {
          message.channel.send({
            embed: {
              color: 0xc85151,
              description:
                "Invalid syntax | CORRECT SYNTAX: \n" +
                "Any of those options:\n" +
                prefix +
                "poll [question] [options] (separate via " +
                '"' +
                ") like " +
                '"Which?" "Dog" "Cat" (maximum of 20 options)\n' +
                prefix +
                "poll [question] (separate via " +
                '"' +
                '"' +
                ")",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL(),
              },
            },
          });
        }
      }
    } else {
      message.channel.send({
        embed: {
          color: 0xc85151,
          description:
            "Invalid syntax | CORRECT SYNTAX: \n" +
            "Any of those options:\n" +
            prefix +
            "poll [question] [options] (separate via " +
            '"' +
            ") like " +
            '"Which?" "Dog" "Cat" (maximum of 20 options)\n' +
            prefix +
            "poll [question] (separate via " +
            '"' +
            '"' +
            ")",
          footer: {
            text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
            icon_url: message.author.displayAvatarURL(),
          },
        },
      });
    }
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

exports.category = "Utility";
exports.syntax = "\nAny of those options:\n" +
            "poll [question] [options] (separate via " +
            '"' +
            ") like " +
            '"Which?" "Dog" "Cat" (maximum of 20 options)\n' +
            "poll [question] (separate via " +
            '"' +
            '"' +
            ")";
exports.specialSlash = [{
    name: 'Question',
    description: 'Description',
    type: 3,
    required: true
  }, {
    name: 'Option1',
    description: 'Description',
    type: 3,
    required: false
  },
  {
    name: 'Option2',
    description: 'Description',
    type: 3,
    required: false
  }, {
    name: 'Option3',
    description: 'Description',
    type: 3,
    required: false
  },
  {
    name: 'Option4',
    description: 'Description',
    type: 3,
    required: false
  }, {
    name: 'Option5',
    description: 'Description',
    type: 3,
    required: false
  },
  {
    name: 'Option ',
    description: 'Description',
    type: 3,
    required: false
  }, {
    name: 'Option7',
    description: 'Description',
    type: 3,
    required: false
  },
  {
    name: 'Option8',
    description: 'Description',
    type: 3,
    required: false
  },
  {
    name: 'Option9',
    description: 'Description',
    type: 3,
    required: false
  }];