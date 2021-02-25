exports.run = (client, message, args) => {
  if (!client.disabledFunctions.get(message.guild.id).includes("moderation")) {
    if (!client.disabledFunctions.get(message.guild.id).includes("mute")) {
      var prefix = client.prefixes.get(message.guild.id);
      if (message.member.hasPermission("KICK_MEMBERS")) {
        if (message.guild.roles.cache.find((r) => r.name == "Muted-IX") == null) {
          message.guild
            .roles.create({
              data: {
                name: "Muted-IX",
                color: "GRAY",
            }
            })
            .then((role) => {
              const muteRole = role;
              muteRole.setPosition(
                message.guild.roles.cache.find((r) => r.name == "Ironix").position - 1
              );
              message.guild.channels.cache.forEach((channel) => {
                if (channel.manageable) {
                  if (channel.type === "text") {
                    channel.createOverwrite(muteRole, {
                      SEND_MESSAGES: false,
                      ADD_REACTIONS: false,
                    });
                  } else {
                    if (channel.type === "voice") {
                      channel.createOverwrite(muteRole, {
                        SPEAK: false,
                      });
                    }
                  }
                }
              });
            })
            .then(() =>
              setTimeout(function() {
                muteNow();
              }, 100)
            );
        } else {
          muteNow();
        }
      } else {
        message.channel.send({
          embed: {
            color: 0xc85151,
            description:
              "You need ``Kick Members`` permission for using this command.",
            footer: {
              text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
              icon_url: message.author.displayAvatarURL(),
            },
          },
        });
      }
    }
  }

  async function muteNow() {
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

    if (message.member.hasPermission("KICK_MEMBERS")) {
      if (message.mentions.members.first()) {
        if (args[2]) {
          client.users.fetch(getIdFromMention(args[0])).then((user) => {
            let time;
            if (args[1] != "perm") {
              time = parseTime(args[1]);
            } else {
              time = "perm";
            }
            let preReason = args;
            preReason.shift();
            let reason = preReason;
            reason.shift();
            reason = reason.join(" ");

            if (client.mutes != undefined) {
              if (!Array.isArray(client.mutes.get(message.guild.id))) {
                client.mutes.set(message.guild.id, []);
              }
            } else {
              client.mutes.set(message.guild.id, []);
            }

            function isMutable() {
              if (
                message.guild.members.cache.get(user.id).roles.highest == "@everyone"
              ) {
                return true;
              } else {
                return (
                  message.guild.members.cache.get(user.id).roles.highest.position <
                  message.guild.members.cache.get(client.user.id).roles.highest.position
                );
              }
            }

            if (isMutable()) {
              const muteRole = message.guild.roles.cache.find((r) => r.name == "Muted-IX");
              if (client.mutes.get(message.guild.id).includes(user.id) && message.guild.members.cache.get(user.id).roles.cache.has(muteRole.id)) {
                message.channel.send({
                  embed: {
                    color: 0xc85151,
                    description: "This user is already muted!",
                    footer: {
                      text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                      icon_url: message.author.displayAvatarURL(),
                    },
                  },
                });
              } else {
                if (!isNaN(time)) {
                  var thing = client.tempMutes.get(message.guild.id) || {}; // probably copy this MAYBE

                  thing[user.id] = { time: Date.now() + time };

                  client.tempMutes.set(message.guild.id, thing);

                  if (Array.isArray(client.mutes.get(message.guild.id))) {
                    var fcifwk = Array.from(client.mutes.get(message.guild.id));
                    var pre = client.mutes.get(message.guild.id);
                    pre.push(user.id);
                    client.mutes.set(message.guild.id, pre);
                  } else {
                    client.mutes.set(message.guild.id, []);
                    var pre = client.mutes.get(message.guild.id);
                    pre.push(user.id);
                    client.mutes.set(message.guild.id, pre);
                  }

                  message.guild.members.cache.get(user.id).roles.add(muteRole.id);
                  
                  client.users.fetch(user.id).then((usera) => {
                    usera
                      .createDM().catch(console.log)
                      .then((dm) => {
                  if(dm != undefined) {
                        dm.send(
                          "**" +
                            message.member.user.tag +
                            "** muted you until the **" +
                            new Date(
                              Number(
                                client.tempMutes.get(message.guild.id)[user.id]
                                  .time
                              )
                            ) +
                            " **because **" +
                            reason +
                            ".**\n***Please, don't answer this message***"
                        ).catch(console.log);
                      }
                    }
                      );
                  });

                  message.channel.send({
                    embed: {
                      color: 0x51c878,
                      description: user.tag + " was muted successfully.",
                      footer: {
                        text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                        icon_url: message.author.displayAvatarURL(),
                      },
                    },
                  });

                  setTimeout(function() {
                    if (Array.isArray(client.mutes.get(message.guild.id))) {
                      client.mutes.set(
                        message.guild.id,
                        client.mutes
                          .get(message.guild.id)
                          .filter((e) => e !== user.id)
                      );
                    } else {
                      client.mutes.set(message.guild.id, []);
                    }

                    var thing = client.tempMutes.get(message.guild.id) || {}; // probably copy this MAYBE

                    delete thing[user.id];

                    client.tempMutes.set(message.guild.id, thing);

                    message.guild.members.cache.get(user.id).roles.remove(muteRole.id);
                  }, time);
                } else {
                  if (time == "perm") {
                    if (Array.isArray(client.mutes.get(message.guild.id))) {
                      var fcifwk = Array.from(
                        client.mutes.get(message.guild.id)
                      );
                      var pre = client.mutes.get(message.guild.id);
                      pre.push(user.id);
                      client.mutes.set(message.guild.id, pre);
                    } else {
                      client.mutes.set(message.guild.id, []);
                      var pre = client.mutes.get(message.guild.id);
                      pre.push(user.id);
                      client.mutes.set(message.guild.id, pre);
                    }

                    message.guild.members.cache.get(user.id).roles.add(muteRole.id);

                    client.users.fetch(user.id).then((usera) => {
                      usera
                        .createDM().catch(console.log)
                        .then((dm) =>
                          dm.send(
                            "**" +
                              message.member.user.tag +
                              "** muted you permanently because **" +
                              reason +
                              ".**\n***Please, don't answer this message***"
                          ).catch(console.log)
                        );
                    });

                    message.channel.send({
                      embed: {
                        color: 0x51c878,
                        description: user.tag + " was muted successfully.",
                        footer: {
                          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                          icon_url: message.author.displayAvatarURL(),
                        },
                      },
                    });
                  } else {
                    message.channel.send({
                      embed: {
                        color: 0xc85151,
                        description:
                          "Invalid syntax | CORRECT SYNTAX: " +
                          prefix +
                          "mute [mention] [time (XdXhXmXs) / perm] [reason]\nLimit: 23d59h59m59s",
                        footer: {
                          text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                          icon_url: message.author.displayAvatarURL(),
                        },
                      },
                    });
                  }
                }
              }
            } else {
              message.channel.send({
                embed: {
                  color: 0xc85151,
                  description: "You can't mute this user!",
                  footer: {
                    text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                    icon_url: message.author.displayAvatarURL(),
                  },
                },
              });
            }
          });
        } else {
          message.channel.send({
            embed: {
              color: 0xc85151,
              description:
                "Invalid syntax | CORRECT SYNTAX: " +
                prefix +
                "mute [mention] [time (XdXhXmXs) / perm] [reason]\nLimit: 23d59h59m59s",
              footer: {
                text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL(),
              },
            },
          });
        }
      } else {
        message.channel.send({
          embed: {
            color: 0xc85151,
            description:
              "Invalid syntax | CORRECT SYNTAX: " +
              prefix +
              "mute [mention] [time (XdXhXmXs) / perm] [reason]\nLimit: 23d59h59m59s",
            footer: {
              text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
              icon_url: message.author.displayAvatarURL(),
            },
          },
        });
      }
    }
  }

  function parseTime(string) {
    let messageToWork = string.toString().toLowerCase();
    let array;
    if (
      /^([0-9]|1[0-9]|2[0-3])[d]([0-9]|[1-4][0-9]|5[0-9])[h]([0-9]|[1-4][0-9]|5[0-9])[m]([0-9]|[1-4][0-9]|5[0-9])[s]$/.test(
        messageToWork
      )
    ) {
      array = messageToWork
        .replace("d", " ")
        .replace("h", " ")
        .replace("m", " ")
        .replace("s", " ")
        .split(" ");
      return (
        array[0] * 86400000 +
        array[1] * 3600000 +
        array[2] * 60000 +
        array[3] * 1000
      );
    } else {
      return undefined;
    }
  }
};

exports.category = "Moderation";
exports.neededPerms = ["MANAGE_ROLES"];