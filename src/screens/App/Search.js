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
  Platform,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import {Images} from '../../assets/images';
import Input from '../../components/Input';
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';

const Index = ({navigation, ...props}) => {
  const [search, setSearch] = useState('');
  const user = useSelector(state => state.userReducer.userData);

  const config = {
    headers: {
      Authorization: user.accessToken,
    },
  };
  const [data, setData] = useState([]);
  const _handleSearchCar = title => {
    if (title === '') {
      setData([]);
    } else {
      if (title.length > 3) {
        axios
          .get(BaseURL.SEARCH + `cars?title=${title.toLowerCase()}`, config)
          .then(res => {
            setData(res.data.data);
          })
          .catch(err => {});
      }
    }
  };
  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={`Discover`}
            isBack
            handleIsBack={() => navigation.goBack()}
          />

          <Input
            mainText={'Search'}
            placeholderText={'Search Here'}
            value={search}
            handleOnChangeTxt={text => {
              _handleSearchCar(text);
              setSearch(text);
            }}
          />

          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CarInfo', {
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
                    <Text className={'text-base text-black font-medium mb-2'}>
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
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('SearchCar')}
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
                  'py-4 bg-white flex self-center mt-6 rounded-md items-center justify-between'
                }>
                <View
                  className={
                    'flex flex-row items-center justify-center self-center ml-5'
                  }>
                  <Text className={'text-lg font-medium text-[#0095FF]'}>
                    Advance Filter
                  </Text>
                  <Image
                    source={Images.arrow}
                    className={`w-4 h-4 ml-2 rotate-90
                    `}
                    resizeMode={'contain'}
                  />
                </View>
              </TouchableOpacity>
            }
          />
          {/* <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SearchCar')}
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
              'py-4 bg-white flex self-center mt-6 rounded-md items-center justify-between'
            }>
            <View className={'flex self-center'}>
              <Image
                source={Images.Carss}
                className={'w-24 h-24'}
                resizeMode={'contain'}
              />
            </View>
            <View
              className={
                'flex flex-row items-center justify-center self-center ml-5'
              }>
              <Text className={'text-lg font-medium text-black'}>
                Find Cars
              </Text>
              <Image
                source={Images.ForwardArrowBlack}
                className={`w-7 h-7 ${
                  Platform.OS === 'ios' ? '' : 'origin-center -rotate-90'
                }`}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SearchBike')}
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
              'py-4 bg-white flex self-center mt-6 rounded-md items-center justify-between'
            }>
            <View className={'flex self-center'}>
              <Image
                source={Images.bycicle}
                className={'w-24 h-24'}
                resizeMode={'contain'}
              />
            </View>
            <View
              className={
                'flex flex-row items-center justify-center self-center ml-5'
              }>
              <Text className={'text-lg font-medium text-black'}>
                Lookup Bikes
              </Text>
              <Image
                source={Images.ForwardArrowBlack}
                className={`w-7 h-7 ${
                  Platform.OS === 'ios' ? '' : 'origin-center -rotate-90'
                }`}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SearchAutoPart')}
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
              'py-4 bg-white flex self-center mt-6 rounded-md items-center justify-between'
            }>
            <View className={'flex self-center'}>
              <Image
                source={Images.AutoPart}
                className={'w-20 h-20'}
                resizeMode={'contain'}
              />
            </View>
            <View
              className={
                'flex flex-row items-center justify-center self-center ml-5'
              }>
              <Text className={'text-lg font-medium text-black'}>
                Search Auto Parts
              </Text>
              <Image
                source={Images.ForwardArrowBlack}
                className={`w-7 h-7 ${
                  Platform.OS === 'ios' ? '' : 'origin-center -rotate-90'
                }`}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Index;
