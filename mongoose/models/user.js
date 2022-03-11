const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    config = require("../../config.json")

module.exports = mongoose.model("User", new Schema({

    /* REQUIRED */
    id: { type: String, required: true }, // Discord ID of the guild

    /* CONFIGURATION */
    language: { type: String, default: "en" }, // Language of the guild
    plugins: {
        // Visible by bot.
        visible: { type: Boolean, default: true }
    }
}));