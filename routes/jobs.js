const express = require('express')
const jobsRouter = express.Router();
const {createJob, getAllJobs, getJob, updateJob, deleteJob} = require('../controllers/jobs')

jobsRouter.get('/', getAllJobs)
jobsRouter.post('/', createJob)
jobsRouter.get('/:id', getJob)
jobsRouter.delete('/:id', deleteJob)
jobsRouter.patch('/:id', updateJob)

module.exports = jobsRouter