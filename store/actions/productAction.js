export const deleteProduct = (productId) => {
  return { type: "DELETE_PRODUCT", id: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    // send to data
    const response = await fetch(
      "https://ecommerce-44026.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    dispatch({
      type: "CREATE_PRODUCT",
      productData: { id: data.name, title, description, imageUrl, price },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  return {
    type: "UPDATE_PRODUCT",
    productId: id,
    productData: { title, description, imageUrl, price },
  };
};
