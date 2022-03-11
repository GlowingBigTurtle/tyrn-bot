const Discord = require("discord.js")

module.exports = class Command {
    constructor({
        name = null,
        description = null,
        options = new Array(),
        aliases = new Array(),
        usage = null,
        category = null,
        botPermissions = new Array(),
        memberPermissions = new Array(),
        cooldown = null,
        enabled = true,
        ownerOnly = false,
        slashOnly = false,
        nsfw = false,
    }) {
        this.help = { name, description, options, aliases, usage, category }
        this.config = { cooldown, enabled, ownerOnly, slashOnly, nsfw, botPermissions, memberPermissions }
    }
};