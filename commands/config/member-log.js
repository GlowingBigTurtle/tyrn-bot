const Discord = require('discord.js');
const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'member-log',
            description: "Changes log messages for joining/leaving users.",
            aliases: [],
            usage: "<commandName> [option] [joins] [leaves]",
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
                    name: "type",
                    description: "Joins/Leaves",
                    type: "STRING",
                    required: true,
                    choices: [
                        { name: "welcome", value: "welcome" },
                        { name: "goodbye", value: "goodbye" }
                    ],
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
                    name: 'channel',
                    description: 'Select a channel',
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"],
                    required: false,
                }
            ],
        })
    }
    async run(client, i, data, args) {

        let type = i.options.getString('type'),
            status = i.options.getString('status'),
            channel = i.options.getChannel("channel") || i.channel;

        if (status === "on") {

            data.guild.plugins[type] = {
                enabled: true,
                channel: channel.id,
                message: data.guild.plugins[type].str
            };

            data.guild.markModified(`plugins.${type}`);
            await data.guild.save();

            client.sendSuccess(i, `(${type}) channel has been set to ${channel}`)
        }

        if (status == "off") {

            data.guild.plugins[type] = {
                enabled: false,
                channel: null,
                message: data.guild.plugins[type].str
            };

            data.guild.markModified(`plugins.${type}`);
            await data.guild.save();

            client.sendSuccess(i, `(${type}) channel has been reset`)
        }

    }
};