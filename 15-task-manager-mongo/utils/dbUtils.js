const { MongoClient } = require('mongodb')
let client, db;

async function connect(){
    const url = 'mongodb://localhost:27017'
    client = new MongoClient(url)
    await client.connect()
    db = client.db('training')
}

module.exports = { connect, client, db }


