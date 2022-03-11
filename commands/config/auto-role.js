const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'auto-role',
            description: "Autorole when someone joins the server..",
            aliases: [],
            usage: "<commandName> [status] [role]",
            category: "config",
            botPermissions: ["MANAGE_ROLES"],
            memberPermissions: ["ADMINISTRATOR"],
            cooldown: null,
            enabled: true,
            ownerOnly: false,
            slashOnly: true,
            nsfw: false,
            options: [
                {
                    name: "status",
                    description: "On/Off",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: "on", value: "on" },
                        { name: "off", value: "off" }
                    ]
                },
                {
                    name: 'role',
                    description: 'Select a role',
                    type: "ROLE",
                    //type: Discord.ApplicationCommandOptionType.Role,
                    required: false,
                }
            ],
        })
    }
    async run(client, i, data, args) {

        const status = i.options.getString("status"),
            role = i.options.getRole("role");

        if (status === "on") {
            if (!role) return client.sendError(i, "<role> is required argument which is missing.");

            data.guild.plugins.autorole = {
                enabled: true,
                role: role.id
            };
            data.guild.markModified("plugins.autorole");
            await data.guild.save();

            client.sendSuccess(i, `Auto-role set as ${role}.`)
        }

        else if (status === "off") {

            data.guild.plugins.autorole = {
                enabled: false,
                role: null
            };

            data.guild.markModified("plugins.autorole");
            await data.guild.save();

            client.sendSuccess(i, `Auto-role is off.`)
        }
    }
};