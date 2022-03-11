const Discord = require('discord.js');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "nsfw",
      description: "Sends random nsfw photos.",
      aliases: json["nsfw"],
      usage: "<commandName> (user)",
      category: "others",
      botPermissions: [],
      memberPermissions: [],
      cooldown: null,
      enabled: true,
      ownerOnly: false,
      slashOnly: true,
      nsfw: true,
      options: [
        {
          name: "option",
          description: "The type of Nsfw Contents",
          type: "STRING",
          //type: Discord.ApplicationCommandOptionType.String,
          required: true,
          choices: [
            { name: "Anal", value: "anal" },
            { name: "Ass", value: "ass" },
            { name: "Pussy", value: "pussy" },
            { name: "Porno", value: "pgif" },
            { name: "Boobs", value: "boobs" },
            { name: "Nude", value: "fourk" },
            { name: "Hentai", value: "hentai" },
            { name: "Neko Pussy", value: "nekopussy" }
          ],
        }
      ]
    })
  }
  async run(client, command, data, args) {

    const x = command.options?.getString('option');

    if (!x) return client.sendError(command, "You must choose one!")

    let image;

    try {
      console.log(x)
      image = await nsfw[x]()
    } catch (error) {
      return client.sendError(command, error)
    }

    let embed = new Discord.MessageEmbed({
      title: "Here you go!",
      footer: { text: "Enjoy it" },
      color: Discord.Util.resolveColor("#ff00ff"),
      image: { url: image }
    })

    return command.reply({
      embeds: [embed]
    })

  }
};