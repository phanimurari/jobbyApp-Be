const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /jobs
// @desc    Get all jobs with filtering
// @access  Private
router.get('/', auth([]), async (req, res, next) => {
  try {
    // Extract query parameters
    const { employment_type, minimum_package, search } = req.query;

    // Build query object
    const query = {};

    if (employment_type) {
      query.employment_type = { $in: employment_type.split(',') };
    }

    if (minimum_package) {
      query.package_per_annum = { $gte: minimum_package };
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Fetch jobs from the database
    const jobs = await Job.find(query);

    res.status(200).json({
      success: true,
      data: jobs,
      total: jobs.length,
    });
  } catch (error) {
    console.log(error, "error in the jobsRoute")
    next(error);
  }
});

// @route   GET /jobs/:id
// @desc    Get a single job
// @access  Private
router.get('/:id', auth, async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /jobs
// @desc    Create a new job
// @access  Private
router.post('/', auth(['admin']), async (req, res, next) => {
  try {
    const { company_logo_url, employment_type, job_description, location, package_per_annum, rating, title } = req.body;

    const job = new Job({
      company_logo_url,
      employment_type,
      job_description,
      location,
      package_per_annum,
      rating,
      title,
    });

    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;