import {
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../assets/images';
import Header from './Header';
const {width, height} = Dimensions.get('window');
import MyStatusBar from './StatusBar';
import Input from '../components/Input/index';

const LocationModal = ({
  isVisible,
  handleIsVisible,
  data,
  onPress,
  ...props
}) => {
  const [searchResults, setSearchResults] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = text => {
    setSearchQuery(text);
    search();
  };

  const search = () => {
    const filteredData = data.filter(item =>
      item.display.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchResults(filteredData);
  };

  return (
    <Modal visible={isVisible} animationType={'slide'}>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <Header isBack title={'Select City'} handleIsBack={handleIsVisible} />
        <Input
          placeholderText={'Search here'}
          mainText={'Search'}
          value={searchQuery}
          handleOnChangeTxt={handleSearchInputChange}
        />

        <FlatList
          data={searchQuery === '' ? data : searchResults}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => onPress(item)}
                activeOpacity={0.7}
                style={{width: width * 0.9}}
                className={
                  'flex self-center pt-1 pb-1 flex-row border-b-2 border-slate-200 items-center mt-4'
                }>
                <Image
                  source={Images.Place}
                  className={'w-10 h-10'}
                  resizeMode={'contain'}
                />
                <Text className={'text-lg text-black ml-4'}>
                  {item.display}
                </Text>
              </TouchableOpacity>
            );
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
      </SafeAreaView>
    </Modal>
  );
};

export default LocationModal;
