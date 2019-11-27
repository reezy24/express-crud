let express = require("express")
let router = express.Router()
let TweetsController = require("./controllers/tweets_controller.js")

router

    // list tweets
    .get("/", TweetsController.index)

    // show single tweet
    .get("/:id", TweetsController.show)

    // post new tweet
    .post("/", TweetsController.create)

    // modify tweet message
    .post("/:id", TweetsController.update)

    // delete tweet
    .delete("/:id", TweetsController.delete_)

module.exports = router