const Discord = require("discord.js");

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "avatar",
      description: "Shows the user's avatar..",
      aliases: json["avatar"],
      usage: "<commandName> (user)",
      category: "info",
      botPermissions: [],
      memberPermissions: [],
      cooldown: null,
      enabled: true,
      ownerOnly: false,
      slashOnly: false,
      nsfw: false,
      options: [
        {
          name: 'mention',
          type: "USER",
          description: 'Select a member',
          required: false,
        }
      ],
    })
  }
  async run(client, command, data, args) {

    const member =
      command.options?.getMember('mention') ||
      command.mentions?.members.at(1) ||
      command.member;

    let user = member.user;

    let embed = await data.command.getEmbed(command, "GOLD", [{
      user: user,
    }])

    embed.setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))

    return command.reply({ embeds: [embed] })

  }
};