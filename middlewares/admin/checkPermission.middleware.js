//check 1 permission
const { prefixAdmin } = require("../../config/system");
module.exports.checkPermission = (permission) => {
  return (req, res, next) => {
    const role = res.locals.role; // đã gán khi login

    if (!role || !role.permissions.includes(permission)) {
      return res.render("admin/pages/error/index");
    }

    next();
  };
};

//check many permissions
module.exports.checkPermissionAll = (...permissions) => {
  return (req, res, next) => {
    const userPerms = req.user?.role?.permissions || [];

    const hasAll = permissions.every((p) => userPerms.includes(p));

    if (!hasAll) {
      return res.render("admin/pages/error/index");
    }

    next();
  };
};
