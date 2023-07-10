const { string } = require('joi')
const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, 'please provide company name'],
        maxlength: 20
    },
    position:{
        type: String,
        required: [true, 'please provide position'],
    },
    status: {
        type: String,
        enum : ['interview', 'pending', 'declined'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide user']
    }
}, {timestamps: true})

module.exports = mongoose.model('Jobs', jobSchema)