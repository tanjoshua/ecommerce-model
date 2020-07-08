import { createStackNavigator } from "react-navigation-stack";
import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetails from "../screens/shop/ProductDetails";
import Cart from "../screens/shop/Cart";

import Colors from "../constants/Colors";
import { createAppContainer } from "react-navigation";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverview,
    ProductDetails: ProductDetails,
    Cart: Cart,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: Colors.accent,
    },
  }
);

export default createAppContainer(ProductsNavigator);
