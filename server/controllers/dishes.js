var express = require('express');
var router = express.Router();
var Dish = require('../models/dish');

// Create
router.post('/api/dishes', function(req, res, next){
    var dish = new Dish(req.body);
    dish.save(function(err, dish) {
        if (err) { return next(err); }
        res.status(201).json(dish);
    })
})

// Delete by ID
router.delete('/api/dishes/:_id', function (req, res, next) {
    var id = req.params._id;
    Dish.findOneAndDelete({ _id: id }, function (err, dish) {
        if (err) { return next(err); }
        if (dish == null) {
            return res.status(404).json({ "message": "dish not found" });
        }
        res.json(dish);
    });
});

// Delete all
router.delete('/api/dishes/', function (req, res, next) {
    Dish.remove({}, function (err, dishes) {
        if (err) { return next(err); }
        if (dishes == null) {
            return res.status(404).json({ "message": "dish not found" });
        }
        res.json(dishes);
    });
});

// Get by ID
router.get('/api/dishes/:_id', function (req, res, next) {
    var id = req.params._id;
    Dish.findById(id, function (err, dishes) {
        if (err) { return next(err); }
        if (dishes == null) {
            return res.status(404).json({ "message": "dish not found" });
        }
        res.json(dishes);
    });
});

// Get all
router.get('/api/dishes', function (req, res, next) {
    Dish.find(function (err, dishes) {
        if (err) { return next(err); }
        res.json({ "dishes": dishes });
    });
});

// Patch by ID
router.patch('/api/dishes/:_id', function (req, res, next) {
    var id = req.params._id;
    Dish.findById(id, function (err, dishes) {
        if (err) { return next(err); }
        if (dishes == null) {
            return res.status(404).json({ "message": "dishes not found" });
        }
        dishes.name = (req.body.name || dishes.name);
        dishes.price = (req.body.price || dishes.price);
        dihes.save();
        res.json(dishes);
    });
});

module.exports = router;