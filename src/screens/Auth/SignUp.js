import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  Image,
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
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';
import {login} from '../../store/action/user';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const fcm = useSelector(state => state.userReducer.fcm);
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const _handleSignUp = () => {
    setIsLoader(true);
    let payload = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      phone: phoneNumber,
      password: password,
      location: location,
    };

    axios
      .post(BaseURL.SIGN_UP, payload)
      .then(res => {
        setIsLoader(false);
        if (res.data.success == false) {
          setShowAlert(true);
          setAlertText(res.data.message);
          setIsLoader(false);
        } else {
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
                .catch(error => {
                });
            })
            .catch(err => {
              setIsLoader(false);
              setShowAlert(true);
              setAlertText(err?.data?.message);
            });
        }
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <View className={'mt-14 ml-6'}>
            <Text className={'text-2xl font-semibold text-black'}>
              Create an account
            </Text>
            <Text className={'text-base text-slate-400'}>
              Connect with your friends today!
            </Text>
          </View>
          <View className={'flex items-center mt-12'}>
            <View
              className={'flex flex-row items-center justify-between -ml-4'}>
              <Input
                mainText={'Firstname'}
                placeholderText={'Enter Firstname'}
                value={firstname}
                handleOnChangeTxt={text => setFirstname(text)}
                inputWidth={{width: width * 0.4, marginRight: width * 0.1}}
              />
              <Input
                mainText={'Lastname'}
                placeholderText={'Enter Lastname'}
                value={lastname}
                handleOnChangeTxt={text => setLastname(text)}
                inputWidth={{width: width * 0.4}}
              />
            </View>
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
            <Input
              mainText={'Location'}
              placeholderText={'Enter Location'}
              value={location}
              handleOnChangeTxt={text => setLocation(text)}
            />
            <Input
              mainText={'Phone Number'}
              placeholderText={'03 xxxxxxx'}
              value={phoneNumber}
              handleOnChangeTxt={text => setPhoneNumber(text)}
              keyboardType={'numeric'}
            />
            <TouchableOpacity
              onPress={() => _handleSignUp()}
              activeOpacity={0.7}
              style={{width: width * 0.86}}
              className={
                'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg mt-3'
              }>
              <Text className={'text-xl font-semibold text-white'}>
                Sign Up
              </Text>
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
              style={{width: width * 0.86}}
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
