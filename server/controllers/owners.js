var express = require('express');
var router = express.Router();
var Owner = require('../models/owner');
var Foodtruck = require('../models/foodtruck');


// Return all foodtrucks for a specific owner given the ID
router.get('/:id/foodtrucks', function (req, res, next) {
  var ownerId = req.params.id
  Owner.findOne({ _id: ownerId }).exec(function (err, owner) {
    if (err) return handleError(err);
    console.log(owner.foodtrucks);
    res.status(200).json(owner.foodtrucks)
  })
})


// Create a new owner
router.post('/', function (req, res, next) {
  var owner = new Owner(req.body)
  owner.save(function (err, owner) {
    if (err) {
      return next(err)
    }
    res.status(201).json(owner)
  })
})

// Return a list of all owners
router.get('/', function (req, res, next) {
  Owner.find(function (err, owners) {
    if (err) {
      return next(err)
    }
    res.status(200).json({ 'owners': owners })
  })
})

// Get by ID
router.get('/:_id', function (req, res, next) {
  var id = req.params._id;
  Owner.findById(id, function (err, Owner) {
      if (err) { return next(err); }
      if (Owner == null) {
          return res.status(404).json({ "message": "Owner not found" });
      }
      res.status(200).json(Owner);
  });
});

// Delete by ID
router.delete('/:_id', function (req, res, next) {
  var id = req.params._id;
  Owner.findOneAndDelete({ _id: id }, function (err, owner) {
      if (err) { return next(err); }
      if (owner == null) {
          return res.status(404).json({ "message": "owner not found" });
      }
      res.status(204).json(owner);
  });
});

// Delete all owners from the database
router.delete('/', function(req, res, next) {
  Owner.deleteMany(function (err, owner) {
    if (err) {
      return next(err)
    }
    res.status(204).json(owner)
  })
}) 

// Put by ID
router.put('/:id', function (req, res, next) {
  var id = req.params.id;
  Owner.findById(id, function (err, owners) {
      if (err) { return next(err); }
      if (owners == null) {
          return res.status(404).json({ "message": "owners not found" });
      }
      owners.username = req.body.username
      owners.password = req.body.password
      owners.save();
      res.status(200).json(owners)
  });
});

// Patch by ID
router.patch('/:id', function (req, res, next) {
  var id = req.params.id;
  Owner.findById(id, function (err, owners) {
      if (err) { return next(err); }
      if (owners == null) {
          return res.status(404).json({ "message": "owners not found" });
      }
      owners.username = (req.body.username || owners.username);
      owners.password = (req.body.password || owners.password);
      owners.save();
      res.status(200).json(owners)
  });
});

// Create foodtruck for owner by ID
router.post('/:owner_id/foodtrucks', function (req, res, next) {
  const ownerId = req.params.owner_id

  Owner.findById(ownerId, function(err, owner) {
      if (err) return next(err);
  
      const { name } = req.body
      const foodtruck = new Foodtruck({
        name
      })
    
      foodtruck.save(function (err) {
        if (err) return handleError(err);
      })

      owner.foodtrucks.push(foodtruck)
      owner.save()
      res.status(201).json(foodtruck)
    })
  })
module.exports = router
