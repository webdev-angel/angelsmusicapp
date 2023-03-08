const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistImage:{
        type:String,
        required:true
    },
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    stageName: {
        type:String,
        required:true
    },
    genre: {
        type:String,
        required:true
    },
    albums: {
        type:String,
        required:true
    },
    label: {
        type:String,
        required:true
    },
    followers: {
        type:String,
        required:true
    },
    fans: {
        type:String,
        required:true
    },
    memberSince: {
        type:Date,
        required:true
    },
});

module.exports = mongoose.model('Artist', artistSchema)