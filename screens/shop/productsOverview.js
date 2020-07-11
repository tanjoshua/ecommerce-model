import React from "react";
import { View, Text, FlatList, Button } from "react-native";
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
