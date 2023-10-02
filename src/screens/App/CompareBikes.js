import React, {useState, useEffect} from 'react';
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
  const [bikeModal1, setbikeModal1] = useState(null);
  const [bikes1, setbikes1] = useState(null);
  const [bikeListing1, setbikeListing1] = useState([]);
  const [brandModal1, setBrandModal1] = useState(false);
  const [bikeModelModal1, setbikeModelModal1] = useState(false);
  const [bikeListingModal1, setbikeListingModal1] = useState(false);

  const [brands2, setbrands2] = useState(null);
  const [bikeModal2, setbikeModal2] = useState(null);
  const [bikes2, setbikes2] = useState(null);
  const [bikeListing2, setbikeListing2] = useState([]);
  const [brandModal2, setBrandModal2] = useState(false);
  const [bikeModelModal2, setbikeModelModal2] = useState(false);
  const [bikeListingModal2, setbikeListingModal2] = useState(false);

  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    getBrands();
  }, []);

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

  const _getbikes1 = (brand, bikeId) => {
    axios
      .get(BaseURL.BIKE_BRAND_MODAL + brand + '/m/' + bikeId + '/page/1')
      .then(res => {
        setbikeListing1(res.data.data);
      })
      .catch(err => {});
  };

  const _getbikes2 = (brand, bikeId) => {
    axios
      .get(BaseURL.BIKE_BRAND_MODAL + brand + '/m/' + bikeId + '/page/1')
      .then(res => {
        setbikeListing2(res.data.data);
      })
      .catch(err => {});
  };

  const [tempObj1, setTempObj1] = useState(null);
  const [tempObj2, setTempObj2] = useState(null);

  const _handleCompare = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.BIKE_COMPARE + bikes1?.id + '/' + bikes2?.id)
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
            title={`Compare Bikes`}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          <Text
            className={'text-xl font-semibold underline text-black mt-6 ml-6'}>
            Select Bike 1:
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
          {/* Bike Model */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setbikeModelModal1(true)}
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
                {bikeModal1 == null ? 'Bike Models' : bikeModal1.name}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Bike Model */}
          {/* Bikes */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setbikeListingModal1(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-2'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.bycicle}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {bikes1 == null ? 'Bikes' : bikes1.name}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Bikes */}
          <Text
            className={'text-xl font-semibold underline text-black mt-6 ml-6'}>
            Select Bikes 2
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
          {/* Bike Model */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setbikeModelModal2(true)}
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
                {bikeModal2 == null ? 'Bike Models' : bikeModal2.name}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Bike Model */}
          {/* Bikes */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setbikeListingModal2(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-2'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.bycicle}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {bikes2 == null ? 'Bikes' : bikes2.name}
              </Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Bikes */}

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
                  'text-xl font-bold text-[#0095FF] uppercase mt-6 flex self-center'
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
                    KM Driven: {tempObj1?.distance_driven}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Price: {tempObj1?.price}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Engine Type: {tempObj1?.engine_type}
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
                    KM Driven: {tempObj2?.distance_driven}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Price: {tempObj2?.price}
                  </Text>
                  <Text
                    className={'text-base font-medium text-black ml-3 mt-2'}>
                    Engine Type: {tempObj1?.engine_type}
                  </Text>
                </View>
              </View>
              <Text
                className={
                  'text-xl font-bold text-[#0095FF] uppercase mt-6 flex self-center'
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
      {/* Bike 1 */}
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
        data={bike_brands}
        onPress={item => {
          setbikeModal1({...bikeModal1, name: item.name, id: item._id});
          _getbikes1(item.brand, item._id);
          setbikeModelModal1(false);
        }}
        isVisible={bikeModelModal1}
        handleIsVisible={() => setbikeModelModal1(false)}
      />
      <CarListingModal
        title={'Choose Bike'}
        data={bikeListing1}
        onPress={item => {
          setbikes1({...bikes1, name: item.title, id: item._id});
          setbikeListingModal1(false);
        }}
        isVisible={bikeListingModal1}
        handleIsVisible={() => setbikeListingModal1(false)}
      />
      {/* Bike 2 */}
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
        data={bike_brands}
        onPress={item => {
          setbikeModal2({...bikeModal2, name: item.name, id: item._id});
          _getbikes2(item.brand, item._id);
          setbikeModelModal2(false);
        }}
        isVisible={bikeModelModal2}
        handleIsVisible={() => setbikeModelModal2(false)}
      />
      <CarListingModal
        title={'Choose Bike'}
        data={bikeListing2}
        onPress={item => {
          setbikes2({...bikes2, name: item.title, id: item._id});
          setbikeListingModal2(false);
        }}
        isVisible={bikeListingModal2}
        handleIsVisible={() => setbikeListingModal2(false)}
      />
      {isLoader && <Loader />}
    </>
  );
};

export default Index;
