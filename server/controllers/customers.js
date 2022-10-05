var express = require('express')
const customer = require('../models/customer')
var router = express.Router()
var Customer = require('../models/customer')

// Return a list of all customers
router.get('/', function (req, res, next) {
  Customer.find(function (err, customers) {
    if (err) {
      return next(err)
    }
    res.status(200).json({ 'customers': customers })
  })
})

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

// Return the customers with the given ID
router.get('/:id', function (req, res, next) {
  var id = req.params.id
  Customer.findById(id, function (err, customer) {
    if (err) {
      return next(err)
    }
    if (customer === null) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.status(200).json(customer)
  })
})

// Delete the customer with the given ID
router.delete('/:id', function (req, res, next) {
  var id = req.params.id
  Customer.findOneAndDelete({ _id: id }, function (err, customer) {
    if (err) {
      return next(err)
    }
    if (customer === null) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.status(200).json(customer)
  })
})

// Delete all customers from the database
router.delete('/', function(req, res, next) {
  Customer.deleteMany(function (err, customer) {
    if (err) {
      return next(err)
    }
    res.status(200).json(customer)
  })
}) 

// Update the customer with given id
router.put('/:id', function(req, res, next) {
    var id = req.params.id
    Customer.findById(id, function(err, customer) {
        if (err) { return next(err); }
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"})
        }
        customer.firstname = req.body.firstname
        customer.lastname = req.body.lastname
        customer.email = req.body.email
        customer.password = req.body.password
        customer.save()
        res.status(204).json(customer)
    })
})

// Partially update the customer with the given ID
router.patch('/:id', function(req, res, next) {
  var id = req.params.id
  Customer.findById(id, function(err, customer) {
      if (err) { return next(err); }
      if (customer == null) {
          return res.status(404).json({"message": "Customer not found"})
      }
      customer.firstname = (req.body.firstname || customer.firstname)
      customer.lastname = (req.body.lastname || customer.lastname)
      customer.email = (req.body.email || customer.email)
      customer.password = (req.body.password || customer.password)
      customer.save()
      res.status(204).json(customer)
  })
})

module.exports = router
