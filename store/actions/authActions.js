import { Alert } from "react-native";
import { AsyncStorage } from "react-native";

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

    dispatch({
      type: "SIGNUP",
      token: response.idToken,
      userId: response.localId,
    });
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

    dispatch({
      type: "SIGNIN",
      token: data.idToken,
      userId: data.localId,
    });

    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    );

    saveDataToStorage(data.idToken, data.localId, expirationDate);
  };
};

// auto login
export const authenticate = (token, userId) => {
  return {
    type: "SIGNIN",
    token: token,
    userId: userId,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
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
