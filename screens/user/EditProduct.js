import React, { useState, useCallback, useEffect, useReducer } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import {
  createProduct,
  updateProduct,
} from "../../store/actions/productAction";
import Input from "../../components/UI/Input";

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      // update values
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      // update validities
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };

      // check if form is valid
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }

      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
      };
  }
};

const EditProduct = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.productsByUser.find((product) => product.id === productId)
  );

  // reducer for form data
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: editedProduct ? editedProduct.price.toString() : "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Error", "Wrong Input", [{ text: "Ok" }]);
      return;
    }
    setIsLoading(true);
    if (editedProduct) {
      await dispatch(
        updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
      setIsLoading(false);
      props.navigation.goBack();
    } else {
      await dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
      props.navigation.goBack();
    }
  }, [productId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  // change text handler for all inputs
  const inputChangeHandler = useCallback(
    (inputIdentifier, value, isValid) => {
      dispatchForm({
        type: "UPDATE",
        value: value,
        isValid: isValid,
        input: inputIdentifier,
      });
    },
    [dispatchForm]
  );

  // if loading
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label="Title"
          id="title"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ""}
          initialValidity={!!editedProduct} // cast to boolean
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next" // only controls display
          required
        />
        <Input
          label="Image Url"
          id="imageUrl"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ""}
          initialValidity={!!editedProduct} // cast to boolean
          required
        />
        <Input
          label="price"
          id="price"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.price.toString() : ""}
          initialValidity={!!editedProduct} // cast to boolean
          keyboardType="decimal-pad"
          required
          min={0}
        />
        <Input
          label="description"
          id="description"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ""}
          initialValidity={!!editedProduct} // cast to boolean
          multiline
          required
        />
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
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export const navOptions = (navData) => {
  const submit = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" iconName="md-checkmark" onPress={submit} />
      </HeaderButtons>
    ),
  };
};

export default EditProduct;
