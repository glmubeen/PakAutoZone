import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import {Images} from '../../assets/images';
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import Alert from '../../components/Alert/index';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);

  const [showAlert, setShowAlert] = useState(false);
  const alertText = 'To Sell Car / Bike You Should First Login First';

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.2}}>
          <Header title={'Sell Now'} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (Object.keys(user).length === 0) {
                setShowAlert(true);
              } else {
                navigation.navigate('SellCar');
              }
            }}
            style={{
              width: width * 0.9,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 7,
            }}
            className={
              'py-4 bg-white flex self-center mt-6 rounded-md items-center justify-between'
            }>
            <View className={'flex self-center'}>
              <Image
                source={Images.Carss}
                className={'w-24 h-24'}
                resizeMode={'contain'}
              />
            </View>
            <View
              className={
                'flex flex-row items-center justify-center self-center ml-5'
              }>
              <Text className={'text-lg font-medium text-black'}>
                Sell Cars
              </Text>
              <Image
                source={Images.ForwardArrowBlack}
                className={`w-7 h-7 ${
                  Platform.OS === 'ios' ? '' : 'origin-center -rotate-90'
                }`}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (Object.keys(user).length === 0) {
                setShowAlert(true);
              } else {
                navigation.navigate('SellBike');
              }
            }}
            style={{
              width: width * 0.9,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 7,
            }}
            className={
              'py-4 bg-white flex self-center mt-6 rounded-md items-center justify-between'
            }>
            <View className={'flex self-center'}>
              <Image
                source={Images.bycicle}
                className={'w-24 h-24'}
                resizeMode={'contain'}
              />
            </View>
            <View
              className={
                'flex flex-row items-center justify-center self-center ml-5'
              }>
              <Text className={'text-lg font-medium text-black'}>
                Sell Bikes
              </Text>
              <Image
                source={Images.ForwardArrowBlack}
                className={`w-7 h-7 ${
                  Platform.OS === 'ios' ? '' : 'origin-center -rotate-90'
                }`}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <Alert
        isVisible={showAlert}
        message={alertText}
        onPress={() => {
          setShowAlert(false);
        }}
      />
    </>
  );
};

export default Index;
