const mongoose = require('mongoose');
const { Schema } = mongoose;

const capRoundsSchema = new Schema(
    {
        roundNo: {type: String, required: true},
        link: {type: String, required: true},
    },
    { _id: false }
);

const PrevcutoffsSchema = new Schema(
    {
        year: {type: String, required: true},
        capRounds: {type: [capRoundsSchema], default: []}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Prevcutoff', PrevcutoffsSchema);