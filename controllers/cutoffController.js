//models
const Cutoff = require('../models/cutoff');

async function getAllCollegeDetails(req, res){
    try{
        const data = await Cutoff.find();

        res.json({status: 'success', data: data});
    }catch(e){
        console.log("Error in GET /cutoffs: ", e);
        res.status(500).json({ status: 'error', message: e });
    }
}

async function getCollegeListFromPerc(req, res){
    try{
        let {perc, courseName, place, normalizedCategory, gender, quota, status} = req.body;
        let specialCategories = ['EWS', 'TFWS', 'MINORITY', 'ORPHAN'];

        //for special categories, gender and quote is null
        if(normalizedCategory != null && specialCategories.includes(normalizedCategory?.toUpperCase())){
            gender = null;
            quota = null;
        }

        let data = [];
        let quotaFilter = quota;

        if (quota?.toUpperCase() === 'HOME/STATE') {
            quotaFilter = { $in: ['HOME', 'STATE'] };
        }

        if(status == 'All'){
            //order is important for $match and $unwind
            data = await Cutoff.aggregate([
                { $match: { place: place } },
                { $unwind: "$courses" },
                { $match: { "courses.courseName": courseName } },
                { $unwind: "$courses.cutoffs" },
                { $unwind: "$courses.cutoffs.categories" },
                {
                    $match: {
                    "courses.cutoffs.categories.normalizedCategory": normalizedCategory,
                    "courses.cutoffs.categories.gender": gender,
                    "courses.cutoffs.categories.quota": quotaFilter,
                    "courses.cutoffs.categories.cutoff": { $lte: perc }
                    }
                },
                {
                    $sort: {
                        "courses.cutoffs.categories.cutoff": -1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        collegeId: 1,
                        collegeName: 1,
                        status: 1,
                        place: 1,
                        course: "$courses.courseName",
                        choiceCode: "$courses.choiceCode",
                        round: "$courses.cutoffs.categories.round",
                        category: "$courses.cutoffs.categories.category",
                        cutoff: "$courses.cutoffs.categories.cutoff",
                        meritRank: "$courses.cutoffs.categories.meritRank",
                        normalizedCategory: "$courses.cutoffs.categories.normalizedCategory",
                        gender: "$courses.cutoffs.categories.gender",
                        quota: "$courses.cutoffs.categories.quota",
                    }
                }
            ])
        }
        else{
            data = await Cutoff.aggregate([
                { $match: { place: place } },
                { $match: { status: status }},
                { $unwind: "$courses" },
                { $match: { "courses.courseName": courseName } },
                { $unwind: "$courses.cutoffs" },
                { $unwind: "$courses.cutoffs.categories" },
                {
                    $match: {
                        "courses.cutoffs.categories.normalizedCategory": normalizedCategory,
                        "courses.cutoffs.categories.gender": gender,
                        "courses.cutoffs.categories.quota": quotaFilter,
                        "courses.cutoffs.categories.cutoff": { $lte: perc }
                    }
                },
                {
                    $sort: {
                        "courses.cutoffs.categories.cutoff": -1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        collegeId: 1,
                        collegeName: 1,
                        status: 1,
                        place: 1,
                        course: "$courses.courseName",
                        choiceCode: "$courses.choiceCode",
                        round: "$courses.cutoffs.categories.round",
                        category: "$courses.cutoffs.categories.category",
                        cutoff: "$courses.cutoffs.categories.cutoff",
                        meritRank: "$courses.cutoffs.categories.meritRank",
                        normalizedCategory: "$courses.cutoffs.categories.normalizedCategory",
                        gender: "$courses.cutoffs.categories.gender",
                        quota: "$courses.cutoffs.categories.quota",
                    }
                }
            ])
        }

        res.json({status: 'success', data: data});

    }catch(e){
        console.log("Error in POST /getCollegeListFromPerc: ", e);
        res.status(500).json({ status: 'error', message: e })
    }
}

