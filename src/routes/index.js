"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use("/auth", require("./auth"));
// user:
router.use("/users", require("./user"));

// document:
router.use("/documents", require("./documents"));

/* ------------------------------------------------------- */
module.exports = router;
