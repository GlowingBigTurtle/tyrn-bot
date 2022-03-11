const Discord = require("discord.js")
const os = require("os");

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "ping",
      description: "Pong!",
      aliases: json["ping"],
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

    let ping = Date.now() - command.createdTimestamp;

    let embed = new Discord.MessageEmbed({
      description: `- Pong! | \`${ping}ms\``,
      color: Discord.Util.resolveColor("RANDOM")
    })

    return command.reply({ embeds: [embed] })


  }
};