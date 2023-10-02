import {
  USER_LOGOUT,
  USER_LOGIN,
  CAR_INFO,
  REMOVE_CAR_INFO,
  IS_SLIDER,
  GET_FCM,
} from '../actionType';

// init state
const initState = {
  userData: {},
  isLogin: false,
  profilePicture: null,
  carInfo: [],
  isSlider: false,
  fcm: '',
};

export default reducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        ...state,
        isLogin: false,
        userData: {},
      };
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        userData: action.userData,
      };
    case CAR_INFO:
      // make a copy
      const tempCarInfo = [...state.carInfo];

      // find the current obj Ind
      let currentItemInd = tempCarInfo.findIndex(
        i => i._id === action.carInfo._id,
      );
      if (currentItemInd !== -1) {
      } else {
        // add a quantity property
        let tempNewObj = {...action.carInfo};
        // this item is new one just push
        tempCarInfo.push(tempNewObj);
      }
      return {
        ...state,
        carInfo: tempCarInfo,
      };
    case REMOVE_CAR_INFO:
      // make a copy
      let tempCartR = [...state.carInfo];
      let currentItemIndR = tempCartR.findIndex(
        i => i._id === action.carInfo._id,
      );

      if (currentItemIndR !== -1) {
        tempCartR.splice(currentItemIndR, 1);
      }
      return {
        ...state,
        carInfo: tempCartR,
      };
    case IS_SLIDER:
      return {
        ...state,
        isSlider: true,
      };
    case GET_FCM:
      return {
        ...state,
        fcm: action.fcm,
      };

    default:
      return state;
  }
};
