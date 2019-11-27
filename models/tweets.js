const fs = require("fs")
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

function deleteTweet(id) {
    tweets.splice(id, 1)
    saveTweets()
}

module.exports = { getTweet, Tweet, saveTweets, deleteTweet }