import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
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
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';

const {width, height} = Dimensions.get('window');

//third party
import {useSelector} from 'react-redux';

const whyChooseData = [
  {
    id: '1',
    title: 'Customer Service Representative',
    subtitle: 'Expert in handling auto insurance',
    image: Images.AutoPart,
  },
  {
    id: '2',
    title: 'Best Rates',
    subtitle:
      'PakAutoZone share lowest competitive rates from its partner companies',
    image: Images.AddAutoPart,
  },
  {
    id: '3',
    title: 'Coverage Plan',
    subtitle: 'Customised coverage plans from partner companies',
    image: Images.BlackHeart,
  },
  {
    id: '4',
    title: 'Rate Comparison',
    subtitle: 'Users can compare rates from top companies',
    image: Images.Assembly,
  },
];

const InsuranceStepsData = [
  {
    title: 'Apply for car insurance on PakAutoZone',
  },
  {
    title: 'Our representative will contact you to verify your details',
  },
  {
    title:
      'We will share verified requests with our partner insurance companies',
  },
  {
    title: 'Get a call from partner company for third party car survey',
  },
  {
    title: 'Get insurance coverage after approval and drive with peace of mind',
  },
];

const arrAdvantageCarFinance = [
  {
    title: '• Legal Protection',
    subtitle:
      'Car insurance protects you from legal fees and financial losses in case of accidents or damage to third-party property.',
  },
  {
    title: '• Peace of Mind',
    subtitle:
      'Having car insurance gives you peace of mind knowing that you and your vehicle are protected against unexpected events.',
  },
  {
    title: '• Personal Accident Cover',
    subtitle:
      'Car insurance covers medical expenses, hospital bills, and personal accident cover for you and your passengers in case of an accident.',
  },
  {
    title: '• Protection Against Theft and Damage',
    subtitle:
      'Car insurance provides compensation in case of theft or damage to your vehicle due to natural calamities, riots, or other unforeseen events.',
  },
  {
    title: '• Financial Security',
    subtitle:
      'Car insurance provides financial security for you and your family by covering repair costs, third-party liabilities, and legal fees.',
  },
  {
    title: '• Legal Compliance',
    subtitle:
      'Car insurance helps you stay legally compliant by protecting you from any fines, penalties, or legal action in case of any accidents.',
  },
];

const CarFinance = ({navigation}) => {
  const [modalYear, setModalYear] = useState('');
  const [modelYearModal, setmodelYearModal] = useState(false);

  const [marketPrice, setMarketPrice] = useState('');
  const user = useSelector(state => state.userReducer.userData);
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const config = {
    headers: {
      Authorization: user?.accessToken,
    },
  };

  const _handleInsurance = () => {
    if (modalYear == '' || marketPrice == '') {
      setShowAlert(true);
      setAlertText('Fill All Fields');
    } else {
      setIsLoader(true);
      let params = {
        subject: 'Insurance Form',
        from: user?.user?.email,
        name: user?.user?.first_name + ' ' + user?.user?.last_name,
        data: `This is ${
          user?.user?.first_name + ' ' + user?.user?.last_name
        } <br> Modal Year: ${modalYear} <br> Market Price: ${marketPrice}`,
      };
      axios
        .post(BaseURL.SEND_EMAIL, params, config)
        .then(res => {
          setIsLoader(false);
          setModalYear('');
          setMarketPrice('');
          setShowAlert(true);
          setAlertText(
            'Your query has been received Pak Auto Zone team will response within 12 to 24 hours',
          );
        })
        .catch(err => {
          setIsLoader(false);
          setShowAlert(true);
          setAlertText('Something Went Wrong Try Again Later');
        });
    }
  };

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'Car Insurance'}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          {/* Header Start */}
          <ImageBackground
            source={Images.CarInsurance}
            style={{width: width, height: width * 0.4}}
            resizeMode="contain"
          />
          <View className={'bg-white self-center w-full p-2'}>
            <Text
              className={'  text-[#0095FF] font-semibold text-xl self-center'}>
              Hassle Free Car Insurance
            </Text>
          </View>
          {/* Header End*/}
          {/* Modal year Start */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setmodelYearModal(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-5'
            }>
            <View
              className={
                'w-10 h-10 flex items-center justify-center rounded-full bg-slate-100'
              }>
              <Image
                source={Images.ModelYear}
                className={'w-5 h-5'}
                resizeMode={'contain'}
                style={{tintColor: 'grey'}}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                {modalYear == '' ? 'Model Year' : modalYear}
              </Text>
            </View>
            <Image
              source={Images.DropDownArrow}
              className={`w-4 h-4`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Model Year End */}
          <View
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
            }>
            <View
              className={
                'w-10 h-10 flex items-center justify-center rounded-full bg-slate-100'
              }>
              <Image
                source={Images.Description}
                className={'w-5 h-5'}
                resizeMode={'contain'}
                style={{tintColor: 'grey'}}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>
                Estimated Market Price
              </Text>
              <TextInput
                className={'w-60 p-1 text-black'}
                placeholder={'Enter car value in PKR'}
                placeholderTextColor={'grey'}
                value={marketPrice}
                onChangeText={text => setMarketPrice(text)}
                keyboardType="number-pad"
              />
            </View>
            <View className={'w-5 h-5'} />
          </View>
          {/* Tabs End */}
          {/* Submit Query Button Start */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (Object.keys(user).length === 0) {
                setShowAlert(true);
                setAlertText('Login First');
              } else {
                _handleInsurance();
              }
            }}
            className={
              'self-center bg-[#0095FF] mt-6 items-center justify-center p-3 rounded-md'
            }
            style={{width: width * 0.9}}>
            <Text className={'text-white font-semibold text-md'}>
              Submit Query
            </Text>
          </TouchableOpacity>
          {/* Submit Query Button End */}
          {/* Why choose Start */}
          <View className={'self-center mt-8'} style={{width: width * 0.9}}>
            <Text className={'text-xl font-semibold text-black'}>
              Why choose Pak Auto Zone for Car Insurance?
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
              Car Financing Steps
            </Text>
            {InsuranceStepsData.map((item, index) => (
              <FinancingStep title={item.title} count={index + 1} />
            ))}
          </View>
          {/* Car Financing Step End */}
          {/* Advantages of Car Financing */}
          <View className={'self-center mt-8'} style={{width: width * 0.9}}>
            <Text className={'text-xl font-semibold text-black'}>
              Why Car Insurance is Essentials?
            </Text>
            <FlatList
              data={arrAdvantageCarFinance}
              renderItem={({item}) => {
                return (
                  <View className={'my-2'}>
                    <Text numberOfLines={1} className={'text-black text-lg font-semibold'}>
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
      {isLoader && <Loader />}
      <Alert
        isVisible={showAlert}
        message={alertText}
        onPress={() => {
          setShowAlert(false);
          setAlertText('');
        }}
      />
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

export default CarFinance;
