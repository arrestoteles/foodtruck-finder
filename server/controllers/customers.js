var express = require('express')
var router = express.Router()
var Customer = require('../models/customer')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
var Foodtruck = require('../models/foodtruck');
const customer = require('../models/customer');
const mongoose = require('mongoose');

// Return a list of all customers
router.get('/', function (req, res, next) {
  Customer.find(function (err, customers) {
    if (err) {
      return next(err)
    }
    res.status(200).json({ 'customers': customers })
  })
})

// Return all foodtrucks for a specific customer given the ID
router.get('/:id/foodtrucks', function (req, res, next) {
  var customerId = req.params.id
  Customer.findOne({ customerId }).exec(function (err, customer) {
    if (err) return handleError(err);
    res.status(200).json(customer)
  })
})

// Create a foodtruck for a specific customer given the ID
router.post('/:id/foodtrucks', function (req, res, next) {
  const customerId = req.params.id

  Customer.findOne({ _id: customerId }, function(error, customer) {
    customer.save(function (err) {
      if (err) return handleError(err);
    
      const { name, color } = req.body
      const foodtruck = new Foodtruck({
        name,
        color
      })
    
      foodtruck.save(function (err) {
        if (err) return handleError(err);
      })

      customer.foodtrucks.push(foodtruck)
      customer.save()
      console.log(customer.foodtrucks)
      res.status(201).json(foodtruck)
    })
  })
})

// Return a specific foodtruck from a specific customer, given the ID(s)
router.get('/:id/foodtrucks/:id', function (req, res) {
  console.log(req.body)
  Customer.findById(customerId).populate('foodtrucks').exec(function (err, customer) {
    if (err) return handleError(err);
    Foodtruck.deleteOne({ foodtruckId })
    res.status(204).json()
  })
})

// Delete a specific foodtruck from a specific customer, given the ID(s)
router.delete('/:id/foodtrucks/:id', function (req, res, next) {
  var id = req.params.id
  Customer.findById(id).populate('favorite').exec(function (err, customer) {
    if (err) return handleError(err);
    console.log(`Customer favorite is ${customer.favorite.name}`);
    res.status(200).json(customer)
  })
})

// Create a new customer along with validation and encryption
router.post('/', async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Customer.findOne({ email });

    if (oldUser) {
      console.log('User already exists!');
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Customer.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user)
  }  
  catch (err) {
    console.log(err);
  }
  // Our register logic ends here
})

// Login a specific customer if email and password correct
router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await Customer.findOne({ email });
    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
  //res.status(400).json(user)
  // TODO res.status(400).send("Invalid Credentials");
  // TODO console.log('Invalid Credentials!');
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
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
    res.status(204).json(customer)
  })
})

// Delete all customers
router.delete('/', function(req, res, next) {
  Customer.deleteMany(function (err, customer) {
    if (err) {
      return next(err)
    }
    res.status(204).json(customer)
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
        customer.first_name = req.body.first_name
        customer.last_name = req.body.last_name
        customer.email = req.body.email
        customer.password = req.body.password
        customer.save()
        res.status(200).json(customer)
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
      customer.first_name = (req.body.first_name || customer.first_name)
      customer.last_name = (req.body.last_name || customer.last_name)
      customer.email = (req.body.email || customer.email)
      customer.password = (req.body.password || customer.password)
      customer.save()
      res.status(200).json(customer)
  })
})

module.exports = router
