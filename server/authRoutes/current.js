"use strict";

var router = require("express").Router();

var auth = require("../checkAuth");

function current(model) {
  return router.get("/current", auth(model), function (req, res, next) {
    res.status(200).send(req.user);
  });
}

module.exports = current;