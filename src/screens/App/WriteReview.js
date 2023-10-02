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
  TextInput,
} from 'react-native';
const {width, height} = Dimensions.get('window');

//local import
import {Images} from '../../assets/images';
import Input from '../../components/Input';
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import BrandModal from '../../components/BrandModal';
import CarModelModal from '../../components/CarModelModal';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import {Rating} from 'react-native-ratings';

const Index = ({navigation, ...props}) => {
  const [brandModal, setBrandModal] = useState(false);
  const [carModelModal, setCarModelModal] = useState(false);

  function ratingCompleted(rating) {}

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={`Write Review`}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          {/* Brands */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setBrandModal(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-12'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.Pencil}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>Brands</Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Brands */}
          {/* Car Model */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setCarModelModal(true)}
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-2'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.EditPencil}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>Car Models</Text>
            </View>
            <Image
              source={Images.arrow}
              className={`w-4 h-4 rotate-90`}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/* Car Model */}
          {/* Ad Title */}
          <View
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.Document}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>Ad Title</Text>
              <TextInput
                className={'w-60 p-1'}
                placeholder={'Enter Ad Title'}
              />
            </View>
            <View className={'w-5 h-5'} />
          </View>
          {/* Ad Title */}
          {/* Description */}
          <View
            style={{width: width * 0.95}}
            className={
              'pt-2 pb-2 flex flex-row justify-between items-center self-center mt-1'
            }>
            <View
              className={
                'w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#0095FF]'
              }>
              <Image
                source={Images.EventNotes}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{width: width * 0.67}}
              className={'pt-1 pb-1 border-b-2 border-slate-300'}>
              <Text className={'text-lg text-black'}>Description</Text>
              <TextInput
                className={'w-60 p-1'}
                placeholder={'Enter Description'}
              />
            </View>
            <View className={'w-5 h-5'} />
          </View>
          {/* Description */}
          <Text className={'mt-4 ml-6 text-black font-semibold text-xl'}>
            Rating
          </Text>
          <Text className={'mt-2 ml-6 text-slate-500 font-light text-sm'}>
            Rate your car on the following aspects.
          </Text>
          <View
            style={{width: width * 0.9}}
            className={
              'flex flex-row justify-between items-center py-2 self-center mt-4'
            }>
            <Text className={'text-base font-semibold text-black'}>
              Comfort
            </Text>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={25}
              ratingColor={'#0095FF'}
              onFinishRating={ratingCompleted}
            />
          </View>
          <View
            style={{width: width * 0.9}}
            className={
              'flex flex-row justify-between items-center py-2 self-center mt-1'
            }>
            <Text className={'text-base font-semibold text-black'}>
              Reliable
            </Text>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={25}
              ratingColor={'#0095FF'}
              onFinishRating={ratingCompleted}
            />
          </View>
          <View
            style={{width: width * 0.9}}
            className={
              'flex flex-row justify-between items-center py-2 self-center mt-1'
            }>
            <Text className={'text-base font-semibold text-black'}>Style</Text>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={25}
              ratingColor={'#0095FF'}
              onFinishRating={ratingCompleted}
            />
          </View>
          <View
            style={{width: width * 0.9}}
            className={
              'flex flex-row justify-between items-center py-2 self-center mt-1'
            }>
            <Text className={'text-base font-semibold text-black'}>
              Fuel Economy
            </Text>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={25}
              ratingColor={'#0095FF'}
              onFinishRating={ratingCompleted}
            />
          </View>
          <View
            style={{width: width * 0.9}}
            className={
              'flex flex-row justify-between items-center py-2 self-center mt-1'
            }>
            <Text className={'text-base font-semibold text-black'}>
              Technology
            </Text>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={25}
              ratingColor={'#0095FF'}
              onFinishRating={ratingCompleted}
            />
          </View>
          <View
            style={{width: width * 0.9}}
            className={
              'flex flex-row justify-between items-center py-2 self-center mt-1'
            }>
            <Text className={'text-base font-semibold text-black'}>
              Performance
            </Text>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={25}
              ratingColor={'#0095FF'}
              onFinishRating={ratingCompleted}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{width: width * 0.86}}
            className={
              'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg mt-3 self-center'
            }>
            <Text className={'text-xl font-semibold text-white'}>
              Submit Now
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <BrandModal
        isVisible={brandModal}
        handleIsVisible={() => setBrandModal(false)}
      />
      <CarModelModal
        isVisible={carModelModal}
        handleIsVisible={() => setCarModelModal(false)}
      />
    </>
  );
};

export default Index;
