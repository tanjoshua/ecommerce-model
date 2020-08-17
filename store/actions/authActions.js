import { Alert } from "react-native";
import { AsyncStorage } from "react-native";

let timer;

export const signup = (email, password) => {
  return async (dispatch) => {
    // send to database
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8ujQbInx-mQboBHezjEEG04dpQmJYLs8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;

      let message = "something went wrong";

      switch (errorId) {
        case "EMAIL_EXISTS":
          message = "email already exists";
      }

      throw new Error(message);
    }

    const data = await response.json();
    console.log(data);

    dispatch(
      authenticate(data.idToken, data.localId, parseInt(data.expiresIn) * 1000)
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    );

    saveDataToStorage(data.idToken, data.localId, expirationDate);
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    // send to database
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8ujQbInx-mQboBHezjEEG04dpQmJYLs8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;

      let message = "something went wrong";
      switch (errorId) {
        case "EMAIL_NOT_FOUND":
          message = "email could not be found";
        case "INVALID_PASSWORD":
          message = "password invalid";
      }

      throw new Error(message);
    }

    const data = await response.json();

    dispatch(
      authenticate(data.idToken, data.localId, parseInt(data.expiresIn) * 1000)
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    );

    saveDataToStorage(data.idToken, data.localId, expirationDate);
  };
};

// auto login
export const authenticate = (token, userId, expirationTime) => {
  // set logout timer and signin
  return (dispatch) => {
    dispatch(setLogoutTimer(expirationTime));
    dispatch({
      type: "AUTHENTICATE",
      token: token,
      userId: userId,
    });
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return {
    type: "LOGOUT",
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

// save user data
const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expirationDate: expirationDate.toISOString(),
    })
  );
};
