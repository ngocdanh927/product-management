const express = require("express");
const Router = express.Router();

const controller = require("../../controller/admin/order.controller");

Router.get("/", controller.index);
Router.patch("/change-status/:status/:id", controller.changeStatus);
Router.get("/detail/:id", controller.detail);

module.exports = Router;
