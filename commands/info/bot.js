const Discord = require("discord.js");
const os = require("os");
const pMs = require("pretty-ms");

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "bot",
      description: "Get some info about this Bot.",
      aliases: json["bot"],
      usage: "<commandName>",
      category: "info",
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

    const ping = await Date.now() - command.createdTimestamp;
    const uptime = pMs(client.uptime, { verbose: true })

    let embed = await data.command.getEmbed(command, "GOLD", [{
      botName: client.user.username,
      userCount: client.guilds.cache.reduce((a, n) => a + n.memberCount, 0),
      serverCount: client.guilds.cache.size,
      shardCount: client.options.shardCount,
      uptime: uptime,
      cpu: `\n> Cores: \`${os.cpus().length}\`\n> Model:  ${os.cpus()[0].model}\n> Speed: \`${os.cpus()[0].speed} Mhz\``,
      memUsage: `\`${(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2)}MB/1024 MB\``,
      wsping: client.ws.ping,
      ping: ping
    }])

    embed.setThumbnail(client.user.displayAvatarURL())
    embed.setDescription(`**${embed.description}\n\nDiscord.js: \`v${Discord.version}\`\n\nNode.js: \`${process.version}\`**`)

    return command.reply({ embeds: [embed] })

  }
};

/*

    */