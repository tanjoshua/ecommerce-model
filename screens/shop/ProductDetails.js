import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { addToCart } from "../../store/actions/cartAction";

const ProductDetails = (props) => {
  //get dispatch function
  const dispatch = useDispatch();

  const productId = props.route.params.productId;
  const product = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );
  return (
    <ScrollView style={styles.screen}>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.addButton}>
        <Button
          title="Add To Cart"
          color={Colors.primary}
          onPress={() => dispatch(addToCart(product))}
        />
      </View>
      <View>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

export const navOptions = (navData) => {
  const productTitle = navData.route.params.productTitle;
  return {
    headerTitle: productTitle,
  };
};

const styles = StyleSheet.create({
  screen: {},
  image: {
    height: Dimensions.get("window").height * 0.4,
    width: "100%",
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    padding: 10,
  },
  addButton: {
    alignItems: "center",
    marginVertical: 10,
  },
});

export default ProductDetails;
