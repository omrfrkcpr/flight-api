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

FlightSchema.pre("init", function (document) {
  console.log(document);
  // document.user = "omer";

  document.departureDateStr = document.departureDate.toLocaleString("de-DE", {
    dateStyle: "full",
    timeStyle: "medium",
  });
  document.arrivalDateStr = document.arrivalDate.toLocaleString("de-DE", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  document.__v = undefined;
});

module.exports = mongoose.model("Flight", FlightSchema);
