const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./routes.js")
const mongoose = require("mongoose")

const port = 4114
const app = express()

mongoose.connect("mongodb://localhost/contact_app", { useNewUrlParser: true })
mongoose.connection.on("error", error => console.log(error))

app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())

    // routes
    .use(routes)

    .listen(port, () => {
        console.log(`listening on port ${port}`)
    })