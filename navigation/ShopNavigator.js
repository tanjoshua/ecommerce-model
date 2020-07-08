import { createStackNavigator } from "react-navigation-stack";
import ProductsOverview from "../screens/shop/ProductsOverview";
import Colors from "../constants/Colors";
import { createAppContainer } from "react-navigation";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverview,
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
