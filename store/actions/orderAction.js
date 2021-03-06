import Order from "../../models/order";

export const addOrder = (cartItems, totalCost) => {
  return async (dispatch, getState) => {
    // get user token & userId
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    // get date
    const date = new Date();

    // send to database
    const response = await fetch(
      `https://ecommerce-44026.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalCost,
          date: date.toISOString(),
        }),
      }
    );

    // get id from response
    const data = await response.json();

    //send to reducer
    dispatch({
      type: "ADD_ORDER",
      id: data.name,
      items: cartItems,
      cost: totalCost,
      date: date,
    });
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    // get userId from redux state
    const userId = getState().auth.userId;

    // get from database
    const response = await fetch(
      `https://ecommerce-44026.firebaseio.com/orders/${userId}.json`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    // convert object response to array
    const orders = [];
    for (const key in data) {
      orders.push(
        new Order(
          key,
          data[key].cartItems,
          data[key].totalCost,
          new Date(data[key].date)
        )
      );
    }
    dispatch({
      type: "SET_ORDERS",
      orders: orders,
    });
  };
};
