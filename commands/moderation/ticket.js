const Discord = require('discord.js');
const Command = require("../../base/Command");

module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: "ticket",
      description: "Tickets options",
      aliases: [],
      usage: "<commandName> [option] (channel)",
      category: "moderation",
      botPermissions: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
      memberPermissions: ["ADMINISTRATOR"],
      cooldown: null,
      enabled: true,
      ownerOnly: false,
      slashOnly: true,
      nsfw: false,
      options: [
        {
          name: "option",
          description: "Create/Send/BulkDelete",
          type: "STRING",
          //type: Discord.ApplicationCommandOptionType.String,
          required: true,
          choices: [
            { name: "Send Ticket Message", value: "send" },
            { name: "Delete All Tickets", value: "delete" },
          ]
        },
        {
          name: "channel",
          description: "Mention a channel",
          type: "CHANNEL",
          //type: Discord.ApplicationCommandOptionType.Channel,
          channelTypes: ["GUILD_TEXT"],
          required: false
        }
      ],
    })
  }
  async run(client, i, data, args) {

    let ch = i.options.getChannel('channel') || i.channel;
    let choice = i.options.getString('option');

    await i.reply({ content: "Loading...", ephemeral: true });

    let no = new Discord.MessageButton().setStyle(`SECONDARY`).setLabel('No').setCustomId(`No`)
    let yes = new Discord.MessageButton().setStyle(`DANGER`).setLabel('Yes').setCustomId(`Yes`)
    const row = new Discord.MessageActionRow().addComponents(yes, no);

    i.editReply({
      content: "Are you sure wanna continue that action?",
      components: [row]
    })

    const filter = int => int.user.id === i.user.id;
    const collector = await i.channel.createMessageComponentCollector({ filter, time: 60 * 1000, max: 1 });

    collector.on("collect", async (clt) => {

      if (clt.customId === "Yes") {

        if (choice === "send") {
          client.ticketManager.send(i)
            .catch(() => { })

          i.editReply({
            content: `Ticket Panel has been sent to ${ch}`,
            components: []
          })
        }

        if (choice === "delete") {
          client.ticketManager.bulkDelete(i)
            .catch(() => { })

          i.editReply({
            content: "All active tickets has been deleted",
            components: []
          })
        }
      }

      if (clt.customId === "No") {
        i.deleteReply();
      }

    })

  }
};