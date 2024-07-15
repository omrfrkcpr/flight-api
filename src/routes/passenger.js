"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */

const router = require("express").Router();

//* URL => /passengers

const passenger = require("../controllers/passenger");
const idValidation = require("../middlewares/idValidation");
const {
  isLoginAndVerified,
  isAdmin,
  isOwnOrAdmin,
} = require("../middlewares/permissions");

router.use(isLoginAndVerified);

router.route("/").get(passenger.list).post(passenger.create);

router
  .route("/:id")
  .all(idValidation)
  .get(isOwnOrAdmin, passenger.read)
  .put(isOwnOrAdmin, passenger.update)
  .patch(isOwnOrAdmin, passenger.update)
  .delete(isAdmin, passenger.delete);

module.exports = router;
