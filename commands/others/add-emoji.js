const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
const ms = require('ms');

module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: "add-emoji",
            description: "Add some cool emojis to your server.",
            aliases: json["add-emoji"],
            usage: "<commandName> [command]",
            category: "others",
            botPermissions: ["MANAGE_EMOJIS_AND_STICKERS"],
            memberPermissions: ["MANAGE_EMOJIS_AND_STICKERS"],
            cooldown: null,
            enabled: true,
            ownerOnly: false,
            slashOnly: true,
            nsfw: false,
            options: [
                {
                    name: "option",
                    description: "The type of Nsfw Contents",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: "with emoji", value: "emoji" },
                        { name: "with url", value: "url" },
                    ],
                },
                {
                    name: "string",
                    description: "Emoji",
                    type: "STRING",
                    required: true,
                },
            ],
        })
    }
    async run(client, command, data, args) {

        const str = command.options.getString("string"),
            option = command.options.getString("option")

        if (option === "emoji") {
            let parsedEmoji = Discord.Util.parseEmoji(str)

            if (!parsedEmoji.id) return client.sendError(i, "Invalid emoji provided")

            const emojiExt = parsedEmoji.animated ? ".gif" : ".png",
                emojiURL = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + emojiExt}`;

            let emoji = await i.guild.emojis.create(emojiURL, parsedEmoji.name)

            client.sendSuccess(command, `Emoji: ${emoji.name} successfully created!`)
        }

        else if (option === "url") {
            try {
                let emoji = await command.guild.emojis.create(str, "emoji")
                client.sendSuccess(command, `Emoji: ${emoji.name} successfully created!`)
            } catch (error) {
                client.sendError(command, error)
            }
        }
    }
};