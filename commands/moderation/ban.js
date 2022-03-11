const Discord = require("discord.js")

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "ban",
      description: 'Bans user from the server.',
      aliases: json["ban"],
      usage: "<commandName> [member] (reason)",
      category: "moderation",
      botPermissions: ["BAN_MEMBERS"],
      memberPermissions: ["BAN_MEMBERS"],
      cooldown: null,
      enabled: true,
      ownerOnly: false,
      slashOnly: false,
      nsfw: false,
      options: [
        {
          name: 'mention',
          description: 'Select a member',
          type: "USER",
          required: true,
        },
        {
          name: 'reason',
          description: 'The reason of the process.',
          type: "STRING",
          required: false,
        }
      ],
    })
  }
  async run(client, command, data, args) {

    const member =
      command.options?.getMember('mention') ||
      command.mentions?.members.at(1);

    const reason =
      command.options?.getString('reason') ||
      args?.slice(1).join(" ") ||
      "No Reason Specified";

    if (!member) return client.sendError(command, data.message["commands"]["moderation"]["!member"]);

    try {
      await member.ban({ reason: `Banned by ${command.member.id}\nWith reason: ${reason}` })
    }
    catch (err) {
      return client.sendError(command, data.message["commands"]["moderation"]["error"] + err)
    }

    let embed = await data.command.getEmbed(command, "DARK_RED", [{
      executor: command.member,
      executorId: command.member.id,
      executed: member,
      executedId: member.id,
      reason: reason
    }])

    embed.thumbnail = { url: command.member.displayAvatarURL(), dynamic: true }

    return command.reply({ embeds: [embed] })

  }
};