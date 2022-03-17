const express = require('express'),
    router = express.Router();

let taskList = [
    {id : 1, name : 'Master JavaScript', completed : false},
    {id : 2, name : 'Explore Node.js', completed : true},
    {id : 3, name : 'Study async JavaScript', completed : false},
];

router.get('/', (req, res, next) => {
    res.json(taskList);
});

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id),
        task = taskList.find(task => task.id === id);
    if (task){
        res.json(task);
    } else {
        next()
    }
});

router.post('/', (req, res, next) => {
    const newTask = req.body;
    newTask.id = taskList.reduce((maxTaskId, task) => task.id > maxTaskId ? task.id : maxTaskId, 0) + 1;
    taskList.push(newTask);
    res.status(201).json(newTask);
});

router.put('/:id', (req, res, next) => {
    const updatedTask = req.body;
    if (taskList.find(task => task.id === updatedTask.id)){
        taskList = taskList.map(task => task.id === updatedTask.id ? updatedTask : task);
        res.json(updatedTask)
    } else {
        next();
    }
});

router.delete('/:id', (req, res, next) => {
    const taskIdToDelete = parseInt(req.params.id);
    if (taskList.find(task => task.id === taskIdToDelete)){
        taskList = taskList.filter(task => task.id !== taskIdToDelete);
        res.json({})
    } else {
        next();
    }
});


module.exports = router;
