// THIS FILE WAS CREATED JUST SO THIS COMMAND APEPARS IN HELP
exports.run = (client, message, args, interaction) => {
if(interaction) {
client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
            },
        });
}};
exports.category = "Settings";
