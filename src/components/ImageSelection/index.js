import React, {Component} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import styles from './style';
import {Images} from '../../assets/images';

const Index = ({
  navigation,
  isVisible,
  onPress,
  onPressOpenCamera,
  onPressOpenGallery,
  ...props
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={onPress}>
        <View style={styles.lModalView}>
          <Text
            className={
              'text-xl text-[#0095FF] font-semibold uppercase underline'
            }>
            Choose Options
          </Text>
          <TouchableOpacity
            onPress={onPressOpenCamera}
            className={'flex flex-row items-center'}>
            <Image
              source={Images.OpenCamera}
              className={'w-7 h-7 mr-4'}
              resizeMode="contain"
            />
            <Text className={'text-base text-[#0095FF]'}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressOpenGallery}
            className={'flex flex-row items-center mt-3'}>
            <Image
              source={Images.OpenGallery}
              className={'w-7 h-7 mr-4'}
              resizeMode="contain"
            />
            <Text className={'text-base text-[#0095FF]'}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Index;
