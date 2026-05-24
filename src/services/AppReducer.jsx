const localToken = localStorage.getItem("token");
const localUser = localStorage.getItem("user");
const localHistory = JSON.parse(localStorage.getItem("history"));

export const initialState = {
  isLoggedIn: !!localToken,
  userName: localUser,
  localHistory: localHistory,
  birdDetail: null,
  isResetEmailSet: null,
  uploadResponse: null,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "1stepRegistration":
      return { ...state, otpModule: action.payload };
    case "login":
      return { ...state, isLoggedIn: true };
    case "SET_USER":
      return { ...state, userName: action.payload };
    case "SET_BIRDDETAIL":
      return { ...state, birdDetail: action.payload };
    case "Email_Setter":
      return { ...state, isResetEmailSet: action.payload };
    case "Upload_Response":
      return { ...state, uploadResponse: action.payload };
      case "SET_LOCAL_HISTORY":
      return { ...state, localHistory: action.payload };
      

    case "logout":
      return {
        ...state,
        isLoggedIn: false,
        userName: null,
      };
    default:
      return state;
  }
};
