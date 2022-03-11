// env
const env = require("../env");

//Topgg
const Topgg = require('@top-gg/sdk')
const api = new Topgg.Api(env.topggToken)
const webhook = new Topgg.Webhook(env.topggAuth)

module.exports = class {
    constructor(client, app) {

        client.on("ready", async () => {
            await api.postStats({ serverCount: client.guilds.cache.size, shardCount: 1 })
            console.log("Posted stats to Top.gg!")
        })

        app.post('/dblwebhook', webhook.listener((vote) => { 
            client.logger.vote(vote.user);
        }));
    }
}
