const dbConn = require('../utils/dbUtils');
const ObjectId = require('mongodb').ObjectId;

function getAll(){
    return dbConn.db.collection('tasks').find({}).toArray()
}

async function getById(id){
    const task = dbConn.db.collection('tasks').find({"_id" : new ObjectId(id)}).toArray()
    if (!task){
        throw new Error('Task not found')
    }
    return task
}

async function addNew(taskData){
    const addNewRes = await dbConn.db.collection('tasks').insertOne(taskData)
    const newTask = await dbConn.db.collection('tasks').find({"_id" : addNewRes.insertedId}).toArray()
    return newTask
}

async function update(id, taskToUpdate){
    const query = {"_id" : new ObjectId(id)}
    const res = await dbConn.db.collection('tasks').updateOne(query, { $set : taskToUpdate})
    const updatedTask = await dbConn.db.collection('tasks').find({"_id" : new ObjectId(id)}).toArray()[0]
    return updatedTask
}

async function remove(id){
    const query = {"_id" : new ObjectId(id)}
    const res = await dbConn.db.collection('tasks').deleteOne(query)
    console.log(res);
}

module.exports = { getAll, getById, addNew, update, remove }