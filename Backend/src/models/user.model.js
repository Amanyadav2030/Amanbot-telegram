const mongoose = require('mongoose');
const UserSchema =new mongoose.Schema({
    chatId:{type:Number,required:true},
    first_name:{type:String,required:true},
    last_name:{type:String},
    username:{type:String}
});
const UserModel = new mongoose.model('user',UserSchema);
module.exports = UserModel;