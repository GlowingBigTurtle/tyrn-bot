const Discord = require('discord.js');

module.exports = class {
    constructor() { }
    async run(client, guild) {

        if (!guild.available) return;

        client.logger.guild(guild, "DARK_RED", "It was nice to be with you!")
    }
};
