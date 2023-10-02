import {
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import Header from './Header';
const {width, height} = Dimensions.get('window');
import MyStatusBar from './StatusBar';

const CarListingModal = ({
  isVisible,
  handleIsVisible,
  data,
  onPress,
  title,
  ...props
}) => {
  return (
    <Modal visible={isVisible} animationType={'slide'}>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <Header isBack title={title} handleIsBack={handleIsVisible} />

        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => onPress(item)}
                activeOpacity={0.7}
                style={{width: width * 0.9}}
                className={
                  'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4'
                }>
                <Text className={'text-lg text-black ml-4'}>{item.title}</Text>
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

export default CarListingModal;
