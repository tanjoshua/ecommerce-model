import Product from "../../models/product";

export const deleteProduct = (productId) => {
  // send to reducer
  return async (dispatch, getState) => {
    // get user token
    const token = getState().auth.token;

    // delete request to database
    await fetch(
      `https://ecommerce-44026.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    dispatch({ type: "DELETE_PRODUCT", id: productId });
  };
};

// create product - send to server and send to redux store
export const createProduct = (title, description, imageUrl, price) => {
  // return dispatch bc of redux thunk
  return async (dispatch, getState) => {
    // get user token & userId
    console.log(getState());
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    // send to database
    const response = await fetch(
      `https://ecommerce-44026.firebaseio.com/products.json?auth=${token}`,
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
          userId,
        }),
      }
    );

    // use response as id
    const data = await response.json();

    console.log(data);

    // dispatch to reducer
    dispatch({
      type: "CREATE_PRODUCT",
      productData: {
        id: data.name,
        title,
        description,
        imageUrl,
        price,
        userId,
      },
    });
  };
};

// update product
export const updateProduct = (id, title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    // get user token
    const token = getState().auth.token;

    // send to server
    await fetch(
      `https://ecommerce-44026.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH", // only update in specific place
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

    // dispatch to reducer
    dispatch({
      type: "UPDATE_PRODUCT",
      productId: id,
      productData: { title, description, imageUrl, price },
    });
  };
};

// set products - get all the products from server
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

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
          data[key].userId,
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price
        )
      );
    }

    // dispatch products to store
    dispatch({
      type: "SET_PRODUCTS",
      products: newProducts,
      productsByUser: newProducts.filter(
        (product) => product.ownerId === userId
      ),
    });
  };
};
