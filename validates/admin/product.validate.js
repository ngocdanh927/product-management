const systemConfig = require("../../config/system");
module.exports.createProduct = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "thêm sản phẩm thất bại");

    //back lai trang truoc
    const backURL = req.get("Referrer") || "/products";
    res.redirect(backURL);
    return;
  }
  next();
};
