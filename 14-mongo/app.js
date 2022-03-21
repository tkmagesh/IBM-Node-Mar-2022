let tasksCollections;

(async () => {
    const { MongoClient } = require('mongodb')

    const url = 'mongodb://localhost:27017'

    const client = new MongoClient(url)

    await client.connect()
    const db = client.db('training')
    tasksCollections = db.collection('tasks')

    //get the tasks 
    await printTasks();

    //await insertDocument();

    //await printTasks()
    

    await client.close()
})();

async function printTasks(){
    const tasks = await tasksCollections.find({}).toArray()
    console.log(tasks)
}

async function insertDocument(){
    await tasksCollections.insertOne({ name : 'Explore Mongodb', completed : false})
}