exports.run = (client, message, args) => {
	if (!client.disabledFunctions.get(message.guild.id).includes("toxicity")) {
		function cyrillicToThingo(str) {
			const listUpperCyrillic = [
				"А",
				"Б",
				"В",
				"Г",
				"Ґ",
				"Ѓ",
				"Д",
				"Ђ",
				"Є",
				"Е",
				"Ё",
				"Ж",
				"З",
				"Ѕ",
				"И",
				"І",
				"Ї",
				"Й",
				"Ј",
				"К",
				"Л",
				"Љ",
				"М",
				"Н",
				"Њ",
				"О",
				"П",
				"Р",
				"С",
				"Т",
				"Ћ",
				"Ќ",
				"У",
				"Ў",
				"Ф",
				"Х",
				"Ц",
				"Ч",
				"Џ",
				"Ш",
				"Щ",
				"Ъ",
				"Ы",
				"Ь",
				"Э",
				"Ю",
				"Я",
			];
			const listDownerCyrillic = [
				"а",
				"б",
				"в",
				"г",
				"ґ",
				"ѓ",
				"д",
				"ђ",
				"є",
				"е",
				"ё",
				"ж",
				"з",
				"ѕ",
				"и",
				"і",
				"ї",
				"й",
				"ј",
				"к",
				"л",
				"љ",
				"м",
				"н",
				"њ",
				"о",
				"п",
				"р",
				"с",
				"т",
				"ћ",
				"ќ",
				"у",
				"ў",
				"ф",
				"х",
				"ц",
				"ч",
				"џ",
				"ш",
				"щ",
				"ъ",
				"ы",
				"ь",
				"э",
				"ю",
				"я",
			];
			const listUpperThingo = [
				"A",
				"B",
				"B",
				"R",
				"R",
				"R",
				"A",
				"H",
				"E",
				"E",
				"E",
				"X",
				"E",
				"S",
				"N",
				"I",
				"I",
				"N",
				"J",
				"K",
				"N",
				"B",
				"M",
				"H",
				"H",
				"O",
				"N",
				"P",
				"C",
				"T",
				"H",
				"K",
				"Y",
				"Y",
				"O",
				"X",
				"U",
				"Y",
				"U",
				"W",
				"W",
				"B",
				"B",
				"B",
				"E",
				"O",
				"R",
			];
			const listDownerThingo = [
				"a",
				"b",
				"b",
				"r",
				"r",
				"r",
				"a",
				"h",
				"E",
				"e",
				"e",
				"x",
				"e",
				"s",
				"n",
				"i",
				"i",
				"n",
				"j",
				"k",
				"n",
				"b",
				"m",
				"h",
				"h",
				"o",
				"n",
				"p",
				"c",
				"t",
				"h",
				"k",
				"y",
				"y",
				"o",
				"x",
				"u",
				"y",
				"u",
				"w",
				"w",
				"b",
				"b",
				"b",
				"e",
				"o",
				"r",
			];
			let preFinalString = [];
			(str || "").split("").forEach((letter) => {
				if (
					listDownerCyrillic.indexOf(letter) != -1 ||
					listUpperCyrillic.indexOf(letter) != -1
				) {
					preFinalString.push(
						listDownerCyrillic.indexOf(letter) != -1
							? listDownerThingo[listDownerCyrillic.indexOf(letter)]
							: listUpperThingo[listUpperCyrillic.indexOf(letter)]
					);
				} else {
					preFinalString.push(letter);
				}
			});
			return preFinalString.join("");
		}

		if (
			message.guild.channels.cache.get(
				client.inspection.get(message.guild.id)
			) != undefined
		) {
			if (Array.isArray(client.notAnalyze.get(message.guild.id)) == false) {
				client.notAnalyze.set(message.guild.id, []);
			}
			if (!client.notAnalyze.get(message.guild.id).includes(message.content)) {
				async function analyze(text) {
					return new Promise((resolve, reject) => {
						require("axios")({
							method: "post",
							url:
								"https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=" +
								client.config.perspective,
							data: {
								comment: { text: text },
								requestedAttributes: { TOXICITY: {} },
							},
						})
							.then((response) => resolve(response.data))
							.catch(() => {});
					});
				}

				const limit = client.toxicLimit.get(message.guild.id) || 0.8;

				(async () => {
					let toxicity;
					let toxicityB;
					let toxicityC;
					let toxicityD;
					let toxicityE;
					let toxicityF;
					if (message.content) {
						try {
							toxicity = (await analyze(message.content)).attributeScores
								.TOXICITY.summaryScore.value;
						} catch {
							toxicity = 0;
						}
						try {
							toxicityB = (
								await analyze(message.content.split("").reverse().join(""))
							).attributeScores.TOXICITY.summaryScore.value;
						} catch {
							toxicityB = 0;
						}

						try {
							toxicityC = (await analyze(cyrillicToThingo(message.content)))
								.attributeScores.TOXICITY.summaryScore.value;
						} catch {
							toxicityC = 0;
						}

						try {
							toxicityD = (
								await analyze(
									cyrillicToThingo(message.content.split("").reverse().join(""))
								)
							).attributeScores.TOXICITY.summaryScore.value;
						} catch {
							toxicityD = 0;
						}
					} else {
						toxicity = 0;
						toxicityB = 0;
						toxicityC = 0;
						toxicityD = 0;
					}

					async function getOcr(image) {
						try {
							return new Promise((resolve, reject) => {
								require("tesseract.js")
									.recognize(image)
									.then((ocr) => resolve(ocr.data.text));
							}).catch(console.log);
						} catch {
							return undefined;
						}
					}
					let ocr;
					if (message.attachments.first() != undefined) {
						ocr = await getOcr(message.attachments.first().url);
					}
					if (ocr != undefined) {
						try {
							toxicityE = (await analyze(ocr)).attributeScores.TOXICITY
								.summaryScore.value;
						} catch {
							toxicityE = 0;
						}
						try {
							toxicityF = (await analyze(ocr.split("").reverse().join("")))
								.attributeScores.TOXICITY.summaryScore.value;
						} catch {
							toxicityF = 0;
						}
					} else {
						toxicityE = 0;
						toxicityF = 0;
					}

					if (
						toxicity > limit ||
						toxicityB > limit ||
						toxicityC > limit ||
						toxicityD > limit ||
						toxicityE > limit ||
						toxicityF > limit
					) {
						new Promise((resolve, reject) => {
							if (message.attachments.first()) {
								resolve(
									client.guilds.cache
										.get(client.config.imageUploaderGuild)
										.channels.cache.get(client.config.imageUploaderChannel)
										.send({
											files: [
												{
													attachment: message.attachments.first().url,
													name: message.attachments.first().url,
												},
											],
										})
								);
							} else {
								resolve();
							}
						}).then((reinstatedImageMessage) => {
							const flaggedThingPre = biggestToxicityIs(
								toxicity,
								toxicityB,
								toxicityC,
								toxicityD,
								toxicityE,
								toxicityF
							);
							let flaggedThing;
							new Promise((resolve, reject) => {
								if (!ocr) {
									resolve(
										message.guild.channels.cache
											.get(client.inspection.get(message.guild.id))
											.send({
												embed: {
													color: 0x51c878,
													description:
														"Is this message toxic? `" +
														(message.content || "EMPTY") +
														"`\nIronix detected a posibility of " +
														biggestToxicity(
															toxicity,
															toxicityB,
															toxicityC,
															toxicityD,
															toxicityE,
															toxicityF
														) +
														", you have 1 day to choose what to do.",
													footer: {
														text: `Message by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
														icon_url: message.author.displayAvatarURL(),
													},
												},
											})
									);
								} else {
									resolve(
										message.guild.channels.cache
											.get(client.inspection.get(message.guild.id))
											.send({
												embed: {
													color: 0x51c878,
													description:
														"Is this message toxic? `" +
														(message.content || "EMPTY") +
														"`\nIronix detected a posibility of " +
														biggestToxicity(
															toxicity,
															toxicityB,
															toxicityC,
															toxicityD,
															toxicityE,
															toxicityF
														) +
														", you have 1 day to choose what to do.",
													image: {
														url: reinstatedImageMessage.attachments.first().url,
													},
													footer: {
														text: `Message by ${message.author.username}#${message.author.discriminator} (${message.author.id})`,
														icon_url: message.author.displayAvatarURL(),
													},
												},
											})
									);
								}
							}).then((inspectMsg) => {
								message
									.delete()
									.then((m) =>
										m.channel.send(
											"<@!" +
												message.author.id +
												">'s message sent to inspection."
										)
									)
									.then((messageSentT) => {
										client.commands
											.get("mute")
											.run(client, messageSentT, [
												"<@!" + message.author.id + ">",
												"perm",
												"toxicity was detected",
											]);

										inspectMsg.react("✅").then(() => inspectMsg.react("❌"));

										const filter = (reaction, user) => {
											return (
												["✅", "❌"].includes(reaction.emoji.name) &&
												user.id != client.user.id
											);
										};

										inspectMsg
											.awaitReactions(filter, {
												max: 1,
												time: 86400000,
												errors: ["time"],
											})
											.then((collected) => {
												const reaction = collected.first();

												if (reaction.emoji.name === "❌") {
													inspectMsg.delete();
													if (!ocr) {
														messageSentT.edit({
															embed: {
																color: 0x51c878,
																author: {
																	name: message.author.tag,
																	icon_url: message.author.displayAvatarURL(),
																},
																description: message.content,
																footer: {
																	text: "Reinstated.",
																},
															},
														});
													} else {
														messageSentT.edit({
															embed: {
																color: 0x51c878,
																author: {
																	name: message.author.tag,
																	icon_url: message.author.displayAvatarURL(),
																},
																description: message.content,
																image: {
																	url: reinstatedImageMessage.attachments.first()
																		.url,
																},
																footer: {
																	text: "Reinstated.",
																},
															},
														});
													}
													client.commands
														.get("unmute")
														.run(client, messageSentT, [
															"<@!" + message.author.id + ">",
														]);
													const notAnalyzePre = client.notAnalyze.get(
														message.guild.id
													);
													notAnalyzePre.push(message.content);
													client.notAnalyze.set(
														message.guild.id,
														notAnalyzePre
													);
												} else {
													inspectMsg.delete();
												}
											});
									});
							});
						});
					}
				})();
			}
		}
	}
};

function biggestToxicity(a, b, c, d, e, f) {
	let arrayOfProccesable = [];
	if (a != undefined) arrayOfProccesable.push(a);
	if (b != undefined) arrayOfProccesable.push(b);
	if (c != undefined) arrayOfProccesable.push(c);
	if (d != undefined) arrayOfProccesable.push(d);
	if (e != undefined) arrayOfProccesable.push(e);
	if (f != undefined) arrayOfProccesable.push(f);
	return Math.max.apply(null, arrayOfProccesable) * 100 + "%";
}
function biggestToxicityIs(a, b, c, d, e, f) {
	let arrayOfProccesable = [];
	if (a != undefined) arrayOfProccesable.push(a);
	if (b != undefined) arrayOfProccesable.push(b);
	if (c != undefined) arrayOfProccesable.push(c);
	if (d != undefined) arrayOfProccesable.push(d);
	if (e != undefined) arrayOfProccesable.push(e);
	if (f != undefined) arrayOfProccesable.push(f);
	return arrayOfProccesable.indexOf(Math.max.apply(null, arrayOfProccesable));
}
exports.neededPerms = ["MANAGE_MESSAGES"];
