const express = require('express'),
    router = express.Router(),
    taskService = require('../services/tasks-service');

router.get('/', async (req, res, next) => {
    const taskList = await taskService.getAll()
    console.log(taskList);
    res.json(taskList)
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await taskService.getById(id)
        res.json(task)
    } catch (err) {
        return next(err)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newTaskData = req.body;
        const newTask = await taskService.addNew(newTaskData)
        res.status(201).json(newTask);
    } catch (err) {
        return next(err)
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const taskIdToUpdate = req.params.id;
        const updatedTaskData = req.body;
        const updatedTask = await taskService.update(taskIdToUpdate, updatedTaskData);
        res.json(updatedTask)
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const taskIdToDelete = req.params.id;
        await taskService.remove(taskIdToDelete)
        res.json({})
    } catch (err) {
        next(err);
    }
});


module.exports = router;
