import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View>
        <Text>{props.title}</Text>
        <View style={styles.itemData}>
          <Text style={styles.quantity}>Qty: {props.quantity}</Text>
          <Text style={styles.cost}>${props.cost.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={props.remove}>
        <Ionicons name="md-trash" size={25} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 10,
  },
  itemData: {
    flexDirection: "row",
  },
  quantity: {
    marginRight: 10,
  },
});

export default CartItem;
