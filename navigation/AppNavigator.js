import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ProductsNavigator } from "./ShopNavigator";
import ProductsOverview from "../screens/shop/ProductsOverview";

const ProductNav = createStackNavigator();

const AppNavigator = (props) => {
  // check if user is authenticated / timeout. Get as a boolean
  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
