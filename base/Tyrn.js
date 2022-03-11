//Modules
const Discord = require("discord.js")
const fs = require("fs")
// Express
const express = require("express")
const app = express();

// env
const env = require("../env");

class Tyrn extends Discord.Client {

    constructor(init = true) {

        super({
            intents: [new Discord.Intents('32511')],
            allowedMentions: { repliedUser: false, parse: ["users"] }
        })

        if (init) this._init()

        // Collections
        this.commands = new Discord.Collection();
        this.cooldown = new Discord.Collection();

        // Client.on
        this.on("error", console.error);
        this.on("warn", console.warn);
        this.on("shardError", console.error)
        this.on("rateLimited", console.warn)

        // Client Utils
        this.conf = require("../config.json");
        this.emoji = require("../emojis.json")

        //Tickets
        const fallsDjs = require("falls.djs-discord-tickets")
        this.ticketManager = new fallsDjs.Manager(this)

        // Mongoose
        this.mongo = new (require("../mongoose/mongoose"))();

        // Logger 
        this.logger = new (require("../helpers/logger"))(this)

        // Giveaways
        new (require("../helpers/giveaways"))(this)

        // Topgg
        new (require("../helpers/topgg"))(this, app)

        // Dashboard
        new (require("../dashboard/server"))(this, app)

        // Login
        this.login(env.token)
    }

    // Send Error
    sendSuccess(input, text) {
        let embed = this._getEmbed(text, "GREEN")
        return input.reply({ embeds: [embed], ephemeral: true });
    }

    // Send Error
    sendError(input, text) {
        let embed = this._getEmbed(text, "DARK_RED")
        embed.description = `${embed.description}\n\nYou need help? [Check suppport server](${this.conf.guild.invite})`

        return input.reply({ embeds: [embed], ephemeral: true });
    }

    _getEmbed(text, color) {
        return new Discord.MessageEmbed({
            color: Discord.Util.resolveColor(color),
            description: `**${text}**`
        })
    }

    _init() {
    }
}

module.exports = Tyrn; 