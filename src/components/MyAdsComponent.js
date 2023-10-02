import React from 'react';
import {View, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import {Images} from '../assets/images';

const Index = ({navigation, item, onPress, ...props}) => {
  return (
    <>
      <View style={{width: width * 0.9}} className={'flex  self-center mt-3'}>
        <View
          className={
            'px-3 h-6 bg-[#0095FF] flex self-end rounded-tl-md rounded-tr-md items-center justify-center'
          }>
          <Text className={'text-xs text-white uppercase'}>{item?.status}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onPress}
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
          'bg-white rounded-lg flex self-center p-3 items-center flex-row'
        }>
        <Image
          source={{uri: item?.images[0]?.url}}
          className={'w-32 h-24'}
          resizeMode={'cover'}
        />
        <View className={'ml-3'}>
          <Text
            numberOfLines={1}
            className={'text-base text-black font-semibold'}>
            {item?.title} {item?.model_year}
          </Text>

          <Text numberOfLines={1} className={'text-sm text-gray'}>
            {item?.model_year} - {item?.distance_driven}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Index;
