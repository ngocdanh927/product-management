const express = require("express");
const multer = require("multer");
const upload = multer();

const Router = express.Router();
const controller = require("../../controller/admin/role.controller");

const {
  checkPermission,
} = require("../../middlewares/admin/checkPermission.middleware");

Router.get("/", checkPermission("roles_view"), controller.index);
Router.get("/create", checkPermission("roles_create"), controller.create);
Router.post("/create", checkPermission("roles_create"), controller.createPost);
Router.get(
  "/permission",
  checkPermission("roles_permissions"),
  controller.permission
);
Router.patch(
  "/permission",
  checkPermission("roles_permissions"),
  controller.permissionPatch
);
Router.get("/edit/:id", checkPermission("roles_edit"), controller.edit);
Router.patch("/edit/:id", checkPermission("roles_edit"), controller.editPatch);
Router.get("/detail/:id", checkPermission("roles_view"), controller.detail);
Router.delete(
  "/delete/:id",
  checkPermission("roles_delete"),
  controller.delete
);

module.exports = Router;
