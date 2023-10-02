import {
  USER_LOGOUT,
  USER_LOGIN,
  CAR_INFO,
  REMOVE_CAR_INFO,
  IS_SLIDER,GET_FCM
} from '../actionType';

export const logout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const login = userData => {
  return {
    type: USER_LOGIN,
    userData,
  };
};

export const SaveCar = carInfo => {
  return {
    type: CAR_INFO,
    carInfo,
  };
};

export const DeleteCar = carInfo => {
  return {
    type: REMOVE_CAR_INFO,
    carInfo,
  };
};
export const getFCM = fcm => {
  return {
    type: GET_FCM,
    fcm,
  };
};

export const isSlider = () => {
  return {
    type: IS_SLIDER,
  };
};
