import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductDisplay from "../../components/shop/ProductDisplay";
import { addToCart } from "../../store/actions/cartAction";
import { fetchProducts } from "../../store/actions/productAction";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

// component
const ProductsOverView = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  // get dispatch function
  const dispatch = useDispatch();

  const selectProductHandler = (id, title) => {
    props.navigation.navigate("ProductDetails", {
      productId: id,
      productTitle: title,
    });
  };

  // render product
  const renderProduct = (itemData) => {
    return (
      <ProductDisplay
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => {
          selectProductHandler(itemData.item.id, itemData.item.title);
        }}
      >
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={() => {
            selectProductHandler(itemData.item.id, itemData.item.title);
          }}
        />
        <Button
          color={Colors.primary}
          title="To Cart"
          onPress={() => dispatch(addToCart(itemData.item))}
        />
      </ProductDisplay>
    );
  };

  //get products from redux
  const products = useSelector((state) => state.products.availableProducts);

  // get products from server
  useEffect(() => {
    setIsLoading(true);
    // async function to fetch products
    const getProducts = async () => {
      await dispatch(fetchProducts());
      setIsLoading(false);
    };

    getProducts();
  }, []);

  // if loading, show loader, if not show flatlist
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  } else if (!isLoading && products.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>No Products Found!</Text>
      </View>
    );
  } else {
    return <FlatList data={products} renderItem={renderProduct} />;
  }
};

// set nav options
ProductsOverView.navigationOptions = (navData) => {
  return {
    headerTitle: "Products",

    // add drawer
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default ProductsOverView;
