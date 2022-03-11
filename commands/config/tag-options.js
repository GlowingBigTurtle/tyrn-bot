const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'tag-options',
            description: 'tag Command options.',
            aliases: [],
            usage: "<commandName> [option] (index)",
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
                    name: "option",
                    description: "Remove/Reset/List",
                    type: "STRING",
                    required: true,
                    choices: [
                        { name: "remove", value: "remove" },
                        { name: "reset", value: "reset" },
                        { name: "list", value: "list" },
                    ]
                },
                {
                    name: "index",
                    description: "Index for Remove",
                    type: "NUMBER",
                    required: false,
                }
            ],
        })
    }
    async run(client, i, data, args) {

        if (data.guild.customCommands.length === 0) return client.sendError(i, "No tag-command found!");

        const option = i.options.getString("option"),
            index = i.options.getNumber('index');

        if (option === "remove") {

            let newDB = [];

            data.guild.customCommands.forEach((x, i) => {
                if (i === index) return;
                newDB.push(x)
            });

            data.guild.customCommands = newDB;
            await data.guild.save();

            client.sendSuccess(i, `Index: ${index} Sucsessfully removed.`)
        }

        else if (option === "reset") {

            data.guild.customCommands = [];
            await data.guild.save();

            client.sendSuccess(i, "All custom-commands deleted.")
        }

        else if (option == "list") {

            let str = [];
            const db = data.guild.customCommands;

            db.forEach((x, i) => {
                str.push(`Index: ${i}\nTrigger: ${x.trigger}\nRespond: ${x.respond.length}`)
            })

            client.sendSuccess(i, str.join("\n\n"))
        }

    }
};