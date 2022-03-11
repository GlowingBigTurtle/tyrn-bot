const Discord = require("discord.js")
const os = require("os");

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: "tag",
            description: "Pong!",
            aliases: json["ping"],
            usage: "<commandName>",
            category: "others",
            botPermissions: [],
            memberPermissions: [],
            cooldown: null,
            enabled: true,
            ownerOnly: false,
            slashOnly: false,
            nsfw: false,
            options: [
                {
                    name: "string",
                    description: "Emoji",
                    type: "STRING",
                    required: true,
                }
            ],
        })
    }
    async run(client, command, data, args) {

        let str =
            command.options?.getString("string") ||
            args?.[0]

        let cc = await data.guild.customCommands.find(a => a.trigger.toLowerCase() === str.toLowerCase())

        if (cc) {
            command.reply(cc.respond)
        }
        else {
            client.sendError(command, "No tag found!")
         }

    }
};