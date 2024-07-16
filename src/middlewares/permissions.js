"use strict";

const Flight = require("../models/flight");
const Reservation = require("../models/reservation");
const Passenger = require("../models/passenger");
const User = require("../models/user");

/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */

module.exports = {
  isLoginAndVerified: (req, res, next) => {
    if (process.env.NODE_ENV == "development") {
      return next();
    }
    if (req.user) {
      if (req.user.isActive) {
        next();
      } else {
        throw new CustomError("NoPermission: Unverified Account!", 403);
      }
    } else {
      throw new CustomError(
        "NoPermission: You must login to perform this action!",
        403
      );
    }
  },
  isStaffOrAdmin: (req, res, next) => {
    if (process.env.NODE_ENV == "development") {
      return next();
    }
    if (req.user.isStaff || req.user.isAdmin) {
      next();
    } else {
      throw new CustomError(
        "NoPermission: You must be Staff or Admin to perform this action!",
        403
      );
    }
  },
  isAdmin: (req, res, next) => {
    if (process.env.NODE_ENV == "development") {
      return next();
    }
    if (req.user.isAdmin) {
      next();
    } else {
      throw new CustomError(
        "NoPermission: You must be Staff or Admin to perform this action!",
        403
      );
    }
  },
  isOwnOrAdmin: async (req, res, next) => {
    if (process.env.NODE_ENV == "development") {
      return next();
    }
    const urlName = req.url;
    const userId = req.user._id;
    const itemId = req.params.id;
    let isOwn = false;

    const modelMap = {
      // flights: { model: Flight, ownerField: "createdId" },
      reservations: { model: Reservation, ownerField: "createdId" },
      passengers: { model: Passenger, ownerField: "createdId" },
      users: { model: User, ownerField: "_id" },
    };

    const entity = Object.keys(modelMap).find((key) => urlName.includes(key));
    if (entity) {
      const { model, ownerField } = modelMap[entity];
      const data = await model.findOne({ _id: itemId });
      if (data && data[ownerField].toString() === userId) {
        isOwn = true;
      }
    }

    if (isOwn || req.user.isAdmin) {
      return next();
    } else {
      return next(
        new CustomError(
          "NoPermission: You must be the owner or Admin to perform this action!",
          403
        )
      );
    }
  },
};
