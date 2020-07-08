import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

const ProductDetails = (props) => {
  const productId = props.navigation.getParam("productId");
  const product = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );
  return (
    <View>
      <Text>{product.title}</Text>
    </View>
  );
};

ProductDetails.navigationOptions = (navData) => {
  const productTitle = navData.navigation.getParam("productTitle");
  return {
    headerTitle: productTitle,
  };
};

const styles = StyleSheet.create({});

export default ProductDetails;
