import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ShopNavigator, AuthNavigator } from "./ShopNavigator";
import Startup from "../screens/Startup";

const ProductNav = createStackNavigator();

const AppNavigator = (props) => {
  // check if user is authenticated / timeout. Get as a boolean
  const isAuth = useSelector((state) => !!state.auth.token);
  const triedAutoLogin = useSelector((state) => state.auth.triedAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && triedAutoLogin && <AuthNavigator />}
      {!isAuth && !triedAutoLogin && <Startup />}
    </NavigationContainer>
  );
};

export default AppNavigator;
