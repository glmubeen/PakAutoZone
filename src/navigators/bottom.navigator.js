import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, View, Dimensions, Platform, Text} from 'react-native';
import {Images} from '../assets/images';

//drawer tab
import {DrawerScreens} from './drawer.navigation';

//Screens
import Home from '../screens/App/Home';
import MyAds from '../screens/App/MyAds';
import SellNow from '../screens/App/SellNow';
import Chat from '../screens/App/ChatList';
import Menu from '../screens/App/Menu';
import WishList from '../screens/App/WishList';
import PersonalSetting from '../screens/App/PersonalSetting';
import TermsCondition from '../screens/App/TermsCondition';
import FAQ from '../screens/App/FAQ';
import Blogs from '../screens/App/Blogs';

// dimenstion
const {width, height} = Dimensions.get('window');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabImage =
  name =>
  ({focused}) => {
    return (
      <>
        <View
          style={{
            width: name === 'SellNow' ? width * 0.16 : width * 0.14,
            height: name === 'SellNow' ? width * 0.16 : width * 0.14,
            backgroundColor: name === 'SellNow' ? '#0095FF' : 'white',
            borderRadius: name === 'SellNow' ? width / 2 : 0,
            marginTop: name === 'SellNow' ? -height * 0.04 : 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: focused && name !== 'SellNow' ? 4 : 0,
            borderBottomColor: '#0095FF',
            paddingVertical: height * 0.01,
          }}>
          <View
            style={{
              width: width * 0.06,
              height: width * 0.06,
            }}>
            <Image
              source={Images[name]}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          {name !== 'SellNow' ? (
            <Text
              style={{
                fontSize: width * 0.03,
                marginTop: height * 0.01,
                marginBottom: height * 0.01,
                color: 'black',
              }}>
              {name}
            </Text>
          ) : null}
        </View>

        {name === 'SellNow' ? (
          <Text
            style={{
              fontSize: width * 0.03,
              marginTop: height * 0.01,
              marginBottom: height * 0.01,
              color: 'black',
            }}>
            Sell Now
          </Text>
        ) : null}
      </>
    );
  };

export function HomeTab() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={DrawerScreens} />
    </Stack.Navigator>
  );
}

export function MyAdsTab() {
  return (
    <Stack.Navigator
      initialRouteName="MyAds"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MyAds" component={MyAds} />
    </Stack.Navigator>
  );
}
export function SellNowTab() {
  return (
    <Stack.Navigator
      initialRouteName="SellNow"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SellNow" component={SellNow} />
    </Stack.Navigator>
  );
}

export function ChatTab() {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

export function MenuTab() {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="PersonalSetting" component={PersonalSetting} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="Blogs" component={Blogs} />
    </Stack.Navigator>
  );
}

export const BottomNavigator = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? height * 0.11 : height * 0.08,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: TabImage('Home'),
        }}
        component={HomeTab}
      />
      <Tab.Screen
        name="My Ads"
        options={{
          tabBarIcon: TabImage('MyAds'),
        }}
        component={MyAdsTab}
      />
      <Tab.Screen
        name="Sell Now"
        options={{
          tabBarIcon: TabImage('SellNow'),
        }}
        component={SellNowTab}
      />
      <Tab.Screen
        name="Chat"
        options={{
          tabBarIcon: TabImage('Chat'),
        }}
        component={ChatTab}
      />
      <Tab.Screen
        name="Menu"
        options={{
          tabBarIcon: TabImage('Menu'),
        }}
        component={MenuTab}
      />
    </Tab.Navigator>
  );
};
