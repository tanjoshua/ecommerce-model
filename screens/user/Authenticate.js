import React, { useReducer, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, Button } from "react-native";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { signup } from "../../store/actions/authActions";

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
    default:
      return state;
  }
};

const Authenticate = (props) => {
  const dispatch = useDispatch();

  // reducer for form data
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const signupHandler = () => {
    dispatch(
      signup(formState.inputValues.email, formState.inputValues.password)
    );
  };

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

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <ScrollView style={styles.section}>
          <Input
            id="email"
            label="Email"
            keyboardType="email-address"
            required
            email
            onInputChange={inputChangeHandler}
            autoCapitalize="none"
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            required
            secureTextEntry
            onInputChange={inputChangeHandler}
            autoCapitalize="none"
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              color={Colors.primary}
              onPress={signupHandler}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Sign Up" color={Colors.accent} onPress={() => {}} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

Authenticate.navigationOptions = {
  headerTitle: "Log In",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    padding: 10,
  },
  buttonContainer: {
    marginVertical: 5,
  },
});

export default Authenticate;
