const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Category Schema
 */
const CategorySchema = new Schema(
  {
    category: { type: String, required: true },
    cutoff: { type: Number, required: true },
    meritRank: { type: Number, required: true },
    originalCategory: { type: String, required: true},
    normalizedCategory: { type: String, required: true},
    gender: { type: String, required: true},
    quota: { type: String, required: true},
  },
  { _id: false }
);

/**
 * Cutoff Round Schema
 */
const CutoffSchema = new Schema(
  {
    round: { type: String, required: true },
    categories: { type: [CategorySchema], default: [] }
  },
  { _id: false }
);

/**
 * Course Schema
 */
const CourseSchema = new Schema(
  {
    courseName: { type: String, required: true },
    choiceCode: { type: String, required: true },
    cutoffs: { type: [CutoffSchema], default: [] }
  },
  { _id: false }
);

/**
 * Main Schema
 */
const CutoffsSchema = new Schema(
  {
    collegeId: { type: String, required: true},
    collegeName: { type: String, required: true },
    status: { type: String },
    place: { type: String },
    courses: { type: [CourseSchema], default: [] }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Cutoff', CutoffsSchema);
