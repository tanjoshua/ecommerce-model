import React from "react";
import { View, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const Orders = (props) => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          cost={itemData.item.totalCost}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

Orders.navigationOptions = (navData) => {
  return {
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
  };
};

export default Orders;
