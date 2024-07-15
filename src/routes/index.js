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
// users:
router.use("/users", require("./user"));

// flights:
router.use("/flights", require("./flight"));

// passangers
router.use("/passengers", require("./passenger"));

// reservations
router.use("/reservations", require("./reservation"));

// documents:
router.use("/documents", require("./documents"));

/* ------------------------------------------------------- */
module.exports = router;
