const express = require('express'),
    router = express.Router(),
    taskService = require('../services/tasks-service');

router.get('/', (req, res, next) => {
    taskService.getAll((err, taskList)=> {
        if (err) {
            return next(err)
        }
        res.json(taskList);
    })
});

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    taskService.getById(id, (err, task) => {
        if (err) {
            return next(err)
        }
        res.json(task);
    })
   
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
