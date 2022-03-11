const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'language',
            description: "Choose your language.",
            aliases: [],
            usage: "<commandName> [option]",
            category: "config",
            botPermissions: [],
            memberPermissions: [],
            cooldown: null,
            enabled: true,
            ownerOnly: false,
            slashOnly: false,
            nsfw: false,
            options: [
                {
                    name: "option",
                    description: "Languages",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: "turkish", value: "tr" },
                        { name: "english", value: "en" }
                    ]
                },
            ],
        })
    }
    async run(client, i, data, args) {

        const lang = i.options.getString("option")

        data.user.language = lang;

        data.user.markModified("language");
        await data.user.save();

        client.sendSuccess(i, `My language is \`${lang}\` for you!`)
    }
};