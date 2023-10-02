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
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, route, ...props}) => {
  const [isLoader, setIsLoader] = useState(false);
  const data = route.params.data;

  useEffect(() => {
    _getBikeBrand();
  }, []);

  const [getBike, setGetBike] = useState([]);

  const _getBikeBrand = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.BIKE_BRAND + '/' + data._id + '/models')
      .then(res => {
        setGetBike(res.data.data);
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
            title={`Bike List Modals`}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          <FlatList
            data={getBike}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('BikeListModals', {
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
                    'bg-white rounded-lg flex self-center p-2 pt-3 pb-3 items-center flex-row mt-3 justify-between'
                  }>
                  <View>
                    <Text
                    numberOfLines={1}
                      className={
                        'text-base text-black font-medium ml-3 uppercase'
                      }>
                      {item.name}
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
