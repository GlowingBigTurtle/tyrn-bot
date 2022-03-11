const Discord = require("discord.js")

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: 'nuke',
      description: 'Rebuilds the channel.',
      aliases: json["nuke"],
      usage: "<commandName> [channel]",
      category: "moderation",
      botPermissions: ["MANAGE_CHANNELS"],
      memberPermissions: ["MANAGE_CHANNELS"],
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

    let embed = await data.command.getEmbed(command, "DARK_RED", [{
      executor: command.member,
      executorId: command.member.id,
    }])

    let r = await command.reply("Loading...");

    try {
      let position = channel.position;

      let newChannel = await channel.clone()
      newChannel.setPosition(position);
      newChannel.send({ embeds: [embed] })

      await channel.delete()
    }
    catch (err) {
      return client.sendError(command, data.message["commands"]["moderation"]["error"] + err);
    }

  }
};