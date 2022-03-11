const Discord = require("discord.js");

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "invite-me",
      description: "Get Invite link of Bot.",
      aliases: json["invite-me"],
      usage: "<commandName>",
      category: "others",
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

    let inviteURL = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=1342185502&scope=bot%20applications.commands`
    let voteURL = `https://top.gg/bot/${client.user.id}`
    let e = client.emoji

    let buttons = [
      { type: 2, style: 5, label: `Invite ${client.user.username}`, emoji: { name: "🤖" }, disabled: false, url: inviteURL },
      { type: 2, style: 5, label: `Upvote ${client.user.username}`, emoji: { name: e.dbl.name, id: e.dbl.id }, disabled: false, url: voteURL }
    ]

    let row = {
      type: 1,
      components: [buttons[0], buttons[1]]
    }

    let embed = new Discord.MessageEmbed({
      thumbnail: { url: client.user.displayAvatarURL() },
      title: `Invite ${client.user.username} by clicking button!`,
      color: Discord.Util.resolveColor("BLUE")
    })

    return command.reply({ embeds: [embed], components: [row] })

  }
};