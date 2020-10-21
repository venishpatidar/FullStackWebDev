const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var favoriteSchema = new Schema({
    user: {
        required: true
        ,type: mongoose.Schema.Types.ObjectId
        ,ref: 'User'
    }
    , dishes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' } ] 
}
, {
    timestamps : true
}                           
); 

var Favorites = mongoose.model('favorites', favoriteSchema);

module.exports = Favorites;