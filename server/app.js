var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')
var path = require('path')
var cors = require('cors')
var history = require('connect-history-api-fallback')
var cookies = require('cookie-parser')
var sessions = require('express-session')
require('dotenv').config();
const User = require('./models/user');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

var ownerController = require('./controllers/owners')
var customersController = require('./controllers/customers')
var dishesController = require('./controllers/dishes')
var userController = require('./controllers/users')

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodtruckDB'
var port = process.env.PORT || 3000

// Connect to MongoDB
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`)
      console.error(err.stack)
      process.exit(1)
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`)
  }
)

// Create Express app
var app = express()
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// HTTP request logger
app.use(morgan('dev'))
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors())
app.use(cors())

// Import routes
app.get('/api', function (req, res) {
  res.json({ message: 'Check out some of the food trucks!' })
})
app.use('/api/users', userController)
app.use('/api/dishes', dishesController)
app.use('/api/customers', customersController)
app.use('/api/owners', ownerController)

// Cookies
app.use(cookies())
app.use(sessions({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.get("/sendCookie", function(req, res) {
  res.cookie("yummie_cookie", "choco")
  res.send()
})

app.get("/receiveCookie", function(req, res) {
  console.log(req.cookies);
  })

app.post("/api/register", async (req, res) => {

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
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
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
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
})

app.post("/api/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

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
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/api/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
  res.status(404).json({ message: 'Not Found' })
})

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history())
// Serve static assets
var root = path.normalize(__dirname + '/..')
var client = path.join(root, 'client', 'dist')
app.use(express.static(client))

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env')
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  console.error(err.stack)
  var err_res = {
    message: err.message,
    error: {}
  }
  if (env === 'development') {
    // Return sensitive stack trace only in dev mode
    err_res['error'] = err.stack
  }
  res.status(err.status || 500)
  res.json(err_res)
})

app.listen(port, function (err) {
  if (err) throw err
  console.log(`Express server listening on port ${port}, in ${env} mode`)
  console.log(`Backend: http://localhost:${port}/api/`)
  console.log(`Frontend (production): http://localhost:${port}/`)
})

module.exports = app
