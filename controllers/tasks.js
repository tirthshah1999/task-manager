const Task = require("../models/Task");

const getAllTasks = async(req, res) => {
    try {
        const tasks = await Task.find();  // if not found it returns null
        if(!tasks){
            return res.status(404).json({msg: 'No task found'});
        }
        res.status(200).json({tasks});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const getTask = async(req, res) => {
    try {
        const {id: taskId} = req.params;
        const task = await Task.findOne({_id: taskId});
        if(!task){
            return res.status(404).json({msg: `No task found with ${taskId}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const createTask = async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const updateTask = async(req, res) => {
    try{
        const {id: taskId} = req.params;
        // Option has to be passed so it will send new data instead of old and also validate it (name should not be empty)
        const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {new: true, runValidators: true})
        if(!task){
            return res.status(404).json({msg: `No task found with ${taskId}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const deleteTask = async(req, res) => {
    try{
        const {id: taskId} = req.params;
        const task = await Task.findOneAndDelete({_id: taskId})
        if(!task){
            return res.status(404).json({msg: `No task found with ${taskId}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}