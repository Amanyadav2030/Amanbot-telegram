const express = require('express');
const { MoveTask, DeleteTask } = require('../controllers/Task.controller');
const { TaskModel } = require('../models');
const TaskRouter = express.Router();
TaskRouter.get('/',async(req,res)=>{
    const {id} = req.query;
    try {
        const tasks =await TaskModel.find({userId:id});
        return res.send(tasks);
    } catch (error) {
        res.status(501).send({msg:error.message});
    }
})
TaskRouter.post('/',async(req,res)=>{
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        return res.send(newTask);
    } catch (error) {
        res.status(501).send(error);
    }
})
TaskRouter.patch('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const {status} = req.body;
        const updateTask = await MoveTask(id,status);
        res.send(updateTask);
    } catch (error) {
        res.status(501).send(error);
    }
})
TaskRouter.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const taskDeleted = await DeleteTask(id);
        if(taskDeleted.error){
            return res.status(501).send({msg:taskDeleted.error.message});
        }
        res.send(taskDeleted);
    } catch (error) {
        res.status(501).send(error);      
    }
})
module.exports=TaskRouter