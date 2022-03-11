const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: "embed",
            description: "Sends Embed message for using buton-role command",
            aliases: [],
            category: "config",
            usage: "<commandName> [option] [string] (id)",
            enabled: true,
            ownerOnly: false,
            slashOnly: false,
            botPermissions: ["SEND_MESSAGES"],
            memberPermissions: ["ADMINISTRATOR"],
            options: [
                {
                    name: "option",
                    description: "Send/Edit",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: "send", value: "send" },
                        { name: "edit", value: "edit" }
                    ]
                },
                {
                    name: "description",
                    description: "Description for embed",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "id",
                    description: "Message id if you want to edit",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                }
            ],
        })
    }
    async run(client, i, data, args) {

        const ops = i.options.getString("option"),
            desc = i.options.getString("description"),
            msgId = i.options.getString("id");

        let embed = new Discord.MessageEmbed({
            description: desc,
            footer: { text: `Requested by ${i.user.tag}` }
        })

        if (ops === "send") {

            i.channel.send({ embeds: [embed] })
        }

        else if (ops === "edit") {
            if (isNaN(msgId)) return client.sendError(i, "Input valid id", i)
            let msg = await i.channel.messages.fetch(msgId)
            if (!msg || msg.author.id !== client.user.id) return client.sendError(i, "Invalid message")

            msg.edit({ embeds: [embed] })
        }

        client.sendSuccess(i, "Sucsess!")

    }
};