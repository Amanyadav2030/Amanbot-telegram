const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN,{polling:true});
const express = require('express')
const {UserRouter,TaskRouter} = require('./routes/')
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('/user',UserRouter);
app.use('/task',TaskRouter);
const dbConnect = require('./config/db');
const LoginUser = require('./controllers/Login.controller');
const { AddTask, GetTasks, CheckTaskExist, DeleteTask, MoveTask } = require('./controllers/Task.controller');
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    console.log(msg)
    bot.sendMessage(chatId, 'Welcome! Please enter your username and password to authenticate.');
});
   
    // -----Help-----
const commands = ['/add', '/update','/delete'];
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const opts = {
        reply_markup: {
            inline_keyboard: [
                commands.map((command) => {
                    return { text: command, callback_data: command };
                })
            ]
        }
    };
    bot.sendMessage(chatId, 'Here some  the available commands /get :)', opts);
});
bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const chatId = message.chat.id;
    const command = callbackQuery.data;
       switch (command) {
        case '/add':
            bot.sendMessage(chatId,`please use /add like this /add title description...`);
            break;
        case '/delete':
            bot.sendMessage(chatId,`please use /delete like this /delete title`);
            break;
        case '/update':
            bot.sendMessage(chatId,`please use /update like this /update title status (only status can updated)`);
            break;
        default:
            break;
    }
});
// bot.on('message',(msg)=>{
//     const chatId = msg.chat.id;
//     switch (msg.text) {
//         case '/add':
//             bot.sendMessage(chatId,`please use /add like this /add title description...`);
//             break;
//         case '/delete':
//             bot.sendMessage(chatId,`please use /delete like this /delete title`);
//             break;
//         case '/update':
//             bot.sendMessage(chatId,`please use /update like this /update title status (only status can updated)`);
//             break;
//         default:
//             break;
//     }
// })

    // -----Get tasks-----
bot.onText(/\/get/, async (msg, match) => {
    const chatId = msg.chat.id;
    try {
        let res = await GetTasks(chatId);
        if(res.length==0){
            return  bot.sendMessage(chatId, `There is No tasks please create one via using (/add title description)`);
        }
        let filtered = msg.text.split(" ")[1];
        if(filtered!=undefined){
            filtered = filtered.toLowerCase();
            if(filtered=='todo'||filtered=='pending'||filtered=='done'){
                res = res.filter((el)=>el.status==filtered);
            }else{
                return bot.sendMessage(chatId, `Please enter a valid status /get todo, /get pending, /get done`);
            }
        };
        let tasks = [];
        res.forEach((el)=>{
            tasks.push(`title: ${el.title}, status: ${el.status}, desc: ${el.description}`);
        })
        bot.sendMessage(chatId, `${tasks.join(" \n")}`);
        if(res.length==0){
            bot.sendMessage(chatId, `There is no task in ${filtered} status`);
        }
    } catch (error) {
        bot.sendMessage(chatId, `There is an Error occur ${error}`);
    }
});
    // -----Add a task-----
bot.onText(/\/add (.*)/, async(msg, match) => {
    try {
        const chatId = msg.chat.id;
        const data = match[1]?.split(' ');
        const title = data[0];
        let description='';
        for(let i=1;i<data.length;i++){
            description+=data[i]+" ";
        }
        let res  = await AddTask({title,description,chatId})
        if(res.title){
            bot.sendMessage(chatId, `Task created with title ${res.title}`);
        }else{
            bot.sendMessage(chatId, `Title should be unique Please create different one :)`);
        }
    } catch (error) {
        bot.sendMessage(chatId, `There is an Error occur ${error}`);
    }
    
});
    // -----Login user-----
bot.onText(/\/login/, async(msg, match) => {
    const chatId = msg.chat.id;
    try {
        const userName = msg.from.username;
        const first_name = msg.from.first_name;
        const res = await LoginUser({chatId,username:userName?userName:"aman_bot",first_name});
        bot.sendMessage(chatId, `Welcome, ${userName}! You have been logged in.`);
        
    } catch (error) {
        bot.sendMessage(chatId, `There is a problem in login please try again later /login.`);
        
    }
});
      
    // -----Delete a task-----
bot.onText(/\/delete (.*)/,async (msg, match) => {
    const chatId = msg.chat.id;c
    try {
        const title = match[1];
        let task = await CheckTaskExist(chatId,title);
        if(!task){
            return bot.sendMessage(chatId, `Please click on /get and see valid tasks`);
        }
        let deleted =await DeleteTask(task._id);
        console.log(deleted)
        bot.sendMessage(chatId, `task ${title} deleted successfully see available tasks /get`);
    } catch (error) {
        bot.sendMessage(chatId, `There is an Error occur ${error}`);
    }
});
// -----Update a task-----    
bot.onText(/\/update (.*)/, async(msg, match) => {
    const chatId = msg.chat.id;
    try {
        const data = match[1]?.split(' ');
        const title = data[0];
        let status = data[1];
        if(!status || (status!='todo'&&status!='pending'&&status!='done')){
            return bot.sendMessage(chatId, `Please Enter vallid status /update title status can be (todo, pending, done)`);
        }
        let task = await CheckTaskExist(chatId,title);
        if(!task){
            return bot.sendMessage(chatId, `Please click on /get and see valid tasks`);
        }
        let res = await MoveTask(task._id,status);
        bot.sendMessage(chatId, `Congratulations, ! Your title: ${title} has been updated with status: ${status}.`);
    } catch (error) {
        bot.sendMessage(chatId, `There is an Error occur ${error}`);
    }
});

app.get('/', (req, res) => res.send('hello'))

app.listen(8080, async() => {
    await dbConnect();
    console.log('server started on port 8080')
})

  