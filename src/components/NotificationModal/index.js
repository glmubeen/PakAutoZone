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
  onPressClose,
  onPressMove,
  message,
  name,
  ...props
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.lModalView}>
          <View style={styles.logoBox}>
            <Image source={Images.Logo} style={styles.logoStyle} />
          </View>

          <Text style={styles.msgText}>You Got New Message From {name}</Text>
          <Text style={styles.msgText}>{message}</Text>
          <View className={'flex flex-row w-full items-center justify-center'}>
            <TouchableOpacity onPress={onPressMove} style={styles.okBox}>
              <Text style={styles.okText}>Read</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressClose} style={styles.okBox}>
              <Text style={styles.okText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Index;
