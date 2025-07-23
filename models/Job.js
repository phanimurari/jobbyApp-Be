const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company_logo_url: {
    type: String,
    required: true,
  },
  employment_type: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  package_per_annum: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);