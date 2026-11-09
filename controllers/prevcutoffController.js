//models
const Prevcutoff = require('../models/prevcutoff')

async function getPrevCutoffs(req, res){
    try{
        const data = await Prevcutoff.find();

        res.json({status: 'success', data: data});
    }catch(e){
        console.log("Error in GET /getPrevCutoffs: ", e);
        res.status(500).json({ status: 'error', message: e });
    }
}

async function getLatestPrevCutoffYear(req, res) {
    try {
        const data = await Prevcutoff.findOne()
            .sort({ year: -1 })
            .select('year')
            .lean();

        return res.json({status: 'success', year: data ? data.year : ''})

    } catch (error) {
        console.error('Error in GET /getLatestPrevCutoffYear', error);

        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}


module.exports = {
    getPrevCutoffs,
    getLatestPrevCutoffYear
}