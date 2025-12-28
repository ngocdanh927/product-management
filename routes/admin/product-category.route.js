const express = require("express");
const controller = require("../../controller/admin/product-category.controller");
// const validate = require("../../validates/admin/product.validate");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const {
  checkPermission,
} = require("../../middlewares/admin/checkPermission.middleware");

const Router = express.Router();
Router.get("/", checkPermission("products-category_view"), controller.index);

Router.patch(
  "/change-status/:status/:id",
  checkPermission("products-category_edit"),
  controller.changeStatus
);

Router.delete(
  "/delete/:id",
  checkPermission("products-category_delete"),
  controller.delete
);

Router.patch(
  "/change-multi",
  checkPermission("products-category_edit"),
  controller.changeMulti
);

Router.get(
  "/create",
  checkPermission("products-category_create"),
  controller.create
);

Router.post(
  "/create",
  checkPermission("products-category_create"),
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.createProductCategory
);

Router.get(
  "/edit/:id",
  checkPermission("products-category_edit"),
  controller.edit
);
Router.patch(
  "/edit/:id",
  checkPermission("products-category_edit"),
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.editProductCategory
);

Router.get(
  "/detail/:id",
  checkPermission("products-category_view"),
  controller.detail
);
// Router.get("/test", controller.test);
module.exports = Router;
