var express = require('express')
var router = express.Router()
var Owner = require('../models/owner')

// Create a new owner
router.post('/api/owners', function (req, res, next) {
  var owner = new owner(req.body)
  owner.save(function (err, owner) {
    if (err) {
      return next(err)
    }
    res.status(201).json(owner)
  })
})

// Return a list of all owners
router.get('/api/owners', function (req, res, next) {
  Owner.find(function (err, owners) {
    if (err) {
      return next(err)
    }
    res.json({ 'owners': owners })
  })
})

// Return the owners with the given ID
router.get('/api/owners/:id', function (req, res, next) {
  var id = req.params.id
  Owner.findById(id, function (err, owner) {
    if (err) {
      return next(err)
    }
    if (owner === null) {
      return res.status(404).json({ message: 'Owner not found' })
    }
    res.json(owner)
  })
})

// Delete the owner with the given ID
router.delete('/api/owners/:id', function (req, res, next) {
  var id = req.params.id
  Owner.findOneAndDelete({ _id: id }, function (err, owner) {
    if (err) {
      return next(err)
    }
    if (owner === null) {
      return res.status(404).json({ message: 'Owner not found' })
    }
    res.json(owner)
  })
})

// Delete all owners from the database
router.delete('/api/owners', function(req, res, next) {
  Owner.deleteMany(function (err, owner) {
    if (err) {
      return next(err)
    }
    res.json(owner)
  })
}) 

module.exports = router
