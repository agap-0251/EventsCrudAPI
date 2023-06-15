const {MongoClient} = require('mongodb')
const mongo = require('mongodb')

let dbConnection;

module.exports = {
    connectToDb : (cb) => {
        MongoClient.connect('mongodb://0.0.0.0:27017/events')
            .then(client => {
                dbConnection = client.db('events')
                // console.log("in db then")
                return cb()
            })
            .catch(err => {
                console.log(err)
                // console.log("in db catch")
                return cb(err)
            }) 
    },
    getDb : () => dbConnection
}