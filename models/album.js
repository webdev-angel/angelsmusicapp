const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumImage:{
        type:String,
        required:true
    },
    albumLabel:{
        type:String,
        required:true
    },
    albumTitle:{
        type:String,
        required:true
    },
    artistName:{
        type:String,
        required:true
    },
    albumReleaseDate:{
        type:Date,
        default:Date.now
    },
    dateUploaded:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Album', albumSchema)