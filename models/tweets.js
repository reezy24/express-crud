const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String, 
        required: true
    }
})

const TweetModel = mongoose.model("tweet", TweetSchema)

// class Tweet {
//     constructor(username, message) {
//         this.username = username
//         this.message = message
//     }
// }

function createTweet(username, message) {
    return TweetModel.create({username, message})
}

function getAllTweets() {
    return TweetModel.find()
}

function getTweet(id) {
    let prom = new Promise((resolve, reject) => {
        getAllTweets().then(tweets => resolve(tweets[id]))
    })
    return prom
}

function updateTweet(id, newMessage) {
    return new Promise((resolve, reject) => {
        getTweet(id)
            .then(tweet => {
                // get the object id, update using this
                resolve(TweetModel.updateOne({ _id: tweet._id }, { $set: { message: newMessage } }))
            })
    })
    
}

function deleteTweet(id) {

}

module.exports = { getTweet, getAllTweets, createTweet, deleteTweet, updateTweet }