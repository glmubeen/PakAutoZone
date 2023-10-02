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
import BaseURL from '../../constants/apiEndPoints';
import axios from '../../utils/axios';
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const user = useSelector(state => state.userReducer.userData);
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const config = {
    headers: {
      Authorization: user?.accessToken,
    },
  };

  const _handleSubmit = () => {
    if (email == '' || name == '' || phone == '' || address == '') {
      setShowAlert(true);
      setAlertText('Fill All Fields');
    } else {
      setIsLoader(true);
      let params = {
        subject: 'Contact Us Form from Mobile App',
        from: user?.user?.email,
        name: user?.user?.first_name + ' ' + user?.user?.last_name,
        data: `This is ${
          user?.user?.first_name + ' ' + user?.user?.last_name
        } <br> Email: ${email} <br> Name: ${name} <br> Phone Number: ${phone} <br> Address: ${address}`,
      };
      axios
        .post(BaseURL.SEND_EMAIL, params, config)
        .then(res => {
          setIsLoader(false);
          setEmail('');
          setName('');
          setPhone('');
          setAddress('');
          setShowAlert(true);
          setAlertText(
            'Your query has been received Pak Auto Zone team will response within 12 to 24 hours',
          );
        })
        .catch(err => {
          setIsLoader(false);
          setShowAlert(true);
          setAlertText('Something Went Wrong Try Again Later');
        });
    }
  };
  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={`Contact Us`}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          <Text className={'mt-7 ml-6 text-slate-400 text-base'}>
            Need an experienced and skilled hand with custom IT projects? {'\n'}
            Fill out the form to get a free consultation.
          </Text>
          <Text className={'mt-4 ml-6 text-black font-semibold text-xl'}>
            Let’s Us Contact You
          </Text>
          <View className={'flex items-center mt-4'}>
            <Input
              mainText={'Email'}
              placeholderText={'Enter Email'}
              value={email}
              handleOnChangeTxt={text => setEmail(text)}
              keyboardType={'email-address'}
            />
            <Input
              mainText={'Name'}
              placeholderText={'Enter Name'}
              value={name}
              handleOnChangeTxt={text => setName(text)}
            />

            <Input
              mainText={'Phone Number'}
              placeholderText={'Enter Phone Number'}
              value={phone}
              handleOnChangeTxt={text => setPhone(text)}
              keyboardType={'numeric'}
            />
            <Input
              mainText={'Address'}
              placeholderText={'Enter Address'}
              value={address}
              handleOnChangeTxt={text => setAddress(text)}
            />
            {/* <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={Images.UploadAdditionalFile}
                style={{width: width * 0.9, height: height * 0.2}}
                // className={'bg-red-500'}
                resizeMode={'contain'}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => _handleSubmit()}
              activeOpacity={0.7}
              style={{width: width * 0.9}}
              className={
                'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg mt-3'
              }>
              <Text className={'text-xl font-semibold text-white'}>
                Submit Now
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
          setShowAlert(false);
          setAlertText('');
        }}
      />
    </>
  );
};

export default Index;
