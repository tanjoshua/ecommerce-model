import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  // create reducer
  const [inputState, inputDispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initialValidity,
  });

  // pass on to parent
  useEffect(() => {
    props.onInputChange(props.id, inputState.value, inputState.isValid);
  }, [inputState]);

  const onTextChangeHandler = (text) => {
    // validation, can use validate.js too
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    inputDispatch({ type: "UPDATE", value: text, isValid: isValid });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props} //forward prop
        style={styles.input}
        value={inputState.value}
        onChangeText={onTextChangeHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Input;
