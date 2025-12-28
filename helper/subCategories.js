const ProductCategory = require("../model/product-category.model");
const getSubCategories = async (parent_id) => {
  const subCategories = await ProductCategory.find({
    parent_id: parent_id,
    deleted: false,
    status: "active",
  }).select("_id title");

  let subAll = [...subCategories];

  for (const element of subCategories) {
    const subs = await getSubCategories(element.id);
    subAll = [...subAll, ...subs];
  }

  return subAll;
};

module.exports = (parent_id) => {
  return getSubCategories(parent_id);
};