async function getCollegeListFromRank(req, res){
    try{
        const {rank, courseName, place, normalizedCategory, gender, quota, status} = req.body;

        let data = [];

        if(status == 'All'){
            //order is important for $match and $unwind
            data = await Cutoff.aggregate([
                { $match: { place: place } },
                { $unwind: "$courses" },
                { $match: { "courses.courseName": courseName } },
                { $unwind: "$courses.cutoffs" },
                { $unwind: "$courses.cutoffs.categories" },
                {
                    $match: {
                    "courses.cutoffs.categories.normalizedCategory": normalizedCategory,
                    "courses.cutoffs.categories.gender": gender,
                    "courses.cutoffs.categories.quota": quota,
                    "courses.cutoffs.categories.meritRank": { $gte: rank }
                    }
                },
                {
                    $sort: {
                        "courses.cutoffs.categories.cutoff": -1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        collegeId: 1,
                        collegeName: 1,
                        status: 1,
                        place: 1,
                        course: "$courses.courseName",
                        choiceCode: "$courses.choiceCode",
                        round: "$courses.cutoffs.categories.round",
                        category: "$courses.cutoffs.categories.category",
                        cutoff: "$courses.cutoffs.categories.cutoff",
                        meritRank: "$courses.cutoffs.categories.meritRank",
                        normalizedCategory: "$courses.cutoffs.categories.normalizedCategory",
                        gender: "$courses.cutoffs.categories.gender",
                        quota: "$courses.cutoffs.categories.quota",

                    }
                }
            ])
        }
        else{
            data = await Cutoff.aggregate([
                { $match: { place: place } },
                { $match: { status: status }},
                { $unwind: "$courses" },
                { $match: { "courses.courseName": courseName } },
                { $unwind: "$courses.cutoffs" },
                { $unwind: "$courses.cutoffs.categories" },
                {
                    $match: {
                        "courses.cutoffs.categories.normalizedCategory": normalizedCategory,
                        "courses.cutoffs.categories.gender": gender,
                        "courses.cutoffs.categories.quota": quota,
                        "courses.cutoffs.categories.meritRank": { $gte: rank }
                    }
                },
                {
                    $sort: {
                        "courses.cutoffs.categories.cutoff": -1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        collegeId: 1,
                        collegeName: 1,
                        status: 1,
                        place: 1,
                        course: "$courses.courseName",
                        choiceCode: "$courses.choiceCode",
                        round: "$courses.cutoffs.categories.round",
                        category: "$courses.cutoffs.categories.category",
                        cutoff: "$courses.cutoffs.categories.cutoff",
                        meritRank: "$courses.cutoffs.categories.meritRank",
                        normalizedCategory: "$courses.cutoffs.categories.normalizedCategory",
                        gender: "$courses.cutoffs.categories.gender",
                        quota: "$courses.cutoffs.categories.quota",

                    }
                }
            ])
        }

        res.json({status: "success", data: data});
    }catch(e){
        console.log("Error in POST /getCollegeListFromRank: ", e);
        res.status(500).json({ status: 'error', message: e })
    }
}

async function getCollegeNames(req, res){
    try{
        const data = await Cutoff.find(
            {}, 
            {
                _id: 0,
                collegeId: 1,
                collegeName: 1,
            }
        )

        res.json({status: "success", data: data});

    }catch(e){
        console.log("Error in GET /getCollegeDetails(): ", e);
        res.status(500).json({status: 'error', message: e});
    }
}

async function getCollegeDetailsFromNameAndId(req, res){
    try{
        const {collegeId, collegeName} = req.body;

        const data = await Cutoff.aggregate([
            {$match: {collegeId, collegeId, collegeName: collegeName}},
        ])

        res.json({status: 'success', data: data});

    }catch(e){
        console.log("Error in GET /getCollegeDetailsFromNameAndId: ", e);
        res.status(500).json({status: 'error', message: e});
    }
}

