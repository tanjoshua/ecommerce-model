import Order from "../../models/order";

const initialState = {
  orders: [],
};

export default orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      const newOrder = new Order(
        new Date().toString(),
        action.items,
        action.cost,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};
