import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Share,
  ScrollView,
  FlatList,
  Alert,
  Linking,
  SafeAreaView,
  Modal,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import {Images} from '../../assets/images';
// import CarComponent from '../../components/CarComponent';
import {SaveCar, DeleteCar} from '../../store/action/user';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import CarInfoComponent from '../../components/CarInfoComponent';
import Loader from '../../components/Loader.component';
import MyStatusBar from '../../components/StatusBar';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';

const Index = ({navigation, route, ...props}) => {
  const dispatch = useDispatch();
  const item = route.params.data;

  const [isLoader, setIsLoader] = useState(false);

  const carInfo = useSelector(state => state.userReducer.carInfo);
  const user = useSelector(state => state.userReducer.userData);
  const [tabs, setTabs] = useState(false);
  const [carData, setCarData] = useState(null);

  const config = {
    headers: {
      Authorization: user.accessToken,
    },
  };

  useEffect(() => {
    getCars();
  }, []);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [carDataImage, setCarDataImage] = useState([]);

  const getCars = () => {
    setIsLoader(true);
    axios
      .get(
        BaseURL.USED_CAR + (item?.link_id == undefined ? item : item?.link_id),
      )
      .then(res => {
        setIsLoader(false);
        setCarData(res.data.data);
        setCarDataImage(res.data.data.images);
        let phoneNumber = res.data.data.user.phone;
        let convertedNumber = '92' + phoneNumber.slice(1);
        setPhoneNumber(convertedNumber);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  let carInfoFilter = carInfo?.filter(x => x?._id === carData?._id);

  const [isVisible, setIsVisible] = useState(false);

  const handleImagePress = index => {
    const clickedImage = carDataImage[index];
    const updatedData = [
      clickedImage,
      ...carDataImage.slice(0, index),
      ...carDataImage.slice(index + 1),
    ];
    setIsVisible(true);
    setCarDataImage(updatedData);
  };

  const getInstantChat = () => {
    setIsLoader(true);
    let params = {
      userMe: user?.user?._id,
      userU: carData?.user?._id,
    };

    axios
      .post(BaseURL.NEW_CHAT, params, config)
      .then(res => {
        navigation.navigate('ChatScreen', {
          item: res.data.data,
        });
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  return (
    <>
      <View className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Carousel
            data={carDataImage}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handleImagePress(index);
                  }}>
                  <Image
                    source={{uri: item?.url}}
                    style={{
                      width: width,
                      height: height * 0.27,
                    }}
                    resizeMode={'cover'}
                  />
                </TouchableOpacity>
              );
            }}
            sliderWidth={width}
            itemWidth={width}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            className={
              'mr-4 flex items-center flex-row justify-center mt-3 self-end'
            }>
            <Image
              source={Images.Eye}
              className={'w-5 h-5'}
              resizeMode={'contain'}
            />
            <Text className={'text-black text-sm font-semibold ml-1'}>
              {carData?.views}
            </Text>
          </TouchableOpacity>

          <View
            style={{width: width * 0.95}}
            className={
              'flex items-center justify-between flex-row mt-2 self-center'
            }>
            <Text className={'text-black text-lg font-medium'}>
              {carData?.title} {carData?.model_year}
            </Text>
            <View className={'flex flex-row items-center'}>
              <TouchableOpacity
                onPress={() => onShare()}
                className={
                  'w-10 h-10 rounded-full bg-[#E6E6E6] mr-2 flex items-center justify-center'
                }>
                <Image
                  source={Images.share}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (carInfoFilter[0]?._id === undefined) {
                    dispatch(SaveCar(item));
                  } else {
                    dispatch(DeleteCar(item));
                  }
                }}
                className={
                  'w-10 h-10 rounded-full bg-[#E6E6E6] flex items-center justify-center'
                }>
                <Image
                  source={
                    carInfoFilter[0]?._id === undefined
                      ? Images.BlackHeart
                      : Images.BlueHeart
                  }
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text className={'mt-2 ml-6 font-semibold text-black text-2xl'}>
            Rs {carData?.price}
          </Text>
          <Text className={'mt-2 ml-6 text-slate-500 text-lg'}>
            {carData?.location.display}
          </Text>
          <View
            style={{width: width * 0.95}}
            className={'flex flex-row justify-between self-center mt-2'}>
            <TouchableOpacity
              onPress={() => setTabs(true)}
              className={`w-44 pt-2 pb-2 items-center ${
                tabs == false
                  ? 'bg-white border-2 border-[#0095FF]'
                  : 'bg-[#0095FF]'
              } rounded-lg`}>
              <Text
                className={`text-base ${
                  tabs == false ? 'text-[#0095FF]' : 'text-white'
                }`}>
                Overview
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTabs(false)}
              className={`w-44 pt-2 pb-2 items-center ${
                tabs == false
                  ? 'bg-[#0095FF]'
                  : 'bg-white border-2 border-[#0095FF]'
              } rounded-lg`}>
              <Text
                className={`text-base ${
                  tabs == false ? 'text-white' : 'text-[#0095FF]'
                }`}>
                Specs & Features
              </Text>
            </TouchableOpacity>
          </View>

          {!tabs == false ? (
            <>
              <Text
                className={'mt-8 ml-6 font-semibold text-black text-2xl mb-3'}>
                Car Overview
              </Text>

              <CarInfoComponent
                title={'Registration'}
                description={carData?.registration_city?.display}
              />
              <CarInfoComponent
                title={'Km driven'}
                description={carData?.distance_driven}
              />
              <CarInfoComponent
                title={'Model'}
                description={carData?.model.name}
              />
              <CarInfoComponent
                title={'Fuel'}
                description={carData?.fuel_type}
              />
              <CarInfoComponent
                title={'Engine'}
                description={carData?.engine_capacity}
              />
              <CarInfoComponent
                title={'Assembly'}
                description={carData?.assembly}
              />
              <CarInfoComponent
                title={'Transmission'}
                description={carData?.transmission_type}
              />
            </>
          ) : (
            <>
              <Text
                className={'mt-8 ml-6 font-semibold text-black text-2xl mb-3'}>
                Specification
              </Text>
              <CarInfoComponent
                title={'Registration'}
                description={carData?.registration_city.display}
              />
              <CarInfoComponent
                title={'Km driven'}
                description={carData?.distance_driven}
              />
              <CarInfoComponent
                title={'Model'}
                description={carData?.model.name}
              />

              <Text
                className={'mt-8 ml-6 font-semibold text-black text-2xl mb-3'}>
                Features
              </Text>
              <FlatList
                data={carData?.features}
                renderItem={({item}) => {
                  return (
                    <View
                      style={{width: width * 0.9}}
                      className={
                        'flex flex-row justify-between items-center self-center mt-3'
                      }>
                      <View className={'flex flex-row items-center'}>
                        <Image
                          source={Images.carInfo}
                          className={'w-4 h-4'}
                          resizeMode={'contain'}
                        />
                        <Text className={'text-base text-black ml-4'}>
                          {item?.name}
                        </Text>
                      </View>
                    </View>
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
            </>
          )}

          <Text className={'mt-8 ml-6 font-semibold text-black text-2xl'}>
            Description
          </Text>
          <Text
            style={{width: width * 0.9}}
            className={'mt-2 ml-6 text-slate-600 text-base'}>
            {carData?.description}
          </Text>
          <Text className={'mt-8 ml-6 font-semibold text-black text-2xl'}>
            Seller Details
          </Text>
          <View className={'flex pl-6 pb-5 border-b-2 border-slate-300'}>
            <View>
              <Text className={'text-black font-medium text-base'}>
                {carData?.user?.first_name} {carData?.user?.last_name}
              </Text>
              <Text className={'text-black font-thin text-sm'}>
                Member Since{' '}
                {moment(carData?.user?.created_on).format('MMM - YY')}
              </Text>
            </View>
            <View className={'flex flex-row'}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${carData?.user?.phone}`)}
                activeOpacity={0.7}
                style={{width: width * 0.44}}
                className={
                  'py-2 w-36 rounded-md bg-[#0095FF] mt-2 flex items-center justify-center mr-2 flex-row'
                }>
                <Image
                  source={Images.PhoneCall}
                  className={'w-6 h-6'}
                  resizeMode={'contain'}
                />
                <Text className={'text-white text-base font-medium ml-3'}>
                  Call
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(`https://wa.me/${phoneNumber}`)}
                activeOpacity={0.7}
                style={{width: width * 0.44}}
                className={
                  'py-2 rounded-md bg-[#0095FF] mt-2 flex items-center justify-center flex-row'
                }>
                <Image
                  source={Images.Whatsapp}
                  className={'w-6 h-6'}
                  resizeMode={'contain'}
                />
                <Text className={'text-white text-base font-medium ml-3'}>
                  Whatsapp
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{width: width * 0.9}}
              className={'flex flex-row justify-center'}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`sms:${carData?.user?.phone}`)}
                activeOpacity={0.7}
                style={{width: width * 0.44}}
                className={
                  'py-2 w-36 rounded-md bg-[#0095FF] mt-2 flex items-center justify-center mr-2 flex-row'
                }>
                <Image
                  source={Images.SMS}
                  className={'w-6 h-6'}
                  resizeMode={'contain'}
                />
                <Text className={'text-white text-base font-medium ml-3'}>
                  SMS
                </Text>
              </TouchableOpacity>
              {Object.keys(user).length !== 0 &&
              user?.user?._id !== carData?.user?._id ? (
                <TouchableOpacity
                  onPress={() => {
                    getInstantChat();
                  }}
                  activeOpacity={0.7}
                  style={{width: width * 0.44}}
                  className={
                    'py-2 rounded-md bg-[#0095FF] mt-2 flex items-center justify-center flex-row'
                  }>
                  <Image
                    source={Images.InstantChat}
                    className={'w-6 h-6'}
                    resizeMode={'contain'}
                  />
                  <Text className={'text-white text-base font-medium ml-3'}>
                    Instant Chat
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
      {isLoader && <Loader />}
      <Modal visible={isVisible} animationType={'none'}>
        <MyStatusBar backgroundColor={'black'} />
        <SafeAreaView className={'flex-1 bg-black'}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setIsVisible(false);
            }}>
            <Image
              source={Images.Minimize}
              style={{
                width: width * 0.06,
                height: width * 0.06,
                marginTop: height * 0.03,
                marginLeft: width * 0.03,
              }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View className={'flex items-center justify-center mt-40'}>
            <Carousel
              data={carDataImage}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setIsVisible(true);
                    }}>
                    <Image
                      source={{
                        uri: item?.url,
                      }}
                      style={{
                        width: width,
                        height: height * 0.27,
                      }}
                      resizeMode={'cover'}
                    />
                  </TouchableOpacity>
                );
              }}
              sliderWidth={width}
              itemWidth={width}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default Index;
