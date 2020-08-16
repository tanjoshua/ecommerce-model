import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { authenticate } from "../store/actions/authActions";
import { useDispatch } from "react-redux";

const Startup = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      // convert from string to js object
      const transformedData = JSON.parse(userData);

      const { token, userId, expirationDate } = transformedData;

      // check if token is valid
      if (new Date(expirationDate) <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      // token is valid
      props.navigation.navigate("Shop");

      // log user in
      dispatch(authenticate(token, userId));
    };

    tryLogin();
  });

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Startup;
