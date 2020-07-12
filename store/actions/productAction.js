export const deleteProduct = (productId) => {
  return { type: "DELETE_PRODUCT", id: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return {
    type: "CREATE_PRODUCT",
    productData: { title, description, imageUrl, price },
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  return {
    type: "UPDATE_PRODUCT",
    productId: id,
    productData: { title, description, imageUrl, price },
  };
};
