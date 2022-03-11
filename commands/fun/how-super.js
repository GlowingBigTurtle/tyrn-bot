const Discord = require("discord.js")

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class extends Command {
  constructor() {
    super({
      name: "how-super",
      description: "100% real super Meter.",
      aliases: json["how-super"],
      usage: "<commandName> (user)",
      category: "fun",
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

    let rand = Math.ceil(Math.random() * 100);

    let embed = await data.command.getEmbed(command, "RANDOM", [{
      user: member,
      rand: rand
    }])

    return command.reply({ embeds: [embed] })

  }
};