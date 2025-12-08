const express = require("express");
const controller = require("../../controller/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const Router = express.Router();
Router.get("/", controller.index);

Router.patch("/change-status/:status/:id", controller.changeStatus);

Router.patch("/change-multi", controller.changeMulti);

Router.delete("/delete/:id", controller.delete);

Router.get("/create", controller.create);
// Router.post("/create", controller.createProduct);
Router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createProduct,
  controller.createProduct
);

Router.get("/edit/:id", controller.edit);
Router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createProduct,
  controller.editProduct
);

Router.get("/detail/:id", controller.detail);

// Router.patch("/test", controller.test);
module.exports = Router;
