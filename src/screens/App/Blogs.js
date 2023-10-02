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
  FlatList,
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
  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'Blogs'}
            isBack
            handleIsBack={() => navigation.goBack()}
          />

          <FlatList
            data={[1, 2, 3]}
            renderItem={({}) => {
              return (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
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
                      'bg-white rounded-lg flex self-center p-3 items-center flex-row mt-4'
                    }>
                    <Image
                      source={Images.carImage}
                      className={'w-32 h-24'}
                      resizeMode={'contain'}
                    />
                    <View className={'ml-3'}>
                      <Text className={'text-sm text-black'}>12/1/2023</Text>
                      <Text
                        style={{width: width * 0.48}}
                        className={
                          'text-xs text-black font-medium mt-2 underline'
                        }>
                        2023 Land Rover Defender 130 First Drive: Now a proper
                        people hauler
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
            contentContainerStyle={{
              paddingBottom: height * 0.01,
              marginTop: height * 0.04,
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Index;
