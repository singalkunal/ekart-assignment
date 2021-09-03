const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect(){
    try{
      await mongoose
      .connect(`mongodb+srv://kunal:${process.env.MONGO_PASS}@cluster0.dl6ab.mongodb.net/ekart?retryWrites=true&w=majority`, { 
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        useUnifiedTopology: true
      })
    }catch(err) {console.log(err)}
  }
  
  module.exports =  dbConnect;