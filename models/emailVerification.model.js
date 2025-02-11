const db = require('../config/db')
const mongoose = require('mongoose')

const emailVerificationModel = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    pin: {type: Number, default: null},
    expiration: {type: Date, default: null}
})

module.exports = db.model('email_verifications', emailVerificationModel)