import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';

import {Images} from '../assets/images';

// App
import Home from '../screens/App/Home';
import FAQ from '../screens/App/FAQ';
import WishList from '../screens/App/WishList';
import TermsCondition from '../screens/App/TermsCondition';
import PersonalSetting from '../screens/App/PersonalSetting';
import WriteReview from '../screens/App/WriteReview';
import PrivacyPolicy from '../screens/App/PrivacyPolicy';
import ContactUs from '../screens/App/ContactUs';
import AboutUs from '../screens/App/AboutUs';

import {BottomNavigator} from './bottom.navigator';
import MyStatusBar from '../components/StatusBar';

const {width, height} = Dimensions.get('window');
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const drawer = [
    {
      name: 'Profile Information',
      onPress: () => props.navigation.navigate('PersonalSetting'),
      img: Images.drawer1,
    },
    {
      name: 'Sell Car',
      onPress: () => props.navigation.navigate('SellCar'),
      img: Images.drawer2,
    },
    {
      name: 'Sell Bike',
      onPress: () => props.navigation.navigate('SellBike'),
      img: Images.drawer3,
    },
    {
      name: 'Sell Auto Parts & Accessories',
      onPress: () => props.navigation.navigate('AddAutoParts'),
      img: Images.drawer4,
    },
    {
      name: 'View Auto Parts & Accessories',
      onPress: () => props.navigation.navigate('AutoParts'),
      img: Images.drawer5,
    },
    // {
    //   name: 'Write A Review',
    //   onPress: () => props.navigation.navigate('WriteReview'),
    //   img: Images.drawer6,
    // },
    {
      name: 'My Wishlist',
      onPress: () => props.navigation.navigate('WishList'),
      img: Images.drawer7,
    },
    {
      name: 'About Us',
      onPress: () => props.navigation.navigate('AboutUs'),
      img: Images.drawer8,
    },
    {
      name: 'Terms & Condition',
      onPress: () => props.navigation.navigate('TermsCondition'),
      img: Images.drawer9,
    },
    {
      name: 'Privacy & Policy',
      onPress: () => props.navigation.navigate('PrivacyPolicy'),
      img: Images.drawer10,
    },
    {
      name: 'FAQs',
      onPress: () => props.navigation.navigate('FAQ'),
      img: Images.drawer11,
    },
    {
      name: 'Blogs',
      onPress: () => props.navigation.navigate('Blogs'),
      img: Images.drawer12,
    },
    {
      name: 'Contact Us',
      onPress: () => props.navigation.navigate('ContactUs'),
      img: Images.drawer13,
    },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: '#0B334F',
      }}>
      <SafeAreaView className={'flex-1'}>
        <LinearGradient
          colors={['#0B334F', '#0095FF']}
          className={
            'w-full h-32 bg-[#0B334F] flex flex-row pt-2 items-center justify-between pr-2'
          }>
          <Image
            source={Images.Logo}
            className={'w-32 h-28'}
            resizeMode={'contain'}
          />
        </LinearGradient>
        <FlatList
          data={drawer}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View className={'flex flex-row items-center pt-5 pl-5'}>
                <Image
                  source={item.img}
                  className={'w-6 h-6 mr-3'}
                  resizeMode={'contain'}
                />
                <TouchableOpacity onPress={item.onPress} activeOpacity={0.7}>
                  <Text className={'text-sm text-black'}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          contentContainerStyle={{
            paddingBottom: height * 0.07,
            backgroundColor: 'white',
          }}
        />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}
export const DrawerScreens = ({}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        labelStyle: {fontSize: width * 0.04},
        activeTintColor: '#0095FF',
      }}
      initialRouteName="BottomNavigator"
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: 'white',
        width: width * 0.8,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60,
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="FAQ" component={FAQ} />
      <Drawer.Screen name="WishList" component={WishList} />
      <Drawer.Screen name="TermsCondition" component={TermsCondition} />
      <Drawer.Screen name="PersonalSetting" component={PersonalSetting} />
      <Drawer.Screen name="WriteReview" component={WriteReview} />
      <Drawer.Screen name="AboutUs" component={AboutUs} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
    </Drawer.Navigator>
  );
};
