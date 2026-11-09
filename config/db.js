require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB(){
    try{
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error('MONGO_URI is not configured');
        }

        // connections
        await mongoose.connect(uri);

        console.log("MongoDB connected!");
    }catch(e){
        console.log("Error in connectDB(): ", e);
    }
}

module.exports = connectDB;