const mongoose = require("mongoose");
const guilds = require("./models/guild");
const users = require("./models/user");

// env
const env = require("../env");

module.exports = class {

    constructor() {
        try {
            mongoose.connect(env.mongoose)
            console.log("Connected to mongoDB")
        }

        catch (e) {
            console.error(e)
        }
    }

    async findOrCreateGuild(id) {
        let db = await guilds.find();
        let guild = db.find(a => a.id === id)

        if (guild) {
            return guild;
        }

        else {
            let newGuild = new guilds({
                id: id
            }).save()

            return newGuild
        }
    }

    async findOrCreateUser(id) {
        let db = await users.find();

        let user = db.find(a => a.id === id)

        if (user) {
            return user;
        }

        else {
            let newUser = new users({
                id: id
            }).save()

            return newUser;
        }
    }

}