import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";

const ProductDisplay = (props) => {
  let Touchable = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  }
  return (
    <View>
      <Touchable onPress={props.onSelect} useForeground>
        <View style={styles.product}>
          <Image style={styles.image} source={{ uri: props.image }} />
          <View style={styles.summaryDetails}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>

          <View style={styles.actions}>{props.children}</View>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    elevation: 2,
    borderRadius: 10,
    height: 300,
    width: "90%",
    backgroundColor: "white",
    margin: 20,
    padding: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  title: {
    fontSize: 20,
    marginVertical: 5,
  },
  price: {
    fontSize: 15,
    color: "darkgray",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryDetails: {
    alignItems: "center",
  },
});

export default ProductDisplay;
