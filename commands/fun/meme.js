const Discord = require("discord.js");
const { getRandomMeme } = require("@blad3mak3r/reddit-memes")

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "meme",
      description: "Sends random memes from reddit.",
      aliases: json["meme"],
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

    let meme = await getRandomMeme("meme", { allowNSFW: false });

    let embed = new Discord.MessageEmbed({
      color: Discord.Util.resolveColor("RANDOM"),
      title: meme.title,
      image: { url: meme.image },
      description: `👍: ${meme.ups} | 👎: ${meme.downs}`,
      footer: { text: `Author: ${meme.author} | ` }
    })

    return command.reply({ embeds: [embed] });

  }
};