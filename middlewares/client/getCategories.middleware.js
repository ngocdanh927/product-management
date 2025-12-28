const ProductCategory = require("../../model/product-category.model");
const createTree = require("../../helper/createTreeCategory.helper");

module.exports = async (req, res, next) => {
  const categories = await ProductCategory.find({ deleted: false });
  const treeCategory = createTree(categories);
  res.locals.treeCategory = treeCategory;

  next();
};
