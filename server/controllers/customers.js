var express = require('express')
var router = express.Router()
var Customer = require('../models/customer')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

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
  } 
  
  catch (err) {
    console.log(err);
  }
  // Our register logic ends here
})

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
    res.status(400).send('Invalid Credentials!')
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

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
        customer.first_name = req.body.first_name
        customer.last_name = req.body.last_name
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
      customer.first_name = (req.body.first_name || customer.first_name)
      customer.last_name = (req.body.last_name || customer.last_name)
      customer.email = (req.body.email || customer.email)
      customer.password = (req.body.password || customer.password)
      customer.save()
      res.status(204).json(customer)
  })
})

module.exports = router
