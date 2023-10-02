import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import FeatureModal from '../../components/FeaturesModal';
import BrandModal from '../../components/BrandModal';
import CarModelModal from '../../components/CarModelModal';
import LocationModal from '../../components/LocationModal';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';
import TextComponent from '../../components/TextComponent';
import ActiveComponent from '../../components/ActiveComponent';
import Input from '../../components/Input/index';
import Thumb from '../../components/Thumb';
import Rail from '../../components/Rail';
import RailSelected from '../../components/RailSelected';
import Label from '../../components/Label';
import Notch from '../../components/Notch';

//third party library
import {useSelector} from 'react-redux';
import RangeSlider from 'rn-range-slider';

const Index = ({navigation, ...props}) => {
  const [feactureModal, setFeactureModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [carModelModal, setCarModelModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [registrationModal, setRegistrationModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const user = useSelector(state => state.userReducer.userData);

  useEffect(() => {
    getLocation();
    getBrands();
    getFeature();
  }, [bike_brands]);

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
      .get(BaseURL.BIKE_BRAND)
      .then(res => {
        setbrand(res.data.data);
      })
      .catch(err => {});
  };

  const [bike_brands, setbike_brands] = useState([]);
  const getBrandsModals = id => {
    axios
      .get(BaseURL.BIKE_BRAND + '/' + id + '/models')
      .then(res => {
        setbike_brands(res.data.data);
      })
      .catch(err => {});
  };

  const [featureData, setfeatureData] = useState([]);
  const getFeature = () => {
    axios
      .get(BaseURL.GET_BIKE_FEATURES)
      .then(res => {
        const tempArr = res.data.data.map(item => {
          return {
            ...item,
            isActive: false,
          };
        });
        setfeatureData(tempArr);
      })
      .catch(err => {});
  };

  const _handleServices = updateItem => {
    setfeatureData(prevServices =>
      prevServices.map(featureData => {
        if (featureData._id === updateItem._id) {
          return {
            ...featureData,
            isActive: !featureData.isActive,
          };
        }
        return featureData;
      }),
    );
  };

  //data
  const [loca, setLoc] = useState(null);
  const [brands, setbrands] = useState(null);
  const [carModal, setcarModal] = useState(null);
  const [regCity, setregCity] = useState(null);
  const [isCondition, setisCondition] = useState(null);
  const [kmDriven, setkmDriven] = useState('');
  const [modalYear, setModalYear] = useState('');
  const [engine_type, setengine_type] = useState('');

  const config = {
    headers: {
      Authorization: user.accessToken,
    },
  };

  const [data, setData] = useState([]);
  const _handleSellCar = () => {
    setIsLoader(true);
    let condition = '';
    if (isCondition == true) {
      condition = 'new';
    } else if (isCondition == false) {
      condition = 'used';
    }
    const activeIds = featureData
      .filter(item => item.isActive == true)
      .map(item => item._id);

    let query = `bikes?location=${loca?.id == undefined ? '' : loca.id}&brand=${
      brands?.id == undefined ? '' : brands.id
    }&model=${
      carModal?.id == undefined ? '' : carModal.id
    }&model_year${modalYear}&registration_city=${
      regCity?.id == undefined ? '' : regCity.id
    }&condition=${condition}&distance_driven=${kmDriven}&engine_type=${engine_type}&pricelt=${high1}&pricegt=${low1}&features=${activeIds.join(
      '-',
    )}&model_yearlt=${high2}&model_yeargt=${low2}`;
    axios
      .get(BaseURL.SEARCH + query, config)
      .then(res => {
        setData(res.data.data);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  //range
  const [low1, setLow1] = useState('');
  const [high1, setHigh1] = useState('');
  const [low2, setLow2] = useState('');
  const [high2, setHigh2] = useState('');
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low1, high1) => {
    setLow1(low1);
    setHigh1(high1);
  }, []);
  const handleValueChangeModal = useCallback((low2, high2) => {
    setLow2(low2);
    setHigh2(high2);
  }, []);

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.2}}>
          <Header
            title={'Search Bike'}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          {/* Ad Title */}
          {/* <Input
            mainText={'Title'}
            placeholderText={'Enter Title'}
            value={title}
            handleOnChangeTxt={text => settitle(text)}
          /> */}
          {/* Ad Title */}
          {/* Location */}
          <TextComponent
            title={'Location'}
            mainText={loca == null ? 'Location' : loca.city}
            onPress={() => setLocationModal(true)}
          />
          {/* Location */}
          {/* Brands */}
          <TextComponent
            title={'Brand'}
            mainText={brands == null ? 'Brands' : brands.brands}
            onPress={() => setBrandModal(true)}
          />
          {/* Brands */}
          {/* Car Model */}
          <TextComponent
            title={'Bike Model'}
            mainText={carModal == null ? 'Bike Models' : carModal.name}
            onPress={() => setCarModelModal(true)}
          />
          {/* Car Model */}
          {/* Registration City */}
          <TextComponent
            title={'Registration City'}
            mainText={regCity == null ? 'Registration City' : regCity.city}
            onPress={() => setRegistrationModal(true)}
          />
          {/* Registration City */}
          {/* Feacture */}
          <TextComponent
            title={'Features'}
            mainText={'Features'}
            onPress={() => setFeactureModal(true)}
          />
          {/* Feacture */}
          {/* Price */}
          <Text
            className={
              'font-bold text-black flex self-start ml-7 text-lg uppercase mt-3'
            }>
            Price
          </Text>
          <View
            style={{width: width * 0.9}}
            className={'flex flex-row justify-between self-center my-1'}>
            <Text className={'text-sm text-black'}>{low1}</Text>
            <Text className={'text-sm text-black'}>{high1}</Text>
          </View>
          <RangeSlider
            style={{
              width: width * 0.9,
              alignSelf: 'center',
            }}
            min={0}
            max={100000000}
            step={10000}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
          {/* Price */}
          {/* Condition */}
          <ActiveComponent
            title={'Condition'}
            onPressFalse={() => setisCondition(false)}
            onPressTrue={() => setisCondition(true)}
            condition={isCondition}
            condition1={'New'}
            condition2={'Used'}
          />
          {/* Condition */}
          {/* modal year */}
          <Text
            className={
              'font-bold text-black flex self-start ml-7 text-lg uppercase mt-3'
            }>
            Modal Year
          </Text>
          <View
            style={{width: width * 0.9}}
            className={'flex flex-row justify-between self-center my-1'}>
            <Text className={'text-sm text-black'}>{low2}</Text>
            <Text className={'text-sm text-black'}>{high2}</Text>
          </View>
          <RangeSlider
            style={{
              width: width * 0.9,
              alignSelf: 'center',
            }}
            min={1980}
            max={new Date().getFullYear()}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChangeModal}
          />
          {/* Model Year */}
          {/* Km Driven */}
          <Input
            mainText={'Km Driven'}
            placeholderText={'Enter KM Driven'}
            value={kmDriven}
            handleOnChangeTxt={text => setkmDriven(text)}
            keyboardType="numeric"
          />
          {/* Km Driven */}
          {/* engine_type */}
          <Input
            mainText={'Engine Type'}
            placeholderText={'Enter Engine Type'}
            value={engine_type}
            handleOnChangeTxt={text => setengine_type(text)}
          />
          {/* engine_type */}
          <TouchableOpacity
            onPress={() => _handleSellCar()}
            activeOpacity={0.7}
            style={{width: width * 0.86}}
            className={
              'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg mt-3 self-center'
            }>
            <Text className={'text-xl font-semibold text-white uppercase'}>
              Search Bike
            </Text>
          </TouchableOpacity>
          {data.length !== 0 && (
            <>
              <Text className={'mt-4 ml-5 text-lg text-black font-semibold'}>
                Search Result
              </Text>
              <FlatList
                data={data}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('BikeInfo', {
                          data: item,
                        });
                      }}
                      activeOpacity={0.7}
                      style={{
                        width: width * 0.9,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,
                      }}
                      className={
                        'bg-white rounded-lg flex self-center p-2 pt-3 pb-3 items-center flex-row mt-3'
                      }>
                      <Image
                        source={{uri: item?.images[0]?.url}}
                        className={'w-32 h-28'}
                        resizeMode={'contain'}
                      />
                      <View className={'ml-4'}>
                        <Text
                          className={'text-base text-black font-medium mb-2'}>
                          {item.title}
                        </Text>
                        <Text className={'text-sm text-gray mb-1'}>
                          {item?.location?.display}
                        </Text>
                        <Text className={'text-sm text-gray'}>
                          {item.model_year} - {item.distance_driven}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                contentContainerStyle={{paddingBottom: height * 0.01}}
                ListEmptyComponent={
                  <Text
                    className={
                      'text-xl text-black font-semibold flex self-center mt-12'
                    }>
                    No List Found
                  </Text>
                }
              />
            </>
          )}
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
      <FeatureModal
        data={featureData}
        onPress={item => {
          _handleServices(item);
        }}
        isVisible={feactureModal}
        handleIsVisible={() => setFeactureModal(false)}
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
      <CarModelModal
        data={bike_brands}
        onPress={item => {
          setcarModal({...carModal, name: item.name, id: item._id});
          setCarModelModal(false);
        }}
        isVisible={carModelModal}
        handleIsVisible={() => setCarModelModal(false)}
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
      <LocationModal
        data={location}
        onPress={item => {
          setregCity({...regCity, city: item.display, id: item._id});
          setRegistrationModal(false);
        }}
        isVisible={registrationModal}
        handleIsVisible={() => setRegistrationModal(false)}
      />
    </>
  );
};

export default Index;
// 718
