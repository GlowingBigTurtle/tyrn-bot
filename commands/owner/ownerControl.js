const Loader = require("../../util/loadSlashes");
const Discord = require('discord.js');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "ctrl",
      description: "Remote for owners.",
      aliases: [],
      usage: "<commandName> [option]",
      category: "others",
      botPermissions: [],
      memberPermissions: [],
      cooldown: null,
      enabled: true,
      ownerOnly: true,
      slashOnly: false,
      nsfw: false,
      options: [
        {
          name: "option",
          description: "Options",
          type: "STRING",
          required: true,
          choices: [
            { name: "Reload slashes", value: "reload" },
            { name: "Kill client", value: "kill" },
          ],
        }
      ]
    })
  }
  async run(client, command, data, args) {

    let x =
      command.options?.getString('option')
      || args[0]?.toLowerCase();

    if (x === "reload") {
      await client.application.commands.set([]);
      await client.guilds.cache.get(client.conf.guild.id).commands.set([]);
      command.reply("All commands sucsesfully deleted!")
      slashCommandLoader(client);
    }

    else if (x === "kill") {
      process.exit();
    }

    else {
      return client.sendError(command, "Invalid choice.")
    }

  }
};