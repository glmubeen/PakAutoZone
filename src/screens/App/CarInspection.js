import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MyStatusBar from '../../components/StatusBar';
import {Images} from '../../assets/images';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import ModelYearModal from '../../components/ModelYearModal';
import HorizontalCard from '../../components/HorizontalCard';
import FinancingStep from '../../components/FinancingStep';
import Header from '../../components/Header';
const {width, height} = Dimensions.get('window');

const whyChooseData = [
  {
    id: '1',
    title: 'Peace of Mind',
    subtitle:
      'Get the information you need to make an informed decision on your next vehicle purchase',
    image: Images.PeaceOfMind,
  },
  {
    id: '2',
    title: 'Qualified Technicians',
    subtitle:
      'Specialist technicians providing comprehensive vehicle inspection across Pakistan',
    image: Images.QualifiedTechnicians,
  },
  {
    id: '3',
    title: 'Comprehensive Report',
    subtitle:
      'Detailed digital report includes road test, photos and car condition report',
    image: Images.ComprehensiveReport,
  },
  {
    id: '4',
    title: 'Enhanced Credibility',
    subtitle:
      'Vehicle inspection allows car sellers to get the desired price for their car by providing authentic details',
    image: Images.EnhancedCredibility,
  },
];

const InspectionStepsData = [
  {
    title: `Make a booking online of the vehicle you're buying.`,
  },
  {
    title:
      'Our representative will contact you to organize an inspection time.',
  },
  {
    title:
      'Qualified mechanics will visit the vehicle owner and conduct the inspection.',
  },
  {
    title:
      'Your inspection report will be sent vis SMS & emailed to you within an hour of the inspection.',
  },
];

const arrAdvantageCarInspection = [
  {
    title: '• Engine',
    subtitle:
      'Using a scanning tool plugged into the engine management system to identify any fault codes.',
  },
  {
    title: '• Car Interior',
    subtitle:
      'Checks are done on different functional car accessories including air conditioning, horn, seat belts, locks, warning lights, and more. ',
  },
  {
    title: '• Car Accident Damage',
    subtitle:
      'A paint depth gauge test is used to check for previous cosmetic repairs. A visual inspection is used for evidence of any car damage due to a car accident. ',
  },
  {
    title: '• Exterior/Body Frame',
    subtitle:
      'Visual inspection for rust, previous body repairs, panels and suspension. ',
  },
  {
    title: '• Road Test ',
    subtitle:
      'Checks are done on brake operation, engine noise, exhaust emissions, driving tests, steering/suspension, and more.',
  },
  {
    title: '• Tyres Evaluation',
    subtitle:
      'Checks are done on the tread depth of your vehicle tyres to make sure you can compare tyre sizes to have enough traction to road grip.',
  },
];

const CarInspection = ({navigation}) => {
  const [modalYear, setModalYear] = useState('');
  const [modelYearModal, setmodelYearModal] = useState(false);

  const [marketPrice, setMarketPrice] = useState('');

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'Car Inspection'}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          {/* Header Start */}
          <ImageBackground
            source={Images.CarInspection}
            style={{
              width: width,
              height: width * 0.4,
              marginTop: height * 0.02,
            }}
            resizeMode="contain"
          />
          <View className={'bg-white self-center w-full p-2'}>
            <Text
              className={'  text-[#0095FF] font-semibold text-xl self-center'}>
              Pak Auto Zone Car Inspection
            </Text>
            <Text
              className={
                ' text-slate-500 font-medium text-sm self-center text-center mt-1'
              }>
              Pak Auto Zone Car Inspection ke 200+ points ki report se gari
              kharedna ab hua pur-sakoon
            </Text>
          </View>
          {/* Header End*/}

          {/* Submit Query Button Start */}
          <Pressable
            onPress={() => {
              navigation.navigate('ScheduleInspection');
            }}
            className={
              'self-center bg-[#0095FF] mt-6 items-center justify-center p-3 rounded-md'
            }
            style={{width: width * 0.9}}>
            <Text className={'text-white font-semibold text-md'}>
              Schedule Inspection
            </Text>
          </Pressable>
          {/* Submit Query Button End */}
          {/* Why choose Start */}
          <View className={'self-center mt-8'} style={{width: width * 0.9}}>
            <Text className={'text-xl font-semibold text-black'}>
              Why choose Pak Auto Zone for Car Inspection?
            </Text>
            {whyChooseData.map(item => (
              <HorizontalCard
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
              />
            ))}
          </View>
          {/* Why choose End */}
          {/* Car Financing Step Start */}
          <View className={'self-center mt-8'} style={{width: width * 0.9}}>
            <Text className={'text-xl font-semibold text-black'}>
              How Pak Auto Zone Car Inspection Works?
            </Text>
            {InspectionStepsData.map((item, index) => (
              <FinancingStep title={item.title} count={index + 1} />
            ))}
          </View>
          {/* Car Financing Step End */}
          {/* Advantages of Car Financing */}
          <View className={'self-center mt-8'} style={{width: width * 0.9}}>
            <Text className={'text-xl font-semibold text-black'}>
              What's Included In The Car Inspection?
            </Text>
            <FlatList
              data={arrAdvantageCarInspection}
              renderItem={({item}) => {
                return (
                  <View className={'my-2'}>
                    <Text className={'text-black text-lg font-semibold'}>
                      {item.title}
                    </Text>
                    <Text className={'text-black text-sm ml-3.5'}>
                      {item.subtitle}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          {/* Advantages of Car Financing */}
        </ScrollView>
      </SafeAreaView>

      <ModelYearModal
        onPress={item => {
          setModalYear(item);
          setmodelYearModal(false);
        }}
        isVisible={modelYearModal}
        handleIsVisible={() => setmodelYearModal(false)}
      />
    </>
  );
};

export default CarInspection;
