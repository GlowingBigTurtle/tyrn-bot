const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'button-role',
            description: "Buton Role",
            aliases: [],
            usage: "<commandName> [option] [id] [label] [color] (role)",
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
                    name: "option",
                    description: "Add/Remove.",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: "add", value: "add" },
                        { name: "remove", value: "remove" }
                    ]
                },
                {
                    name: "id",
                    description: "Message Id to add button.",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: true,

                },
                {
                    name: "label",
                    description: "Button Label",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "color",
                    description: "Button Color",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: "blue", value: "1" },
                        { name: "grey", value: "2" },
                        { name: "green", value: "3" },
                        { name: "red", value: "4" },
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

        const ops = i.options.getString("option"),
            label = i.options.getString("label"),
            msgId = i.options.getString("id"),
            style = i.options.getString("color"),
            role = i.options.getRole("role");

        if (isNaN(msgId)) return client.sendError(i, "Input valid id")
        let msg = await i.channel.messages.fetch(msgId)
        if (!msg || msg.author.id !== client.user.id) return client.sendError(i, "Invalid message")

        if (ops === "add") {
            if (!role) return client.sendError(i, "<role> is required argument which is missing.");

            if (msg.components[0] && msg.components[0].components.find(a => a.data.label === label)) {
                return client.sendError(i, "This message already has button with this label.")
            }

            let button = { type: 2, style: parseInt(style), label: label, disabled: false, custom_id: `btnRole_${label}_${role.id}` }

            if (msg.components.length === 0) {

                let row = {
                    type: 1,
                    components: [button]
                }
                msg.edit({ components: [row] })

                return client.sendSuccess(i, `Button: ${label} | Role: ${role}, added successfully.`)
            }

            else if (msg.components[0].components.length < 5) {
                msg.components[0].components.push(new Discord.ButtonComponent(button))
                msg.edit({ components: msg.components })

                return client.sendSuccess(i, `Button: ${label} | Role: ${role}, added successfully.`)
            }

            else if (msg.components[0].components.length === 5) {
                client.sendError(i, "You cant add more than 5 buttons in 1 message.")
            }
            else {
                client.sendError(i, "Idk what you did. but you really did something wrong!")
            }
        }


        else if (ops === "remove") {

            if (msg.components.length === 0) return client.sendError(i, "No button found in that message")

            msg.components = msg.components[0].components.filter(a => a.label !== label)
            await msg.edit({ components: msg.components })

            client.sendSuccess(i, `Button: ${label} successfully removed`)
        }

    }
};