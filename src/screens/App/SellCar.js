import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import {Images} from '../../assets/images';
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import FeatureModal from '../../components/FeaturesModal';
import BrandModal from '../../components/BrandModal';
import CarModelModal from '../../components/CarModelModal';
import LocationModal from '../../components/LocationModal';
import FuelTypeModal from '../../components/FuelTypeModal';
import ModelYearModal from '../../components/ModelYearModal';
import BodyColorModal from '../../components/BodyColorModal';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';
import ImageSelection from '../../components/ImageSelection';

//third party library
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const [feactureModal, setFeactureModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [carModelModal, setCarModelModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [registrationModal, setRegistrationModal] = useState(false);
  const [fuelTypeModal, setfuelTypeModal] = useState(false);
  const [modelYearModal, setmodelYearModal] = useState(false);
  const [bodyColorModal, setBodyColorModal] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [listingId, setListingId] = useState('');
  const user = useSelector(state => state.userReducer.userData);
  const data = new FormData();

  useEffect(() => {
    getLocation();
    getBrands();
    getFeature();
  }, [car_brands]);

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

  const [featureData, setfeatureData] = useState([]);
  const getFeature = () => {
    axios
      .get(BaseURL.GET_FEATURES)
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
  const fuel_type = [
    {id: 1, name: 'electric'},
    {id: 2, name: 'petrol'},
    {id: 3, name: 'cng'},
    {id: 4, name: 'hybrid'},
    {id: 5, name: 'diesel'},
  ];

  //data
  const [loca, setLoc] = useState(null);
  const [brands, setbrands] = useState(null);
  const [carModal, setcarModal] = useState(null);
  const [regCity, setregCity] = useState(null);
  const [isCondition, setisCondition] = useState(false);
  const [price, setPrice] = useState('');
  const [kmDriven, setkmDriven] = useState('');
  const [description, setdescription] = useState('');
  const [title, settitle] = useState('');
  const [modalYear, setModalYear] = useState('');
  const [isTransmission, setisTransmission] = useState(false);
  const [isAssembly, setisAssembly] = useState(false);
  const [engine_capacity, setengine_capacity] = useState('');
  const [batteryCapacity, setbatteryCapacity] = useState('');
  const [fuel, setfuel] = useState(null);
  const [bodyColor, setbodyColor] = useState('');

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: user.accessToken,
    },
  };

  const bodycolor = [
    'AQUA',
    'Anguri',
    'Aqua Blue',
    'Aqua Green',
    'Aqua green',
    'Beige',
    'Black',
    'Blue',
    'Bluish Silver',
    'British green',
    'Bronze',
    'Brown',
    'Burgundy',
    'Gold',
    'Golden',
    'Gray',
    'Green',
    'Grey',
    'Gun Metalic',
    'Gun Metallic',
    'Gun metallic',
    'Gun mettalic',
    'Ice blue',
    'Indigo',
    'Light Green',
    'Magenta',
    'Magneta',
    'Mahron',
    'Maroon',
    'Metalic Grey',
    'Metallic Green',
    'Metallic Grey',
    'Navy',
    'Olive Green',
    'Orange',
    'PEARL WHITE',
    'Pearl Black',
    'Pearl Blue',
    'Pearl Grey',
    'Pearl Sky Blue',
    'Pearl White',
    'Pearl black',
    'Pearl white',
    'Phantom Brown',
    'Pink',
    'Purple',
    'Red',
    'Red Vine',
    'Red Wine',
    'Red wine',
    'Rose Mist',
    'Royal blue',
    'SUPER WHITE',
    'Shalimar Rose',
    'Silver',
    'Sky Blue',
    'Sky blue',
    'Smoke Green',
    'Turquoise',
    'Unlisted',
    'Urban Titanium',
    'Urban titanium',
    'White',
    'White and black',
    'Yellow',
    'black',
    'blue',
    'blue metallic',
    'cream',
    'green',
    'green metallic',
    'grey',
    'gun matalic',
    'gun metallic',
    'light Green',
    'light blue',
    'light green',
    'maroon',
    'metalic green',
    'metallic',
    'metallic green',
    'olive green',
    'pearl white',
    'peral white',
    'red wine',
    'rose mist',
    'shalimar rose',
    'silver',
    'sky blue',
    'smoke green',
    'turwouise',
    'unlisted',
    'urban Titanium',
    'urban titanium',
    'white',
    'wine red',
  ];

  const _handleSellCar = () => {
    setIsLoader(true);
    const activeIds = featureData
      .filter(item => item.isActive == true)
      .map(item => item._id);

    for (let index = 0; index < activeIds.length; index++) {
      data.append('features[' + index + ']', activeIds[index]);
    }
    let condition = '';
    if (isCondition == true) {
      condition = 'new';
    } else {
      condition = 'used';
    }
    let transmission = '';
    if (isTransmission == false) {
      transmission = 'automatic';
    } else {
      transmission = 'manual';
    }
    let assembly = '';
    if (isAssembly == false) {
      assembly = 'imported';
    } else {
      assembly = 'local';
    }
    if (images.length === 0) {
      data.append('images', openCameraImage);
    } else {
      const selectedProperties = images.map(image => ({
        uri: image.path,
        type: image.mime,
        name: image.path.split('/').pop(),
      }));

      for (let index = 0; index < selectedProperties.length; index++) {
        data.append('images', selectedProperties[index]);
      }
    }

    data.append('title', title);
    data.append('description', description);
    data.append('location', loca?.id);
    data.append('brand', brands?.id);
    data.append('model', carModal?.id);
    data.append('model_year', modalYear);
    data.append('registration_city', regCity?.id);
    data.append('condition', condition);
    data.append('price', price);
    data.append('distance_driven', kmDriven);
    data.append('fuel_type', fuel?.name);
    data.append('engine_capacity', engine_capacity);
    data.append('battery_capacity', batteryCapacity);
    data.append('transmission_type', transmission);
    data.append('assembly', assembly);
    data.append('body_color', bodyColor);

    axios
      .post(BaseURL.POST_CAR, data, config)
      .then(res => {
        setListingId(res.data.listingId);
        setIsSuccess(true);
        setIsLoader(false);
        setShowAlert(true);
        setAlertText('Car Added');
        setLoc(null);
        setbrands(null);
        setcarModal(null);
        setregCity(null);
        setisCondition(false);
        setPrice('');
        setkmDriven('');
        setdescription('');
        settitle('');
        setModalYear('');
        setisTransmission(false);
        setisAssembly(false);
        setengine_capacity('');
        setfuel(null);
        setImages([]);
      })
      .catch(err => {
        setIsLoader(false);
        setShowAlert(true);
        setAlertText(err.data.message);
      });
  };

  let featureActive = featureData.filter(x => x.isActive === true);

  const [isImageOptions, setIsImageOptions] = useState(false);

  const selectImages = async () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
    })
      .then(response => {
        response.forEach(image => {
          data.append('images[]', {
            uri: image.path,
            type: image.mime,
            name: image.path.split('/').pop(),
          });
        });
        setImages([...images, ...response]);
      })
      .catch(error => {});
  };
  const [openCameraImage, setOpenCameraImage] = useState({});
  const selectOpenImages = async () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
    })
      .then(response => {
        let selectOpenImage = {
          uri: response.path,
          type: response.mime,
          name: response.path.split('/').pop(),
        };

        setOpenCameraImage(selectOpenImage);
      })
      .catch(error => {});
  };

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.2}}>
          <Header
            title={'Sell Your Car'}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          {Object.keys(openCameraImage).length === 0 ? (
            <FlatList
              data={images}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => selectImages()}>
                    <Image
                      source={{uri: item.path}}
                      style={{width: width * 0.9}}
                      className={'h-48 flex self-center mt-5 mr-4'}
                      resizeMode={'stretch'}
                    />
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={{
                alignSelf: 'center',
                marginLeft: width * 0.06,
              }}
            />
          ) : (
            <View>
              <Image
                source={{uri: openCameraImage.uri}}
                style={{width: width * 0.9}}
                className={'h-48 flex self-center mt-5 mr-4'}
                resizeMode={'stretch'}
              />
            </View>
          )}

          <TouchableOpacity
            className={'mt-3 p-1'}
            activeOpacity={0.7}
            onPress={() => setIsImageOptions(true)}>
            {images.length == 0 && Object.keys(openCameraImage).length === 0 ? (
              <Image
                source={Images.AddPhoto}
                style={{width: width * 0.9}}
                className={'h-48 flex self-center'}
                resizeMode={'contain'}
              />
            ) : null}
          </TouchableOpacity>

          {/* Ad Title */}
          <View
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.AdTitle}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>Ad Title</Text>
              <TextInput
                className={'w-60 p-1 text-black'}
                placeholder={'Enter Ad Title'}
                placeholderTextColor={'grey'}
                value={title}
                onChangeText={text => settitle(text)}
              />
            </View>
            <View className={'w-5 h-5'} />
          </View>
          {/* Ad Title */}
          {/* Location */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setLocationModal(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-5'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.location}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {loca == null ? 'Location' : loca.city}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Location */}
          {/* Brands */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setBrandModal(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-2'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.Brand}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {brands == null ? 'Brands' : brands.brands}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Brands */}
          {/* Car Model */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setCarModelModal(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-2'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.ModelYear}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {carModal == null ? 'Car Models' : carModal.name}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Car Model */}
          {/* Registration City */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setRegistrationModal(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-2'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.Registration}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {regCity == null ? 'Registration City' : regCity.city}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Registration City */}
          {/* Features */}
          {featureActive.length === 0 ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setFeactureModal(true)}
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-2'
              }>
              <View
                className={
                  'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
                }>
                <Image
                  source={Images.Features}
                  className={'w-6 h-6'}
                  resizeMode={'contain'}
                />
              </View>
              <View
                style={{
                  width: width * 0.67,
                }}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <Text className={'text-lg text-black'}>Features</Text>
              </View>

              <Image
                source={Images.arrow}
                className={`w-4 h-4 rotate-90`}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ) : (
            <View
              activeOpacity={0.7}
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-2'
              }>
              <View
                className={
                  'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
                }>
                <Image
                  source={Images.Features}
                  className={'w-6 h-6'}
                  resizeMode={'contain'}
                />
              </View>
              <View
                style={{
                  width: width * 0.8,
                }}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <FlatList
                  data={featureActive}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setFeactureModal(true)}
                        // style={{width: width * 0.24}}
                        className={
                          'bg-[#0095FF] p-1 mx-1 rounded-lg flex items-center justify-center'
                        }>
                        <Text className={'text-sm text-white text-center'}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <Image
                source={Images.arrow}
                className={`w-4 h-4 rotate-90`}
                resizeMode={'contain'}
              />
            </View>
          )}
          {/* Features */}
          {/* Fuel Type */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setfuelTypeModal(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-5'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.EngineCapacity}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {fuel == null ? 'Fuel Type' : fuel.name}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Fuel Type */}
          {/* Body Color */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setBodyColorModal(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-5'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.EngineCapacity}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {bodyColor == '' ? 'Body Color' : bodyColor}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Body Color */}
          {/* Condition */}
          <View
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.Condition}
                className={'w-7 h-7'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.7}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>Condition</Text>
              <View className={'flex flex-row mt-1'}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setisCondition(true)}
                  className={`w-16 p-1 rounded-2xl ${
                    isCondition == true ? 'bg-[#0095FF]' : 'bg-[#D9D9D9]'
                  } flex items-center mr-2`}>
                  <Text className={'text-black text-sm'}>New</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setisCondition(false)}
                  className={`w-16 p-1 rounded-2xl ${
                    isCondition == false ? 'bg-[#0095FF]' : 'bg-[#D9D9D9]'
                  } flex items-center`}>
                  <Text className={'text-black text-sm'}>Used</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className={'w-5 h-5'} />
          </View>
          {/* Condition */}
          {/* Transmission */}
          <View
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.Transmission}
                className={'w-7 h-7'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.7}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>Transmission</Text>
              <View className={'flex flex-row mt-1'}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setisTransmission(true)}
                  className={`w-24 p-1 rounded-3xl ${
                    isTransmission == true ? 'bg-[#0095FF]' : 'bg-[#D9D9D9]'
                  } flex items-center justify-center mr-2`}>
                  <Text className={'text-black text-sm'}>Manuel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setisTransmission(false)}
                  className={`w-24 p-1 rounded-2xl ${
                    isTransmission == false ? 'bg-[#0095FF]' : 'bg-[#D9D9D9]'
                  } flex items-center justify-center`}>
                  <Text className={'text-black text-sm'}>Automatic</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className={'w-5 h-5'} />
          </View>
          {/* Transmission */}
          {/* Assembly */}
          <View
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.Assembly}
                className={'w-7 h-7'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.7}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>Assembly</Text>
              <View className={'flex flex-row mt-1'}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setisAssembly(true)}
                  className={`w-24 p-1 rounded-3xl ${
                    isAssembly == true ? 'bg-[#0095FF]' : 'bg-[#D9D9D9]'
                  } flex items-center justify-center mr-2`}>
                  <Text className={'text-black text-sm'}>Local</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setisAssembly(false)}
                  className={`w-24 p-1 rounded-2xl ${
                    isAssembly == false ? 'bg-[#0095FF]' : 'bg-[#D9D9D9]'
                  } flex items-center justify-center`}>
                  <Text className={'text-black text-sm'}>Imported</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className={'w-5 h-5'} />
          </View>
          {/* Assembly */}
          {/* modal year */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setmodelYearModal(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-5'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.ModelYear}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {modalYear == '' ? 'Model Year' : modalYear}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Model Year */}
          {/* Price */}
          <View
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.Price}
                className={'w-6 h-6'}
                resizeMode={'contain'}
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
          {/* Price */}
          {/* Km Driven */}
          <View
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.KmDriven}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>Km's Driven</Text>
              <TextInput
                className={'w-60 p-1 text-black'}
                placeholder={'Enter Km'}
                placeholderTextColor={'grey'}
                value={kmDriven}
                onChangeText={text => setkmDriven(text)}
                keyboardType="numeric"
              />
            </View>
            <View className={'w-5 h-5'} />
          </View>
          {/* Km Driven */}
          {/* engine_capacity */}
          {fuel?.name == 'electric' ? (
            <View
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
              }>
              <View
                className={
                  'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
                }>
                <Image
                  source={Images.EngineCapacity}
                  className={'w-6 h-6'}
                  resizeMode={'contain'}
                />
              </View>
              <View
                style={{width: width * 0.67}}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <Text className={'text-lg text-black'}>Battery Capacity</Text>
                <TextInput
                  className={'w-60 p-1 text-black'}
                  placeholder={'Enter Battery Capacity'}
                  placeholderTextColor={'grey'}
                  value={batteryCapacity}
                  onChangeText={text => setbatteryCapacity(text)}
                  keyboardType="numeric"
                />
              </View>
              <View className={'w-5 h-5'} />
            </View>
          ) : (
            <View
              style={{width: width * 0.95}}
              className={
                'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
              }>
              <View
                className={
                  'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
                }>
                <Image
                  source={Images.EngineCapacity}
                  className={'w-6 h-6'}
                  resizeMode={'contain'}
                />
              </View>
              <View
                style={{width: width * 0.67}}
                className={'pt-1 pb-1 border-b-2 border-slate-300'}>
                <Text className={'text-lg text-black'}>Engine Capacity</Text>
                <TextInput
                  className={'w-60 p-1 text-black'}
                  placeholder={'Enter Engine Capacity'}
                  placeholderTextColor={'grey'}
                  value={engine_capacity}
                  onChangeText={text => setengine_capacity(text)}
                  keyboardType="numeric"
                />
              </View>
              <View className={'w-5 h-5'} />
            </View>
          )}
          {/* engine_capacity */}
          {/* Description */}
          <View
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.Description}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>Description</Text>
              <TextInput
                className={'w-60 p-1 text-black'}
                placeholder={'Enter Description'}
                placeholderTextColor={'grey'}
                value={description}
                onChangeText={text => setdescription(text)}
              />
            </View>
            <View className={'w-5 h-5'} />
          </View>
          {/* Description */}
          <TouchableOpacity
            onPress={() => _handleSellCar()}
            activeOpacity={0.7}
            style={{width: width * 0.86}}
            className={
              'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg mt-3 self-center'
            }>
            <Text className={'text-xl font-semibold text-white'}>
              Publish Now
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
      <Alert
        isVisible={showAlert}
        message={alertText}
        onPress={() => {
          if (isSuccess) {
            navigation.navigate('CarInfo', {
              data: listingId,
            });
          }
          setAlertText('');
          setShowAlert(false);
        }}
      />
      <ImageSelection
        isVisible={isImageOptions}
        onPress={() => {
          setIsImageOptions(false);
        }}
        onPressOpenCamera={() => {
          selectOpenImages();
          setIsImageOptions(false);
        }}
        onPressOpenGallery={() => {
          selectImages();
          setIsImageOptions(false);
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
        data={car_brands}
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
      <FuelTypeModal
        title={'Select Fuel Type'}
        data={fuel_type}
        onPress={item => {
          if (item.name == 'electric') {
            setengine_capacity('0');
          } else {
            setbatteryCapacity('0');
          }
          setfuel({...fuel, name: item.name, id: item.id});
          setfuelTypeModal(false);
        }}
        isVisible={fuelTypeModal}
        handleIsVisible={() => setfuelTypeModal(false)}
      />
      <BodyColorModal
        title={'Select Body Color'}
        data={bodycolor}
        onPress={item => {
          setbodyColor(item);
          setBodyColorModal(false);
        }}
        isVisible={bodyColorModal}
        handleIsVisible={() => setBodyColorModal(false)}
      />
      <ModelYearModal
        onPress={item => {
          setModalYear(item);
          setmodelYearModal(false);
        }}
        isVisible={modelYearModal}
        handleIsVisible={() => setmodelYearModal(false)}
      />
    </>
  );
};

export default Index;
