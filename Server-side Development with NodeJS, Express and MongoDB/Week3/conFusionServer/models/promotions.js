const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const promotionSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    price:{
        type:Currency,
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

var Promotions = mongoose.model('promotion', promotionSchema);

module.exports = Promotions;