const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'help-command',
            description: "Show details of specified command",
            aliases: json["help-command"],
            usage: "<commandName> [command]",
            category: "others",
            botPermissions: [],
            memberPermissions: [],
            cooldown: null,
            enabled: true,
            ownerOnly: false,
            slashOnly: true,
            nsfw: false,
            options: [
                {
                    name: "command",
                    description: "Command name",
                    type: "STRING",
                    required: true,
                },
            ],
        })
    }
    async run(client, command, data, args) {

        const cmmnd = command.options?.getString("command")

        let cmd = client.commands.get(cmmnd)

        if (!cmd) return client.sendError(command, "This command doesnt exist!")

        let dot = ` Command infortmations.
        \n- Help
        | Name: ${cmd.data.help.name},
        | Description: ${cmd.data.help.description}
        | Aliases: ${cmd.data.help.aliases.join(", ")}
        | Usage: ${cmd.data.help.usage} 
        | Category : ${cmd.data.help.category}
        \n- Config
        | Cooldown: ${cmd.data.config.cooldown || "5s"}
        | Enabled: ${cmd.data.config.enabled}
        | Owner only: ${cmd.data.config.ownerOnly}
        | Slash only: ${cmd.data.config.slashOnly}
        | NSFW : ${cmd.data.config.nsfw}
        \n - Permissions
        | Bot: ${cmd.data.config.botPermissions.join(", ")}
        | Member : ${cmd.data.config.memberPermissions.join(", ")}
        `
        client.sendSuccess(command, dot)

    }
};