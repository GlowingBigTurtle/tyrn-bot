const config = require("./env.json")

require("dotenv").config();

module.exports = {
    //Token
    token: config.token || process.env.token,

    // Mongoose
    mongoose: config.mongoose || process.env.mongoose,

    // Error Hook
    errorHook: config.errorHook || process.env.errorHook,

    // Command Log Hook
    cmdLogHook: config.cmdLogHook || process.env.cmdLogHook,

    // Topgg Auth
    topggAuth: config.topggAuth || process.env.topggAuth,

    // Token
    topggToken: config.topggToken || process.env.topggToken

}