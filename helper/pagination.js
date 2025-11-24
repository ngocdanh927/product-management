module.exports = async (objectPagination, query, Product, find) => {
  const countProduct = await Product.countDocuments(find);

  objectPagination.pageTotal = Math.ceil(
    countProduct / objectPagination.limitPage
  );

  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
    objectPagination.skipPage =
      (objectPagination.currentPage - 1) * objectPagination.limitPage;
  }
  return objectPagination;
};
