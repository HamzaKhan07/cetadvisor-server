require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB(){
    try{
        const uri = process.env.MONGO_URI;
        console.log("Mongo URI: ", uri);

        if (!uri) {
            throw new Error('MONGO_URI is not configured');
        }

        console.log("Before connecting to mongoDB");
        // connections
        await mongoose.connect(uri);
        console.log("After connecting to mongoDB");

        console.log("MongoDB connected!");
    }catch(e){
        console.log("Error in connectDB(): ", e);
    }
}

module.exports = connectDB;