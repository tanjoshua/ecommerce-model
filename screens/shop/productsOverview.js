import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductDisplay from "../../components/shop/ProductDisplay";

// render product
const renderProduct = (itemData) => {
  return (
    <ProductDisplay
      image={itemData.item.imageUrl}
      title={itemData.item.title}
      price={itemData.item.price}
      onViewDetails={() => {}}
      onAddToCart={() => {}}
    />
  );
};

// component
const ProductsOverView = (props) => {
  //get products from redux
  const products = useSelector((state) => state.products.availableProducts);
  return <FlatList data={products} renderItem={renderProduct} />;
};

// set nav options
ProductsOverView.navigationOptions = (navData) => {
  return {
    headerTitle: "Products",
  };
};
export default ProductsOverView;
