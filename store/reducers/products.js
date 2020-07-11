import { PRODUCTS } from "../../data/dummy-data";

const initialState = {
  availableProducts: PRODUCTS,
  productsByUser: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT":
      return {
        ...state,
        productsByUser: state.productsByUser.filter(
          (product) => product.id !== action.id
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.id
        ),
      };
  }
  return state;
};
