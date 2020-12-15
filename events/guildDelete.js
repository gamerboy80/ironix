module.exports = (client, guild) => {
  client.prefixes.delete(guild.id);
  client.suggestions.delete(guild.id);
  client.logs.delete(guild.id);
  client.blocklist.delete(guild.id);
};
