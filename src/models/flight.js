"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");

const FlightSchema = new mongoose.Schema(
  {
    flightNumber: {
      //IS-AN-001
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    airline: {
      type: String,
      required: true,
      trim: true,
    },
    departure: {
      type: String,
      required: true,
      trim: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
      trim: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "flights",
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", FlightSchema);
