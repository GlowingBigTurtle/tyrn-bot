const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: 'giveaway-options',
      description: "Giveaway options.",
      aliases: json["giveaway-options"],
      usage: "<commandName>",
      category: "giveaway",
      botPermissions: [],
      memberPermissions: ["ADMINISTRATOR"],
      cooldown: null,
      enabled: true,
      ownerOnly: false,
      slashOnly: true,
      nsfw: false,
      options: [
        {
          name: "option",
          description: "End/Reroll",
          type: "STRING",
          //type: Discord.ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "End",
              value: "end"
            },
            {
              name: "Reroll",
              value: "reroll"
            },
          ]
        },
        {
          name: "id",
          description: "ID for Giveaway",
          type: "STRING",
          //type: Discord.ApplicationCommandOptionType.String,
          required: true,
        }
      ],
    })
  }
  async run(client, command, data, args) {

    let option = command.options?.getString("option") || args[0]?.toLowerCase();
    let id = command.options?.getString('id') || args[1]?.toLowerCase();

    if (!option) return client.sendError(command, "You must choose one!\n")

    await command.reply("Loading...")

    try {
      await client.giveawaysManager[option](id, {
        messages: {
          congrat: `Rerolled: Congratulations to the fallowing giveaway winner(s).\n{this.messageURL}`,
        }
      })

      command.editReply("Success!")
    }
    catch (err) {
      return client.sendError(command, `An error has occurred, please check and try again.\n\`${err}\``);
    }

  }
};