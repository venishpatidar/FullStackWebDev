const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    abbr:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean
    },
    description:{
        type:String
    }
},{
    timestamps:true
});

var Leaders = mongoose.model('leader', leaderSchema);

module.exports = Leaders;