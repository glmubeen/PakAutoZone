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
import Header from '../../components/Header';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'Change Password'}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          <View className={'flex self-center mt-5'}>
            <Input
              mainText={'Previous Password'}
              placeholderText={'Enter Previous Password'}
              value={password}
              handleOnChangeTxt={text => setPassword(text)}
              isPassword
            />
            <Input
              mainText={'New Password'}
              placeholderText={'Enter New Password'}
              value={newPassword}
              handleOnChangeTxt={text => setNewPassword(text)}
              isPassword
            />
            <Input
              mainText={'Confirm Password'}
              placeholderText={'Enter Confirm Password'}
              value={confirmPassword}
              handleOnChangeTxt={text => setConfirmPassword(text)}
              isPassword
            />

            <TouchableOpacity
              activeOpacity={0.7}
              style={{width: width * 0.86}}
              className={
                'p-3  flex items-center justify-center self-center bg-[#0095FF] rounded-lg mt-3'
              }>
              <Text className={'text-xl font-semibold text-white'}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Index;
