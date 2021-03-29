module.exports = async (client, member) => {
	if (Array.isArray(client.mutes.get(member.guild.id))) {
		const muteRole = member.guild.roles.cache.find((r) => r.name == "Muted-IX");
		if (client.mutes.get(member.guild.id).includes(member.id)) {
			member.roles.add(muteRole.id);
		}
	} else {
		client.mutes.set(member.guild.id, []);
		const muteRole = member.guild.roles.cache.find((r) => r.name == "Muted-IX");
		if (client.mutes.get(member.guild.id).includes(member.id)) {
			member.roles.add(muteRole.id);
		}
	}
};
