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

const CarComponent = ({
  onPressTrue,
  onPressFalse,
  title,
  mainText,
  condition1,
  condition2,
  condition,
  ...props
}) => {
  return (
    <View
      style={{width: width * 0.95}}
      className={
        'pt-2 pb-2 flex self-center mt-1'
      }>
      <Text
        className={
          'font-bold text-black flex self-start ml-7 text-lg uppercase mt-3'
        }>
        {title}
      </Text>
      <View className={'flex flex-row mt-1 ml-5'}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressTrue}
          className={`py-1 px-4 rounded-2xl ${
            condition == true ? 'bg-[#0095FF]' : 'bg-[#D9D9D9]'
          } flex items-center mr-2`}>
          <Text className={'text-black text-sm'}>{condition1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressFalse}
          className={`py-1 px-4 rounded-2xl ${
            condition == false ? 'bg-[#0095FF]' : 'bg-[#D9D9D9]'
          } flex items-center`}>
          <Text className={'text-black text-sm'}>{condition2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarComponent;
