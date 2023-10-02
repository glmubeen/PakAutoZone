import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import {Images} from '../../assets/images';
import {isSlider} from '../../store/action/user';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import Swiper from 'react-native-swiper';

const Index = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  return (
    <>
      <Swiper
        showsPagination={false}
        showsButtons={true}
        nextButton={
          <Image source={Images.arrow} className={'w-5 h-5 rotate-90'} />
        }
        prevButton={
          <Image source={Images.arrow} className={'w-5 h-5 -rotate-90'} />
        }>
        <View className={'flex-1 bg-[#0095FF]'}>
          <Image
            source={Images.Slider1}
            className={'w-full h-80 mt-20'}
            resizeMode={'cover'}
          />
          <ImageBackground
            source={Images.sliderBottom}
            style={{
              width: '100%',
              height: height * 0.57,
              // backgroundColor: 'red',
              position: 'absolute',
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            imageStyle={{width: '100%', height: height * 0.6}}
            resizeMode={'stretch'}>
            <Text className={'text-xl font-medium text-black mb-4'}>
              Find Your Dream Car
            </Text>
            <Text className={'w-72 text-base text-slate-500 text-center'}>
              Search for your dream car from the largest car investory
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BottomNavigator');
                dispatch(isSlider());
              }}
              activeOpacity={0.7}
              className={
                'w-72 p-2 rounded-lg bg-[#0095FF] flex items-center justify-center mt-8'
              }>
              <Text className={'text-lg font-medium text-white'}>
                Get Started
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        {/* swiper 2 */}
        <View className={'flex-1 bg-[#0095FF]'}>
          <Image
            source={Images.Slider2}
            className={'w-full h-80 mt-20'}
            resizeMode={'contain'}
          />
          <ImageBackground
            source={Images.sliderBottom}
            style={{
              width: '100%',
              height: height * 0.57,
              // backgroundColor: 'red',
              position: 'absolute',
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            imageStyle={{width: '100%', height: height * 0.6}}
            resizeMode={'stretch'}>
            <Text className={'text-xl font-medium text-black mb-4'}>
              Secure and trusted
            </Text>
            <Text className={'w-72 text-base text-slate-500 text-center'}>
              Search for your dream car from the largest car investory
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BottomNavigator');
                dispatch(isSlider());
              }}
              activeOpacity={0.7}
              className={
                'w-72 p-2 rounded-lg bg-[#0095FF] flex items-center justify-center mt-8'
              }>
              <Text className={'text-lg font-medium text-white'}>
                Get Started
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        {/* swiper 3 */}
        <View className={'flex-1 bg-[#0095FF]'}>
          <Image
            source={Images.Slider3}
            className={'w-full h-80 mt-20'}
            resizeMode={'contain'}
          />
          <ImageBackground
            source={Images.sliderBottom}
            style={{
              width: '100%',
              height: height * 0.57,
              // backgroundColor: 'red',
              position: 'absolute',
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            imageStyle={{width: '100%', height: height * 0.6}}
            resizeMode={'stretch'}>
            <Text className={'text-xl font-medium text-black mb-4'}>
              Sell your car
            </Text>
            <Text className={'w-72 text-base text-slate-500 text-center'}>
              Search for your dream car from the largest car investory
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BottomNavigator');
                dispatch(isSlider());
              }}
              activeOpacity={0.7}
              className={
                'w-72 p-2 rounded-lg bg-[#0095FF] flex items-center justify-center mt-8'
              }>
              <Text className={'text-lg font-medium text-white'}>
                Get Started
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </Swiper>
    </>
  );
};

export default Index;
