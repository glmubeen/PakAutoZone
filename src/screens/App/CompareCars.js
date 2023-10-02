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
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import {Images} from '../../assets/images';
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import BrandModal from '../../components/BrandModal';
import CarModelModal from '../../components/CarModelModal';
import CarListingModal from '../../components/CarListingModal';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const [brands1, setbrands1] = useState(null);
  const [carModal1, setcarModal1] = useState(null);
  const [cars1, setCars1] = useState(null);
  const [carListing1, setCarListing1] = useState([]);
  const [brandModal1, setBrandModal1] = useState(false);
  const [carModelModal1, setCarModelModal1] = useState(false);
  const [carListingModal1, setCarListingModal1] = useState(false);

  const [brands2, setbrands2] = useState(null);
  const [carModal2, setcarModal2] = useState(null);
  const [cars2, setCars2] = useState(null);
  const [carListing2, setCarListing2] = useState([]);
  const [brandModal2, setBrandModal2] = useState(false);
  const [carModelModal2, setCarModelModal2] = useState(false);
  const [carListingModal2, setCarListingModal2] = useState(false);

  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    getBrands();
  }, []);

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

  const _getCars1 = (brand, carId) => {
    axios
      .get(BaseURL.CAR_BRAND_MODAL + brand + '/m/' + carId + '/page/1')
      .then(res => {
        setCarListing1(res.data.data);
      })
      .catch(err => {});
  };

  const _getCars2 = (brand, carId) => {
    axios
      .get(BaseURL.CAR_BRAND_MODAL + brand + '/m/' + carId + '/page/1')
      .then(res => {
        setCarListing2(res.data.data);
      })
      .catch(err => {});
  };

  const [tempObj1, setTempObj1] = useState(null);
  const [tempObj2, setTempObj2] = useState(null);

  const _handleCompare = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.COMPARE + cars1?.id + '/' + cars2?.id)
      .then(res => {
        setIsLoader(false);
        setTempObj1(res.data.data[0]);
        setTempObj2(res.data.data[1]);
        setisCompareShown(true);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const [isCompareShown, setisCompareShown] = useState(false);

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={`Compare Cars`}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          <Text
            className={'text-xl font-semibold underline text-black mt-6 ml-6'}>
            Select Car 1:
          </Text>
          {/* Brands */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setBrandModal1(true)}
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
                {brands1 == null ? 'Brands' : brands1.brands1}
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
            onPress={() => setCarModelModal1(true)}
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
                {carModal1 == null ? 'Car Models' : carModal1.name}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Car Model */}
          {/* Cars */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setCarListingModal1(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-2'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.Carss}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {cars1 == null ? 'Cars' : cars1.name}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Cars */}
          <Text
            className={'text-xl font-semibold underline text-black mt-6 ml-6'}>
            Select Car 2
          </Text>
          {/* Brands */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setBrandModal2(true)}
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
                {brands2 == null ? 'Brands' : brands2.brands2}
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
            onPress={() => setCarModelModal2(true)}
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
                {carModal2 == null ? 'Car Models' : carModal2.name}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Car Model */}
          {/* Cars */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setCarListingModal2(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-2'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.Carss}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {cars2 == null ? 'Cars' : cars2.name}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Cars */}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              _handleCompare();
            }}
            style={{width: width * 0.9}}
            className={
              'py-3 rounded-md flex items-center justify-center bg-[#0095FF] self-center mt-4'
            }>
            <Text className={'text-xl font-semibold text-white uppercase'}>
              Compare
            </Text>
          </TouchableOpacity>
          {isCompareShown == true ? (
            <>
              <Text
                className={
                  'text-2xl font-bold text-[#0095FF] mt-4 mb-2 uppercase flex text-center w-full underline'
                }>
                comparison table
              </Text>
              <Text
                className={
                  'text-xl font-bold text-[#0095FF] uppercase flex self-center'
                }>
                images
              </Text>
              <View
                className={'w-full bg-gray mt-7 flex flex-row justify-between'}>
                <View className={'w-[49.9%] bg-white'}>
                  <View className={'rounded-lg overflow-hidden w-40 h-40 ml-7'}>
                    <Image
                      source={{uri: tempObj1?.images[0].url}}
                      style={{width: '100%', height: '100%'}}
                      resizeMode={'cover'}
                    />
                  </View>
                </View>
                <View className={'w-[49.9%] bg-white'}>
                  <View className={'rounded-lg overflow-hidden w-40 h-40 ml-7'}>
                    <Image
                      source={{uri: tempObj2?.images[0].url}}
                      style={{width: '100%', height: '100%'}}
                      resizeMode={'cover'}
                    />
                  </View>
                </View>
              </View>
              <Text
                className={
                  'text-xl font-bold text-[#0095FF] mt-6 uppercase flex self-center'
                }>
                details
              </Text>
              <View
                className={'w-full bg-gray mt-7 flex flex-row justify-between'}>
                <View className={'w-[49.9%] bg-white'}>
                  <Text
                    numberOfLines={1}
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Title: {tempObj1?.title}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Model: {tempObj1?.model.name}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Year: {tempObj1?.model_year}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Condition: {tempObj1?.condition}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Fuel: {tempObj1?.fuel_type}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    KM Driven: {tempObj1?.distance_driven}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Price: {tempObj1?.price}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Transmission: {tempObj1?.transmission_type}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Assembly: {tempObj1?.assembly}
                  </Text>
                </View>
                <View className={'w-[49.9%] bg-white'}>
                  <Text
                    numberOfLines={1}
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Title: {tempObj2?.title}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Model: {tempObj2?.model.name}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Year: {tempObj2?.model_year}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Condition: {tempObj2?.condition}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Fuel: {tempObj2?.fuel_type}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    KM Driven: {tempObj2?.distance_driven}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Price: {tempObj2?.price}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Transmission: {tempObj2?.transmission_type}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Assembly: {tempObj2?.assembly}
                  </Text>
                </View>
              </View>
              <Text
                className={
                  'text-xl font-bold text-[#0095FF] mt-6 uppercase flex self-center'
                }>
                features
              </Text>
              <View
                className={'w-full bg-gray mt-7 flex flex-row justify-between'}>
                <View className={'w-[49.9%] bg-white'}>
                  <FlatList
                    data={tempObj1?.features}
                    renderItem={({item, index}) => {
                      return (
                        <Text
                          className={
                            'text-base font-medium text-black ml-3 mt-2'
                          }>
                          {index + 1}. {item.name}
                        </Text>
                      );
                    }}
                    ListEmptyComponent={
                      <Text
                        className={
                          'text-xl text-black font-semibold flex self-center mt-12'
                        }>
                        No List Found
                      </Text>
                    }
                  />
                </View>
                <View className={'w-[49.9%] bg-white'}>
                  <FlatList
                    data={tempObj2?.features}
                    renderItem={({item, index}) => {
                      return (
                        <Text
                          className={
                            'text-base font-medium text-black ml-3 mt-2'
                          }>
                          {index + 1}. {item.name}
                        </Text>
                      );
                    }}
                    ListEmptyComponent={
                      <Text
                        className={
                          'text-xl text-black font-semibold flex self-center mt-12'
                        }>
                        No List Found
                      </Text>
                    }
                  />
                </View>
              </View>
            </>
          ) : null}
        </ScrollView>
      </SafeAreaView>
      {/* Car 1 */}
      <BrandModal
        data={brand}
        onPress={item => {
          setbrands1({...brands1, brands1: item.name, id: item._id});
          getBrandsModals(item._id);
          setBrandModal1(false);
        }}
        isVisible={brandModal1}
        handleIsVisible={() => setBrandModal1(false)}
      />
      <CarModelModal
        data={car_brands}
        onPress={item => {
          setcarModal1({...carModal1, name: item.name, id: item._id});
          _getCars1(item.brand, item._id);
          setCarModelModal1(false);
        }}
        isVisible={carModelModal1}
        handleIsVisible={() => setCarModelModal1(false)}
      />
      <CarListingModal
        title={'Choose Car'}
        data={carListing1}
        onPress={item => {
          setCars1({...cars1, name: item.title, id: item._id});
          setCarListingModal1(false);
        }}
        isVisible={carListingModal1}
        handleIsVisible={() => setCarListingModal1(false)}
      />
      {/* Car 2 */}
      <BrandModal
        data={brand}
        onPress={item => {
          setbrands2({...brands2, brands2: item.name, id: item._id});
          getBrandsModals(item._id);
          setBrandModal2(false);
        }}
        isVisible={brandModal2}
        handleIsVisible={() => setBrandModal2(false)}
      />
      <CarModelModal
        data={car_brands}
        onPress={item => {
          setcarModal2({...carModal2, name: item.name, id: item._id});
          _getCars2(item.brand, item._id);
          setCarModelModal2(false);
        }}
        isVisible={carModelModal2}
        handleIsVisible={() => setCarModelModal2(false)}
      />
      <CarListingModal
        title={'Choose Car'}
        data={carListing2}
        onPress={item => {
          setCars2({...cars2, name: item.title, id: item._id});
          setCarListingModal2(false);
        }}
        isVisible={carListingModal2}
        handleIsVisible={() => setCarListingModal2(false)}
      />
      {isLoader && <Loader />}
    </>
  );
};

export default Index;
