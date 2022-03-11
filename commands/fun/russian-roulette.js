const Discord = require("discord.js")

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "russian-roulette",
      description: "Play Russian Roulette.",
      aliases: json["russian-roulette"],
      usage: "<commandName>",
      category: "fun",
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

    const Result = [
      data.message["commands"]["fun"]["russian-roulette"]["win"],
      data.message["commands"]["fun"]["russian-roulette"]["win"],
      data.message["commands"]["fun"]["russian-roulette"]["lose"],
    ];

    var rand = Math.floor(Math.random() * Result.length);
    
    let embed = await data.command.getEmbed(command, "RANDOM", [{
      result: Result[rand]
    }])

    return command.reply({ embeds: [embed] })

  }
};