const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'tag-add',
            description: "Custom command setup.",
            aliases: [],
            usage: "<commandName> [trigger] [respond]",
            category: "config",
            botPermissions: [],
            memberPermissions: ["ADMINISTRATOR"],
            cooldown: null,
            enabled: true,
            ownerOnly: false,
            slashOnly: false,
            nsfw: false,
            options: [
                {
                    name: "trigger",
                    description: "Trigger max length 25",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "respond",
                    description: "Respond max length 1500",
                    type: "STRING",
                    required: true,
                }
            ],
        })
    }
    async run(client, i, data, args) {


        const trigger = i.options.getString("trigger").substr(0, 25),
            respond = i.options.getString("respond").substr(0, 1500);

        data.guild.customCommands.push({
            trigger: trigger,
            respond: respond
        })
        data.guild.save();

        client.sendSuccess(i, `Trigger: ${data.guild.prefix}tag ${trigger}\nRespond: ${respond}`)

    }
};