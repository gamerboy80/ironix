exports.run = (client, message, args, interaction) => {
	if (!client.disabledFunctions.get(message.guild.id).includes("moderation")) {
		if (!client.disabledFunctions.get(message.guild.id).includes("ban")) {
			var prefix = client.prefixes.get(message.guild.id);
			async function unban() {
				if (message.member.hasPermission("BAN_MEMBERS")) {
					if (args.join(" ") != "") {
						const banList = await message.guild.fetchBans();
						var isBanned;
						var user;
						if (banList.get(args.join(" "))) {
							isBanned = true;
							user = client.users.cache.get(args.join(" "));
						}
						if (isBanned) {
							var thing = client.tempBans.get(message.guild.id) || {}; // probably copy this MAYBE

							delete thing[args.join(" ")];

							client.tempBans.set(message.guild.id, thing);

							message.guild.members.unban(args.join(" "));
							message.channel.send({
								embed: {
									color: 0x51c878,
									description: user.tag + " was unbanned successfully.",
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
									description: "This user isn't banned or doesn't exist.",
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
									"unban [user id]",
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
			unban();
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
exports.syntax = "unban [user id]";
exports.specialSlash = [
	{
		name: "UserID",
		description: "Description",
		type: 3,
		required: true,
	},
];
