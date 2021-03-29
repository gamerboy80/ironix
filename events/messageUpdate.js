module.exports = async (client, oldMessage, newMessage) => {
	if (newMessage.author.bot == false) {
		// Filters

		if (
			!client.disabledFunctions.get(newMessage.guild.id).includes("filters")
		) {
			require("fs").readdir("./filters/", (err, files) => {
				if (err) return console.error(err);
				files.forEach((file) => {
					if (!file.endsWith(".js")) return;
					let filterName = file.split(".")[0];
					let message = newMessage;
					let args = message.content.split(/ +/g);
					client.filters.get(filterName).run(client, message, args);
				});
			});
		}

		if (oldMessage.content != newMessage.content) {
			if (client.wasFiltered != true && newMessage.id != undefined) {
				var key1;
				var key2;

				if (
					newMessage.guild.channels.cache.get(
						client.logs.get(newMessage.guild.id)
					) != undefined
				) {
					var res;
					if (oldMessage.content.length > 1024) {
						res = await require("node-fetch")(
							"https://hastebin.com/documents",
							{
								method: "POST",
								body: oldMessage.content,
								headers: { "Content-Type": "text/plain" },
							}
						).then((res) =>
							res.json().then((json) => {
								key1 = json[Object.keys(json)[0]];
							})
						);
					}

					var res2;
					if (newMessage.content.length > 1024) {
						res2 = await require("node-fetch")(
							"https://hastebin.com/documents",
							{
								method: "POST",
								body: newMessage.content,
								headers: { "Content-Type": "text/plain" },
							}
						).then((res2) =>
							res2.json().then((json2) => {
								key2 = json2[Object.keys(json2)[0]];
							})
						);
					}

					const embed = new (require("discord.js").MessageEmbed)()
						.setColor(0x51c878)
						.setAuthor(
							newMessage.author.tag,
							newMessage.author.displayAvatarURL()
						)
						.setFooter("User ID: " + newMessage.author.id)
						.setTimestamp(newMessage.editedAt)
						.setDescription(
							"**Message edited in <#" +
								newMessage.channel.id +
								">** [Jump to message](https://discord.com/channels/" +
								newMessage.guild.id +
								"/" +
								newMessage.channel.id +
								"/" +
								newMessage.id +
								")"
						)
						.addField(
							"Old message:\n",
							oldMessage.content.length > 1024
								? "[Open message in a new tab]" +
										"(https://hastebin.com/" +
										key1 +
										")"
								: oldMessage.content
						)
						.addField(
							"New message:\n",
							newMessage.content.length > 1024
								? "[Open message in a new tab]" +
										"(https://hastebin.com/" +
										key2 +
										")"
								: newMessage.content
						);

					newMessage.guild.channels.cache
						.get(client.logs.get(newMessage.guild.id))
						.send({ embed });
				}
			} else {
				client.wasFiltered = null;
			}
		}

		var prefix = client.prefixes.get(newMessage.guild.id);
		// Ignore messages not starting with the prefix (in config.json)
		if (
			newMessage.content /*.toLowerCase()*/
				.indexOf(prefix) !== 0
		)
			return;

		// Our standard argument/command name definition.
		const args = newMessage.content
			.slice(prefix.length)
			//.trim()
			.split(/ +/g);
		const command = args.shift().toLowerCase();

		// Grab the command data from the client.commands Enmap
		const cmd = client.commands.get(command);

		// If that command doesn't exist, silently exit and do nothing
		if (command != "exec" && command != "eval") return;

		// Run the command
		cmd.run(client, newMessage, args);
	}
};
