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

const Index = ({navigation, ...props}) => {
  const data = props?.route?.params?.data;
  const email = props?.route?.params?.email;

  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const fcm = useSelector(state => state.userReducer.fcm);

  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const _handleVerifyOtp = () => {
    if (code === '') {
      alert('Please enter a otp code');
    } else {
      if (code != data?.token) {
        alert('Please enter a valid code');
      } else {
        navigation.navigate('ResetPassword', {data: data, email: email});
      }
    }
  };
  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <View className={'mt-14 ml-6'}>
            <Text className={'text-2xl font-semibold text-black'}>
              Verify Otp
            </Text>
            <Text className={'text-base text-slate-400'}>
              Forgot your password?
            </Text>
          </View>
          <View className={'flex items-center mt-12'}>
            <Input
              mainText={'Otp'}
              placeholderText={'Enter your otp'}
              value={code}
              handleOnChangeTxt={text => setCode(text)}
              keyboardType={'email-address'}
            />

            <TouchableOpacity
              onPress={() => _handleVerifyOtp()}
              activeOpacity={0.7}
              style={{width: width * 0.9}}
              className={
                'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg mt-3'
              }>
              <Text className={'text-xl font-semibold text-white'}>
                Verify Otp
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
