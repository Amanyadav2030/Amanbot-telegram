const express = require('express');
const  LoginUser  = require('../controllers/Login.controller');
const { UserModel } = require('../models');
const UserRouter = express.Router();

UserRouter.get('/',(req,res)=>{
    res.send("Welcome please login")
})
UserRouter.post('/login',async(req,res)=>{
    try {
        const user = await LoginUser(req.body);
        res.send(user);
    } catch (error) {
        res.status(501).send(error.message);
    }
});
module.exports=UserRouter;