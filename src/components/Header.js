import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {Images} from '../assets/images';
const {width, height} = Dimensions.get('window');

import {useSelector} from 'react-redux';

const Header = ({
  _handleBack,
  title,
  isBack = false,
  handleIsBack,
  isCart,
  CartOnPress,
  ...props
}) => {
  const cart = useSelector(state => state.cartReducer.cart);
  return (
    <View style={styles.container}>
      {isBack ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.imgStyleCont}
          onPress={handleIsBack}>
          <Image source={Images.Back} style={styles.img} />
        </TouchableOpacity>
      ) : (
        <View style={styles.imgStyleCont} />
      )}

      <Text allowFontScaling={false} style={styles.txt}>
        {title}
      </Text>
      {isCart == true ? (
        <TouchableOpacity className={'w-8 h-8 ml-3 mt-2'} onPress={CartOnPress}>
          <ImageBackground
            source={Images.ShoppingCart}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}>
            {!cart?.length == 0 ? (
              <View
                className={
                  'w-5 h-5 bg-red-600 rounded-full ml-4 -mt-4 flex items-center justify-center'
                }>
                <Text className={'text-sm text-white font-semibold'}>
                  {cart.length}
                </Text>
              </View>
            ) : null}
          </ImageBackground>
        </TouchableOpacity>
      ) : (
        <View style={styles.imgStyleCont} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.05,
    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: '#0095FF',
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imgStyleCont: {
    width: width * 0.06,
    height: width * 0.06,
  },
  txt: {
    color: 'white',
    fontSize: width * 0.063,
    marginLeft: width * 0.04,
    fontWeight: '600',
    textAlign:'center'
  },
  backCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
