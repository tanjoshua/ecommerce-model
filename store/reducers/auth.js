const initialState = {
  token: null,
  userId: null,
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP":
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case "SIGNIN":
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case "LOGOUT":
      return state;
    default:
      return state;
  }
};
