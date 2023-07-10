const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const {NotFoundError, BadRequestError} = require('../errors/index')

const getAllJobs = async(req, res) => {
    const jobs = await Job.find({createdBy: req.user.UserID})
    res.status(StatusCodes.OK).json({jobs, count: jobs.length});
}

const getJob = async(req, res) => {
    const {user:{UserID}, params: {id:JobID} } = req
    const job = await Job.find({
        createdBy: UserID,
        _id: JobID
    })

    if(!job){
        throw new NotFoundError("Job not found");
    }

    res.status(StatusCodes.OK).json(job);

}

const createJob = async(req, res) => {
    req.body.createdBy = req.user.UserID
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json(job);
}

const deleteJob = async(req, res) => {
    const {user:{UserID}, params: {id:JobID} } = req
    const job = await Job.findOneAndRemove({
        createdBy: UserID,
        _id: JobID
    })

    if(!job){
        throw new NotFoundError("Job not found");
    }

    res.status(StatusCodes.OK).json(job);
}

const updateJob = async(req, res) => {
    const {body: {company, position}, user: {UserID}, params: {id:JobID} } = req
    if(!company || !position){
        throw new BadRequestError('bad request')
    }

    const job = await Job.findOneAndUpdate({
        _id: JobID,
        createdBy: UserID
    }, req.body, {
        new: true,
        runValidators: true
    })

    if(!job){
        throw new NotFoundError('job not found')
    }

    res.status(StatusCodes.OK).json(job)

}

module.exports = {
    getAllJobs,
    getJob,
    deleteJob,
    updateJob,
    createJob
}