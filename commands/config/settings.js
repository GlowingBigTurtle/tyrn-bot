const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'settings',
            description: "Shows Server's settings.",
            aliases: json["settings"],
            usage: "<commandName>",
            category: "config",
            botPermissions: [],
            memberPermissions: [],
            cooldown: null,
            enabled: true,
            ownerOnly: false,
            slashOnly: false,
            nsfw: false,
            options: [],
        })
    }
    async run(client, i, data, args) {

        const embed = new Discord.MessageEmbed({
            title: `${i.guild.name}'s Settings`,
            color: Discord.Util.resolveColor("GOLD"),
        })
            .addField(
                "Prefix:",
                data.guild.prefix
            )

            .addField(
                "Ignored Channels:",
                (data.guild.ignoredChannels.length > 0) ?
                    data.guild.ignoredChannels.map((ch) => `<#${ch}>`).join(", ") : "- :x:"
            )

            .addField(
                "Autorole:",
                (data.guild.plugins.autorole.enabled) ?
                    `Role: <&${data.guild.plugins.autorole.role}>` : "- :x:"
            )

            .addField(
                "Welcome:",
                (data.guild.plugins.welcome.enabled) ?
                    `Channel: <#${data.guild.plugins.welcome.channel}>\nText: ${data.guild.plugins.welcome.message || "default"}` : "- :x:"
            )

            .addField(
                "Goodbye:",
                (data.guild.plugins.goodbye.enabled) ?
                    `Channel: <#${data.guild.plugins.goodbye.channel}>\nText: ${data.guild.plugins.goodbye.message || "default"}` : "- :x:"
            )

            .addField(
                "Tags",
                data.guild.customCommands !== 0 ?
                `${data.guild.customCommands.length} command found type \`/tag\` to see all`: "- :x:"
            )

        i.reply({ embeds: [embed] })

    }
};