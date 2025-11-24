const Product = require("../../model/product.model");

const paginationHelper = require("../../helper/pagination");

//[GET] /admin/products
module.exports.index = async (req, res) => {
  const find = {};

  //?status =
  const availabilityStatus = req.query.status;
  if (availabilityStatus) {
    find.availabilityStatus = availabilityStatus;
  }

  //?keyword =
  const keyword = req.query.keyword;
  if (keyword) {
    const keyRegex = new RegExp(keyword, "i");
    find.title = keyRegex;
  }

  //?page=
  const objectPagination = await paginationHelper(
    {
      currentPage: 1,
      limitPage: 5,
    },
    req.query,
    Product,
    find
  );

  const products = await Product.find(find)
    .limit(objectPagination.limitPage)
    .skip(objectPagination.skipPage);
  res.render("admin/pages/products/index", {
    titlePage: "ProductAdmin",
    listProduct: products,
    status: availabilityStatus,
    keyword: keyword,
    pagination: objectPagination,
  });
};

//[GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { availabilityStatus: status });

  //back lai trang truoc
  const backURL = req.get("Referrer") || "/products";
  res.redirect(backURL);
};
//[GET] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const type = req.body.type;
    const ids = req.body.ids.split(",").map((id) => id.trim());
    console.log(ids);

    switch (type) {
      case "In Stock":
        await Product.updateMany(
          { _id: { $in: ids } },
          { availabilityStatus: "In Stock" }
        );
        break;
      case "Low Stock":
        await Product.updateMany(
          { _id: { $in: ids } },
          { availabilityStatus: "Low Stock" }
        );
        break;

      default:
        break;
    }

    //back lai trang truoc
    const backURL = req.get("Referrer") || "/products";
    res.redirect(backURL);
  } catch (err) {
    console.log(err);
    res.send("Error updating");
  }
};
