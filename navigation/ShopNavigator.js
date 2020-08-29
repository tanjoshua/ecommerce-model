import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import ProductsOverview, {
  navOptions as productsOverviewOptions,
} from "../screens/shop/ProductsOverview";
import ProductDetails, {
  navOptions as productDetailsOptions,
} from "../screens/shop/ProductDetails";
import Cart from "../screens/shop/Cart";
import Orders, { navOptions as ordersOptions } from "../screens/shop/Orders";
import UserProducts, {
  navOptions as userProductsOptions,
} from "../screens/user/UserProducts";
import EditProduct, {
  navOptions as editProductOptions,
} from "../screens/user/EditProduct";
import Authenticate, {
  navOptions as authenticateOptions,
} from "../screens/user/Authenticate";
import Startup from "../screens/Startup";

import Colors from "../constants/Colors";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import { View, SafeAreaView, Button } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/authActions";
import orders from "../store/reducers/orders";

// const default nav options
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.accent,
};

// stack nav for products
const ProductsStack = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator screenOptions={defaultNavOptions}>
      <ProductsStack.Screen
        name="ProductsOverview"
        component={ProductsOverview}
        options={productsOverviewOptions}
      />
      <ProductsStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={productDetailsOptions}
      />
      <ProductsStack.Screen name="Cart" component={Cart} />
    </ProductsStack.Navigator>
  );
};

//stack nav for orders
const OrdersStack = createStackNavigator();
export const OrdersNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultNavOptions}>
      <OrdersStack.Screen
        name="Orders"
        component={Orders}
        options={ordersOptions}
      />
    </OrdersStack.Navigator>
  );
};

//stack nav for user
const AdminStack = createStackNavigator();
export const AdminNavigator = () => {
  return (
    <AdminStack.Navigator screenOptions={defaultNavOptions}>
      <AdminStack.Screen
        name="UserProducts"
        component={UserProducts}
        options={userProductsOptions}
      />
      <AdminStack.Screen
        name="EditProduct"
        component={EditProduct}
        options={editProductOptions}
      />
    </AdminStack.Navigator>
  );
};

// drawer navigator for shop
const ShopDrawer = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawer.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 35 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="logout"
                onPress={() => {
                  dispatch(logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <ShopDrawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-cart" size={20} color={props.color} />
          ),
        }}
      />
      <ShopDrawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-list" size={20} color={props.color} />
          ),
        }}
      />
      <ShopDrawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-create" size={20} color={props.color} />
          ),
        }}
      />
    </ShopDrawer.Navigator>
  );
};

//stack navigator for authentication
const AuthStack = createStackNavigator();
export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={defaultNavOptions}>
      <AuthStack.Screen
        name="Auth"
        component={Authenticate}
        options={authenticateOptions}
      />
    </AuthStack.Navigator>
  );
};
