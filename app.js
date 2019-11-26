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
    }
}

let tweets = []

function saveTweet(tweet) {
    fs.appendFile(fileName, JSON.stringify(tweet) + ", \n", err => {
        if (err) {
            throw err
        } else {
            console.log("Tweet saved successfully")
        }
    })
}

fs.writeFile(fileName, "", err => {
    if (err) {
        throw err
    } else {
        console.log("Cleared file successfully")
    }
})

// write all hard coded tweets to file
//fs.writeFile("tweets.txt", JSON.stringify(tweets), err => console.log(err))

function getTweet(callback, id) {
    let prom = new Promise((res, rej) => {
        fs.readFile("tweets.txt", "utf-8", (err, tweetsString) => { 
            if (err) {
                rej(err)
            } else {
                let json = JSON.parse(`[${tweetsString}]`)
                if (id || id == 0) {
                    res(json[id])
                } else {
                    res(json)
                }
            }
        })
    })
    return prom.then(json => callback(json))
}

getTweet(json => console.log(json), 0)

// app
//     .use(bodyParser.urlencoded({ extended: false }))
//     .use(bodyParser.json())

//     // read
//     .get("/", (req, res) => {
//         console.log("read")
//         getTweet(json => res.send(json))
//     })

//     // also read
//     .get("/:id", (req, res) => {
//         console.log("read single")
//         getTweet(json => res.send(json), req.params.id)
//     })

//     // create
//     .post("/", (req, res) => {
//         console.log("create")
//         let tweet = new Tweet(req.body.username, req.body.message)
//         tweets.push(tweet)
//         res.send(tweets)
//     })

//     // update
//     .post("/:id", (req, res) => {
//         console.log("update")
//         let tweet = tweets[req.params.id]
//         tweet.message = req.body.message
//         res.send(tweet)
//     })

//     // delete
//     .delete("/:id", (req, res) => {
//         console.log("delete")
//         tweets.splice(req.params.id, 1)
//         console.log(req.params.id)
//         console.log(tweets) 
//         res.send(tweets)
//     })

//     .listen(port, () => {
//         console.log(`listening on port ${port}`)
//     })