const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const cors = require('./cors')

const Favorite = require('../models/favorite');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(authenticate.verifyUser)
.get((req, res, next)=> {
    Favorite.find({'user': req.user._id})
        .populate('user')
        .populate('dishes')
        .then((favorites) =>{
            res.json(favorites);
        },(err) => next(err))
        .catch((err) => next(err));
})

.post(function (req, res, next) {

    Favorite.find({'user': req.user._id})
    .then((favorites) => {
            
            req.body.postedBy = req.user._id;
            if (favorites.length) {
                var favoriteAlreadyExist = false;
                if (favorites[0].dishes.length) {
                    for (var i = (favorites[0].dishes.length - 1); i >= 0; i--) {
                        favoriteAlreadyExist = favorites[0].dishes[i] == req.body._id;
                        if (favoriteAlreadyExist) break;
                    }
                }
                if (!favoriteAlreadyExist) {
                    favorites[0].dishes.push(req.body._id);
                    favorites[0].save(function (err, favorite) {
                        if (err) throw err;
                        res.json(favorite);
                    });
                } else {
                    res.json(favorites);
                }

            }  else {
                Favorite.create({user: req.body})
                .then((favorite) =>{
                    favorite.dishes.push(req.body._id);
                    favorite.save(function (err, favorite) {
                        if (err) throw err;
                        res.json(favorite);
                    })
                })
                .catch((err)=>{console.log(err)})
            }
        },(err) => next(err))
        .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) =>{
    Favorite.remove({'user': req.user._id})
    .then((err, resp) => {
        res.json(resp);
    })
    .catch((err)=>{console.log(err)})
});

favoriteRouter.route('/:dishId')
.all(authenticate.verifyUser)
.post((req,res,next)=>{
    Favorite.find({'user': req.user._id})
    .then((favorites) => {
            /*
            Here favourites is array of having one element = [{
                dishes:[],
                user:[]
            }]
            so if user exist favourites length would be>0
            also to acces and write on this element you have to use favourites[0]
            or store at variable 
            var fav = favourites[0]
            and get dishes fav.dishes 

            */
            req.body.postedBy = req.user._id;

            //check if user exist
            if (favorites.length) {
                //check if dish is already in list
                if (favorites[0].dishes.indexOf(req.body._id)==-1) {
                    favorites[0].dishes.push(req.params.dishId)
                    res.json(favorites);
                    favorites[0].save(function (err, favorite) {
                        if (err) throw err;
                        res.json(favorite);
                    });
                }
                else {
                    console.log('Setup!');
                    res.json(favorites);
                }

            } 
            //else if user dont exist
            else {
                Favorite.create({user: req.user._id})
                .then((favorite) =>{
                    favorite.dishes.push(req.params.dishId);
                    favorite.save(function (err, favorite) {
                        if (err) throw err;
                        res.json(favorite);
                    })
                })
                .catch((err)=>{console.log(err)})
            }
        },(err) => next(err))
        .catch((err) => next(err));
})
.delete((req,res,next)=>{
    Favorite.find({'user': req.user._id})
    .then((favorites) => {
        var favorite = favorites ? favorites[0] : null;
        if (favorite) {
            for (var i = (favorite.dishes.length - 1); i >= 0; i--) {
                if (favorite.dishes[i] == req.params.dishId) {
                    favorite.dishes.remove(req.params.dishId);
                }
            }
            favorite.save(function (err, favorite) {
                if (err) throw err;
                console.log('Here you go!');
                res.json(favorite);
            });
        } else {
            console.log('No favourites!');
            res.json(favorite);
        }
    })
    .catch((err)=>{console.log(err)})
})
module.exports = favoriteRouter;