async function getUniqueCourses(req, res) {
    try {
        const data = await Cutoff.aggregate([
            // Deconstruct courses array
            {
                $unwind: "$courses"
            },

            // Group by unique course name
            {
                $group: {
                    _id: "$courses.courseName"
                }
            },

            // Sort alphabetically
            {
                $sort: {
                    _id: 1
                }
            },

            // Format response
            {
                $project: {
                    _id: 0,
                    courseName: "$_id"
                }
            }
        ]);

        res.json({
            status: "success",
            data: data
        });

    } catch (e) {
        console.log("Error in GET /getUniqueCourses: ", e);

        res.status(500).json({
            status: "error",
            message: e.message
        });
    }
}

async function getUniqueCollegeStatuses(req, res) {
    try {
        const data = await Cutoff.aggregate([
            // Group by unique college status
            {
                $group: {
                    _id: "$status"
                }
            },

            // Sort alphabetically
            {
                $sort: {
                    _id: 1
                }
            },

            // Format response
            {
                $project: {
                    _id: 0,
                    status: "$_id"
                }
            }
        ]);

        res.json({
            status: "success",
            data: data
        });

    } catch (e) {
        console.log("Error in GET /getUniqueCollegeStatuses: ", e);

        res.status(500).json({
            status: "error",
            message: e.message
        });
    }
}

async function getUniquePlaces(req, res) {
    try {
        const data = await Cutoff.aggregate([
            {
                $group: {
                    _id: "$place"
                }
            },
            {
                $match: {
                    _id: { $ne: null, $ne: "" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    place: "$_id"
                }
            }
        ]);

        res.json({
            status: "success",
            data
        });

    } catch (e) {
        console.log("Error in GET /getUniquePlaces: ", e);
        res.status(500).json({
            status: "error",
            message: e.message
        });
    }
}

async function getUniqueNormalizedCategories(req, res) {
    try {
        const data = await Cutoff.aggregate([
            { $unwind: "$courses" },
            { $unwind: "$courses.cutoffs" },
            { $unwind: "$courses.cutoffs.categories" },

            {
                $group: {
                    _id: "$courses.cutoffs.categories.normalizedCategory"
                }
            },
            {
                $match: {
                    _id: { $ne: null, $ne: "" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    normalizedCategory: "$_id"
                }
            }
        ]);

        res.json({
            status: "success",
            data
        });

    } catch (e) {
        console.log("Error in GET /getUniqueNormalizedCategories: ", e);
        res.status(500).json({
            status: "error",
            message: e.message
        });
    }
}

async function getUniqueGenders(req, res) {
    try {
        const data = await Cutoff.aggregate([
            { $unwind: "$courses" },
            { $unwind: "$courses.cutoffs" },
            { $unwind: "$courses.cutoffs.categories" },

            {
                $group: {
                    _id: "$courses.cutoffs.categories.gender"
                }
            },
            {
                $match: {
                    _id: { $ne: null, $ne: "" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    gender: "$_id"
                }
            }
        ]);

        res.json({
            status: "success",
            data
        });

    } catch (e) {
        console.log("Error in GET /getUniqueGenders: ", e);
        res.status(500).json({
            status: "error",
            message: e.message
        });
    }
}

async function getUniqueQuotas(req, res) {
    try {
        const data = await Cutoff.aggregate([
            { $unwind: "$courses" },
            { $unwind: "$courses.cutoffs" },
            { $unwind: "$courses.cutoffs.categories" },

            {
                $group: {
                    _id: "$courses.cutoffs.categories.quota"
                }
            },
            {
                $match: {
                    _id: { $ne: null, $ne: "" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    quota: "$_id"
                }
            }
        ]);

        res.json({
            status: "success",
            data
        });

    } catch (e) {
        console.log("Error in GET /getUniqueQuotas: ", e);
        res.status(500).json({
            status: "error",
            message: e.message
        });
    }
}

module.exports = {
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
}