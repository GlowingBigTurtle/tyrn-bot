const Discord = require("discord.js")

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
    constructor() {
        super({
            name: "help",
            description: "Get some help!",
            aliases: json["help"],
            usage: "<commandName>",
            category: "others",
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

        command.reply({ content: "Loading...", ephemeral: true })

        let arrays = { all: [], config: [], fun: [], giveaway: [], info: [], moderation: [], others: [] }

        for await (const command of client.commands) {
            let cmd = command.find(a => a.data)

            let str = `\n> 📗: \`${cmd.data.help.name}\`\n> 📕: \`${cmd.data.help.description}\`\n> 📘: \`${cmd.data.help.usage}\``

            arrays.all.push(str)

            let cat = cmd.data.help.category;

            arrays[cat].push(str)
        }

        let main = `Main page!\nSelect something to go!`;

        let embed = new Discord.MessageEmbed({
            thumbnail: { url: client.user.displayAvatarURL() },
            title: `${client.user.username} Commands!`,
            description: main,
            footer: { text: `📗 = Name | 📕 = Description | 📘 = Usage `, icon_url: client.user.displayAvatarURL() },
            color: Discord.Util.resolveColor("GOLD")
        })

        let selectmenu = [
            {
                type: 3,
                custom_id: "helpMenu",
                placeholder: "Filter categories",
                max_values: 1,
                min_values: 1,
                disabled: false,
                options: [
                    { label: 'All', description: ' ', value: 'all' },
                    { label: 'Config | 🛠', description: ' ', value: 'config' },
                    { label: 'Fun | 👻', description: ' ', value: 'fun' },
                    { label: 'Giveaway | 🎉', description: ' ', value: 'giveaway' },
                    { label: 'Infortmation | ℹ️', description: ' ', value: 'info' },
                    { label: 'Moderation | ⚖️', description: ' ', value: 'moderation' },
                    { label: 'Others | 📃', description: ' ', value: 'others' },
                    { label: 'Return', description: ' ', value: 'return' },
                ]
            },
            {
                type: 3,
                custom_id: "helpPages",
                placeholder: "Select pages",
                max_values: 1,
                min_values: 1,
                disabled: false,
                options: [
                    { label: '1 | 📜', description: ' ', value: 'page_1' },
                    { label: '2 | 📜', description: ' ', value: 'page_2' },
                    { label: '3 | 📜', description: ' ', value: 'page_3' },
                    { label: '4 | 📜', description: ' ', value: 'page_4' },
                    { label: '5 | 📜', description: ' ', value: 'page_5' },
                ]
            }
        ]

        let rows = [
            { type: 1, components: [selectmenu[0]] },
            { type: 1, components: [selectmenu[1]] },
        ]

        let msg = await command.channel.send({ content: " ", embeds: [embed], components: [rows[0], rows[1]] })

        const filter = filt => filt.user.id === command.member.id;
        const collector = await command.channel.createMessageComponentCollector({ filter, time: 300 * 1000 });
        let currentCat = "all";

        collector.on("collect", async (i) => {

            let id = i.values[0]

            if (id.startsWith("page")) {
                let page = id.substr(5)
                let sliceTo = page * 10;
                let sliceFrom = sliceTo - 10;
                embed.description = arrays[currentCat].slice(sliceFrom, sliceTo).join("\n")
                if(!embed.description) embed.description = "This category hasnt much that command!"
            }

            else if (id === "return") {
                console.log(id)
                currentCat = "all";
                embed.description = main;
            }
            else {
                currentCat = id;
                embed.description = arrays[id].join("\n")
            }

            msg.edit({ embeds: [embed] })

        });

    }
};
