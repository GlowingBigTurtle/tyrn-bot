const wait = require('util').promisify(setTimeout);

module.exports = async (client) => {

  let commands;
  const data = { global: false, loads: [], updates: [], deletes: [], readies: [] }

  if (client.conf.globalCommands) {
    commands = client.application.commands
    data.global = true;
  }
  else {
    commands = client.guilds.cache.get(client.conf.guild.id).commands
    data.global = false;
  }

  const appCmds = await commands.fetch()
  for await (const [id, command] of appCmds) {

    if (!client.commands.has(command.name)) {
      await commands.delete(command)
        .then(() => data.deletes.push(command.name))
        .catch((e) => console.error(e))
    }
  }

  for await (const [name, command] of client.commands) {
    const app = await appCmds.find(a => a.name === name)

    if (app) {
      if (app.description === command.data.help.description) {
        data.readies.push(command.data.help.name)
      }
      else {
        await commands.edit(app, command.data.help)
          .then(() => data.updates.push(command.data.help.name))
          .catch((e) => console.error(e))
      }
    }
    else {
      await commands.create(command.data.help)
        .then(() => data.loads.push(command.data.help.name))
        .catch((e) => console.error(e))
    }
  }

  console.log(`${data.global ? `Global Commands(${client.commands.size}) Loaded` : `Guild Commands(${client.commands.size}) Loaded`}
  \nReadies: ${data.readies.join(" | ") || " "}
  \nLoads: ${data.loads.join(" | ") || " "}
  \nUpdates: ${data.updates.join(" | ") || " "}
  \nDeletes: ${data.deletes.join(" | ") || " "}`);

}

