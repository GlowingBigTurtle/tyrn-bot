const Discord = require("discord.js");


const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "server",
      description: "Shows the server's infortmation.",
      aliases: json["server"],
      usage: "<commandName> (user)",
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

    let guild = command.guild;

    let embed = await data.command.getEmbed(command, "GOLD", [{
      serverName: guild.name,
      serverId: guild.id,
      serverOwner: `<@${guild.ownerId}>`,
      memberCount: guild.memberCount,
      channelCount: guild.channels.cache.size,
      roleCount: guild.roles.cache.size,
      emojiCount: guild.emojis.cache.size,
    }])

    embed.setThumbnail(guild.iconURL())

    return command.reply({ embeds: [embed] })

  }
}