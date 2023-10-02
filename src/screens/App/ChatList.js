import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Dimensions,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import

import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import {Images} from '../../assets/images/index';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);
  const config = {
    headers: {
      Authorization: user?.accessToken,
    },
  };

  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      if (Object.keys(user).length !== 0) {
        getChatList();
      }
    });
    return focusListener;
  }, []);

  const [data, setData] = useState([]);

  const getChatList = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.CHAT_LIST, config)
      .then(res => {
        setIsLoader(false);
        setData(res.data.data);
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
          <Header title={'Chat'} />

          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ChatScreen', {
                        item: item,
                      });
                    }}
                    activeOpacity={0.7}
                    style={{
                      width: width * 0.9,
                    }}
                    className={
                      'bg-white flex self-center py-3 items-center flex-row border-b-[1px] border-gray'
                    }>
                    <View
                      className={
                        'w-16 h-16 rounded-full bg-[#0095FF] justify-center items-center'
                      }>
                      <Text
                        className={'text-lg text-white font-bold uppercase'}>
                        {item.first_name[0]} {item.last_name[0]}
                      </Text>
                    </View>
                    <View className={'ml-3'}>
                      <View
                        style={{width: width * 0.48}}
                        className={
                          'flex items-center justify-between flex-row mb-2'
                        }>
                        <Text className={'text-lg text-black'}>
                          {item.first_name} {item.last_name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
            contentContainerStyle={{paddingBottom: height * 0.01}}
            ListEmptyComponent={
              <View
                className={
                  'w-72 h-72 flex self-center mt-16 items-center justify-center'
                }>
                <Image
                  source={Images.Calendar}
                  className={'w-44 h-44'}
                  resizeMode={'contain'}
                />
                <Text className={'text-3xl font-semibold text-black mt-5'}>
                  No Message Yet
                </Text>
              </View>
            }
          />
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.RGB,
    backgroundColor: '#B87261',
    // borderTopLeftRadius:100
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  Header: {
    width: width,
    height: height * 0.125,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: width * 0.04,
    // backgroundColor: 'green',
  },
  backArrowCont: {
    width: width * 0.08,
    height: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  backArrow: {
    width: '65%',
    height: '65%',
  },
  profleNameCont: {
    width: '80%',
    height: '80%',
    flexDirection: 'row-reverse',
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  profileImgCont: {
    width: width * 0.135,
    height: width * 0.135,
    borderRadius: width / 2,
    overflow: 'hidden',
    // backgroundColor: 'green',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  chatTxt: {
    color: 'black',
    fontSize: width * 0.045,
    marginRight: width * 0.05,
  },
  userNameTxt: {
    fontWeight: 'bold',
  },

  ScrollViewCont: {
    height: height * 0.8,
  },
  ScrollMsg: {
    // marginTop: height * 0.08,
    marginTop: -25,
    width: width,
    alignSelf: 'center',
    // marginBottom: height * 0.015,
    backgroundColor: 'white',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  MsgContainerReceiver: {
    marginVertical: height * 0.005,
    width: '96%',
    // backgroundColor: 'red',
    marginLeft: width * 0.04,
    flexDirection: 'column',
  },
  MsgContainerSender: {
    marginVertical: height * 0.005,
    width: '96%',
    // backgroundColor: 'red',
    marginRight: width * 0.04,
  },
  ReceiverMsgContainer: {
    backgroundColor: '#EAECEC',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    alignSelf: 'flex-start',
    // padding: width * 0.03,
    borderRadius: 30,
  },
  ReceiverMsgText: {
    fontSize: width * 0.036,
    color: 'black',
  },
  MsgtimerReceiver: {
    color: '#9C9D9E',
    fontSize: width * 0.03,
    width: width * 0.09,
    alignSelf: 'flex-start',
  },
  MsgtimerSender: {
    color: '#9C9D9E',
    fontSize: width * 0.03,
    width: width * 0.09,
    alignSelf: 'flex-end',
  },
  SenderMsgContainer: {
    backgroundColor: '#f44336',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    alignSelf: 'flex-end',
    // padding: width * 0.03,
    marginRight: width * 0.03,
    borderRadius: 30,
  },
  SenderMsgText: {
    color: 'white',
    fontSize: width * 0.036,
  },

  MsgTypeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.07,
    // height: '100%',
    width: '74%',
  },
  SendIcon: {
    width: '70%',
    height: '70%',
  },
  TypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.09,
    width: width,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
  },
  TextInput: {
    width: width * 0.8,
    height: height * 0.06,
    paddingHorizontal: width * 0.02,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f44336',
    // marginTop: height * 0.01,
    borderRadius: 40,
    marginLeft: width * 0.03,
  },
  ChatButton: {
    height: width * 0.125,
    width: width * 0.125,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
    // alignSelf: 'flex-start',
    marginRight: 5,
  },
  moreOptionCont: {
    width: '15%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  moreOption: {
    width: width * 0.11,
    height: height * 0.07,
    // backgroundColor:'red'
  },
});
