import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  Linking,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import

import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import {Images} from '../../assets/images/index';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';

const Index = ({navigation, route, ...props}) => {
  const [text, setText] = useState('');
  const [chat, setChat] = useState();
  const item = route.params.item;

  const user = useSelector(state => state.userReducer.userData);

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = () => {
    database()
      .ref(item?.refId)
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          li.push({
            data: child.val().data,
            user: child.val().user,
            type: child.val().type,
          });
        });
        setChat(li.reverse());
      });
  };
  const config = {
    headers: {
      Authorization: user.accessToken,
    },
  };
  //Sending in realTime Database
  const sendMessage = () => {
    const reference = database().ref(item?.refId);
    if (text) {
      reference
        .push({
          type: 1,
          data: text,
          user: user?.user?._id,
        })
        .then(res => {
          setText('');
          let params = {
            clientId: item?.id,
            title: `New Message From ${item?.first_name} ${item?.last_name}`,
            body: text,
            extra: {
              type: 1,
              refId: item?.refId,
              first_name: item?.first_name,
              last_name: item?.last_name,
              id: item?.id,
              phone: item?.phone,
            },
          };

          axios
            .post(BaseURL.POST_NOTIFICATION, params, config)
            .then(res => {
            })
            .catch(err => {
            });
        })
        .catch(error => {});
    }
  };

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#0095FF',
        }}>
        <View
          style={{
            width: width,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: height * 0.01,
            paddingHorizontal: width * 0.03,
            marginTop: height * 0.03,
          }}>
          <View className={'flex flex-row items-center w-full justify-between'}>
            <View className={'flex flex-row items-center'}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}>
                <Image
                  source={Images.Back}
                  className={'w-6 h-6 mr-2'}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <View
                className={
                  'w-12 h-12 rounded-full bg-[#0095FF] justify-center items-center border-[1px] border-white'
                }>
                <Text className={'text-lg text-white font-bold uppercase'}>
                  {item.first_name[0]} {item.last_name[0]}
                </Text>
              </View>
              <Text className={'text-base text-white font-semibold ml-3'}>
                {item?.first_name} {item?.last_name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${item?.phone}`)}
              activeOpacity={0.7}
              className={''}>
              <Image
                source={Images.PhoneCall}
                className={'w-6 h-6'}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          inverted={true}
          showsVerticalScrollIndicator={false}
          style={{
            width: width,
            alignSelf: 'center',
            backgroundColor: 'white',
          }}
          data={chat}
          renderItem={({item}) => {
            if (item.user == user?.user?._id) {
              return (
                <View style={styles.MsgContainerReceiver}>
                  <View style={styles.SenderMsgContainer}>
                    <Text style={styles.SenderMsgText}>{item.data}</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.MsgContainerReceiver}>
                  <View style={styles.ReceiverMsgContainer}>
                    <Text style={styles.ReceiverMsgText}>{item.data}</Text>
                  </View>
                </View>
              );
            }
          }}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <View style={styles.TypeContainer}>
            <View style={styles.TextInput}>
              <TextInput
                placeholder={'Enter Message'}
                placeholderTextColor={'black'}
                keyboardType={'default'}
                multiline={true}
                onChangeText={setText}
                value={text}
                style={{
                  fontSize: width * 0.04,
                  width: width * 0.75,
                  color: 'black',
                  marginLeft: width * 0.04,
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.ChatButton}
              onPress={() => sendMessage()}>
              <Image
                source={Images.Send}
                className={'w-7 h-7'}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  Header: {
    width: width,
    height: height * 0.125,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: width * 0.04,
  },

  MsgContainerReceiver: {
    marginVertical: height * 0.005,
    width: '96%',
    marginLeft: width * 0.04,
    flexDirection: 'column',
  },
  MsgContainerSender: {
    marginVertical: height * 0.005,
    width: '96%',
    marginRight: width * 0.04,
  },
  ReceiverMsgContainer: {
    backgroundColor: '#EAECEC',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    alignSelf: 'flex-start',
    borderRadius: 30,
  },
  ReceiverMsgText: {
    fontSize: width * 0.036,
    color: 'black',
  },
  SenderMsgContainer: {
    backgroundColor: '#0095FF',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    alignSelf: 'flex-end',
    marginRight: width * 0.03,
    borderRadius: 30,
  },
  SenderMsgText: {
    color: 'white',
    fontSize: width * 0.036,
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
    borderColor: '#0095FF',
    borderRadius: 40,
    marginLeft: width * 0.03,
  },
  ChatButton: {
    height: width * 0.125,
    width: width * 0.125,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});
