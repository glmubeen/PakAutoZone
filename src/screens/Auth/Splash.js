import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';

//local import
import {Images} from '../../assets/images';
import {getFCM} from '../../store/action/user';
import NotificationModal from '../../components/NotificationModal';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import messaging from '@react-native-firebase/messaging';

const Index = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const isSlider = useSelector(state => state.userReducer.isSlider);
  useEffect(() => {
    setTimeout(() => {
      if (isSlider === false) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Slider'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'BottomNavigator'}],
        });
      }
    }, 3000);
  }, []);

  useEffect(() => {
    // Notification
    requestUserPermission();
    createMessageListener();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
    }
  };

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        dispatch(getFCM(fcmToken));
        // dispatch(getFCMToken(fcmToken));
      } 
    } catch (err) {
    }
  };

  const createMessageListener = async () => {
    //for in App
    messaging().onMessage(async remoteMessage => {
      setOpenNotification(true);
      setNotificationBody(remoteMessage);
    });

    // APP Background or Quit
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      let message = await remoteMessage;
      console.log('Message handled in the background!', message.data);
    });

    /// when the user click on notification when app in background
    messaging().onNotificationOpenedApp(remoteMessage => {
      let message = remoteMessage.data;
      if (message.type == 1) {
        navigation.navigate('ChatScreen', {
          item: message,
        });
      }
    });

    // when app was in quit mode
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        }
      });
  };

  const [openNotification, setOpenNotification] = useState(false);
  const [notificationBody, setNotificationBody] = useState({});

  return (
    <>
      <LinearGradient
        colors={['#0B334F', '#0095FF']}
        className={'flex-1 flex items-center justify-center'}>
        {/* <View
          className={
            'flex-1 bg-[#0095FF] bg-gradient-to-r from-[#0095FF] to-[#0095FF] justify-center items-center'
          }> */}
        <Image
          source={Images.Logo}
          className={'w-56 h-56'}
          resizeMode={'contain'}
        />
        {/* </View> */}
      </LinearGradient>
      <NotificationModal
        isVisible={openNotification}
        name={`${notificationBody?.data?.first_name} ${notificationBody?.data?.last_name}`}
        message={notificationBody?.notification?.body}
        onPressClose={() => {
          setOpenNotification(false);
        }}
        onPressMove={() => {
          navigation.navigate('ChatScreen', {
            item: notificationBody.data,
          });
        }}
      />
    </>
  );
};

export default Index;
