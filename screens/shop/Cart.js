import React from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import { removeFromCart } from "../../store/actions/cartAction";
import { addOrder } from "../../store/actions/orderAction";

const Cart = (props) => {
  const dispatch = useDispatch();

  //render
  const renderCartItem = (itemData) => {
    return (
      <CartItem
        title={itemData.item.title}
        cost={itemData.item.sum}
        quantity={itemData.item.quantity}
        remove={() => {
          dispatch(removeFromCart(itemData.item.id));
        }}
        deletable
      />
    );
  };

  // get cart items
  const cartTotalCost = useSelector((state) => state.cart.totalCost);
  const cartItems = useSelector((state) => {
    let result = [];
    for (const key in state.cart.items) {
      result.push({
        id: key,
        title: state.cart.items[key].title,
        price: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return result;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.cost}>Total: {cartTotalCost.toFixed(2)}</Text>
        <Button
          title="Place Order"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addOrder(cartItems, cartTotalCost));
          }}
        />
      </View>
      <View>
        <FlatList data={cartItems} renderItem={renderCartItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 20,
    elevation: 2,
    backgroundColor: "white",
    borderRadius: 10,
  },
  cost: {},
});

export default Cart;
