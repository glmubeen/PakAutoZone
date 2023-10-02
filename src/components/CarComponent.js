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

const CarComponent = ({onPress, item, ...props}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{borderWidth: 1, borderColor: 'gray'}}
      className={'mr-4 w-52 h-64 bg-white rounded-xl overflow-hidden'}>
      <Image
        source={{uri: item.images[0].url}}
        className={'w-52 h-32'}
        resizeMode={'stretch'}
      />
      <Text numberOfLines={1} className={'text-xl text-black ml-2 mt-1'}>{item.title}</Text>
      <Text className={'text-2xl text-black font-semibold ml-2'}>
        Rs {item.price}
      </Text>
      <Text className={'text-base text-black ml-2'}>
        {item.location.display}
      </Text>
      <View
        className={'flex flex-row justify-between w-48 self-center mt-1 ml-1'}>
        <Text className={'text-slate-400'}>
          {item.model_year} - {item.distance_driven}km
        </Text>
        {/* <Text>{item.date}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default CarComponent;
