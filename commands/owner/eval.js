const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: "eval",
            description: "for owners.",
            aliases: [],
            usage: "<commandName> [option]",
            category: "others",
            botPermissions: [],
            memberPermissions: [],
            cooldown: null,
            enabled: true,
            ownerOnly: true,
            slashOnly: false,
            nsfw: false,
            options: [
                {
                    name: "string",
                    description: "max length 1000",
                    type: "STRING",
                    //type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                }
            ]
        })
    }
    async run(client, command, data, args) {

        let code =
            command.options?.getString('string') ||
            args?.slice(0).join(" ");

        let embed = new Discord.MessageEmbed()

        try {
            const result = new Promise((resolve) => resolve(eval(code)));
            let output = result;

            if (typeof result !== "string") {
                output = require("util").inspect(output, { depth: 0 });
            }

            embed.setDescription(`Input:\n\`\`\`js\n${code}\`\`\`\nOutput:\n\`\`\`js\n${output}\`\`\``)
        } catch (error) {
            embed.setDescription(`Error:\n\`\`\`js\n${error}\`\`\``)
        }

        return command.reply({ embeds: [embed] })
    }
};