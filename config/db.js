require('dotenv').config();
const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error('MONGO_URI is not configured');
        }

        cached.promise = mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000
        });
    }

    try {
        cached.conn = await cached.promise;
        console.log("MongoDB connected successfully!");

        return cached.conn;

    } catch (error) {
        cached.promise = null;
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
}

module.exports = connectDB;