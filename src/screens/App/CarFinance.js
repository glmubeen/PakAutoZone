import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
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
import TenureModal from '../../components/TenureModal';
import DownPaymentModal from '../../components/DownPaymentModal';
import HorizontalCard from '../../components/HorizontalCard';
import FinancingStep from '../../components/FinancingStep';
import Header from '../../components/Header';
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';

//third party
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const whyChooseData = [
  {
    id: '1',
    title: 'Customer Service Representative',
    subtitle: 'Expert in handling auto financing cases from partner banks',
    image: Images.AutoPart,
  },
  {
    id: '2',
    title: 'Quick Processing Time',
    subtitle: 'Partner banks prefer Pak Auto Zone customer as top priority',
    image: Images.AddAutoPart,
  },
  {
    id: '3',
    title: 'No Hidden Cost',
    subtitle: 'Pak Auto Zone charges nothing from customer',
    image: Images.BlackHeart,
  },
  {
    id: '4',
    title: 'Rate Comparison',
    subtitle: 'Users can compare rates from top banks',
    image: Images.Assembly,
  },
];

const financingStepsData = [
  {
    title: 'Apply for car financing on Pak Auto Zone',
  },
  {
    title: 'Our representative will contact you to verify your details',
  },
  {
    title:
      'We will share verified car financing requests with our partner banks',
  },
  {
    title: 'Partner bank will contact you and initiate the financing process',
  },
  {
    title:
      'You will get the auto financing loan once the bank approves the case',
  },
];

const arrAdvantageCarFinance = [
  {
    title: '• Low Initial Investment',
    subtitle: 'Buy your dream car with a low upfront payment.',
  },
  {
    title: '• Tax Benefits',
    subtitle:
      'Claim tax deductions on car financing used for business purposes.',
  },
  {
    title: '• Flexible Payment Options',
    subtitle: 'Customize payment options according to your financial needs.',
  },
  {
    title: '• Build Credit Score',
    subtitle:
      'Timely payments can improve your credit score and future loan eligibility.',
  },
  {
    title: '• Hassle-Free Process',
    subtitle:
      'Apply online, and our representative will initiate financing with partner banks.',
  },
  {
    title: '• No Need for Savings',
    subtitle:
      'Get your desired car without saving up for years in easy monthly installments.',
  },
];

