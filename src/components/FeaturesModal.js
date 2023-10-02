import {
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');
import MyStatusBar from './StatusBar';
import {Images} from '../assets/images';

const FeatureModal = ({
  isVisible,
  handleIsVisible,
  data,
  onPress,
  ...props
}) => {
  return (
    <Modal visible={isVisible} animationType={'slide'}>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.imgStyleCont}
            onPress={handleIsVisible}>
            <Image source={Images.Back} style={styles.img} />
          </TouchableOpacity>

          <Text allowFontScaling={false} style={styles.txt}>
            Select Feature
          </Text>

          <Text
            onPress={handleIsVisible}
            className={'font-bold text-white text-lg'}>
            Done
          </Text>
        </View>

        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => onPress(item)}
                activeOpacity={0.7}
                className={`w-96 flex self-center py-2 flex-row border-b-2 border-slate-200 items-center mt-4 ${
                  item.isActive == false ? 'bg-white' : 'bg-[#0095FF]'
                }`}>
                <Text
                  className={`text-lg ${
                    item.isActive == false ? 'text-black' : 'text-white'
                  } ml-4`}>
                  {index + 1}. {item.name}
                </Text>
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

export default FeatureModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.05,
    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: '#0095FF',
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imgStyleCont: {
    width: width * 0.06,
    height: width * 0.06,
  },
  txt: {
    color: 'white',
    fontSize: width * 0.065,
    marginLeft: width * 0.04,
    fontWeight: '600',
  },
  backCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
