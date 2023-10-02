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
import ModelYearModal from '../../components/ModelYearModal';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';
import ImageSelection from '../../components/ImageSelection';

//third party library
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import EngineType from '../../components/EngineType';

const Index = ({navigation, ...props}) => {
  const [feactureModal, setFeactureModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [carModelModal, setCarModelModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [registrationModal, setRegistrationModal] = useState(false);
  const [modelYearModal, setmodelYearModal] = useState(false);
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

  const _handleFeature = updateItem => {
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
  const [bikeModal, setbikeModal] = useState(null);
  const [regCity, setregCity] = useState(null);
  const [isCondition, setisCondition] = useState(false);
  const [isEngineType, setIsEngineType] = useState(false);
  const [price, setPrice] = useState('');
  const [kmDriven, setkmDriven] = useState('');
  const [description, setdescription] = useState('');
  const [title, settitle] = useState('');
  const [modalYear, setModalYear] = useState('');
  const [engine_type, setengine_type] = useState('');

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: user.accessToken,
    },
  };

  const _handleSellBike = () => {
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
    data.append('model', bikeModal?.id);
    data.append('model_year', modalYear);
    data.append('registration_city', regCity?.id);
    data.append('condition', condition);
    data.append('price', price);
    data.append('distance_driven', kmDriven);
    data.append('engine_type', engine_type);

    axios
      .post(BaseURL.POST_BIKE, data, config)
      .then(res => {
        setListingId(res.data.listingId);
        setIsSuccess(true);
        setIsLoader(false);
        setShowAlert(true);
        setAlertText('Bike Added');
        setLoc(null);
        setbrands(null);
        setbikeModal(null);
        setregCity(null);
        setisCondition(false);
        setPrice('');
        setkmDriven('');
        setdescription('');
        settitle('');
        setModalYear('');
        setengine_type('');
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
            title={'Sell Your Bike'}
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
                {bikeModal == null ? 'Bike Models' : bikeModal.name}
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
          {/* Feacture */}
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
          {/* Feacture */}

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

          {/* engine_type */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsEngineType(true)}
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
              <Text className={'text-lg text-black capitalize'}>
                {engine_type == '' ? 'Engine Type' : engine_type}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* engine_type */}

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
            onPress={() => _handleSellBike()}
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
            navigation.navigate('BikeInfo', {
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
          _handleFeature(item);
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
          setbikeModal({...bikeModal, name: item.name, id: item._id});
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
      <ModelYearModal
        onPress={item => {
          setModalYear(item);
          setmodelYearModal(false);
        }}
        isVisible={modelYearModal}
        handleIsVisible={() => setmodelYearModal(false)}
      />
      <EngineType
        onPress={item => {
          setengine_type(item);
          setIsEngineType(false);
        }}
        isVisible={isEngineType}
        handleIsVisible={() => setIsEngineType(false)}
      />
    </>
  );
};

export default Index;
