const express = require('express')
const router = express.Router();

const {
    getAllCollegeDetails, 
    getCollegeListFromPerc, 
    getCollegeListFromRank, 
    getCollegeNames, 
    getCollegeDetailsFromNameAndId,
    getUniqueCourses,
    getUniqueCollegeStatuses,
    getUniquePlaces,
    getUniqueNormalizedCategories,
    getUniqueGenders,
    getUniqueQuotas
} = require('../controllers/cutoffController');


router.get('/getAllCollegeDetails', getAllCollegeDetails);
router.post('/getCollegeListFromPerc', getCollegeListFromPerc);
router.post('/getCollegeListFromRank', getCollegeListFromRank);
router.get('/getCollegeNames', getCollegeNames);
router.post('/getCollegeDetailsFromNameAndId', getCollegeDetailsFromNameAndId);
router.get('/getUniqueCourses', getUniqueCourses);
router.get('/getUniqueCollegeStatuses', getUniqueCollegeStatuses);
router.get('/getUniquePlaces', getUniquePlaces);
router.get('/getUniqueNormalizedCategories', getUniqueNormalizedCategories);
router.get('/getUniqueGenders', getUniqueGenders);
router.get('/getUniqueQuotas', getUniqueQuotas);


module.exports = router;
