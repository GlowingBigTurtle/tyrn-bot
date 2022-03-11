// Discord And Client
const Discord = require('discord.js');
const fs = require("fs");
const client = new (require("./base/Tyrn.js"))

const env = require("./env")
// Process
process.on("unhandledRejection", async (error, promise) => {
  console.error("Unhandled Rejection at:", promise);

  if (!client.readyAt) return;

  const embed = new Discord.MessageEmbed({
    color: Discord.Util.resolveColor("RED"),
    title: `${client.user.username}'s Error`,
    description: `\`\`\`js\n${error.stack}\`\`\``
  })

  if (embed.description.length >= 2048) embed.description = embed.description.substr(0, 2042) + "```...";

  const webhook = new Discord.WebhookClient({ url: env.errorHook });
  webhook.edit({ name: "Tyrn-Logger" })

  webhook.send({ content: `<@${client.conf.ownerIds[0]}>`, embeds: [embed] })
});

// Loads
const load = async () => {

  // Commands
  for (const dir of fs.readdirSync("./commands/")) {
    if (dir === "Command.js") continue;
    for (const file of fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"))) {

      let command = new (require(`./commands/${dir}/${file}`));
      if (!command.help.name) continue

      client.commands.set(command.help.name, { data: command, run: command.run })
    }
  }

  // Events
  fs.readdirSync("./events").filter(file => file.endsWith('.js')).forEach(async (file) => {
    const event = new (require(`./events/${file}`));
    const eventName = file.split(".")[0]
    client.on(eventName, (...args) => event.run(client, ...args));
  });
}

load();