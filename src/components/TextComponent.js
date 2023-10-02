import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {Images} from '../assets/images';
const {width, height} = Dimensions.get('window');

const CarComponent = ({onPress, title, mainText, ...props}) => {
  return (
    <>
      <Text
        className={
          'font-bold text-black flex self-start ml-7 text-lg uppercase mt-3'
        }>
        {title}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          width: width * 0.9,
          borderWidth: 1,
          borderRadius: 10,
          paddingVertical: height * 0.01,
          paddingHorizontal: width * 0.03,
        }}
        className={'flex self-center mt-1 border-gray'}>
        <Text className={'text-lg text-black'}>{mainText}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CarComponent;
