"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const user = require("../controllers/user");
const idValidation = require("../middlewares/idValidation");
const {
  isOwnOrAdmin,
  isStaffOrAdmin,
  isAdmin,
} = require("../middlewares/permissions");
const upload = require("../middlewares/upload");

//* /users
router
  .route("/")
  .get(isStaffOrAdmin, user.list)
  .post(upload.single("avatar"), user.create);

router
  .route("/:id")
  .all(idValidation, isOwnOrAdmin)
  .get(user.read)
  .put(user.update)
  .patch(user.update)
  .delete(user.delete);

/* ------------------------------------------------------- */
module.exports = router;
