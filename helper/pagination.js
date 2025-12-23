module.exports = async (objectPagination, query, Items, find) => {
  const countItem = await Items.countDocuments(find);

  objectPagination.pageTotal = Math.ceil(
    countItem / objectPagination.limitPage
  );

  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
    objectPagination.skipPage =
      (objectPagination.currentPage - 1) * objectPagination.limitPage;
  }
  return objectPagination;
};
