const port = require("../config.json").port;

module.exports = class {
    constructor(client, app) {

        app.get('/', (req, res) => {
            return res.send("Hello World")
        })

        app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

    }
}
