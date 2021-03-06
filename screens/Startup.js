import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { authenticate, setTriedAutoLogin } from "../store/actions/authActions";
import { useDispatch } from "react-redux";

const Startup = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        dispatch(setTriedAutoLogin());
        return;
      }
      // convert from string to js object
      const transformedData = JSON.parse(userData);

      const { token, userId, expirationDate } = transformedData;

      // check if token is valid
      if (new Date(expirationDate) <= new Date() || !token || !userId) {
        dispatch(setTriedAutoLogin());
        return;
      }

      // token is valid
      // calculate how much time left for token
      const expirationTime =
        new Date(expirationDate).getTime() - new Date().getTime();

      // log user in
      dispatch(authenticate(token, userId, expirationTime));
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
