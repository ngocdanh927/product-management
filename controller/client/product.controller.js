const Product = require("../../model/product.model");
const productCategory = require("../../model/product-category.model");
const ProductCategory = require("../../model/product-category.model");

const calculatorHelper = require("../../helper/calculator");
const subCategoriesHelper = require("../../helper/subCategories");
//[GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    availabilityStatus: "In Stock",
    deleted: false,
  }).sort({ position: "desc" });

  const newProducts = calculatorHelper.newPrice(products);
  res.render("client/pages/products/index", {
    titlePage: "product",
    listProduct: newProducts,
  });
};

//[GET] /products/:slug
module.exports.detail = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    });

    product.newPrice = (
      product.price *
      (1 - product.discountPercentage / 100)
    ).toFixed(2);

    res.render("client/pages/products/detail", {
      titlePage: product.title,
      product: product,
    });
  } catch (error) {
    res.send("404");
  }
};

//[GET] /products/:slugCategory
module.exports.productCategory = async (req, res) => {
  try {
    const slug = req.params.slugCategory;
    const category = await ProductCategory.findOne({ slug: slug });
    const subCategories = await subCategoriesHelper(category._id);
    const subCategories_id = subCategories.map((e) => e._id);

    const products = await Product.find({
      product_category_id: { $in: [category._id, ...subCategories_id] },
      deleted: false,
      availabilityStatus: "In Stock",
    });

    const newProducts = calculatorHelper.newPrice(products);
    res.render("client/pages/products/index", {
      titlePage: category.title,
      listProduct: newProducts,
    });
  } catch (error) {
    res.send("404");
  }
};
