const db = require('../config/db')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { log } = require('../utils/utils')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String ,required: true},
    resetPin: {type: Number, required: true, enum: ['admin', 'manager', 'employee'], default: 'employee'},
    resetPinExpiration: {type: Date, default: null}
})

// To crypt the password
userSchema.pre('save', async function (next){
    try{
        var user = this;

        // Only has the password if it is modified or is new
        if(!user.isModified('password')){
            return next();
        }

        const salt = await bcrypt.genSalt(10);

        const hashPass = await bcrypt.hash(user.password, salt);

        user.password = hashPass
    }catch(e){
        log('-- Error while saving the user--', e)
        next(e);
    }
})

module.exports = db.model('users', userSchema)