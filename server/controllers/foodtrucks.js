var express = require('express');
const foodtruck = require('../models/foodtruck');
var router = express.Router();
var Foodtruck = require('../models/foodtruck');

//Create (post foodtruck)
router.post('/', function (req, res, next) {
    var foodtruck = new Foodtruck(req.body);
    foodtruck.save(function (err, foodtruck) {
        if (err) { return next(err); }
        res.status(201).json(foodtruck);
    })
});

// Dish for foodtruck
router.post('/api/foodtrucks/:_id/dishes', function (req, res, next) {
    var dish = new dish(req.body);
    dish.user_id = req.params._id;
    dish.save(function (err, dish) {
        if (err) {
            return next(err);
        }
        res.status(201).json(dish);
    })
})

//Get all dishes of specific foodtruck
router.get('/api/foodtruck/:_id/dishes', function (req, res, next) {
    dish.find(function (err, dishes) {
        if (err) { return next(err); }
        res.json({ "dishes": dishes });
    });
});

//Get all foodtrucks
router.get('/', function (req, res, next) {
    Foodtruck.find(function (err, foodtrucks) {
        if (err) { return next(err); }
        res.status(200).json({ "foodtrucks": foodtrucks });
    });
});

//Get food truck by ID (get individeual foodtruck by ID)
router.get('/:_id', function (req, res, next) {
    var id = req.params._id;
    Foodtruck.findById(id, function (err, foodtrucks) {
        if (err) { return next(err); }
        if (foodtrucks == null) {
            return res.status(404).json({ "message": "foodtruck not found" });
        }
        res.status(200).json(foodtrucks);
    });
});

//Patch function by ID (Patch individual item )
router.patch('/:_id', function (req, res, next) {
    var id = req.params._id;
    Foodtruck.findById(id, function (err, foodtrucks) {
        if (err) { return next(err); }
        if (foodtrucks == null) {
            return res.status(404).json({ "message": "foodtrucks not found" });
        }
        foodtrucks.name = (req.body.name || foodtrucks.name);
        foodtrucks.color = (req.body.color || foodtrucks.color);
        foodtrucks.save();
        res.status(200).json(foodtrucks)
    });
});

//Delete individual foodtruck by ID
router.delete('/:_id', function (req, res, next) {
    var id = req.params._id;
    Foodtruck.findOneAndDelete({ _id: id }, function (err, foodtrucks) {
        if (err) { return next(err); }
        if (foodtrucks == null) {
            return res.status(404).json({ "message": "foodtruck not found" });
        }
        res.status(204).json(foodtrucks);
    });
});



// Put by ID
router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    Foodtruck.findById(id, function (err, foodtrucks) {
        if (err) { return next(err); }
        if (foodtrucks == null) {
            return res.status(404).json({ "message": "foodtruck not found" });
        }
        foodtrucks.name = req.body.name
        foodtrucks.password = req.body.password
        foodtrucks.save();
        res.status(200).json(foodtrucks)
    });
  });

// Delete all
router.delete('/', function(req, res, next) {
    Foodtruck.deleteMany(function (err, foodtruck) {
      if (err) {
        return next(err)
      }
      res.status(204).json(foodtruck)
    })
  })
module.exports = router;
