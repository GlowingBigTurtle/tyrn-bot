const Discord = require('discord.js');
const ms = require('ms');

const json = require("../../translates/commands.json");
const Command = require("../../base/Command");
module.exports = class Cmd extends Command {
  constructor() {
    super({
      name: 'giveaway-start',
      description: 'Starts a Giveaway in Server..',
      aliases: [],
      usage: "<commandName> [duration] [winnerCount] [prize] (channel) (requiredRole)",
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
          name: "duration",
          description: "Giveaway Duration",
          type: "STRING",
          //type: Discord.ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "winners",
          description: "Giveaway Winners",
          type: "NUMBER",
          //type: Discord.ApplicationCommandOptionType.Number,
          required: true,
        },
        {
          name: "prize",
          description: "Giveaway Prize",
          type: "STRING",
          //type: Discord.ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "channel",
          description: "Giveaway Channel",
          type: "CHANNEL",
          //type: Discord.ApplicationCommandOptionType.String,
          channelTypes: ["GUILD_TEXT"],
          required: false,
        },
        {
          name: 'role',
          description: 'Required role to join giveaway',
          type: "ROLE",
          //type: Discord.ApplicationCommandOptionType.Role,
          required: false,
        }
      ],
    })
  }
  async run(client, i, data, args) {

        let channel = i.options.getChannel('channel') || i.channel;
        let duration = i.options.getString('duration')
        let winners = i.options.getNumber('winners')
        let prize = i.options.getString('prize')
        let reqRole = i.options.getRole('role') || "none";

        if (isNaN(ms(duration))) return client.send("DarkRed", i, "Invalid giveaway duration")

        let drawin = `> **Drawing: {timestamp}**\n
    > Required role: ${reqRole}
    \n> **:warning: By reacting with 🎉 you accept to be dm'ed **`
        client.giveawaysManager.start(channel, {
          duration: ms(duration),
          winnerCount: parseInt(winners),
          prize: prize,
          messages: {
            giveaway: `🎉🎉 **${prize.toUpperCase()} GIVEAWAY** 🎉🎉`,
            giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
            drawing: drawin,
            inviteToParticipate: "> **React with 🎉 to participate!**",
            winMessage: `Congratulations to the fallowing giveaway winner(s).\n{this.messageURL}`,
            embedFooter: '{this.winnerCount} winner(s)',
            noWinner: 'Giveaway cancelled, no valid participations.',
            hostedBy: 'Hosted by: {this.hostedBy}',
            winners: 'Winner(s):',
            endedAt: 'Ended at',
            requiredRole: reqRole.id
          },
        });

        let started = new Discord.MessageEmbed({
          color: Discord.Util.resolveColor("Blue"),
          description: `🎉**Giveaway Started in** ${channel}!`
        })

        return i.reply({ embeds: [started], ephemeral: true })

      }
    };

