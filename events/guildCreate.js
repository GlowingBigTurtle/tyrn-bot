const Discord = require('discord.js');

module.exports = class {
    constructor() { }
    async run(client, guild) {

        if (!guild.available) return;

        client.logger.guild(guild, "GREEN", "New Server showed up!")
    }
};
