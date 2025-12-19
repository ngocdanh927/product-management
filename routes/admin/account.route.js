const express = require("express");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const Router = express.Router();
const controller = require("../../controller/admin/account.controller");

const {
  checkPermission,
} = require("../../middlewares/admin/checkPermission.middleware");

Router.get("/", checkPermission("accounts_view"), controller.index);

Router.get("/create", checkPermission("accounts_create"), controller.create);

Router.post(
  "/create",
  checkPermission("accounts_create"),
  upload.single("avatar"),
  uploadCloud.upload,
  controller.createPost
);

Router.get("/edit/:id", checkPermission("accounts_edit"), controller.edit);
Router.patch(
  "/edit/:id",
  checkPermission("accounts_edit"),
  upload.single("avatar"),
  uploadCloud.upload,
  controller.editPatch
);

Router.delete(
  "/delete/:id",
  checkPermission("accounts_delete"),
  controller.delete
);

module.exports = Router;
