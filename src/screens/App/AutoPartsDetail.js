import React, {useState, useEffect} from 'react';
import {
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
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import {handleAddItemToCart} from '../../store/action/cart';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import Carousel from 'react-native-snap-carousel';

const Index = ({navigation, route, ...props}) => {
  const dispatch = useDispatch();
  const data = route.params.data;

  const [carouselImage, setCarouselImage] = useState(data.images);

  const [quantity, setQuantity] = useState(1);

  const plus = () => {
    if (!(quantity >= 10)) {
      setQuantity(prevState => (prevState += 1));
    }
  };

  const minus = () => {
    if (!(quantity <= 1)) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={`Auto Part & Accessories Detail`}
            isBack
            handleIsBack={() => navigation.goBack()}
            isCart={true}
            CartOnPress={() => {
              navigation.navigate('Cart');
            }}
          />
          <Carousel
            data={carouselImage}
            renderItem={({item}) => {
              return (
                <Image
                  source={{uri: item.url}}
                  style={{
                    width: width,
                    height: height * 0.3,
                  }}
                  resizeMode={'contain'}
                />
              );
            }}
            sliderWidth={width}
            itemWidth={width}
          />

          <View className={'h-4'} />
          <View className={'mt-1 ml-3'}>
            <Text className={'text-black font-semibold text-lg'}>
              {data.title}
            </Text>
            <Text className={'text-slate-500 text-sm'}>{data.description}</Text>
            <View className={'flex flex-row items-end mt-2'}>
              <Text className={'text-black font-bold text-xl'}>
                PKR {data?.price}
              </Text>
            </View>

            <View
              style={{
                width: width * 0.94,
                borderWidth: 1,
                borderColor: '#D3D3D3',
              }}
              className={
                'p-3 rounded-md mt-4 felx flex-row items-center justify-between'
              }>
              <Text className={'text-slate-600 text-sm'}>Quatity</Text>
              <View className={'flex flex-row items-center'}>
                <TouchableOpacity onPress={() => minus()}>
                  <Image
                    source={Images.Minus}
                    className={'w-3 h-3 mr-4'}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
                <Text className={'text-slate-600 text-sm'}>{quantity}</Text>
                <TouchableOpacity onPress={() => plus()}>
                  <Image
                    source={Images.Plus}
                    className={'w-3 h-3 ml-4'}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(handleAddItemToCart(data, quantity))}
              activeOpacity={0.7}
              style={{width: width * 0.95}}
              className={`pt-2 pb-2 w-full rounded-lg mt-5 cursor-pointer flex items-center justify-center bg-[#0095FF]
               `}>
              <Text className={'text-lg text-white font-semibold uppercase'}>
                Add To Cart
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Index;
