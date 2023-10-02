import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import {Images} from '../../assets/images';
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import {logout} from '../../store/action/user';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const user = useSelector(state => state.userReducer.isLogin);
  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header title={'Menu'} />
          {!user && (
            <View
              style={{width: width * 0.9}}
              className={'flex flex-row mt-12 self-center justify-between'}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                activeOpacity={0.7}
                className={
                  'w-40 pt-1 pb-1 rounded-xl border-2 border-[#0095FF] flex items-center'
                }>
                <Text className={'text-lg text-[#0095FF]'}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
                activeOpacity={0.7}
                className={
                  'w-40 pt-1 pb-1 rounded-xl bg-[#0095FF] flex items-center'
                }>
                <Text className={'text-lg text-white'}>Login</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text className={'mt-10 ml-6 font-semibold text-lg text-black'}>
            Personal Info
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{width: width * 0.9}}
            className={
              'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
            }>
            <Image
              source={Images.BlackNotification}
              className={'w-5 h-5'}
              resizeMode={'contain'}
            />
            <Text
              style={{width: width * 0.67}}
              className={'text-base text-black ml-2'}>
              Notification
            </Text>
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
            onPress={() => navigation.navigate('WishList')}
            activeOpacity={0.7}
            style={{width: width * 0.9}}
            className={
              'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
            }>
            <Image
              source={Images.BlackHeart}
              className={'w-5 h-5'}
              resizeMode={'contain'}
            />
            <Text
              style={{width: width * 0.67}}
              className={'text-base text-black ml-2'}>
              My Wishlist
            </Text>
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
          <TouchableOpacity
            onPress={() => navigation.navigate('CompareCars')}
            activeOpacity={0.7}
            style={{width: width * 0.9}}
            className={
              'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
            }>
            <Image
              source={Images.Carss}
              className={'w-5 h-5'}
              resizeMode={'contain'}
            />
            <Text
              style={{width: width * 0.67}}
              className={'text-base text-black ml-2'}>
              Compare Cars
            </Text>
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
          <TouchableOpacity
            onPress={() => navigation.navigate('CompareBikes')}
            activeOpacity={0.7}
            style={{width: width * 0.9}}
            className={
              'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
            }>
            <Image
              source={Images.bycicle}
              className={'w-5 h-5'}
              resizeMode={'contain'}
            />
            <Text
              style={{width: width * 0.67}}
              className={'text-base text-black ml-2'}>
              Compare Bikes
            </Text>
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
          {user && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddAutoParts')}
                activeOpacity={0.7}
                style={{width: width * 0.9}}
                className={
                  'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
                }>
                <Image
                  source={Images.AddAutoPart}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                />
                <Text
                  style={{width: width * 0.67}}
                  className={'text-base text-black ml-2'}>
                  Add Auto Parts & Accessories
                </Text>
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
              <TouchableOpacity
                onPress={() => navigation.navigate('AutoPartOrders')}
                activeOpacity={0.7}
                style={{width: width * 0.9}}
                className={
                  'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
                }>
                <Image
                  source={Images.ShoppingBag}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                />
                <Text
                  style={{width: width * 0.67}}
                  className={'text-base text-black ml-2'}>
                  My Orders
                </Text>
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
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchBike')}
                activeOpacity={0.7}
                style={{width: width * 0.9}}
                className={
                  'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
                }>
                <Image
                  source={Images.bycicle}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                />
                <Text
                  style={{width: width * 0.67}}
                  className={'text-base text-black ml-2'}>
                  Search Bike
                </Text>
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
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchAutoPart')}
                activeOpacity={0.7}
                style={{width: width * 0.9}}
                className={
                  'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
                }>
                <Image
                  source={Images.AutoPart}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                />
                <Text
                  style={{width: width * 0.67}}
                  className={'text-base text-black ml-2'}>
                  Search Auto Part & Accessories
                </Text>
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

              <Text className={'mt-10 ml-6 font-semibold text-lg text-black'}>
                General
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PersonalSetting')}
                activeOpacity={0.7}
                style={{width: width * 0.9}}
                className={
                  'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
                }>
                <Image
                  source={Images.PersonalSetting}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                />
                <Text
                  style={{width: width * 0.67}}
                  className={'text-base text-black ml-2'}>
                  Personal Setting
                </Text>
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

              <TouchableOpacity
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Splash'}],
                  });
                  dispatch(logout());
                }}
                activeOpacity={0.7}
                style={{width: width * 0.9}}
                className={
                  'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4 justify-between'
                }>
                <Image
                  source={Images.SignOut}
                  className={'w-5 h-5'}
                  resizeMode={'contain'}
                />
                <Text
                  style={{width: width * 0.67}}
                  className={'text-base text-red-500 ml-2'}>
                  Logout
                </Text>
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
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Index;
