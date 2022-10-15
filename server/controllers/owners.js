var express = require('express');
var router = express.Router();
var Owner = require('../models/owner');

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
router.delete('/:id', function (req, res, next) {
  var id = req.params._id;
  Owner.findOneAndDelete({ _id: id }, function (err, Owner) {
      if (err) { return next(err); }
      if (Owner == null) {
          return res.status(404).json({ "message": "Owner not found" });
      }
      res.status(204).json(Owner);
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

module.exports = router
