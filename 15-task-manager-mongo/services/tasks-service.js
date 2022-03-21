const {db} = require('../utils/dbUtils');

/* Refactor the tasks manipulation logic from routes/tasks to here */



function getAll(){
    return db.collection('tasks').find({}).toArray()
}

async function getById(id){
    const taskList = await dbUtils.getData();
    const task = taskList.find(task => task.id === id)
    if (!task){
        throw new Error('Task not found')
    }
    return task
}

async function addNew(taskData){
    //read the data from file
    const taskList = await dbUtils.getData();
    const newTask = { ...taskData };
    newTask.id = taskList.reduce((maxTaskId, task) => task.id > maxTaskId ? task.id : maxTaskId, 0) + 1;
    taskList.push(newTask);
    //save data data in to the file
    await dbUtils.saveData(taskList)
    return newTask
}

async function update(taskToUpdate){
    //read the data from file
    let taskList = await dbUtils.getData()
    if (!taskList.find(task => task.id === taskToUpdate.id)){
        throw new Error('Task not found')
    }
    taskList = taskList.map(task => task.id === taskToUpdate.id ? taskToUpdate : task);
    //save the data into the file
    await dbUtils.saveData(taskList)
    return taskToUpdate
}

async function remove(id){
    //read the data from file
    let taskList = await dbUtils.getData()
    const task = taskList.find(task => task.id === id)
    if (!task){
        throw new Error('Task not found')
    }
    taskList = taskList.filter(task => task.id !== id)
    dbUtils.saveData(taskList)
    //save the data into the file
}

module.exports = { getAll, getById, addNew, update, remove }