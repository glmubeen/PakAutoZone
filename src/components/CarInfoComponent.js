import React from 'react';
import {View, Image, Dimensions, Text} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import {Images} from '../assets/images';

const Index = ({navigation, route, title, description, ...props}) => {
  return (
    <View
      style={{width: width * 0.9}}
      className={'flex flex-row justify-between items-center self-center mt-3'}>
      <View className={'flex flex-row items-center'}>
        <Image
          source={Images.carInfo}
          className={'w-4 h-4'}
          resizeMode={'contain'}
        />

        <Text className={'text-base text-black ml-4'}>{title}</Text>
      </View>
      <Text className={'text-base text-black'}>{description}</Text>
    </View>
  );
};

export default Index;
