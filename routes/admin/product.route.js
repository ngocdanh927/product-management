const express = require("express");
const controller = require("../../controller/admin/product.controller");

const Router = express.Router();
Router.get("/", controller.index);
Router.patch("/change-status/:status/:id", controller.changeStatus);
Router.patch("/change-multi", controller.changeMulti);

module.exports = Router;
