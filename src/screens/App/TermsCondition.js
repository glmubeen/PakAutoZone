import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
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
import Input from '../../components/Input';
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'Terms & Condition'}
            isBack
            handleIsBack={() => navigation.goBack()}
          />

          <Text
            style={{width: width * 0.95}}
            className={'flex self-center text-base text-black mt-5'}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable sourceContrary to popular belief, Lorem
            Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years
            old. Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the cites
            of the word in classical literature, discovered the undoubtable
            source.. What are Mobile App Terms and Conditions? Why Does Your
            Mobile App Need Terms and Conditions? Do App Stores Require Terms
            and Conditions? What Should You Include in Your App’s Terms and
            Conditions? Clauses to Include for Different App Types Examples of
            Effective Mobile App Terms and Conditions Sample Terms and
            Conditions Template for Mobile Apps Frequently Asked Questions
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Index;
