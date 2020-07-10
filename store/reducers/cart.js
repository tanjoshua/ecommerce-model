import CartItem from "../../models/cartItem";

const initialState = {
  items: {},
  totalCost: 0,
};

export default cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newProduct = action.product;

      //check if already in cart
      if (state.items[newProduct.id]) {
        //item already in cart
        const updatedCartItem = new CartItem(
          state.items[newProduct.id].quantity + 1,
          newProduct.price,
          newProduct.title,
          state.items[newProduct.id].sum + newProduct.price
        );

        return {
          ...state,
          items: { ...state.items, [newProduct.id]: updatedCartItem },
          totalCost: state.totalCost + newProduct.price,
        };
      } else {
        const newCartItem = new CartItem(
          1,
          newProduct.price,
          newProduct.title,
          newProduct.price
        );

        return {
          ...state,
          items: { ...state.items, [newProduct.id]: newCartItem },
          totalCost: state.totalCost + newProduct.price,
        };
      }
    case "REMOVE_FROM_CART":
      const id = action.productId;
      const currentQty = state.items[id].quantity;
      const price = state.items[id].price;

      let newCartItems = { ...state.items };
      if (currentQty > 1) {
        newCartItems[id].quantity = currentQty - 1;
      } else {
        delete newCartItems[id];
      }
      return {
        ...state,
        items: newCartItems,
        totalCost: state.totalCost - price,
      };
    case "ADD_ORDER":
      return initialState;
    default:
      return state;
  }
};
