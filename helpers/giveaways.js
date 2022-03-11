const Discord = require('discord.js');
const mongoose = require('mongoose');
const wait = require('util').promisify(setTimeout);

module.exports = class {
    constructor(client) {
        const giveawaySchema = new mongoose.Schema({
            messageId: String,
            channelId: String,
            guildId: String,
            startAt: Number,
            endAt: Number,
            ended: Boolean,
            winnerCount: Number,
            prize: String,
            messages: {
                giveaway: String,
                giveawayEnded: String,
                inviteToParticipate: String,
                drawing: String,
                dropMessage: String,
                winMessage: mongoose.Mixed,
                embedFooter: mongoose.Mixed,
                noWinner: String,
                winners: String,
                endedAt: String,
                hostedBy: String,
                requiredRole: String,
                requiredInvites: String
            },
            thumbnail: String,
            hostedBy: String,
            winnerIds: { type: [String], default: undefined },
            reaction: mongoose.Mixed,
            botsCanWin: Boolean,
            embedColor: mongoose.Mixed,
            embedColorEnd: mongoose.Mixed,
            exemptPermissions: { type: [], default: undefined },
            exemptMembers: String,
            bonusEntries: String,
            extraData: mongoose.Mixed,
            lastChance: {
                enabled: Boolean,
                content: String,
                threshold: Number,
                embedColor: mongoose.Mixed
            },
            pauseOptions: {
                isPaused: Boolean,
                content: String,
                unPauseAfter: Number,
                embedColor: mongoose.Mixed,
                durationAfterPause: Number,
                infiniteDurationText: String
            },
            isDrop: Boolean,
            allowedMentions: {
                parse: { type: [String], default: undefined },
                users: { type: [String], default: undefined },
                roles: { type: [String], default: undefined }
            }
        }, { id: false });

        // Create the model
        const giveawayModel = mongoose.model('giveaways', giveawaySchema);

        const { GiveawaysManager } = require('discord-giveaways');
        const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
            // This function is called when the manager needs to get all giveaways which are stored in the database.
            async getAllGiveaways() {
                // Get all giveaways from the database. We fetch all documents by passing an empty condition.
                return await giveawayModel.find().lean().exec();
            }

            // This function is called when a giveaway needs to be saved in the database.
            async saveGiveaway(messageId, giveawayData) {
                // Add the new giveaway to the database
                await giveawayModel.create(giveawayData);
                // Don't forget to return something!
                return true;
            }

            // This function is called when a giveaway needs to be edited in the database.
            async editGiveaway(messageId, giveawayData) {
                // Find by messageId and update it
                await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
                // Don't forget to return something!
                return true;
            }

            // This function is called when a giveaway needs to be deleted from the database.
            async deleteGiveaway(messageId) {
                // Find by messageId and delete it
                await giveawayModel.deleteOne({ messageId }).exec();
                // Don't forget to return something!
                return true;
            }
        }

        // Create a new instance of your new class
        const manager = new GiveawayManagerWithOwnDatabase(client, {
            default: {
                botsCanWin: false,
                embedColor: '#FF0000',
                embedColorEnd: '#000000',
                reaction: '🎉'
            }
        });
        // We now have a giveawaysManager property to access the manager everywhere!
        client.giveawaysManager = manager;

        manager.on('endedGiveawayReactionAdded', async (giveaway, member, reaction) => {
            return reaction.users.remove(member.user);
        });

        manager.on('giveawayReactionAdded', async (giveaway, member, reaction) => {

            let reqRoleId = giveaway.messages.requiredRole

            if (reqRoleId && !member.roles.cache.get(reqRoleId)) {
                reaction.users.remove(member.user);
                let role = member.guild.roles.cache.get(reqRoleId);
                member.send(`You must have this role to participate in the giveaway:\n${role.name} | (${role.id})`)
                    .catch(() => { })
            }

            else {
                let embed = await this.getEntryEmbed(client, giveaway);

                member.send({ embeds: [embed] }).catch(() => { })
            }

        });

        manager.on('giveawayRerolled', async (giveaway, winners) => {

            let guild = client.guilds.cache.get(giveaway.guildId);
            let channel = guild.channels.cache.get(giveaway.channelId)

            for (const member of winners) {
                wait(1000);
                channel.send(`${member} | ${member.user.tag} | \`${member.id}\``)

                let embed = await this.getEmbed(client, member, giveaway)

                member.send({ embeds: [embed] }).catch(() => { })
            }
        });

        manager.on('giveawayEnded', async (giveaway, winners) => {

            let guild = client.guilds.cache.get(giveaway.guildId);
            let channel = guild.channels.cache.get(giveaway.channelId)

            for (const member of winners) {
                wait(1000);
                channel.send(`${member} | ${member.user.tag} | \`${member.id}\``)

                let embed = await this.getEmbed(client, member, giveaway)

                member.send({ embeds: [embed] }).catch(() => { })
            };
        });
    }

    // Get Embed
    async getEmbed(client, member, giveaway) {
        let url = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=1342185502&scope=bot%20applications.commands`

        return new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setDescription(`**Congratulations, ${member.user.username} You just won [the giveaway](${giveaway.messageURL})**
        \n[Invite](${url})${client.user.username} to your server!`)
    }

    // get Entry
    async getEntryEmbed(client, giveaway) {
        return new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setDescription(`**<a:verify:876118753472024576> Giveaway Entry Confirmed!**
                \nYou  succesfully joined to [giveaway](${giveaway.messageURL}).
                \n[Vote for ${client.user.username}](https://top.gg/bot/${client.user.id}) and increase your win chance by 20%
                \n[Invite](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=1342185502&scope=bot%20applications.commands) ${client.user.username} to your server!`)
    }
}