"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */

const User = require("../models/user");
const fs = require("node:fs");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
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
    const data = await res.getModelList(User);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data,
    });
  },
  //! CRUD(Create-Read-Update-Delete)
  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
        */

    if (req.file) {
      // console.log(req.file);
      // if (req.file.mimetype === "image/jpeg") {
      // }
      req.body.avatar = "/uploads/" + req.file.filename;
    }

    const data = await User.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
    const data = await User.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
        */

    if (!req.user.isAdmin) {
      delete req.body.isAdmin;
      delete req.body.isStaff;
      delete req.body.isActive;
    }

    if (req.file) {
      // console.log(req.file);
      // if (req.file.mimetype === "image/jpeg") {
      // }
      req.body.avatar = "/uploads/" + req.file.filename;
    }
    // const data = await User.updateOne({ _id: req.params.id }, req.body, {
    //   runValidators: true,
    // }); // doesnt return data
    const data = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
    }); // returns data

    // delete old uploaded image
    if (req.file && data.avatar) {
      fs.unlinkSync(`.${data.avatar}`, (err) => console.log(err));
    }

    res.status(202).send({
      error: false,
      data,
      newData: await User.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */
    // const data = await User.deleteOne({ _id: req.params.id }); // doesnt return data
    const data = await User.findOneAndDelete({ _id: req.params.id }); // returns data

    // delete old uploaded image
    if (data.avatar) {
      fs.unlinkSync(`.${data.avatar}`, (err) => console.log(err));
    }

    res.status(204).send({
      error: false,
      data,
      message: "User deleted successfully!",
    });
  },
};
