import { PRODUCTS } from "../../data/dummy-data";

const initialState = {
  availableProducts: PRODUCTS,
  productsByUser: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default productsReducer = (state = initialState, action) => {
  return state;
};
