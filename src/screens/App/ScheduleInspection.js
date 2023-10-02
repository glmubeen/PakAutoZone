import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MyStatusBar from '../../components/StatusBar';
import {Images} from '../../assets/images';
import LocationModal from '../../components/LocationModal';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import BrandModal from '../../components/BrandModal';
import CarModelModal from '../../components/CarModelModal';
import ModelYearModal from '../../components/ModelYearModal';
import Header from '../../components/Header';
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';

//third party
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const CarFinance = ({navigation}) => {
  const [locationModal, setLocationModal] = useState(false);
  const [loca, setLoc] = useState(null);
  const [modelYearModal, setmodelYearModal] = useState(false);
  const [modalYear, setModalYear] = useState('');
  const [brandModal, setBrandModal] = useState(false);
  const [brands, setbrands] = useState(null);
  const [carModal, setcarModal] = useState(null);
  const [carModelModal, setCarModelModal] = useState(false);

  const [location, setLocation] = useState([]);
  const getLocation = () => {
    axios
      .get(BaseURL.GET_CITIES)
      .then(res => {
        setLocation(res.data.data);
      })
      .catch(err => {});
  };

  const [brand, setbrand] = useState([]);
  const getBrands = () => {
    axios
      .get(BaseURL.CAR_BRAND)
      .then(res => {
        setbrand(res.data.data);
      })
      .catch(err => {});
  };

  const [car_brands, setCar_brands] = useState([]);
  const getBrandsModals = id => {
    axios
      .get(BaseURL.CAR_BRAND + '/' + id + '/models')
      .then(res => {
        setCar_brands(res.data.data);
      })
      .catch(err => {});
  };

  const user = useSelector(state => state.userReducer.userData);

  const [email, setEmail] = useState(user?.user?.email);
  const [phone, setPhone] = useState(user?.user?.phone);

  useEffect(() => {
    getBrands();
    getLocation();
  }, []);

  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const config = {
    headers: {
      Authorization: user?.accessToken,
    },
  };

  const _handleInspection = () => {
    if (loca == null || brands == null || carModal == null || modalYear == '') {
      setShowAlert(true);
      setAlertText('Fill All Fields');
    } else {
      setIsLoader(true);
      let params = {
        subject: 'Inspection Form',
        from: user?.user?.email,
        name: user?.user?.first_name + ' ' + user?.user?.last_name,
        data: `This is ${
          user?.user?.first_name + ' ' + user?.user?.last_name
        } <br> Location: ${loca?.city} <br> Brand: ${
          brands?.brands
        } <br> Modal: ${
          carModal?.name
        } <br> Car Model Year: ${modalYear} <br> Email: ${
          user?.user?.email
        } <br> Phone Number ${user?.user?.phone}`,
      };

      axios
        .post(BaseURL.SEND_EMAIL, params, config)
        .then(res => {
          setIsLoader(false);
          setLoc(null);
          setbrands(null);
          setcarModal(null);
          setShowAlert(true);
          setIsSuccess(true);
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
            title={'Schedule Inspection'}
            isBack
            handleIsBack={() => navigation.goBack()}
          />

          <View>
            {/* Location Start*/}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setLocationModal(true)}
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-5'
              }>
              <View
                className={
                  'w-10 h-10 flex items-center justify-center rounded-full bg-slate-100'
                }>
                <Image
                  source={Images.location}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                  style={{tintColor: 'grey'}}
                />
              </View>
              <View
                style={{width: width * 0.67}}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <Text className={'text-lg text-black'}>Location</Text>
                {loca != null && loca.city && (
                  <Text className={'text-sm text-gray'}>{loca.city}</Text>
                )}
              </View>
              <Image
                source={Images.DropDownArrow}
                className={`w-4 h-4`}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            {/* Location End*/}
            {/* Brand Start */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setBrandModal(true)}
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-5'
              }>
              <View
                className={
                  'w-10 h-10 flex items-center justify-center rounded-full bg-slate-100'
                }>
                <Image
                  source={Images.ModelYear}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                  style={{tintColor: 'grey'}}
                />
              </View>
              <View
                style={{width: width * 0.67}}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <Text className={'text-lg text-black'}>Brand</Text>
                {brands !== null ? (
                  <Text className={'text-sm text-gray'}>{brands?.brands}</Text>
                ) : null}
              </View>
              <Image
                source={Images.DropDownArrow}
                className={`w-4 h-4`}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            {/* Brand End */}
            {/* Modal Start */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setCarModelModal(true)}
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-5'
              }>
              <View
                className={
                  'w-10 h-10 flex items-center justify-center rounded-full bg-slate-100'
                }>
                <Image
                  source={Images.ModelYear}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                  style={{tintColor: 'grey'}}
                />
              </View>
              <View
                style={{width: width * 0.67}}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <Text className={'text-lg text-black'}>Model</Text>
                {carModal !== null ? (
                  <Text className={'text-sm text-gray'}>{carModal?.name}</Text>
                ) : null}
              </View>
              <Image
                source={Images.DropDownArrow}
                className={`w-4 h-4`}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            {/* Model End */}
            {/* Modal year Start */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setmodelYearModal(true)}
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-5'
              }>
              <View
                className={
                  'w-10 h-10 flex items-center justify-center rounded-full bg-slate-100'
                }>
                <Image
                  source={Images.Carss}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                  style={{tintColor: 'grey'}}
                />
              </View>
              <View
                style={{width: width * 0.67}}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <Text className={'text-lg text-black'}>Car Model Year</Text>
                {modalYear && (
                  <Text className={'text-sm text-gray'}>{modalYear}</Text>
                )}
              </View>
              <Image
                source={Images.DropDownArrow}
                className={`w-4 h-4`}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            {/* Model Year End */}
            {/* email */}
            <View
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
              }>
              <View
                className={
                  'w-10 h-10 flex items-center justify-center rounded-full bg-slate-100'
                }>
                <Image
                  source={Images.Price}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                  style={{tintColor: 'grey'}}
                />
              </View>
              <View
                style={{width: width * 0.67}}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <Text className={'text-lg text-black'}>Email</Text>
                <TextInput
                  className={'w-60 p-1 text-black'}
                  placeholderTextColor={'grey'}
                  placeholder="Email"
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View className={'w-5 h-5'} />
            </View>
            {/* email */}
            {/* name */}
            <View
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
              }>
              <View
                className={
                  'w-10 h-10 flex items-center justify-center rounded-full bg-slate-100'
                }>
                <Image
                  source={Images.PhoneCall}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                  style={{tintColor: 'grey'}}
                />
              </View>
              <View
                style={{width: width * 0.67}}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <Text className={'text-lg text-black'}>Phone</Text>
                <TextInput
                  className={'w-60 p-1 text-black'}
                  placeholderTextColor={'grey'}
                  placeholder="Enter Phone"
                  value={phone}
                  onChangeText={text => setPhone(text)}
                />
              </View>
              <View className={'w-5 h-5'} />
            </View>
            {/* name */}
          </View>
          {/* Tabs End */}
          {/* Submit Query Button Start */}
          <TouchableOpacity
            onPress={() => {
              if (Object.keys(user).length === 0) {
                setShowAlert(true);
                setAlertText('Login First');
              } else {
                _handleInspection();
              }
            }}
            className={
              'self-center bg-[#0095FF] mt-6 items-center justify-center p-3 rounded-md'
            }
            style={{width: width * 0.9}}>
            <Text className={'text-white font-semibold text-md'}>Continue</Text>
          </TouchableOpacity>
          {/* Submit Query Button End */}
        </ScrollView>
      </SafeAreaView>
      <LocationModal
        data={location}
        onPress={item => {
          setLoc({...loca, city: item.display, id: item._id});
          setLocationModal(false);
        }}
        isVisible={locationModal}
        handleIsVisible={() => setLocationModal(false)}
      />
      <CarModelModal
        data={car_brands}
        onPress={item => {
          setcarModal({...carModal, name: item.name, id: item._id});
          setCarModelModal(false);
        }}
        isVisible={carModelModal}
        handleIsVisible={() => setCarModelModal(false)}
      />
      <BrandModal
        data={brand}
        onPress={item => {
          setbrands({...brands, brands: item.name, id: item._id});
          getBrandsModals(item._id);
          setBrandModal(false);
        }}
        isVisible={brandModal}
        handleIsVisible={() => setBrandModal(false)}
      />
      <ModelYearModal
        onPress={item => {
          setModalYear(item);
          setmodelYearModal(false);
        }}
        isVisible={modelYearModal}
        handleIsVisible={() => setmodelYearModal(false)}
      />
      {isLoader && <Loader />}
      <Alert
        isVisible={showAlert}
        message={alertText}
        onPress={() => {
          if (isSuccess) {
            setShowAlert(false);
            navigation.navigate('BottomNavigator');
          } else {
            setShowAlert(false);
            setAlertText('');
          }
        }}
      />
    </>
  );
};

export default CarFinance;

const styles = StyleSheet.create({});
//624
