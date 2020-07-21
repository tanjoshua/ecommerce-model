import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetails from "../screens/shop/ProductDetails";
import Cart from "../screens/shop/Cart";
import Orders from "../screens/shop/Orders";
import UserProducts from "../screens/user/UserProducts";
import EditProduct from "../screens/user/EditProduct";

import Colors from "../constants/Colors";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

// const default nav options
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.accent,
};

// stack nav for products
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverview,
    ProductDetails: ProductDetails,
    Cart: Cart,
  },
  {
    // navigation options as a screen
    navigationOptions: {
      drawerIcon: (drawerConfig) => <Ionicons name="md-cart" size={20} />,
    },
    //default options (for display)
    defaultNavigationOptions: defaultNavOptions,
  }
);

//stack nav for orders
const OrdersNavigator = createStackNavigator(
  {
    Orders: Orders,
  },
  {
    // navigation options as a screen
    navigationOptions: {
      drawerIcon: (drawerConfig) => <Ionicons name="md-list" size={20} />,
    },
    //default options (for display)
    defaultNavigationOptions: defaultNavOptions,
  }
);

//stack nav for user
const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProducts,
    EditProduct: EditProduct,
  },
  {
    // navigation options as a screen
    navigationOptions: {
      drawerIcon: (drawerConfig) => <Ionicons name="md-create" size={20} />,
    },
    //default options (for display)
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  Admin: AdminNavigator,
});

export default createAppContainer(ShopNavigator);