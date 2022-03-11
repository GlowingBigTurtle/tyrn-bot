const moment = require("moment");
const Discord = require("discord.js");
const pMs = require("pretty-ms");
const ms = require("ms")
const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "user",
      description: "Shows the user's infortmation..",
      aliases: json["user"],
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

    const roles = command.guild.members.cache.get(member.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join('  |  ')
    const user = member.user;

    console.log(ms(user.createdTimestamp))
    let embed = await data.command.getEmbed(command, "GOLD", [{
      username: user.username,
      id: user.id,
      tag: user.tag,
      isBot: user.bot ? '✔️' : '❌',
      createdAt: moment(user.createdAt).format('DD/MM/YY HH:mm:ss'),
      roles: roles
    }])

    embed.setThumbnail(user.avatarURL({ dynamic: true }))
    //embed.setImage(user.bannerURL({ dynamic: true }))

    return command.reply({ embeds: [embed] })

  }
};
