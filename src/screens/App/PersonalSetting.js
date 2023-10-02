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

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const [toggle, setToggle] = useState(false);
  const [toogle1, setToogle1] = useState(false);
  const user = useSelector(state => state.userReducer.userData);
  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'Setting'}
            isBack
            handleIsBack={() => navigation.goBack()}
          />

          <TouchableOpacity
            activeOpacity={1}
            style={{width: width * 0.95}}
            className={
              'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-12 justify-between'
            }>
            <View className={'ml-4'}>
              <Text className={'text-base font-semibold text-black'}>
                Email Address
              </Text>
              <Text className={'text-sm text-slate-500'}>
                {user?.user?.email}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={Images.ForwardArrowBlack}
                className={`w-9 h-7 ${
                  Platform.OS === 'ios' ? '' : 'origin-center -rotate-90'
                }`}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}
            activeOpacity={0.7}
            style={{width: width * 0.95}}
            className={
              'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
            }>
            <View className={'ml-4'}>
              <Text className={'text-base font-semibold text-black'}>
                Password
              </Text>
              <Text className={'text-sm text-slate-500'}>
                Change your password
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={Images.ForwardArrowBlack}
                className={`w-9 h-7 ${
                  Platform.OS === 'ios' ? '' : 'origin-center -rotate-90'
                }`}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={{width: width * 0.95}}
            className={
              'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
            }>
            <View className={'ml-4'}>
              <Text className={'text-base font-semibold text-black'}>
                Privacy
              </Text>
              <Text className={'text-sm text-slate-500'}>
                Phone number visiblity
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setToggle(!toggle)}>
              <Image
                source={toggle ? Images.ToggleOff : Images.ToggleOn}
                className={'w-12 h-5'}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{width: width * 0.95}}
            className={
              'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
            }>
            <View className={'ml-4'}>
              <Text className={'text-base font-semibold text-black'}>
                Notification
              </Text>
              <Text className={'text-sm text-slate-500'}>
                Recommendation and communications
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setToogle1(!toogle1)}>
              <Image
                source={toogle1 ? Images.ToggleOff : Images.ToggleOn}
                className={'w-12 h-5'}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Index;
