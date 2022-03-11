const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'member-log-text',
            description: "Changes log messages for joining/leaving users.",
            aliases: [],
            usage: "<commandName> [option] [joins] [leaves]",
            category: "config",
            botPermissions: [],
            memberPermissions: ["ADMINISTRATOR"],
            cooldown: null,
            enabled: true,
            ownerOnly: false,
            slashOnly: true,
            nsfw: false,
            options: [
                {
                    name: "type",
                    description: "Joins/Leaves",
                    type: "STRING",
                    required: true,
                    choices: [
                        { name: "welcome", value: "welcome" },
                        { name: "goodbye", value: "goodbye" }
                    ]
                },
                {
                    name: "status",
                    description: "Set/Reset",
                    type: "STRING",
                    required: true,
                    choices: [
                        { name: "on", value: "on" },
                        { name: "off", value: "off" }
                    ]
                },
                {
                    name: "string",
                    description: "max length 1000",
                    type: "STRING",
                    required: false,
                }
            ],
        })
    }
    async run(client, i, data, args) {


        const status = i.options.getString('status'),
            type = i.options.getString('type'),
            str = i.options.getString("string")?.substr(0, 1000);

        if (status === "on") {

            data.guild.plugins[type] = {
                enabled: data.guild.plugins[type].enabled,
                channel: data.guild.plugins[type].channel,
                message: str
            };

            data.guild.markModified(`plugins.${type}`);
            await data.guild.save();

            client.sendSuccess(i, `(${type}) message has been changed to\n\n${str}`)
        }

        else if (status == "off") {

            data.guild.plugins[type] = {
                enabled: data.guild.plugins[type].enabled,
                channel: data.guild.plugins[type].channel,
                message: null
            };

            data.guild.markModified(`plugins.${type}`);
            await data.guild.save();

            client.sendSuccess(i, `(${type}) message has been changed to default`)
        }
    }
};