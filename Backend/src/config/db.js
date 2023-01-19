const mongoose = require('mongoose');
const dbConnect = ()=>{
    mongoose.set('strictQuery', true);
    return mongoose.connect(process.env.MongoURL);
}
module.exports = dbConnect;