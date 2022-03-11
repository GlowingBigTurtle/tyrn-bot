const Discord = require('discord.js');

module.exports = class {
    constructor() { }
    async run(client, member) {

        let guildDB = await client.mongo.findOrCreateGuild(member.guild.id)

        if (guildDB.plugins.goodbye.enabled) {

            let channel = member.guild.channels.cache.get(guildDB.plugins.goodbye.channel)

            if (guildDB.plugins.goodbye.message) {
                let newText = guildDB.plugins.goodbye.message
                    .replaceAll("{member}", member)
                    .replaceAll("{serverName}", member.guild.name)
                    .replaceAll("{memberCount}", member.guild.memberCount)

                channel?.send(newText)
            }
            else {
                let embed = new Discord.MessageEmbed()
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTitle(member.user.tag)
                    .setColor(Discord.Util.resolveColor("DARK_RED"))
                    .setDescription(`**Wild ${member.user.tag} has lost!
                        \n${member} Left from ${member.guild.name}
                        \nNow we are ${member.guild.memberCount} member without him!**`)

                channel?.send({ embeds: [embed] })

            }
        }

    }
};
