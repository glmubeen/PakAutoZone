const _Environments = {
  development: {
    BASE_URL: `https://zone-pak-auto-7c45031a6489.herokuapp.com/`,
    LOGIN: `user/login`,
    FORGOTTEN_PASSWORD: 'user/forgotpass',
    UPDATE_USER: 'user/update',
    SIGN_UP: `user/register`,
    CAR_BRAND: `user/cars/brands`,
    BIKE_BRAND: `user/bikes/brands`,
    CAR_BRAND_MODAL: `user/listings/cars/b/`,
    BIKE_BRAND_MODAL: `user/listings/bikes/b/`,
    USED_CAR: `user/listings/cars/`,
    USED_BIKE: `user/listings/bikes/`,
    POST_CAR: `user/listings/cars/new`,
    POST_BIKE: `user/listings/bikes/new`,
    GET_CITIES: `user/cities`,
    GET_FEATURES: `user/cars/features`,
    GET_BIKE_FEATURES: `user/bikes/features`,
    COMPARE: `user/listings/cars/compare/`,
    BIKE_COMPARE: `user/listings/bikes/compare/`,
    MY_ADS: `user/myads`,
    GET_AUTO_PARTS: `user/listings/autoparts`,
    GET_CATEGORY: `user/autoparts/`,
    ADD_AUTO_PARTS: `user/listings/autopart/new`,
    ORDER_AUTO_PARTS: `user/listings/autopart/order/new`,
    SEARCH: `user/listings/search/`,
    MY_ORDERS: `user/myorders`,
    NEW_CHAT: `user/chat/new`,
    CHAT_LIST: `user/chatlist`,
    POST_FCM: `user/checkfcm`,
    POST_NOTIFICATION: `user/sendnoti`,
    SEND_EMAIL: `/emails/sendmail`,
  },
};

function getEnvironment() {
  const platform = 'development';
  return _Environments[platform];
}

const Environment = getEnvironment();
export default Environment;
