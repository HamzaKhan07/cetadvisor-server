const express = require('express')
const router = express.Router();

const {
    getPrevCutoffs,
    getLatestPrevCutoffYear
} = require('../controllers/prevcutoffController');

router.get('/getPrevCutoffs', getPrevCutoffs);
router.get('/getLatestPrevCutoffYear', getLatestPrevCutoffYear);

module.exports = router;