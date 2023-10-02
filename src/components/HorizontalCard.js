import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const HorizontalCard = ({title, subtitle, image}) => {
  return (
    <View className={'flex-row items-center bg-[#e2edff] p-4 rounded-md mt-3'}>
      <View className={'bg-slate-100 p-2 rounded-full'}>
        <Image
          source={image}
          style={{width: width * 0.05, height: width * 0.05}}
        />
      </View>
      <View className={'ml-3'}>
        <Text className={'text-base font-semibold text-black'}>{title}</Text>
        <Text
          style={{width: width * 0.7}}
          className={'text-sm font-normal text-[#565656]'}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({});
