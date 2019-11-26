const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")

const port = 4114
const app = express()
const fileName = "tweets.txt"

class Tweet {
    constructor(username, message) {
        this.username = username
        this.message = message
        tweets.push(this)
        saveTweets()
    }
}

let tweets = []

// read from file and assign to tweets
fs.readFile("tweets.txt", "utf-8", (err, tweetsString) => { 
    if (err) {
        throw err
    } else {
        tweets = JSON.parse(tweetsString)
        console.log("All tweets loaded from file")
    }
})


function saveTweets() {
    fs.writeFile(fileName, JSON.stringify(tweets), err => {
        if (err) {
            throw err
        } else {
            console.log("All tweets saved successfully")
        }
    })
}

function getTweet(id) {
    if (id || id == 0) {
        return tweets[id]
    } else {
        // return entire array if no id is passed
        return tweets
    }
}

// testing new tweet function
// setTimeout(() => new Tweet("reez", "new tweet"), 1000)

app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())

    // read
    .get("/", (req, res) => {
        console.log("read")
        res.send(getTweet())
    })

    // also read
    .get("/:id", (req, res) => {
        console.log("read single")
        res.send(getTweet(req.params.id))
    })

    // create
    .post("/", (req, res) => {
        console.log("create")
        let tweet = new Tweet(req.body.username, req.body.message)
        res.send(tweets)
    })

    // update
    .post("/:id", (req, res) => {
        console.log("update")
        let tweet = tweets[req.params.id]
        tweet.message = req.body.message
        saveTweets()
        res.send(tweet)
    })

    // delete
    .delete("/:id", (req, res) => {
        console.log("delete")
        tweets.splice(req.params.id, 1)
        saveTweets()
        res.send(tweets)
    })

    .listen(port, () => {
        console.log(`listening on port ${port}`)
    })