const Discord = require("discord.js");
const ms = require("ms");

// Config
const env = require("../env");

module.exports = class {

    constructor(client, ops) {
        this.client = client;
        this.ops = ops || {};
        this._init()

        let hook = new Discord.WebhookClient({ url: env.cmdLogHook });

        hook.send(`👤 Executor: ${ops.user.tag}|\`${ops.user.id}\`\nCommand: ${ops.cmd.name} | ${ops.cmd.cat}`)
    }

    async getEmbed(msg, color, ops) {
        let data = await this._replace(ops);

        let embed = new Discord.MessageEmbed({
            title: data.title || " ",
            description: data.text || " ",
            color: Discord.Util.resolveColor(color),
            footer: { text: `Requested by ${msg.member.user.tag}` },
            timestamp: Date.now()
        })

        return embed;
    }

    _replace(ops) {
        let data = this._getJSON();

        let newData = {
            title: data.title,
            text: data.text
        };

        for (const item of ops) {
            for (const [key, value] of Object.entries(item)) {
                if (data.title) newData.title = newData.title.replaceAll(`{${key}}`, value)
                if (data.text) newData.text = newData.text.replaceAll(`{${key}}`, value)
            }
        }
        return newData;
    }

    _getJSON() {
        let json = require(`../translates/${this.ops.language}.json`)
            .commands[this.ops.cmd.cat][this.ops.cmd.name]
        return json;
    }

    check(input, data, command) {

        let returnRequired = false;

        // Check if channel is ignored
        if (data.guild.ignoredChannels.includes(input.channel.id) &&
            !input.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {

            returnRequired = true;
            return input.member.user.send(":x: Running commands in this channel isnt allowed!");
        }

        // if owner only
        if (command.data.config.ownerOnly &&
            !this.client.conf.ownerIds.includes(input.member.id)) {

            returnRequired = true;
            return this.client.sendError(input, `You cant sorry man.`)
        }

        // if NSFW
        if (command.data.config.nsfw &&
            !input.channel.nsfw) {

            returnRequired = true;
            return this.client.sendError(input, `This command can be only used in NSFW channel.`)
        }

        // Permission Checker
        let clientPerms = [];
        let memberPerms = [];

        command.data.config.botPermissions.forEach((perm) => {
            if (!input.channel.permissionsFor(input.guild.me).has(perm)) clientPerms.push(perm);
        });

        command.data.config.memberPermissions.forEach((perm) => {
            if (!input.channel.permissionsFor(input.member).has(perm)) memberPerms.push(perm);
        });

        if (clientPerms.length > 0 || memberPerms.length > 0) {
            returnRequired = true;
            return this.client.sendError(input,
                `Missing Permissions!
                \nYou: ${memberPerms.map((p) => `\`${p}\``).join(", ")}
                \n Me: ${clientPerms.map((p) => `\`${p}\``).join(", ")}  `);
        }

        // Cooldown
        let cooldown = false;
        let id = input.member.id;

        if (this.client.cooldown.get(`${id}_${command.data.help.name}`)) cooldown = true;
        else {
            this.client.cooldown.set(`${id}_${command.data.help.name}`, true)
            setTimeout(() => this.client.cooldown.delete(`${id}_${command.data.help.name}`), ms(command.data.config.cooldown || "5s"))
        }
        if (cooldown) {
            returnRequired = true;
            return this.client.sendError(input, `You are in cooldown.`);
        }

        return returnRequired;
    }

    _init() {
    }
}
