import {
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import {Images} from '../assets/images';
import Header from './Header';
const {width, height} = Dimensions.get('window');
import MyStatusBar from './StatusBar';

const LocationModal = ({isVisible, handleIsVisible, ...props}) => {
  return (
    <Modal visible={isVisible} animationType={'slide'}>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <Header
          isBack
          title={'Select Registration City'}
          handleIsBack={handleIsVisible}
        />

        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={({}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{width: width * 0.9}}
                className={
                  'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4'
                }>
                <Image
                  source={Images.Place}
                  className={'w-10 h-10'}
                  resizeMode={'contain'}
                />
                <Text className={'text-lg text-black ml-4'}>Karachi</Text>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <Text
              className={
                'text-xl text-black font-semibold flex self-center mt-12'
              }>
              No List Found
            </Text>
          }
        />
      </SafeAreaView>
    </Modal>
  );
};

export default LocationModal;
