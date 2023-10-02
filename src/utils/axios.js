import axios from 'axios';
import endPoints from '../constants/apiEndPoints';
import RNRestart from 'react-native-restart';

// redux impo
import {store} from '../store/store';
import {logout} from '../store/action/user';

// setup base thing
const apiRequest = axios.create({
  baseURL: endPoints.BASE_URL,
  responseType: 'json',
  headers: {'Content-Type': 'application/json'},
});

apiRequest.interceptors.response.use(
  response => {
    if (response.status == 200 || response.status == 201) {
      return Promise.resolve(response);
    }
  },
  error => {
    // todo for login
    if (error.response.status === 401) {
      store.dispatch(logout()); //Temporarily disabled this as other 401 calls logs out the user
      setTimeout(() => {
        RNRestart.Restart();
      }, 500);
    }

    return Promise.reject(error.response);
  },
);

export default apiRequest;
