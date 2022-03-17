

let taskList = [
    {id : 1, name : 'Master JavaScript', completed : false},
    {id : 2, name : 'Explore Node.js', completed : true},
    {id : 3, name : 'Study async JavaScript', completed : false},
];

/* Refactor the tasks manipulation logic from routes/tasks to here */

function getAll(){
    return [...taskList];
}

function getById(id){
    const task = taskList.find(task => task.id === id)
    if (!task){
        throw new Error('Task not found')
    }
    return task;
}

function addNew(taskData){
    const newTask = { ...taskData };
    newTask.id = taskList.reduce((maxTaskId, task) => task.id > maxTaskId ? task.id : maxTaskId, 0) + 1;
    taskList.push(newTask);
    return newTask
}

function update(taskToUpdate){
    if (!taskList.find(task => task.id === taskToUpdate.id)){
        throw new Error('Task not found')
    }
    taskList = taskList.map(task => task.id === taskToUpdate.id ? taskToUpdate : task);
    return taskToUpdate
}

function remove(id){
    const task = taskList.find(task => task.id === id)
    if (!task){
        throw new Error('Task not found')
    }
    taskList = taskList.filter(task => task.id !== id)
}

module.exports = { getAll, getById, addNew, update, remove }