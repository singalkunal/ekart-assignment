const mongoose = require('mongoose');
const CustomError = require('../utils/custom-error');
require('dotenv').config();

async function dbConnect(){
  if(!process.env.MONGO_PASS) {
    throw new CustomError('Must provide MONGO_PASS env variable');
  }

    try{
      await mongoose
      .connect(`mongodb+srv://kunal:${process.env.MONGO_PASS}@cluster0.dl6ab.mongodb.net/etark?retryWrites=true&w=majority`, { 
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        useUnifiedTopology: true
      })
    }catch(err) {console.log(err)}
  }
  
  module.exports =  dbConnect;