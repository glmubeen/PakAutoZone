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
import Input from '../../components/Input';
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const [faq, setFaq] = useState([
    {
      id: 1,
      question: `I haven't received my account confirmation email and password.`,
      answer: `If you have forgotten your password on Pak Auto Zone:\nGo to the Login page by clicking on the ‘Sign In’ link on the top right of the Home Page.\nClick on the ‘Forgot Password’ link below the ‘Submit’ button.\nType in your email address OR username and click Submit.\nYou will be sent a password reset URL in your e-mail. Click on that.\nA form asking your new password will open up in your browser.\nType in your new password (and re-confirm it) and press Submit.\nYour password will be reset and you will be logged into pakautozone.com.`,
      isActive: false,
    },
    {
      id: 2,
      question: 'How do I post an ad for my car?',
      answer: `Here’s how you can post an ad:\nSign in to Pak Auto Zone (Sign up first if you haven’t done so).\nClick on the ‘Sell your Car’ quick link on the home page\nOR click the Used Cars tab and then the ‘Sell your car’ sub-menu link.\nFill up the form that opens up and press submit.\nYour Ad will be submitted to the admin staff for approval. Once you get a confirmation email, you will be able to see your ad in the search listings.`,
      isActive: false,
    },
    {
      id: 3,
      question: 'Will my email be displayed when I’m selling a car?',
      answer: `No, your email will not be exposed to anyone. Interested buyers will enter the message they want to send you and we will simply forward that to you keeping your email address hidden from them. But in case you receive some spam, you will always have an option in the email to report the abuse and Pak Auto Zone will take care of it.`,
      isActive: false,
    },
    {
      id: 4,
      question: 'How do I know these ads are genuine?',
      answer: `Pak Auto Zone makes a lot of effort to keep the ad data clean. All used car ads go through an approval process, in which our staff examines the content of each ad to see if all the details are in order. Also, after the ads are posted up on Pak Auto Zone, first-time sellers are contacted by phone and our admin staff verifies that the car ad details they provided are proper and genuine.`,
      isActive: false,
    },
    {
      id: 5,
      question: 'How do I search through expired Ads?',
      answer: `Here's how you search through expired ads:\nClick on the Used Cars Tab.\nClick on the 'Advanced Search' link next to the submit button on the search panel.\nSearch results will appear with active ads selected by default. On the Refine panel on the left, click the red cross next to link reading 'Active'.\nThe page will refresh and now show search results including both active and expired ads. In case you wish to see just expired ads, click the 'Expired' link on the left 'Refine' panel and the results will be filtered accordingly.`,
      isActive: false,
    },
    {
      id: 6,
      question: 'My Ad got expired. How do I reopen it on Pak Auto Zone',
      answer: `This is how you reopen your ad:\nSign in to Pak Auto Zone.\nClick on the Used Cars tab. Then, click on the ‘My Ads’ tab in the sub-menu.\nFind the car ad you want to re-open in the search listings.\nClick on the ‘Open’ link for that ad.\nYour ad will be submitted to our admin staff for approval.\nOnce your ad is approved, you will receive a confirmation email after which you can see your ad again in the Used Car search listings.`,
      isActive: false,
    },
  ]);

  const _handleOpen = updateItem => {
    const tempArr = faq.map(item => {
      if (updateItem.id === item.id) {
        if (updateItem.isActive) {
          return {
            ...item,
            isActive: false,
          };
        } else {
          return {
            ...item,
            isActive: true,
          };
        }
      } else {
        return {
          ...item,
          isActive: false,
        };
      }
    });
    setFaq(tempArr);
  };

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={`Help & Support`}
            isBack
            handleIsBack={() => navigation.goBack()}
          />
          <Text
            className={
              'text-2xl text-black mt-6 ml-7 font-bold underline mb-4'
            }>
            Frequently Asked Questions:
          </Text>
          <FlatList
            data={faq}
            scrollEnabled={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => _handleOpen(item)}
                  activeOpacity={0.8}
                  style={{width: width * 0.95}}
                  className={
                    'pt-4 pb-4 border-b-2 pl-2 pr-2 border-slate-300 flex self-center justify-between items-center flex-row'
                  }>
                  <View>
                    <Text
                      style={{width: width * 0.8}}
                      className={'text-xl font-semibold text-black'}>
                      {item.question}
                    </Text>
                    {item.isActive && (
                      <Text
                        className={
                          'text-sm font-semibold text-slate-400 w-80 mt-1'
                        }>
                        {item.answer}
                      </Text>
                    )}
                  </View>
                  <Image
                    source={!item.isActive ? Images.arrow : Images.arrow}
                    className={`w-5 h-5 ${
                      !item.isActive ? '-rotate-30' : '-rotate-180'
                    } self-start`}
                    resizeMode={'contain'}
                  />
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Index;
