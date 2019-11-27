let Tweets = require("../models/tweets.js")

function index(req, res) {
    console.log("read")
    res.send(Tweets.getTweet())
}

function show(req, res) {
    console.log("read single")
    res.send(Tweets.getTweet(req.params.id))
}

function create(req, res) {
    console.log("create")
    let tweet = new Tweets.Tweet(req.body.username, req.body.message)
    res.send(Tweets.getTweet())
}

function update(req, res) {
    console.log("update")
    let tweet = Tweets.getTweet(req.params.id)
    tweet.message = req.body.message
    Tweets.saveTweets()
    res.send(tweet)
}

function delete_(req, res) {
    console.log("delete")
    Tweets.deleteTweet(req.params.id)
    res.send(Tweets.getTweet())
}

module.exports = { index, show, create, update, delete_ }