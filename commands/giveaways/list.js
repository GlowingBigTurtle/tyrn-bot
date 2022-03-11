const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: 'giveaway-list',
            description: "Shows active giveaways in the server.",
            aliases: json["giveaway-list"],
            usage: "<commandName>",
            category: "giveaway",
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
    async run(client, command, data, args) {

        const onServer = client.giveawaysManager.giveaways.filter((g) => g.guildId === command.guild.id && !g.ended);
        if (onServer.length === 0) return client.send("DarkRed", command, 'This Server doesnt has any active Giveaway!\nStart Giveaway by typing `/giveaway-start`')

        let gdata = `${onServer.map((g) => `**Prize**: ${g.data.prize}
        \- **Winner Count**: ${g.data.winnerCount}
        \- **ID**: ${g.messageId}
        \- **Channel**: <#${g.channelId}>`).join("\n\n")}`

        let embed = new Discord.MessageEmbed({
            title: ` ${command.guild.name}'s Giveaway List`,
            description: gdata,
            color: Discord.Util.resolveColor("GOLD")
        })

        return command.reply({ embeds: [embed] });

    }
};