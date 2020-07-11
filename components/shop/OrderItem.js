import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";

const OrderItem = (props) => {
  // check if show details button is pressed
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.item}>
      <View style={styles.summary}>
        <Text>${props.cost.toFixed(2)}</Text>
        <Text>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide details" : "Show details"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              quantity={cartItem.quantity}
              cost={cartItem.sum}
              title={cartItem.title}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    elevation: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
    margin: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
});

export default OrderItem;
