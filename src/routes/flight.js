"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const flight = require("../controllers/flight");
const idValidation = require("../middlewares/idValidation");
const {
  isLoginAndVerified,
  isStaffOrAdmin,
  isAdmin,
} = require("../middlewares/permissions");

//* /flights

router.use(isLoginAndVerified);

router.route("/").get(flight.list).post(isStaffOrAdmin, flight.create);

router
  .route("/:id")
  .all(idValidation)
  .get(flight.read)
  .put(isStaffOrAdmin, flight.update)
  .patch(isStaffOrAdmin, flight.update)
  .delete(isAdmin, flight.delete);

/* ------------------------------------------------------- */
module.exports = router;
