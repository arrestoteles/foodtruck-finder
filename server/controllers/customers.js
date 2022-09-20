var express = require('express')
var router = express.Router()
var Customer = require('../models/customer')

// Create a new customer
router.post('/', function (req, res, next) {
  var customer = new Customer(req.body)
  customer.save(function (err, customer) {
    if (err) {
      return next(err)
    }
    res.status(201).json(customer)
  })
})

// Return a list of all customers
router.get('/', function (req, res, next) {
  Customer.find(function (err, customers) {
    if (err) {
      return next(err)
    }
    res.json({ 'customers': customers })
  })
})

// Return the customers with the given ID
router.get('/:_id', function (req, res, next) {
  var id = req.params.id
  Customer.findById(id, function (err, customer) {
    if (err) {
      return next(err)
    }
    if (customer === null) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json(customer)
  })
})

// Delete the customer with the given ID
router.delete('/:_id', function (req, res, next) {
  var id = req.params.id
  Customer.findOneAndDelete({ _id: id }, function (err, customer) {
    if (err) {
      return next(err)
    }
    if (customer === null) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json(customer)
  })
})

// Delete all customers from the database
router.delete('/', function(req, res, next) {
  Customer.deleteMany(function (err, customer) {
    if (err) {
      return next(err)
    }
    res.json(customer)
  })
}) 

//TODO Update the entire customer with the given ID

//TODO Update part of the customer with the given ID


module.exports = router
