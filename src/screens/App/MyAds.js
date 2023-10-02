import React, {useState, useEffect} from 'react';
import {
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
import MyAdsComponent from '../../components/MyAdsComponent';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);
  const isLogin = useSelector(state => state.userReducer.isLogin);
  const config = {
    headers: {
      Authorization: user?.accessToken,
    },
  };

  const [data, setData] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      if (Object.keys(user).length !== 0) {
        _myAds();
      }
    });
    return focusListener;
  }, []);

  const _myAds = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.MY_ADS, config)
      .then(res => {
        setIsLoader(false);
        setData(res.data.data[0]);
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
          <Header title={'My Ads'} />
          {isLogin == true ? (
            <>
              <Text
                className={
                  'text-xl text-black font-bold uppercase ml-6 mt-6 underline'
                }>
                Cars:
              </Text>
              <FlatList
                data={data?.cars}
                renderItem={({item}) => {
                  return (
                    <MyAdsComponent
                      item={item}
                      onPress={() =>
                        navigation.navigate('CarInfo', {
                          data: item,
                        })
                      }
                    />
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

              <Text
                className={
                  'text-xl text-black font-bold uppercase ml-6 mt-6 underline'
                }>
                Bikes:{' '}
              </Text>
              <FlatList
                data={data?.bikes}
                renderItem={({item}) => {
                  return (
                    <MyAdsComponent
                      item={item}
                      onPress={() =>
                        navigation.navigate('BikeInfo', {
                          data: item,
                        })
                      }
                    />
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
              <Text
                className={
                  'text-xl text-black font-bold uppercase ml-6 mt-6 underline'
                }>
                Auto Parts & Accessories:
              </Text>
              <FlatList
                data={data?.autoParts}
                renderItem={({item}) => {
                  return (
                    <MyAdsComponent
                      item={item}
                      onPress={() =>
                        navigation.navigate('AutoPartsDetail', {
                          data: item,
                        })
                      }
                    />
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
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              activeOpacity={0.7}
              style={{width: width * 0.86}}
              className={
                'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg self-center mt-12'
              }>
              <Text className={'text-xl font-semibold text-white'}>Login</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
    </>
  );
};

export default Index;
// 143
