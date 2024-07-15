"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");

const PassengerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      enum: [null, "M", "F"],
      default: null,
    },
    email: {
      type: String,
      unique: true, // In real-project this field should be passId or documentId from Passanger. In this case we get email as a unique value for passanger
      required: true,
      validate: [
        (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        "Please provide a vlaid email address",
      ],
    },
    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "passengers",
    timestamps: true,
  }
);

module.exports = mongoose.model("Passenger", PassengerSchema);
