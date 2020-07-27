import Product from "../../models/product";

export const deleteProduct = (productId) => {
  return { type: "DELETE_PRODUCT", id: productId };
};

// create product - send to server and send to redux store
export const createProduct = (title, description, imageUrl, price) => {
  // return dispatch bc of redux thunk
  return async (dispatch) => {
    // send to database
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

    // dispatch to reducer
    dispatch({
      type: "CREATE_PRODUCT",
      productData: { id: data.name, title, description, imageUrl, price },
    });
  };
};

// update product
export const updateProduct = (id, title, description, imageUrl, price) => {
  return {
    type: "UPDATE_PRODUCT",
    productId: id,
    productData: { title, description, imageUrl, price },
  };
};

// set products - get all the products from server
export const fetchProducts = () => {
  return async (dispatch) => {
    // send to database
    const response = await fetch(
      "https://ecommerce-44026.firebaseio.com/products.json",
      {
        method: "GET",
      }
    );

    const data = await response.json();

    // convert object response to array
    const newProducts = [];
    for (const key in data) {
      newProducts.push(
        new Product(
          key,
          "u1",
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price
        )
      );
    }

    // dispatch products to store
    dispatch({ type: "SET_PRODUCTS", products: newProducts });
  };
};
