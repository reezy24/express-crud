let Tweets = require("../models/tweets.js")

function index(req, res) {
    console.log("read")
    Tweets.getAllTweets()
        .then( tweets => res.send(tweets) )
        .catch( err => res.status(500).send(err) )
}

function show(req, res) {
    console.log("read single")
    Tweets.getTweet(req.params.id)
        .then( tweet => res.send(tweet) )
        .catch( err => res.status(500).send(err) )
}

function create(req, res) {
    console.log("create")
    Tweets.createTweet(req.body.username, req.body.message)
        .then( tweet => res.send(tweet) )
        .catch( err => res.status(500).send(err) )
}

function update(req, res) {
    console.log("update")
    Tweets.updateTweet(req.body.id, req.body.message)
        .then( tweet => res.send(tweet) )
        .catch( err => res.status(500).send(err) )
}

function delete_(req, res) {
    console.log("delete")
    Tweets.deleteTweet(req.params.id)
    res.send(Tweets.getTweet())
}

module.exports = { index, show, create, update, delete_ }