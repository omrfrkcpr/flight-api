"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const token = require("../controllers/token");
const idValidation = require("../middlewares/idValidation");
const { isLogin, isAdmin } = require("../middlewares/permissions");

//* /tokens

router.use(isLogin, isAdmin);

router.route("/").get(token.list).post(token.create);

router
  .route("/:id")
  .all(idValidation)
  .get(token.read)
  .put(token.update)
  .patch(token.update)
  .delete(token.delete);

/* ------------------------------------------------------- */
module.exports = router;
