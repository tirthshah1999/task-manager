const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/async-wrapper");
const {createCustomError} = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async(req, res, next) => {
    const tasks = await Task.find();  
    // if not found it returns null
    if(!tasks){
        return next(createCustomError(`No tasks found`, 404))
    }
    res.status(200).json({tasks});
})

const getTask = asyncWrapper(async(req, res, next) => {
    const {id: taskId} = req.params;
    const task = await Task.findOne({_id: taskId});
    if(!task){
        return next(createCustomError(`No task with id : ${taskId}`, 404))
    }
    res.status(200).json({task});
})

const createTask = asyncWrapper(async(req, res, next) => {
    const task = await Task.create(req.body);
    res.status(201).json({task});
})

const updateTask = asyncWrapper(async(req, res, next) => {
    const {id: taskId} = req.params;
    // Option has to be passed so it will send new data instead of old and also validate it (name should not be empty)
    const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {new: true, runValidators: true})
    if(!task){
        return next(createCustomError(`No task with id : ${taskId}`, 404))
    }
    res.status(200).json({task}); 
})

const deleteTask = asyncWrapper(async(req, res, next) => {
    const {id: taskId} = req.params;
    const task = await Task.findOneAndDelete({_id: taskId})
    if(!task){
        return next(createCustomError(`No task with id : ${taskId}`, 404))
    }
    res.status(200).json({task});
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}