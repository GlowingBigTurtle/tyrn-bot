const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    config = require("../../config.json")
    
module.exports = mongoose.model("Guild", new Schema({

    /* REQUIRED */
    id: { type: String, required: true }, // Discord ID of the guild

    /* CONFIGURATION */
    language: { type: String, default: "en" }, // Language of the guild
    prefix: { type: String, default: config.PREFIX }, // Default or custom prefix of the guild
    plugins: {
        type: Object, default: { // Plugins data
            // Welcome messages
            welcome: {
                enabled: false, // Whether the welcome messages are enabled
                message: null, // The welcome message
                channel: null, // The channel to send the welcome messages
                //withImage: null // Whether the welcome images are enabled
            },
            // Goodbye messages
            goodbye: {
                enabled: false, // Whether the goodbye messages are enabled
                message: null, // The goodbye message
                channel: null, // The channel to send the goodbye messages
                //withImage: null // Whether the goodbye images are enabled
            },
            // Autorole
            autorole: {
                enabled: false, // Whether the autorole is enabled
                role: null // The role to add when a member join the server
            },
        },
    },
    ignoredChannels: { type: Array, default: [] }, // Channels ignored by the bot
    customCommands: { type: Array, default: [] }, // Channels ignored by the bot
}));