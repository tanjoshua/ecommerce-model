import { PRODUCTS } from "../../data/dummy-data";
import Product from "../../models/product";

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
    case "CREATE_PRODUCT":
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        productsByUser: state.productsByUser.concat(newProduct),
      };
    case "UPDATE_PRODUCT":
      const index = state.productsByUser.findIndex(
        (product) => product.id === action.productId
      );
      const updatedProduct = new Product(
        action.productId,
        state.productsByUser[index].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      // update user products
      const updatedUserProducts = [...state.productsByUser];
      updatedUserProducts[index] = updatedProduct;

      // update all products
      allProductsIndex = state.availableProducts.findIndex(
        (product) => product.id === action.productId
      );
      const updatedProducts = [...state.availableProducts];
      updatedProducts[allProductsIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedProducts,
        productsByUser: updatedUserProducts,
      };
  }
  return state;
};
