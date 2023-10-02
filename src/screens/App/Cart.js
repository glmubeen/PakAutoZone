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
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import {handleAddItemToCart, handleRemoveItem} from '../../store/action/cart';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartReducer.cart);
  const total = useSelector(state => state.cartReducer.total);

  const addQuantity = item => {
    dispatch(handleAddItemToCart(item, 1));
  };
  const removeQuantity = item => {
    dispatch(handleRemoveItem(item));
  };

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <Header
          title={`Cart`}
          isBack
          handleIsBack={() => navigation.goBack()}
        />
        <View style={{height: height * 0.52}}>
          <FlatList
            data={cart}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  // onPress={() => {
                  //   navigation.navigate('AutoPartsDetail', {
                  //     data: item,
                  //   });
                  // }}
                  activeOpacity={0.8}
                  style={{
                    width: width * 0.95,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                    elevation: 7,
                  }}
                  className={'bg-white rounded-lg flex self-center p-3 mt-3'}>
                  <View className={'flex flex-row items-center'}>
                    <Image
                      source={{uri: item.images[0].url}}
                      className={'w-32 h-28 mr-2'}
                      resizeMode={'contain'}
                    />

                    <View style={{width: width * 0.59}}>
                      <Text
                        className={'text-lg font-semibold text-black'}
                        numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text className={'text-lg font-semibold text-black'}>
                        PKR {item.price}
                      </Text>
                      <Text className={'text-lg font-medium text-black'}>
                        {item.category.name} {item.sub_category.name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: width * 0.3,
                      borderWidth: 1,
                      borderColor: '#D3D3D3',
                      alignSelf: 'flex-end',
                      marginRight: width * 0.04,
                    }}
                    className={
                      'p-2 rounded-md felx flex-row items-center justify-between'
                    }>
                    <Text className={'text-slate-600 text-sm'}>Qty</Text>
                    <View className={'flex flex-row items-center'}>
                      <TouchableOpacity onPress={() => removeQuantity(item)}>
                        <Image
                          source={Images.Minus}
                          className={'w-3 h-3 mr-3'}
                          resizeMode={'contain'}
                        />
                      </TouchableOpacity>
                      <Text className={'text-slate-600 text-sm'}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity onPress={() => addQuantity(item)}>
                        <Image
                          source={Images.Plus}
                          className={'w-3 h-3 ml-3'}
                          resizeMode={'contain'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            // contentContainerStyle={{paddingBottom: height * 0.07}}
            ListEmptyComponent={
              <Text
                className={
                  'text-xl text-black font-semibold flex self-center mt-12'
                }>
                No List Found
              </Text>
            }
          />
        </View>
        <View
          style={{position: 'absolute', bottom: height * 0.02}}
          className={'w-full bg-[#D4F1F4]'}>
          <View
            className={
              'flex flex-row justify-between items-center px-5 mb-1 mt-5'
            }>
            <Text className={'text-black text-sm font-light'}>Subtotal</Text>
            <Text className={'text-black text-sm font-light'}>AED {total}</Text>
          </View>
          <View
            className={'flex flex-row justify-between items-center px-5 mb-1'}>
            <Text className={'text-black text-sm font-light'}>Shipping</Text>
            <Text className={'text-black text-sm font-light'}>
              Calculate at checkout
            </Text>
          </View>
          <View
            style={{
              height: height * 0.01,
              borderBottomWidth: 1,
              borderBottomColor: '#D4D4D4',
            }}
          />
          <View
            className={'flex flex-row justify-between items-center px-5 mb-1'}>
            <Text className={'text-black text-lg font-bold'}>Total</Text>
            <Text className={'text-black text-lg font-bold'}>AED {total}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Checkout')}
            style={{width: width * 0.9}}
            activeOpacity={0.9}
            className="py-2 bg-[#0095FF] flex self-center rounded-md mt-3 items-center">
            <Text className="text-lg text-white font-medium">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Index;
