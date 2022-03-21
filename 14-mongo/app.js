let tasksCollections;

(async () => {
    const { MongoClient } = require('mongodb')

    const url = 'mongodb://localhost:27017'

    const client = new MongoClient(url)

    await client.connect()
    const db = client.db('training')
    tasksCollections = db.collection('tasks')

    console.log(db);
    //get the tasks 
    await printTasks();

    //await insertDocument();

    //await printTasks()
    

    await db.s.client.close()
})();

async function printTasks(){
    const tasks = await tasksCollections.find({}).toArray()
    console.log(tasks)
}

async function insertDocument(){
    await tasksCollections.insertOne({ name : 'Explore Mongodb', completed : false})
}