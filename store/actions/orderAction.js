export const addOrder = (cartItems, totalCost) => {
  return { type: "ADD_ORDER", items: cartItems, cost: totalCost };
};
