const Account = require("../../model/account.model");
const Role = require("../../model/role.model");
const systemConfig = require("../../config/system");

module.exports.requestAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    const user = await Account.findOne({ token: token, deleted: false }).select(
      "-password"
    );
    if (user) {
      const role = await Role.findOne({ _id: user.role_id });
      res.locals.user = user;
      res.locals.role = role;
      return next();
    }
  }
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};
