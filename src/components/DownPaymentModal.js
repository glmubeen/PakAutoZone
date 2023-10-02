import {
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../assets/images';
import Header from './Header';
const {width, height} = Dimensions.get('window');
import MyStatusBar from './StatusBar';
import Input from '../components/Input/index';

const DownPaymentModal = ({
  isVisible,
  handleIsVisible,
  data,
  onPress,
  ...props
}) => {
  const modalData = [
    '0%',
    '10%',
    '20%',
    '30%',
    '40%',
    '50%',
    '60%',
    '70%',
    '80%',
  ];

  const [searchResults, setSearchResults] = useState(modalData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = text => {
    setSearchQuery(text);
    search();
  };

  const search = () => {
    const filteredData = modalData.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchResults(filteredData);
  };

  return (
    <Modal visible={isVisible} animationType={'slide'}>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <Header isBack title={''} handleIsBack={handleIsVisible} />
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Input
            placeholderText={'Search here'}
            mainText={'Search'}
            value={searchQuery}
            handleOnChangeTxt={handleSearchInputChange}
            keyboardType={'numeric'}
          />
          {searchResults.map(item => {
            return (
              <TouchableOpacity
                onPress={() => onPress(item)}
                activeOpacity={0.7}
                className={
                  'w-96 flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4'
                }>
                <Text className={'text-lg text-black ml-4'}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default DownPaymentModal;
