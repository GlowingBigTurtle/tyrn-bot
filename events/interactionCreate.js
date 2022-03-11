const Discord = require('discord.js');
const Command = require("../commands/Command");
const ms = require("ms")

module.exports = class {
  constructor() { }
  async run(client, i) {

    //Data
    let data = {}

    // Return Message to input
    let input = i;

    // User
    let user = input.user;

    // Return
    if (user.bot || !input.guild) return;

    // Mongo
    let guild = await client.mongo.findOrCreateGuild(input.guild.id)
    let USER = await client.mongo.findOrCreateUser(user.id)

    // Modify Data
    data.guild = guild;
    data.user = USER;
    data.message = require(`../translates/${data.user.language}.json`)

    // Command Run
    if (input.isCommand()) {

      // Find Command
      const command = await client.commands.get(input.commandName);
      if (!command) return;

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
        await command.run(client, input, data)
      }
      // Catch
      catch (err) {
        console.log(err)
        client.sendError(input, 'There was an error while executing this command!');
      }
    }

    if (i.isButton()) {

      if (i.customId.startsWith("btnRole_")) {

        let role = i.guild.roles.cache.get(i.customId.substr(i.customId.length - 18))
        if (!role) return;

        if (i.member.roles.cache.get(role.id)) {
          try {
            await i.member.roles.remove(role.id, `Buton role System`)
            i.reply({ content: `Your ${role} role is removed`, ephemeral: true })
          } catch (error) {
            i.reply({ content: `Something went wrong ${error}`, ephemeral: true })
          }
        }
        else {
          try {
            await i.member.roles.add(role.id, `Buton role System`)
            i.reply({ content: `You got ${role} role`, ephemeral: true })
          } catch (error) {
            i.reply({ content: `Something went wrong ${error}`, ephemeral: true })
          }
        }
      }
    }

  }
};
