const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route");
const treeCategoryMiddleWare = require("../../middlewares/client/getCategories.middleware");
const checkCart = require("../../middlewares/client/cart.middleware");

module.exports = (app) => {
  app.use(treeCategoryMiddleWare);
  app.use(checkCart);
  app.use("/", homeRoutes);
  app.use("/search", searchRoutes);
  app.use("/products", productRoutes);
  app.use("/cart", cartRoutes);
};
