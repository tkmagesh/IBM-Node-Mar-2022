const dbUtils = require('../utils/dbUtils');

/* Refactor the tasks manipulation logic from routes/tasks to here */

function getAll(callback){
    //read the data from file
    dbUtils.getData((err, taskList) => {
        callback(err, taskList);
    });
    
}

function getById(id, callback){
    dbUtils.getData((err, taskList) => {
        if (err) {
            return callback(err, null)
        }
        const task = taskList.find(task => task.id === id)
        if (!task){
            return callback(new Error('Task not found'), null)
        }
        return callback(null, task);    
    });
    
}

function addNew(taskData){
    //read the data from file
    const newTask = { ...taskData };
    newTask.id = taskList.reduce((maxTaskId, task) => task.id > maxTaskId ? task.id : maxTaskId, 0) + 1;
    taskList.push(newTask);
    //save data data in to the file
    return newTask
}

function update(taskToUpdate){
    //read the data from file
    if (!taskList.find(task => task.id === taskToUpdate.id)){
        throw new Error('Task not found')
    }
    taskList = taskList.map(task => task.id === taskToUpdate.id ? taskToUpdate : task);
    //save the data into the file
    return taskToUpdate
}

function remove(id){
    //read the data from file
    const task = taskList.find(task => task.id === id)
    if (!task){
        throw new Error('Task not found')
    }
    taskList = taskList.filter(task => task.id !== id)
    //save the data into the file
}

module.exports = { getAll, getById, addNew, update, remove }