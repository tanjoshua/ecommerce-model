import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductDisplay from "../../components/shop/ProductDisplay";
import { addToCart } from "../../store/actions/cartAction";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

// component
const ProductsOverView = (props) => {
  // get dispatch function
  const dispatch = useDispatch();

  // render product
  const renderProduct = (itemData) => {
    return (
      <ProductDisplay
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetails={() => {
          props.navigation.navigate("ProductDetails", {
            productId: itemData.item.id,
            productTitle: itemData.item.title,
          });
        }}
        onAddToCart={() => dispatch(addToCart(itemData.item))}
      />
    );
  };

  //get products from redux
  const products = useSelector((state) => state.products.availableProducts);
  return <FlatList data={products} renderItem={renderProduct} />;
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
export default ProductsOverView;
