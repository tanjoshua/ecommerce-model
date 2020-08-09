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

    const data = await response.json();
    console.log(data);

    dispatch({ type: "SIGNUP" });
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

    const data = await response.json();
    console.log(data);

    dispatch({ type: "SIGNIN" });
  };
};
