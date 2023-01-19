const mongoose = require('mongoose');
const TaskSchema =new mongoose.Schema(
    {
      title: { type: String, required: true ,unique:true},
      description: { type: String, required: true },
      status: { type: String, default:'todo',required: true,enum:['todo',"pending","done"]},
      userId:{ type: mongoose.Schema.Types.ObjectId,required:true, ref: 'user' }
    },
      {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
     }
);
const TaskModel =  mongoose.model('task',TaskSchema);
module.exports = TaskModel;