const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'ignored-channels',
            description: "Changes log messages for joining/leaving users...",
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
                    name: "options",
                    description: "Set/Reset",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: "add", value: "add" },
                        { name: "remove", value: "remove" },
                        { name: "reset", value: "reset" },
                    ]
                },
                {
                    name: 'channel',
                    description: 'Select a channel',
                    type: "CHANNEL",
                    //type: Discord.ApplicationCommandOptionType.Channel,
                    channelTypes: ["GUILD_TEXT"],
                    required: false,
                }

            ],
        })
    }
    async run(client, i, data, args) {

        const status = i.options.getString('options'),
            channel = i.options.getChannel("channel") || i.channel;

        if (status === "add") {

            data.guild.ignoredChannels.push(channel.id);
            data.guild.save();

            client.sendSuccess(i, `${channel} added to list.`)
        }

        else if (status == "remove") {

            data.guild.ignoredChannels = data.guild.ignoredChannels
                .filter((ch) => ch !== channel.id);

            data.guild.save();

            client.sendSuccess(i, `${channel} removed from list.`)
        }

        else if (status == "reset") {

            data.guild.ignoredChannels = [];
            data.guild.save();

            data.guild.markModified(`plugins.${type}`);
            await data.guild.save();

            client.sendSuccess(i, `List formatted.`)
        }
    }
};