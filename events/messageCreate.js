const Discord = require('discord.js');
const req = require('express/lib/request');
const Command = require("../commands/Command");


module.exports = class {
  constructor() { }
  async run(client, i) {

    //Data
    let data = {}

    // Return Message to input
    let input = i;

    // User
    let user = input.author;

    // Return
    if (user.bot || !input.guild) return;

    // Mongo
    let guild = await client.mongo.findOrCreateGuild(input.guild.id)
    let USER = await client.mongo.findOrCreateUser(user.id)

    // Modify Data
    data.guild = guild;
    data.user = USER;
    data.message = require(`../translates/${data.user.language}.json`)

    // Prefix
    const prefix = `<@${client.user.id}>`;

    // Bot Pinged
    if (input.content === prefix) {
      return input.reply(`My prefix is \`${prefix}\``)
    }

    // Command Run
    if (input.content.toLowerCase().startsWith(prefix)) {

      // Args
      const args = input.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = await args.shift().toLowerCase();

      // Find Command
      const command = await client.commands.get(cmd) || client.commands.find(a => a.data.help.aliases && a.data.help.aliases.includes(cmd))
      if (!cmd || !command) return;

      // if slash only 
      if (command.data.config.slashOnly) {
        return client.sendError(input, `You cant use this command by prefix try\n\`/${command.data.help.name}\``)
      }

      // Prep Command
      let tyrnCommand = new Command(client, {
        user: user,
        language: data.user.language || "en",
        cmd: { cat: command.data.help.category, name: command.data.help.name }
      })
      data.command = tyrnCommand;

      let check = await tyrnCommand.check(input, data, command);
      if (check) return;

      // Command run
      try {
        // Run
        await command.run(client, input, data, args)
      }
      // Catch
      catch (err) {
        console.log(err)
        client.sendError(input, 'There was an error while executing this command!');
      }
    }
  }
};