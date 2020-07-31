import Order from "../../models/order";

const initialState = {
  orders: [],
};

export default orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      const newOrder = new Order(
        action.id,
        action.items,
        action.cost,
        action.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    case "SET_ORDERS":
      return {
        ...state,
        orders: action.orders,
      };
    default:
      return state;
  }
};
