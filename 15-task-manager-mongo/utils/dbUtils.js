const { MongoClient } = require('mongodb')

class DBConnection {
    client = null;
    db = null;

    async connect(){
        const url = 'mongodb://localhost:27017'
        this.client = new MongoClient(url)
        await this.client.connect()
        this.db = this.client.db('training')
    }
}

module.exports = new DBConnection()


