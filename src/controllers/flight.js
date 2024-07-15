"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */

const Flight = require("../models/flight");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Flights"]
            #swagger.summary = "List Flights"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const data = await res.getModelList(Flight);

    res.status(200).send({
      error: false,
      details: await res.getModeListDetails(Flight),
    });
  },
  create: async (req, res) => {
    // only logged in users can create a new flight
    req.body.createdId = req.user._id;
    const data = await Flight.create(req.body);

    res.status(200).send({
      error: false,
      message: "New Flight created successfully!",
      data,
    });
  },
  read: async (req, res) => {
    const data = await Flight.findOne({ _id: req.params.id }).populate(
      "createdId"
    );

    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    // only logged in users can update your flight infos
    req.body.createdId = req.user._id;
    const data = await Flight.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      message: "Flight updated successfully!",
      data,
      new: await Flight.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Flight.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount && "Flight deleted successfully!",
      data,
    });
  },
};
