var express = require('express');
var router = express.Router();
var Dish = require('../models/dish');

// Create
router.post('/', function(req, res, next){
    var dish = new Dish(req.body);
    dish.save(function(err, dish) {
        if (err) { return next(err); }
        res.status(201).json(dish);
    })
})

// Delete by ID
router.delete('/:_id', function (req, res, next) {
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
router.delete('/', function (req, res, next) {
    Dish.remove({}, function (err, dishes) {
        if (err) { return next(err); }
        if (dishes == null) {
            return res.status(404).json({ "message": "dish not found" });
        }
        res.json(dishes);
    });
});

// Get by ID
router.get('/:_id', function (req, res, next) {
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
router.get('/', function (req, res, next) {
    Dish.find(function (err, dishes) {
        if (err) { return next(err); }
        res.json({ "dishes": dishes });
    });
});

// Patch by ID
router.patch('/:_id', function (req, res, next) {
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