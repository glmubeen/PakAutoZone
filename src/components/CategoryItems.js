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

const CategoryComponent = ({onPress, title, image, ...props}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.shadow, {width: width * 0.25, height: height * 0.155}]}
        className={'bg-white my-1 mx-1 rounded-md flex items-center '}>
        <Image
          source={image}
          className={'h-7 w-7 mt-6'}
          resizeMode={'contain'}
        />
        <Text
          className={
            'text-slate-500 font-medium text-sm mt-3 w-20 text-center'
          }>
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
