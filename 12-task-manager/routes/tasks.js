const express = require('express'),
    router = express.Router(),
    taskService = require('../services/tasks-service');

router.get('/', (req, res, next) => {
    const taskList = taskService.getAll()
    res.json(taskList);
});

router.get('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const task = taskService.getById(id)
        res.json(task);
    } catch(err){
        next(err)
    }
});

router.post('/', (req, res, next) => {
    const newTaskData = req.body;
    const newTask = taskService.addNew(newTaskData)
    res.status(201).json(newTask);
});

router.put('/:id', (req, res, next) => {
    const updatedTaskData = req.body;
    try {
        const updatedTask = taskService.update(updatedTaskData);
        res.json(updatedTask)
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', (req, res, next) => {
    const taskIdToDelete = parseInt(req.params.id);
    try {
        taskService.remove(taskIdToDelete)
        res.json({})
    } catch (err) {
        next(err);
    }
});


module.exports = router;
