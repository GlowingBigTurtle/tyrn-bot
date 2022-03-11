const Discord = require("discord.js")

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "clear",
      description: 'Deletes messages in the channel',
      aliases: json["clear"],
      usage: "<commandName> [count]",
      category: "moderation",
      botPermissions: ["MANAGE_MESSAGES"],
      memberPermissions: ["MANAGE_MESSAGES"],
      cooldown: null,
      enabled: true,
      ownerOnly: false,
      slashOnly: false,
      nsfw: false,
      options: [
        {
          name: 'count',
          description: 'Specify number you want to delete',
          type: "NUMBER",
          required: true,
        }
      ],
    })
  }
  async run(client, command, data, args) {

    const count =
      command.options?.getNumber("count") ||
      args?.[0];

    if (count < 2 || count > 100) return client.sendError(command, data.message["commands"]["moderation"]["clear"])

    try {
      await command.channel.bulkDelete(count)
    }
    catch (err) {
      return client.sendError(command, data.message["commands"]["moderation"]["error"] + err)
    }

    let embed = await data.command.getEmbed(command, "GREEN", [{
      count: count
    }])

    return command.channel.send({ embeds: [embed] })
    
  }
};