import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

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
import Authenticate from "../screens/user/Authenticate";
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
const OrdersStack = createStackNavigator();
const OrdersNavigator = () => {
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
const AdminStack = createStackNavigator();
const AdminNavigator = () => {
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

// drawer navigator for shop
const ShopDrawer = createDrawerNavigator();

const ShopNavigator = () => {
  return (
    <ShopDrawer.Navigator>
      <ShopDrawer.Screen name="Products" component={ProductsNavigator} />
      <ShopDrawer.Screen name="Orders" component={OrdersNavigator} />
      <ShopDrawer.Screen name="Admin" component={AdminNavigator} />
    </ShopDrawer.Navigator>
  );
};

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 35 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="logout"
              onPress={() => {
                dispatch(logout());
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

//stack navigator for authentication
const AuthNavigator = createStackNavigator(
  {
    Auth: Authenticate,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

// switch navigator
const MainNavigator = createSwitchNavigator({
  Startup: Startup,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
