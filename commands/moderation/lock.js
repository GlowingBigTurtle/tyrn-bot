const Discord = require("discord.js")

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "lock",
      description: "Blocks everyone from sending messages to the channel",
      aliases: json["lock"],
      usage: "<commandName> [channel]",
      category: "moderation",
      botPermissions: ["MANAGE_ROLES"],
      memberPermissions: ["MANAGE_ROLES"],
      cooldown: null,
      enabled: true,
      ownerOnly: false,
      slashOnly: false,
      nsfw: false,
      options: [
        {
          name: "channel",
          description: "Mention a channel",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: false
        }
      ],
    })
  }
  async run(client, command, data, args) {

    const channel =
      command.options?.getChannel('channel') ||
      command.mentions?.channels.first() ||
      command.channel

    if (!channel.permissionsFor(command.member).has("MANAGE_CHANNELS")) return;

    const every = command.guild.roles.cache.get(command.guild.id);

    try {
      await channel.permissionOverwrites.create(every, {
        SEND_MESSAGES: false,
      })
    }
    catch (err) {
      return client.sendError(command, data.message["commands"]["moderation"]["error"] + err)
    }

    let embed = await data.command.getEmbed(command, "DARK_RED", [{
      channel: channel
    }])

    return command.reply({ embeds: [embed] })

  }
};