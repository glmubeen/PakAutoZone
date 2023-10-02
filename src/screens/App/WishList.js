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
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const carInfo = useSelector(state => state.userReducer.carInfo);
  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'My Wishlist'}
            isBack
            handleIsBack={() => navigation.goBack()}
          />

          <FlatList
            data={carInfo}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item.engine_type == undefined) {
                      navigation.navigate('CarInfo', {
                        data: item,
                      });
                    } else {
                      navigation.navigate('BikeInfo', {
                        data: item,
                      });
                    }
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
                    resizeMode={'cover'}
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
    </>
  );
};

export default Index;
