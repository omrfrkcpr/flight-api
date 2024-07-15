"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const flight = require("../controllers/flight");
const idValidation = require("../middlewares/idValidation");

//* /flights

router.route("/").get(flight.list).post(flight.create);

router
  .route("/:id")
  .all(idValidation)
  .get(flight.read)
  .put(flight.update)
  .patch(flight.update)
  .delete(flight.delete);

/* ------------------------------------------------------- */
module.exports = router;
