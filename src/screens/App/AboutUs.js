import React, {useState, useEffect} from 'react';
import {Dimensions, Text, SafeAreaView, ScrollView} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
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
            title={`About Us`}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          <Text
            style={{width: width * 0.9}}
            className={'flex self-center text-base text-black mt-7'}>
            Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random Text.
            It Has Roots In A Piece Of Classical Latin Literature From 45 BC,
            Making It Over 2000 Years Old. Richard McClintock, A Latin Professor
            At Hampden-Sydney College In Virginia, Looked Up One Of The More
            Obscure Latin Words, Consectetur, From A Lorem Ipsum Passage, And
            Going Through The Cites Of The Word In Classical Literature,
            Discovered The Undoubtable {'\n \n'} SourceContrary To Popular
            Belief, Lorem Ipsum Is Not Simply Random Text. It Has Roots In A
            Piece Of Classical Latin Literature From 45 BC, Making It Over 2000
            Years Old. Richard McClintock, A Latin Professor At Hampden-Sydney
            College In Virginia, Looked Up One Of The More Obscure Latin Words,
            Consectetur, From A Lorem Ipsum Passage, And Going Through The Cites
            Of The Word In Classical Literature, Discovered The Undoubtable
            Source.
          </Text>
          <Text
            className={'flex text-center text-sm font-light text-black mt-3'}>
            App Version 11.11.47
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Index;
