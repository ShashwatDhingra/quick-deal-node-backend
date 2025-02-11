const mongoose = require('mongoose');
const { log } = require('../utils/utils');

const mongoPass = process.env.MONGO_PASS

const dbName = 'QuickDeal';
const mongoURI = `mongodb+srv://user:${mongoPass}@cluster0.qk20j.mongodb.net/${dbName}`;

const dbConnection = mongoose.createConnection(mongoURI).on('open', () => {
    log('Connection established with MONGO DB.')
}).on('error', (e)=>{
    log(e)
    log("Error while connecting to MONGO DB.")
})

module.exports = dbConnection