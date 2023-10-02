import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
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
  const user = useSelector(state => state.userReducer.userData);
  const [data, setData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    _getAutoPartOrders();
  }, []);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: user.accessToken,
    },
  };

  const _getAutoPartOrders = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.MY_ORDERS, config)
      .then(res => {
        setData(res.data.data.reverse());
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
            title={`Orders`}
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
                <View
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
                  <FlatList
                    data={item.parts}
                    renderItem={({item, index}) => {
                      return (
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: 'gray',
                          }}
                          className={'flex flex-row py-4'}>
                          <Image
                            source={{uri: item.images[0].url}}
                            className={'w-24 h-24 bg-red-600 mr-4'}
                          />
                          <View
                            style={{
                              height: height * 0.1,
                              width: 1,
                              backgroundColor: '#D3D3D3',
                              marginRight: width * 0.03,
                            }}
                          />
                          <View>
                            <Text
                              numberOfLines={1}
                              style={{width: width * 0.6}}
                              className={'text-lg font-semibold text-black'}>
                              {item.title}
                            </Text>
                            <Text
                              numberOfLines={3}
                              style={{width: width * 0.6}}
                              className={'text-sm font-medium text-slate-700'}>
                              {item.description}
                            </Text>
                          </View>
                        </View>
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
                  <Text className={'text-xl font-semibold text-black'}>
                    Address:{' '}
                    <Text className={'text-lg font-normal text-slate-700'}>
                      {item.address}
                    </Text>
                  </Text>
                  <Text className={'text-xl font-semibold text-black'}>
                    Total Price:{' '}
                    <Text className={'text-lg font-normal text-slate-700'}>
                      {item.total}
                    </Text>
                  </Text>
                  <Text className={'text-xl font-semibold text-black'}>
                    Status:{' '}
                    <Text className={'text-lg font-normal text-slate-700'}>
                      Pending
                    </Text>
                  </Text>
                </View>
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
