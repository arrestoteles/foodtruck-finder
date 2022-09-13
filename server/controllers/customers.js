var express = require("express");
var router = express.Router();
var Customer = require("../models/customer");

router.post("/api/customers", function (req, res, next) {
  var customer = new Customer(req.body);
  customer.save(function (err, camel) {
    if (err) {
      return next(err);
    }
    res.status(201).json(customer);
  });
});

module.exports = router;
