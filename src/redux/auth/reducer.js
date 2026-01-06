// import * as actionTypes from './types';

// const INITIAL_STATE = {
//   current: {},
//   isLoggedIn: false,
//   isLoading: false,
//   isSuccess: false,
// };

// const authReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case actionTypes.REQUEST_LOADING:
//       return {
//         ...state,
//         isLoggedIn: false,
//         isLoading: true,
//       };
//     case actionTypes.REQUEST_FAILED:
//       return INITIAL_STATE;

//     case actionTypes.REQUEST_SUCCESS:
//       return {
//         current: action.payload,
//         isLoggedIn: true,
//         isLoading: false,
//         isSuccess: true,
//       };

//     case actionTypes.REGISTER_SUCCESS:
//       return {
//         current: null,
//         isLoggedIn: false,
//         isLoading: false,
//         isSuccess: true,
//       };
//     case actionTypes.LOGOUT_SUCCESS:
//       return INITIAL_STATE;

//     case actionTypes.LOGOUT_FAILED:
//       return {
//         current: action.payload,
//         isLoggedIn: true,
//         isLoading: false,
//         isSuccess: true,
//       };

//     default:
//       return state;
//   }
// };

// export default authReducer;

import * as actionTypes from "./types";

const INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  authStatus: "idle",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: true,
        authStatus: "pending",
      };
    case actionTypes.REQUEST_FAILED:
      return {
        ...state,
        authStatus: "error",
      };

    case actionTypes.REQUEST_SUCCESS:
      return {
        current: action.payload,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        authStatus: "success",
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        current: null,
        isLoggedIn: false,
        isLoading: false,
        isSuccess: true,
        authStatus: "success",
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        INITIAL_STATE,
        authStatus: "idle",
      };

    case actionTypes.LOGOUT_FAILED:
      return {
        current: action.payload,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        authStatus: "failed_logout",
      };

    default:
      return state;
  }
};

export default authReducer;
