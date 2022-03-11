const Discord = require('discord.js');

module.exports = class {
    constructor() { }
    async run(client, member) {

        let guildDB = await client.mongo.findOrCreateGuild(member.guild.id)

        if (guildDB.plugins.autorole.enabled) {
            try {
                await member.roles.add(member.guild.roles.cache.get(guildDB.plugins.autorole.role), `Auto role System`)
            } catch (error) {
                return;
            }
        }

        if (guildDB.plugins.welcome.enabled) {

            let channel = member.guild.channels.cache.get(guildDB.plugins.welcome.channel)

            if (guildDB.plugins.welcome.message) {
                let newText = guildDB.plugins.welcome.message
                    .replaceAll("{member}", member)
                    .replaceAll("{serverName}", member.guild.name)
                    .replaceAll("{memberCount}", member.guild.memberCount)

                channel?.send(newText)
            }
            else {
                let embed = new Discord.MessageEmbed()
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTitle(member.user.tag)
                    .setColor(Discord.Util.resolveColor("GREEN"))
                    .setDescription(`**Wild ${member.user.tag} has appeared!
                        \n${member} Joined to ${member.guild.name}
                        \nNow we are ${member.guild.memberCount} member with you!**`)

            channel?.send({ embeds: [embed] })
        }

    }

}
};
