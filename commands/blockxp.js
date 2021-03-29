exports.run = (client, message, args, interaction) => {
	var prefix = client.prefixes.get(message.guild.id);
	if (message.member.hasPermission("MANAGE_GUILD")) {
		if (args.join(" ") != "") {
			if (Array.isArray(client.xpblocked.get(message.guild.id))) {
				var fcifwk = Array.from(client.xpblocked.get(message.guild.id));
				if (fcifwk.includes(args.join(" ")) == false) {
					if (isAChannelOrMember(args.join(" "))) {
						var pre = client.xpblocked.get(message.guild.id);
						pre.push(getChannelOrMemberId(args.join(" ")));
						client.xpblocked.set(message.guild.id, pre);
						message.channel.send({
							embed: {
								color: 0x51c878,
								description:
									"Channel/member blocked from gaining XP successfully!",
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
									"blockxp [channel / member]",
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
								"That channel/member already has gaining XP blocked!",
							footer: {
								text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
								icon_url: message.author.displayAvatarURL(),
							},
						},
					});
					return;
				}
			} else {
				if (isAChannelOrMember(args.join(" "))) {
					client.xpblocked.set(message.guild.id, []);
					var pre = client.xpblocked.get(message.guild.id);
					pre.push(getChannelOrMemberId(args.join(" ")));
					client.xpblocked.set(message.guild.id, pre);
					message.channel.send({
						embed: {
							color: 0x51c878,
							description:
								"Channel/member blocked from gaining XP successfully!",
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
								"blockxp [channel / member]",
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
						"Invalid syntax | CORRECT SYNTAX: " +
						prefix +
						"blockxp [channel / member]",
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
					"You need ``Manage Guild`` permission for using this command.",
				footer: {
					text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
					icon_url: message.author.displayAvatarURL(),
				},
			},
		});
	}

	function isAChannelOrMember(s) {
		if (!interaction) {
			if (/<#[0-9]{18}>/.test(s + "") == true) {
				return /<#[0-9]{18}>/.test(s + "");
			} else {
				return /<@![0-9]{18}>/.test(s + "");
			}
		} else {
			return true;
		}
	}

	function getChannelOrMemberId(s) {
		if (!interaction) {
			if (s.slice(2).startsWith("!")) {
				return s.slice(3).slice(0, -1);
			} else {
				return s.slice(2).slice(0, -1);
			}
		} else {
			return s;
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

exports.category = "Settings";
exports.syntax = "addAlias [alias] [command]";
exports.specialSlash = [
	{
		name: "Channel",
		description: "Description",
		type: 7,
		required: false,
	},
	{
		name: "Member",
		description: "Description",
		type: 6,
		required: false,
	},
];
