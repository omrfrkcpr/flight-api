"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */

const router = require("express").Router();

//* URL => /reservations

const reservation = require("../controllers/reservation");
const idValidation = require("../middlewares/idValidation");
const {
  isLoginAndVerified,
  isStaffOrAdmin,
  isOwnOrAdmin,
  isAdmin,
} = require("../middlewares/permissions");

router.use(isLoginAndVerified);

router.route("/").get(reservation.list).post(reservation.create);

router
  .route("/:id")
  .all(idValidation)
  .get(isOwnOrAdmin, reservation.read)
  .put(isStaffOrAdmin, reservation.update)
  .patch(isStaffOrAdmin, reservation.update)
  .delete(isAdmin, reservation.delete);

module.exports = router;
