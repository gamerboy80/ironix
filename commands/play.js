exports.run = async (client, message, args, interaction) => {
	if (!client.disabledFunctions.get(message.guild.id).includes("music")) {
		if (args.join(" ")) {
			let video = {};
			if (message.member.voice.channel) {
				message.channel.send("Please wait...");
				video.vc = await message.member.voice.channel.join().catch(console.log);
			} else {
				message.channel.send({
					embed: {
						color: 0xc85151,
						description: "You need to be in a VC!",
						footer: {
							text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
							icon_url: message.author.displayAvatarURL(),
						},
					},
				});
			}
			const yts = require("yt-search");
			const listOfVideos = await yts(args.join(" "));
			const preVideo = listOfVideos.videos.slice(0, 3)[0];
			if (preVideo) {
				video.url = preVideo.url;
				video.title = preVideo.title;
				video.author = preVideo.author.name;
				video.duration = preVideo.timestamp;
				video.thumbnail = preVideo.thumbnail;
			}
			try {
				video.playableUrl = await require("ytdl-core-discord")(video.url);
			} catch {}
			if (!Array.isArray(client.queue[message.guild.id])) {
				client.queue[message.guild.id] = [];
			}
			if (!message.guild.members.cache.get(client.user.id).voice.channel) {
				if (video.vc) {
					video.vc = await message.guild.channels.cache
						.get(video.vc.channel.id)
						.join()
						.catch(console.log);
				} else {
					if (message.member.voice.channel) {
						video.vc = video.vc = await message.member.voice.channel
							.join()
							.catch(console.log);
					} else {
						message.channel.send({
							embed: {
								color: 0xc85151,
								description: "You need to be in a VC!",
								footer: {
									text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
									icon_url: message.author.displayAvatarURL(),
								},
							},
						});
					}
				}
			}
			if (video.playableUrl) {
				client.queue[message.guild.id].push(video);
				if (client.queue[message.guild.id].length - 1 < 1) {
					client.playSong(video, message);
				} else {
					message.channel.send({
						embed: {
							color: 0x51c878,
							title: "🕐 " + video.title,
							url: video.url,
							description:
								"By " + video.author + " - Duration: " + video.duration,
							image: {
								url: video.thumbnail,
							},
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
						description: "No video found!",
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
					description: "Please input something!",
					footer: {
						text: `Requested by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
						icon_url: message.author.displayAvatarURL(),
					},
				},
			});
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
exports.category = "Music";
exports.syntax = "play [song]";
exports.specialSlash = [
	{
		name: "Song",
		description: "Description",
		type: 3,
		required: true,
	},
];
