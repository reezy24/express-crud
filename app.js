const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./routes.js")

const port = 4114
const app = express()

// testing new tweet function
// setTimeout(() => new Tweet("reez", "new tweet"), 1000)

app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())

    // routes
    .use(routes)

    .listen(port, () => {
        console.log(`listening on port ${port}`)
    })