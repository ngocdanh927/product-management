const express = require("express");
const controller = require("../../controller/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const {
  checkPermission,
} = require("../../middlewares/admin/checkPermission.middleware");

const Router = express.Router();
Router.get("/", checkPermission("products_view"), controller.index);

Router.patch(
  "/change-status/:status/:id",
  checkPermission("products_edit"),
  controller.changeStatus
);

Router.patch(
  "/change-multi",
  checkPermission("products_edit"),
  controller.changeMulti
);

Router.delete(
  "/delete/:id",
  checkPermission("products_delete"),
  controller.delete
);

Router.get("/create", checkPermission("products_create"), controller.create);

Router.post(
  "/create",
  checkPermission("products_create"),
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createProduct,
  controller.createProduct
);

Router.get("/edit/:id", checkPermission("products_edit"), controller.edit);
Router.patch(
  "/edit/:id",
  checkPermission("products_edit"),
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createProduct,
  controller.editProduct
);

Router.get("/detail/:id", checkPermission("products_view"), controller.detail);

// Router.patch("/test", controller.test);
module.exports = Router;
