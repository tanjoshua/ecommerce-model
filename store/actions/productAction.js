export const deleteProduct = (productId) => {
  return { type: "DELETE_PRODUCT", id: productId };
};
