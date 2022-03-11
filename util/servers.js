const wait = require('util').promisify(setTimeout);

class servers {

    constructor() { }

    async general(i) {
        i.guild.roles.cache.forEach(role => role.delete().catch(err => { }));
        i.guild.channels.cache.forEach(a => a.delete().catch(err => { }));
        let c1 = await i.guild.channels.create('⏤͟͟͞ ✨SERVER STATS', { type: 'GUILD_CATEGORY' })
        let c2 = await i.guild.channels.create('⏤͟͟͞ ✨General', { type: 'GUILD_CATEGORY' })
        let c3 = await i.guild.channels.create('⏤͟͟͞ ✨Chat', { type: 'GUILD_CATEGORY' })
        let c4 = await i.guild.channels.create('⏤͟͟͞ ✨Voice', { type: 'GUILD_CATEGORY' })

        let ch1 = await i.guild.channels.create('〢╭🍁・𝗪𝗲𝗹𝗰𝗼𝗺𝗲', { type: 'GUILD_TEXT' })
        let ch2 = await i.guild.channels.create('〢╰🍁・𝗕𝘆𝗲', { type: 'GUILD_TEXT' })

        let ch3 = await i.guild.channels.create('〢╭🔱・𝗥𝘂𝗹𝗲𝘀', { type: 'GUILD_TEXT' })
        let ch4 = await i.guild.channels.create('〢│🔱・𝗔𝗻𝗻𝗼𝘂𝗻𝗰𝗲𝗺𝗲𝗻𝘁𝘀', { type: 'GUILD_TEXT' })
        let ch5 = await i.guild.channels.create('〢│🔱・𝗚𝗶𝘃𝗲𝗮𝘄𝗮𝘆𝘀', { type: 'GUILD_TEXT' })
        let ch6 = await i.guild.channels.create('〢│🔱・𝗣𝗮𝗿𝘁𝗻𝗲𝗿', { type: 'GUILD_TEXT' })
        let ch7 = await i.guild.channels.create('〢╰🔱・𝗟𝗲𝘃𝗲𝗹', { type: 'GUILD_TEXT' })

        let ch8 = await i.guild.channels.create('〢╭🔰・𝗖𝗵𝗮𝘁', { type: 'GUILD_TEXT' })
        let ch9 = await i.guild.channels.create('〢│🔰・𝗜𝗺𝗮𝗴𝗲𝘀', { type: 'GUILD_TEXT' })
        let ch10 = await i.guild.channels.create('〢│🔰・𝗦𝗽𝗮𝗺', { type: 'GUILD_TEXT' })
        let ch11 = await i.guild.channels.create('〢╰🔰・𝗕𝗼𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀', { type: 'GUILD_TEXT' })

        let ch12 = await i.guild.channels.create('〢╭🔊・Voice', { type: 'GUILD_VOICE' })
        let ch13 = await i.guild.channels.create('〢│🔊・Chill Area', { type: 'GUILD_VOICE' })
        let ch14 = await i.guild.channels.create('〢╰🎧・Listen', { type: 'GUILD_VOICE' })

        ch1.setParent(c1.id) && ch2.setParent(c1.id) &&
            ch3.setParent(c2.id) && ch4.setParent(c2.id) && ch5.setParent(c2.id) && ch6.setParent(c2.id) && ch7.setParent(c2.id) &&
            ch8.setParent(c3.id) && ch9.setParent(c3.id) && ch10.setParent(c3.id) && ch11.setParent(c3.id) &&
            ch12.setParent(c4.id) && ch13.setParent(c4.id) && ch14.setParent(c4.id)

        i.guild.roles.create({ name: "⏤͟͟͞- Owner", color: "BLACK", permissions: ["ADMINISTRATOR"] })
        i.guild.roles.create({ name: "⏤͟͟͞- Admin", color: "GREEN", permissions: ["ADMINISTRATOR"] })
        i.guild.roles.create({ name: "⏤͟͟͞- BOT", color: "YELLOW", permissions: ["ADMINISTRATOR"] })
        i.guild.roles.create({ name: "⏤͟͟͞- Member", color: "PURPLE" })
    }

}

module.exports = new servers;