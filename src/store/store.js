import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

// local imp
import userReducer from './reducer/user';
import cartReducer from './reducer/cart';

// config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userReducer', 'cartReducer'],
};

//  root reducer
const rootReducer = combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer,
});

const persiReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persiReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
