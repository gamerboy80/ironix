exports.run = (client, message, args, interaction) => {
	var prefix = client.prefixes.get(message.guild.id);

	if (!client.disabledFunctions.get(message.guild.id).includes("moderation")) {
		if (!client.disabledFunctions.get(message.guild.id).includes("warn")) {
			function getIdFromMention(mention) {
				if (!mention) {
					return;
				}

				if (mention.startsWith("<@") && mention.endsWith(">")) {
					mention = mention.slice(2, -1);

					if (mention.startsWith("!")) {
						mention = mention.slice(1);
					}
				}
				return mention;
			}

			if (message.member.hasPermission("KICK_MEMBERS")) {
				if (true) {
					if (args[1]) {
						client.users.fetch(getIdFromMention(args[0])).then((user) => {
							let reason = args;
							reason.shift();
							reason = reason.join(" ");

							let wget;
							try {
								wget = client.warns.get(message.guild.id, user.id);
							} catch {}

							var thing = wget;

							let idW;

							if (wget == undefined) {
								idW = user.id + 0;
								thing = {};
							} else {
								idW = user.id + Object.keys(wget).length;
							}

							thing[idW] = {
								reason: reason,
								moderator: message.member.user.id,
								date: Date.now(),
							};

							client.warns.set(message.guild.id, thing, user.id);

							client.users.fetch(user.id).then((usera) => {
								usera
									.createDM()
									.catch(console.log)
									.then((dm) => {
										if (dm != undefined) {
											dm.send(
												"**" +
													message.member.user.tag +
													"** warned you because **" +
													reason +
													".**\n***Please, don't answer this message***"
											).catch(console.log);
										}
									});
							});

							message.channel.send({
								embed: {
									color: 0x51c878,
									description: user.tag + " was warned successfully.",
									footer: {
										text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
										icon_url: message.author.displayAvatarURL(),
									},
								},
							});
						});
					} else {
						message.channel.send({
							embed: {
								color: 0xc85151,
								description:
									"Invalid syntax | CORRECT SYNTAX: " +
									prefix +
									"warn [user] [reason]",
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
								"warn [user] [reason]",
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
	if (interaction) {
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [response],
				},
			},
		});
	}
};

exports.category = "Moderation";
exports.syntax = "warn [user] [reason]";
exports.specialSlash = [
	{
		name: "User",
		description: "Description",
		type: 6,
		required: true,
	},
	{
		name: "Reason",
		description: "Description",
		type: 3,
		required: true,
	},
];
