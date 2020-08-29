const initialState = {
  token: null,
  userId: null,
  triedAutoLogin: false,
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        triedAutoLogin: true,
      };
    case "SET_TAL":
      return {
        ...state,
        triedAutoLogin: true,
      };
    case "LOGOUT":
      return { ...initialState, triedAutoLogin: true };
    default:
      return state;
  }
};
