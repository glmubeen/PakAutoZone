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
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const fcm = useSelector(state => state.userReducer.fcm);

  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const _handleForgetPass = () => {
    if (email === '') {
      alert('Email is required');
    } else {
      setIsLoader(true);
      let payload = {
        email: email,
      };

      axios
        .post(BaseURL.FORGOTTEN_PASSWORD, payload)
        .then(res => {
          setIsLoader(false);
          if (res.data.success) {
            navigation.navigate('VerifyOtp', {data: res.data, email: email});
          } else {
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
              Forget Password! 👋
            </Text>
            <Text className={'text-base text-slate-400'}>
              Forgot your password?
            </Text>
          </View>
          <View className={'flex items-center mt-12'}>
            <Input
              mainText={'Email'}
              placeholderText={'Enter your email'}
              value={email}
              handleOnChangeTxt={text => setEmail(text)}
              keyboardType={'email-address'}
            />

            <TouchableOpacity
              onPress={() => _handleForgetPass()}
              activeOpacity={0.7}
              style={{width: width * 0.9}}
              className={
                'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg mt-3'
              }>
              <Text className={'text-xl font-semibold text-white'}>
                Forget Password
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
