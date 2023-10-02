import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const FinancingStep = ({title, count}) => {
  return (
    <View className={'flex-row items-center rounded-md mt-4'}>
      <View
        className={
          'w-10 h-10 rounded-full items-center justify-center border-blue border-[2px]'
        }>
        <Text className={'text-xs font-bold text-blue'}>{count}</Text>
      </View>
      <Text
        style={{width: width * 0.7}}
        className={'ml-3 text-sm font-medium text-[#3c3838]'}>
        {title}
      </Text>
    </View>
  );
};

export default FinancingStep;

const styles = StyleSheet.create({});
