const {UserModel} = require('../models/');

const LoginUser = async(data) =>{ 
    try {
        const user = await UserModel.findOne({chatId:data.chatId});
        if(user){
            return user;
        }else{
            const newUser = new UserModel(data);
            await newUser.save();
            return newUser;
        }
    } catch (error) {
        return error.message
    }
};
module.exports= LoginUser;