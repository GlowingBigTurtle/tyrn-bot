const Discord = require("discord.js")
const version = require("../package.json").version;
const Loader = require("../util/loadSlashes")

module.exports = class {
	constructor(client) { }
	async run(client) {

		console.log(`${client.user.tag} is online! | With ${client.commands.size} Commands`)
		client.logger.log(`${client.user.tag} is online! | With ${client.commands.size} Commands`, false)

		client.user.setPresence({ activities: [{ name: `/help | BETA v${version}` }] });
		//client.user.setPresence({ activities: [{ name: , type: "PLAYING" }], status: "online" });

		Loader(client)
	}
};
