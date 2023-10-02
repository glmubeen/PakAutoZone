import React, {useState, useEffect} from 'react';
import {
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
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import Input from '../../components/Input/index';
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';
import LocationModal from '../../components/LocationModal';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import {handleEmptyCart} from '../../store/action/cart';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import {Images} from '../../assets/images';

const Index = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.userData);
  const cart = useSelector(state => state.cartReducer.cart);

  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loca, setLoc] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [locationModal, setLocationModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: user.accessToken,
    },
  };

  const _handleOrders = () => {
    setIsLoader(true);
    let address = street1.concat(
      ' ' + street2 + ' ' + zipCode + ' ' + loca?.city,
    );

    if (street1 == '' || street2 == '' || zipCode == '' || loca == null) {
      setShowAlert(true);
      setAlertText('Provide All Details');
      setIsLoader(false)
    } else {
      const idArr = cart.map(obj => obj._id);
      let params = {
        parts: idArr,
        user: user.user._id,
        address: address,
      };
      axios
        .post(BaseURL.ORDER_AUTO_PARTS, params, config)
        .then(res => {
          setShowAlert(true);
          setAlertText('Order Booked');
          setIsLoader(false);
          dispatch(handleEmptyCart());
          setIsSuccess(true);
        })
        .catch(err => {
          setIsLoader(false);
        });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const [location, setLocation] = useState([]);
  const getLocation = () => {
    axios
      .get(BaseURL.GET_CITIES)
      .then(res => {
        setLocation(res.data.data);
      })
      .catch(err => {});
  };

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={`Checkout`}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          <View className={'flex self-center'}>
            <Input
              mainText={'Street 1'}
              placeholderText={'Enter Street 1'}
              value={street1}
              handleOnChangeTxt={text => setStreet1(text)}
            />
            <Input
              mainText={'Street 2'}
              placeholderText={'Enter Street 2'}
              value={street2}
              handleOnChangeTxt={text => setStreet2(text)}
            />
            <Input
              mainText={'Zip code'}
              placeholderText={'Enter Zip Code'}
              value={zipCode}
              handleOnChangeTxt={text => setZipCode(text)}
              keyboardType={'numeric'}
            />
            <Text
              className={'font-bold text-black text-lg uppercase ml-4 mt-3'}>
              City
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setLocationModal(true)}
              style={{
                width: width * 0.9,
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: height * 0.01,
                paddingHorizontal: width * 0.03,
              }}
              className={'flex self-center mt-1 border-gray'}>
              <Text className={'text-lg text-black'}>
                {loca == null ? 'Location' : loca.city}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => _handleOrders()}
            style={{width: width * 0.9}}
            activeOpacity={0.9}
            className="py-2 bg-[#0095FF] flex self-center rounded-md mt-3 items-center">
            <Text className="text-lg text-white font-medium">
              Confirm Order
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
      <Alert
        isVisible={showAlert}
        message={alertText}
        onPress={() => {
          setShowAlert(false);
          setAlertText('');
          if (isSuccess === true) {
            navigation.navigate('BottomNavigator');
          }
        }}
      />
      <LocationModal
        data={location}
        onPress={item => {
          setLoc({...loca, city: item.display, id: item._id});
          setLocationModal(false);
        }}
        isVisible={locationModal}
        handleIsVisible={() => setLocationModal(false)}
      />
    </>
  );
};

export default Index;
