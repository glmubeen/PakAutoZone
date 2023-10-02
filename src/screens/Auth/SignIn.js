import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import Input from '../../components/Input';
import MyStatusBar from '../../components/StatusBar';
import BaseURL from '../../constants/apiEndPoints';
import axios from '../../utils/axios';
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';
import {login} from '../../store/action/user';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const fcm = useSelector(state => state.userReducer.fcm);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const _handleLogin = () => {
    setIsLoader(true);
    let payload = {
      email: email,
      password: password,
    };

    axios
      .post(BaseURL.LOGIN, payload)
      .then(res => {
        let params = {
          fcm_token: fcm,
        };
        axios
          .post(BaseURL.POST_FCM, params, {
            headers: {
              Authorization: res.data.accessToken,
            },
          })
          .then(response => {
            dispatch(login(res.data));
            setIsLoader(false);
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomNavigator'}],
            });
          })
          .catch(error => {});
      })
      .catch(err => {
        setIsLoader(false);
        setShowAlert(true);
        setAlertText(err?.data?.message);
      });
  };
  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <View className={'mt-14 ml-6'}>
            <Text className={'text-2xl font-semibold text-black'}>
              Hi, Welcome Back! 👋
            </Text>
            <Text className={'text-base text-slate-400'}>
              Hello again, you’ve been missed!
            </Text>
          </View>
          <View className={'flex items-center mt-12'}>
            <Input
              mainText={'Email or Phone Number'}
              placeholderText={'Enter Email or Phone Number'}
              value={email}
              handleOnChangeTxt={text => setEmail(text)}
              keyboardType={'email-address'}
            />
            <Input
              mainText={'Password'}
              placeholderText={'Enter Password'}
              value={password}
              handleOnChangeTxt={text => setPassword(text)}
              isPassword
            />
            <Text
              onPress={() => navigation.navigate('ForgetPassword')}
              className={
                'text-lg font-medium text-[#FF3C57] flex self-end mr-6 mt-1'
              }>
              Forget Password
            </Text>
            <TouchableOpacity
              onPress={() => _handleLogin()}
              activeOpacity={0.7}
              style={{width: width * 0.86}}
              className={
                'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg mt-3'
              }>
              <Text className={'text-xl font-semibold text-white'}>Login</Text>
            </TouchableOpacity>
            {/* <View className={'flex flex-row mt-3'}>
              <Text className={'text-slate-500 text-base -mt-1'}>
                ______________{' '}
              </Text>
              <Text className={'text-slate-500 text-base'}>Or With</Text>
              <Text className={'text-slate-500 text-base -mt-1'}>
                {' '}
                _____________
              </Text>
            </View> */}
            {/* <View
              style={{width: width * 0.85}}
              className={'flex flex-row mt-3 justify-between items-center'}>
              <TouchableOpacity
                activeOpacity={0.7}
                className={
                  'w-36 p-2 rounded-lg bg-[#1877F2] flex items-center'
                }>
                <Image
                  source={Images.facebooklogo}
                  className={'w-28 h-10'}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                className={'w-36 p-2 rounded-lg bg-white flex items-center'}>
                <Image
                  source={Images.googleLogo}
                  className={'w-28 h-10'}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View> */}
            <Text
              className={'text-base text-slate-600 mt-6'}
              onPress={() => navigation.navigate('SignUp')}>
              Don’t have an account ?{' '}
              <Text className={'text-black'}>Sign Up</Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
      <Alert
        isVisible={showAlert}
        message={alertText}
        onPress={() => {
          setAlertText('');
          setShowAlert(false);
        }}
      />
    </>
  );
};

export default Index;
