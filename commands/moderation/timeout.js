const Discord = require("discord.js")
const ms = require("ms")

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'timeout',
            description: 'Timeouts user on the server.',
            aliases: json["timeout"],
            usage: "<commandName> [member] [duration] (reason)",
            category: "moderation",
            botPermissions: ["MODERATE_MEMBERS"],
            memberPermissions: ["MODERATE_MEMBERS"],
            cooldown: null,
            enabled: true,
            ownerOnly: false,
            slashOnly: false,
            nsfw: false,
            options: [
                {
                    name: 'mention',
                    description: 'Select a member',
                    type: "USER",
                    required: true,
                },
                {
                    name: 'duration',
                    description: 'The duration of the timeout.',
                    type: "STRING",
                    required: true,
                },
                {
                    name: 'reason',
                    description: 'The reason of the process.',
                    type: "STRING",
                    required: false,
                }
            ],
        })
    }
    async run(client, command, data, args) {

        const member =
            command.options?.getMember('mention') ||
            command.mentions?.members.at(1);

        const reason =
            command.options?.getString('reason') ||
            args?.slice(2).join(" ") ||
            "No Reason Specified";

        const duration = command.options?.getString('duration') ||
            args?.[1] ||
            "0s";

        if (!member) return client.sendError(command, data.message["commands"]["moderation"]["!member"]);

        let parsedTime = ms(duration)

        if (!parsedTime || parsedTime < ms("1m") || parsedTime > ms("28d")) {
            return client.sendError(command, data.message["commands"]["moderation"]["timeout"]["!time"])
        }

        try {
            await member.timeout(parsedTime)
        }
        catch (err) {
            return client.send("DarkRed", command, data.message["commands"]["moderation"]["error"] + err)
        }

        let embed = await data.command.getEmbed(command, "DARK_RED", [{
            executor: command.member,
            executorId: command.member.id,
            executed: member,
            executedId: member.id,
            duration: duration,
            reason: reason
        }])

        embed.thumbnail = { url: command.member.displayAvatarURL(), dynamic: true }

        return command.reply({ embeds: [embed] })

    }
};