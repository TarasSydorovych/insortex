const withdrawnCategoryId = "672e281b594fc61eeaf887f0";
const withdrawnProductId = "673cb9560da4bc413f2835e9";

export const publishedCategoryFilter = { _id: { $ne: withdrawnCategoryId } };
export const publishedProductFilter = {
  _id: { $ne: withdrawnProductId },
  category: { $ne: withdrawnCategoryId },
};
