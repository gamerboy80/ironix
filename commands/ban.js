exports.run = (client, message, args, interaction) => {
	if (!client.disabledFunctions.get(message.guild.id).includes("moderation")) {
		if (!client.disabledFunctions.get(message.guild.id).includes("ban")) {
			var prefix = client.prefixes.get(message.guild.id);
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

			if (message.member.hasPermission("BAN_MEMBERS")) {
				if (true) {
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
							if (client.bans != undefined) {
								if (!Array.isArray(client.bans.get(message.guild.id))) {
									client.bans.set(message.guild.id, []);
								}
							} else {
								client.bans.set(message.guild.id, []);
							}

							if (message.guild.members.cache.get(user.id).bannable) {
								if (!isNaN(time)) {
									var thing = client.tempBans.get(message.guild.id) || {}; // probably copy this MAYBE

									thing[user.id] = { time: Date.now() + time };

									client.tempBans.set(message.guild.id, thing);

									if (Array.isArray(client.bans.get(message.guild.id))) {
										var fcifwk = Array.from(client.bans.get(message.guild.id));
										var pre = client.bans.get(message.guild.id);
										pre.push(user.id);
										client.bans.set(message.guild.id, pre);
									} else {
										client.bans.set(message.guild.id, []);
										var pre = client.bans.get(message.guild.id);
										pre.push(user.id);
										client.bans.set(message.guild.id, pre);
									}
									client.users.fetch(user.id).then((usera) => {
										usera
											.createDM()
											.catch(console.log)
											.then((dm) => {
												if (dm != undefined) {
													dm.send(
														"**" +
															message.member.user.tag +
															"** banned you until the **" +
															new Date(
																Number(
																	client.tempBans.get(message.guild.id)[user.id]
																		.time
																)
															) +
															" **because **" +
															reason +
															".**\n***Please, don't answer this message***"
													).catch(console.log);
												}
											});
									});

									message.guild.members.cache
										.get(user.id)
										.ban({ reason: reason });

									message.channel.send({
										embed: {
											color: 0x51c878,
											description: user.tag + " was banned successfully.",
											footer: {
												text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
												icon_url: message.author.displayAvatarURL(),
											},
										},
									});

									setTimeout(function () {
										if (Array.isArray(client.bans.get(message.guild.id))) {
											client.bans.set(
												message.guild.id,
												client.bans
													.get(message.guild.id)
													.filter((e) => e !== user.id)
											);
										} else {
											client.bans.set(message.guild.id, []);
										}

										var thing = client.tempBans.get(message.guild.id) || {}; // probably copy this MAYBE

										delete thing[user.id];

										client.tempBans.set(message.guild.id, thing);

										message.guild.members.unban(user.id);
									}, time);
								} else {
									if (time == "perm") {
										if (Array.isArray(client.bans.get(message.guild.id))) {
											var fcifwk = Array.from(
												client.bans.get(message.guild.id)
											);
											var pre = client.bans.get(message.guild.id);
											pre.push(user.id);
											client.bans.set(message.guild.id, pre);
										} else {
											client.bans.set(message.guild.id, []);
											var pre = client.bans.get(message.guild.id);
											pre.push(user.id);
											client.bans.set(message.guild.id, pre);
										}

										client.users.fetch(user.id).then((usera) => {
											usera
												.createDM()
												.catch(console.log)
												.then((dm) =>
													dm
														.send(
															"**" +
																message.member.user.tag +
																"** banned you permanently because **" +
																reason +
																".**\n***Please, don't answer this message***"
														)
														.catch(console.log)
												);
										});

										message.guild.members.cache
											.get(user.id)
											.ban({ reason: reason });

										message.channel.send({
											embed: {
												color: 0x51c878,
												description: user.tag + " was banned successfully.",
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
													"ban [mention] [time (XdXhXmXs) / perm] [reason]\nLimit: 23d59h59m59s",
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
										description: "I can't ban this user!",
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
									"ban [mention] [time (XdXhXmXs) / perm] [reason]\nLimit: 23d59h59m59s",
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
								"ban [mention] [time (XdXhXmXs) / perm] [reason]\nLimit: 23d59h59m59s",
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
							"You need ``Ban Members`` permission for using this command.",
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
exports.neededPerms = ["BAN_MEMBERS"];
exports.syntax = "addAlias [alias] [command]";
exports.specialSlash = [
	{
		name: "User",
		description: "Description",
		type: 6,
		required: true,
	},
	{
		name: "Time",
		description: "Description",
		type: 3,
		required: true,
	},
	{
		name: "Reason",
		description: "Description",
		type: 3,
		required: true,
	},
];
