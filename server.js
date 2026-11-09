const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db');

//routes
const cutoffRoutes = require('./routes/cutoffRoutes');
const prevcutoffRoutes = require('./routes/prevcutoffRoutes');

//usages
app = express()

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (origin && allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

app.use(express.json())

// single home route using /
app.use('/',cutoffRoutes);
// prevcutoff routes
app.use('/prevCutoffs',prevcutoffRoutes);

console.log("Before connectDB()");

// connections
connectDB();

console.log("After connectDB()");

// IMPORTANT: Export the app module for Vercel
module.exports = app; 

app.listen(8000, function(){
    console.log("Server is listening to 8000 port");
})

