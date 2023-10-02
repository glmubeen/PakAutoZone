import React, {useState, useEffect} from 'react';
import {
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
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const [data, setData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    _getAutoParts();
  }, []);

  const _getAutoParts = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.GET_AUTO_PARTS)
      .then(res => {
        setData(res.data.data);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={`Auto Parts & Accessories`}
            isBack
            handleIsBack={() => navigation.goBack()}
            isCart={true}
            CartOnPress={() => {
              navigation.navigate('Cart');
            }}
          />

          <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AutoPartsDetail', {
                      data: item,
                    });
                  }}
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

                    <View style={{width: width * 0.55}}>
                      <Text
                        className={'text-lg font-semibold text-black'}
                        numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text className={'text-lg font-semibold text-black'}>
                        PKR {item.price}
                      </Text>
                      <Text
                        numberOfLines={1}
                        className={'text-lg font-medium text-black'}>
                        {item.category.name} {item.sub_category.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{paddingBottom: height * 0.07}}
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
      {isLoader && <Loader />}
    </>
  );
};

export default Index;
