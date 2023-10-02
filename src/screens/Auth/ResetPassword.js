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
import {Images} from '../../assets/images';
import Input from '../../components/Input';
import MyStatusBar from '../../components/StatusBar';
import BaseURL from '../../constants/apiEndPoints';
import axios from '../../utils/axios';
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const minimumLength = 6;

const Index = ({navigation, ...props}) => {
  const data = props?.route?.params?.data;

  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const _handleResetPass = () => {
    if (password === '') {
      alert('Please create a new password');
    } else if (password.length < minimumLength) {
      alert(`Password at least greater than ${minimumLength} or more`);
    } else if (confirmPassword !== password) {
      alert('Do not match password');
    } else {
      setIsLoader(true);
      let payload = {
        password: password,
      };
      axios
        .put(BaseURL.UPDATE_USER + '/' + data?.userId, payload)
        .then(res => {
          setIsLoader(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          });
          if (res?.data?.message !== '') {
            alert(res?.data?.message);
          }
        })
        .catch(err => {
          console.log(err);
          setIsLoader(false);
          setShowAlert(true);
          setAlertText(err?.data?.message);
        });
    }
  };
  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <View className={'mt-14 ml-6'}>
            <Text className={'text-2xl font-semibold text-black'}>
              Reset Password! 👋
            </Text>
            <Text className={'text-base text-slate-400'}>
              Change your password
            </Text>
          </View>
          <View className={'flex items-center mt-12'}>
            <Input
              isPassword
              mainText={'New Password'}
              placeholderText={'Create your new password'}
              value={password}
              handleOnChangeTxt={text => setPassword(text)}
              keyboardType={'email-address'}
            />

            <Input
              isPassword
              mainText={'Confirm Password'}
              placeholderText={'Confirm your password'}
              value={confirmPassword}
              handleOnChangeTxt={text => setConfirmPassword(text)}
              keyboardType={'email-address'}
            />

            <TouchableOpacity
              onPress={() => _handleResetPass()}
              activeOpacity={0.7}
              style={{width: width * 0.9}}
              className={
                'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg mt-3'
              }>
              <Text className={'text-xl font-semibold text-white'}>
                Reset Password
              </Text>
            </TouchableOpacity>
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
