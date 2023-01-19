const { TaskModel,UserModel } = require('../models');
const AddTask = async(data)=>{
    try {
        const user = await UserModel.findOne({chatId:data.chatId});
        const newTask = new TaskModel({title:data.title,description:data.description,userId:user._id}); 
        await newTask.save();
        return newTask;
    } catch (error) {
        return {error:error.message};        
    }
}
const GetTasks = async(id)=>{
    try {
        const user = await UserModel.findOne({chatId:id});
        const tasks =await TaskModel.find({userId:user._id});
        return tasks;
    } catch (error) {
        return {error:error.message};        
    }
}
const MoveTask = async(id,status)=>{
    try {
        const updateTask = await TaskModel.findByIdAndUpdate(id,{status:status});
        return updateTask;
    } catch (error) {
        return {error:error.message};        
    }
}
const DeleteTask = async(id)=>{
    try {
        const taskDeleted = await TaskModel.findByIdAndDelete(id);
        return {msg:"SuccessFully Deleted"};
    } catch (error) {
        return {error:error.message};        
    }
};
const CheckTaskExist = async(id,title)=>{
    try {
        const user = await UserModel.findOne({chatId:id});
        const check = await TaskModel.findOne({title,userId:user._id});
        return check;
    } catch (error) {
        return {error:error.message};        
    }
};
module.exports = {GetTasks,AddTask,DeleteTask,MoveTask,CheckTaskExist};