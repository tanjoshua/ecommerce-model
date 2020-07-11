import React from "react";
import { View, TextInput, Text, ScrollView, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const EditProduct = (props) => {
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 10,
  },
  formControl: {},
  label: {
    marginVertical: 5,
  },
  input: {
    padding: 5,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
});

EditProduct.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" iconName="md-checkmark" onPress={() => {}} />
      </HeaderButtons>
    ),
  };
};

export default EditProduct;