const CarFinance = ({navigation}) => {
  const [isNewCar, setIsNewCar] = useState(true);
  const [locationModal, setLocationModal] = useState(false);
  const [loca, setLoc] = useState(null);
  const [price, setPrice] = useState('');
  const [tenure, setTenure] = useState(false);
  const [tenureData, setTenureData] = useState('');
  const [downPayment, setDownPayment] = useState(false);
  const [downPaymentData, setDownPaymentData] = useState('');
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
  useEffect(() => {
    getBrands();
    getLocation();
  }, []);

  const user = useSelector(state => state.userReducer.userData);
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const config = {
    headers: {
      Authorization: user?.accessToken,
    },
  };

  const _handleFinance = () => {
    if (
      loca == null ||
      brands == null ||
      carModal == null ||
      tenureData == '' ||
      downPaymentData == ''
    ) {
      setShowAlert(true);
      setAlertText('Fill All Fields');
    } else {
      setIsLoader(true);
      let newCar = `This is ${
        user?.user?.first_name + ' ' + user?.user?.last_name
      } <br> New Car <br> Location: ${loca?.city} <br> Brand: ${
        brands?.brands
      } <br> Modal: ${
        carModal?.name
      } <br> Tenure: ${tenureData} <br> Down Payment: ${downPaymentData}`;

      let oldCar = `This is ${
        user?.user?.first_name + ' ' + user?.user?.last_name
      } <br> Old Car <br> Location: ${loca?.city} <br> Brand: ${
        brands?.brands
      } <br> Modal: ${
        carModal?.name
      } <br> Tenure: ${tenureData} <br> Down Payment: ${downPaymentData} Price: ${price}`;
      let params = {
        subject: 'Finance Form',
        from: user?.user?.email,
        name: user?.user?.first_name + ' ' + user?.user?.last_name,
        data: isNewCar ? newCar : oldCar,
      };

      axios
        .post(BaseURL.SEND_EMAIL, params, config)
        .then(res => {
          setIsLoader(false);
          setTenureData('');
          setDownPaymentData('');
          setPrice('');
          setLoc(null);
          setbrands(null);
          setcarModal(null);
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
            title={'Car Finance'}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          {/* Header Start */}
          <ImageBackground
            source={Images.CarFinance}
            style={{width: width, height: width * 0.4}}
            resizeMode="contain"
          />
          <View className={'bg-white self-center w-full p-2'}>
            <Text
              className={'  text-[#0095FF] font-semibold text-xl self-center'}>
              Hassle Free Car Financing
            </Text>
          </View>
          {/* Header End*/}

          {/* Tabs Start */}
          <View
            className={
              'w-full bg-white flex-row justify-between shadow-sm mt-2'
            }>
            <Pressable
              onPress={() => setIsNewCar(!isNewCar)}
              className={`w-1/2 py-3 ${
                isNewCar ? ' border-[#0095FF]' : 'border-white'
              } border-b-2`}>
              <Text
                className={`text-center font-semibold ${
                  !isNewCar ? 'text-[#a4a4a4]' : ' text-[#0095FF]'
                }`}>
                New Cars
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setIsNewCar(!isNewCar)}
              className={`w-1/2 py-3 ${
                !isNewCar ? 'border-[#0095FF]' : 'border-white'
              } border-b-2`}>
              <Text
                className={`text-center font-semibold ${
                  isNewCar ? 'text-[#a4a4a4]' : ' text-[#0095FF]'
                }`}>
                Used Cars
              </Text>
            </Pressable>
          </View>

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
            {/* Prices Start */}
            {!isNewCar && (
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
                  <Text className={'text-lg text-black'}>Price</Text>
                  <TextInput
                    className={'w-60 p-1 text-black'}
                    placeholder={'Enter Price'}
                    placeholderTextColor={'grey'}
                    value={price}
                    onChangeText={text => setPrice(text)}
                    keyboardType="numeric"
                  />
                </View>
                <View className={'w-5 h-5'} />
              </View>
            )}
            {/* Prices End */}
            {/* Tenure Start*/}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setTenure(true)}
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-5'
              }>
              <View
                className={
                  'w-10 h-10 flex items-center justify-center rounded-full bg-slate-100'
                }>
                <Image
                  source={Images.Calendar}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                  style={{tintColor: 'grey'}}
                />
              </View>
              <View
                style={{width: width * 0.67}}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <Text className={'text-lg text-black'}>Tenure</Text>
                {tenureData && (
                  <Text className={'text-sm text-gray'}>{tenureData}</Text>
                )}
              </View>
              <Image
                source={Images.DropDownArrow}
                className={`w-4 h-4`}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            {/* Tenure End*/}

            {/* Down Payment Start*/}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setDownPayment(true)}
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-5'
              }>
              <View
                className={
                  'w-10 h-10 flex items-center justify-center rounded-full bg-slate-100'
                }>
                <Image
                  source={Images.Calendar}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                  style={{tintColor: 'grey'}}
                />
              </View>
              <View
                style={{width: width * 0.67}}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <Text className={'text-lg text-black'}>Down Payment</Text>
                {downPaymentData && (
                  <Text className={'text-sm text-gray'}>{downPaymentData}</Text>
                )}
              </View>
              <Image
                source={Images.DropDownArrow}
                className={`w-4 h-4`}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            {/* Down Payment End */}
          </View>
          {/* Tabs End */}
          {/* Submit Query Button Start */}
          <TouchableOpacity
            onPress={() => {
              if (Object.keys(user).length === 0) {
                setShowAlert(true);
                setAlertText('Login First');
              } else {
                _handleFinance();
              }
            }}
            className={
              'self-center bg-[#0095FF] mt-6 items-center justify-center p-3 rounded-md'
            }
            style={{width: width * 0.9}}>
            <Text className={'text-white font-semibold text-md'}>
              Submit Query
            </Text>
          </TouchableOpacity>
          {/* Submit Query Button End */}
          {/* Why choose Start */}
          <View className={'self-center mt-8'} style={{width: width * 0.9}}>
            <Text className={'text-xl font-semibold text-black'}>
              Why choose Pak Auto Zone for Car Finance?
            </Text>
            {whyChooseData.map(item => (
              <HorizontalCard
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
              />
            ))}
          </View>
          {/* Why choose End */}
          {/* Car Financing Step Start */}
          <View className={'self-center mt-8'} style={{width: width * 0.9}}>
            <Text className={'text-xl font-semibold text-black'}>
              Car Financing Steps
            </Text>
            {financingStepsData.map((item, index) => (
              <FinancingStep title={item.title} count={index + 1} />
            ))}
          </View>
          {/* Car Financing Step End */}
          {/* Advantages of Car Financing Start*/}
          <View className={'self-center mt-8'} style={{width: width * 0.9}}>
            <Text className={'text-xl font-semibold text-black'}>
              Advantages of Car Financing in Pakistan
            </Text>
            <FlatList
              data={arrAdvantageCarFinance}
              renderItem={({item}) => {
                return (
                  <View className={'my-2'}>
                    <Text className={'text-black text-lg font-semibold'}>
                      {item.title}
                    </Text>
                    <Text className={'text-black text-sm ml-3.5'}>
                      {item.subtitle}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          {/* Advantages of Car Financing End*/}
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
      <TenureModal
        onPress={item => {
          setTenureData(item);
          setTenure(false);
        }}
        isVisible={tenure}
        handleIsVisible={() => setTenure(false)}
      />
      <DownPaymentModal
        onPress={item => {
          setDownPaymentData(item);
          setDownPayment(false);
        }}
        isVisible={downPayment}
        handleIsVisible={() => setDownPayment(false)}
      />
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

export default CarFinance;

const styles = StyleSheet.create({});
