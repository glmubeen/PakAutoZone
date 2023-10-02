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
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, route, ...props}) => {
  const [isLoader, setIsLoader] = useState(false);
  const data = route.params.data;

  useEffect(() => {
    _getCarBrand();
  }, []);

  const [getCars, setGetCars] = useState([]);

  const _getCarBrand = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.CAR_BRAND_MODAL + data.brand + '/m/' + data._id + '/page/1')
      .then(res => {
        setGetCars(res.data.data);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={`Car List`}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          <FlatList
            data={getCars}
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
              <Text
                className={
                  'text-xl text-black font-semibold flex self-center mt-12'
                }>
                No List Found
              </Text>
            }
          />
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
    </>
  );
};

export default Index;
