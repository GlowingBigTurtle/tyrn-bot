const Discord = require("discord.js")

module.exports = class {
    constructor(client) {

        this.client = client;
    }

    guild(guild, color, title) {
        const guildChannel = this.client.channels.cache.get(this.client.conf.guild.channels.guild)

        let embed = new Discord.MessageEmbed({
            color: Discord.Util.resolveColor(color),
            title: title,
            footer: { text: guild.id },
            description:
                `**Server Owner: <@${guild.ownerId}> | \`${guild.ownerId}\`
                \nServer Name: ${guild.name}
                \nMember Count: ${guild.memberCount}**`,
            timestamp: Date.now()
        })

        guildChannel?.send({ embeds: [embed] });
    }

    async log(text) {
        const logChannel = this.client.channels.cache.get(this.client.conf.guild.channels.log)

        logChannel?.send({ content: text })
    }

    async vote(userId) {
        const user = await this.client.users.fetch(userId);
        const voteChannel = this.client.channels.cache.get(this.client.conf.guild.channels.vote)

        let invURL = `https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=1342185502&scope=bot%20applications.commands`;

        let embed = new Discord.MessageEmbed({
            color: Discord.Util.resolveColor("BLUE"),
            footer: { text: this.client.user.username, iconURL: this.client.user.displayAvatarURL() },
            description: `**${user.tag} Thanks for the vote now you are boosted for 12 hours!**
            \n[Invite](${invURL}) ${this.client.user.username} to your server!`
        })

        user?.send({ embeds: [embed] })
        voteChannel?.send({ embeds: [embed] });
    }
}
