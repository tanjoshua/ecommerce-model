export const addOrder = (cartItems, totalCost) => {
  return async (dispatch) => {
    // get date
    const date = new Date();

    // send to database
    const response = await fetch(
      "https://ecommerce-44026.firebaseio.com/orders/u1.json",
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
