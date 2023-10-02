import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Auth
import Splash from '../screens/Auth/Splash';
import Slider from '../screens/Auth/Slider';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import ForgetPassword from '../screens/Auth/ForgetPassword';
import VerifyOtp from '../screens/Auth/VerifyOtp';
import ResetPassword from '../screens/Auth/ResetPassword';

//main screen
import CarInfo from '../screens/App/CarInfo';
import CarList from '../screens/App/CarList';
import ChangePassword from '../screens/App/ChangePassword';
import CarListModals from '../screens/App/CarListModals';
import BikeInfo from '../screens/App/BikeInfo';
import BikeList from '../screens/App/BikeList';
import BikeListModals from '../screens/App/BikeListModals';
import SellCar from '../screens/App/SellCar';
import SellBike from '../screens/App/SellBike';
import CompareCars from '../screens/App/CompareCars';
import CompareBikes from '../screens/App/CompareBikes';
import AutoParts from '../screens/App/AutoParts';
import AutoPartsDetail from '../screens/App/AutoPartsDetail';
import Cart from '../screens/App/Cart';
import Checkout from '../screens/App/Checkout';
import AddAutoParts from '../screens/App/AddAutoParts';
import AutoPartOrders from '../screens/App/AutoPartOrders';
import Search from '../screens/App/Search';
import SearchCar from '../screens/App/SearchCar';
import SearchBike from '../screens/App/SearchBike';
import SearchAutoPart from '../screens/App/SearchAutoPart';
import BrowseCars from '../screens/App/BrowseCars';
//drawer screen
import FAQ from '../screens/App/FAQ';
import WishList from '../screens/App/WishList';
import TermsCondition from '../screens/App/TermsCondition';
import PersonalSetting from '../screens/App/PersonalSetting';
import WriteReview from '../screens/App/WriteReview';
import PrivacyPolicy from '../screens/App/PrivacyPolicy';
import ContactUs from '../screens/App/ContactUs';
import AboutUs from '../screens/App/AboutUs';
import Blogs from '../screens/App/Blogs';
import ChatScreen from '../screens/App/ChatScreen';

//bottom tab
import {BottomNavigator} from './bottom.navigator';
import CarFinance from '../screens/App/CarFinance';
import CarInsurance from '../screens/App/CarInsurance';
import CarInspection from '../screens/App/CarInspection';
import ScheduleInspection from '../screens/App/ScheduleInspection';

const Stack = createNativeStackNavigator();

export const RootNavigator = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Slider" component={Slider} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="CarInfo" component={CarInfo} />
      <Stack.Screen name="CarList" component={CarList} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="CarListModals" component={CarListModals} />
      <Stack.Screen name="BikeList" component={BikeList} />
      <Stack.Screen name="BikeListModals" component={BikeListModals} />
      <Stack.Screen name="BikeInfo" component={BikeInfo} />
      <Stack.Screen name="SellCar" component={SellCar} />
      <Stack.Screen name="SellBike" component={SellBike} />
      <Stack.Screen name="CompareCars" component={CompareCars} />
      <Stack.Screen name="CompareBikes" component={CompareBikes} />
      <Stack.Screen name="AutoParts" component={AutoParts} />
      <Stack.Screen name="AutoPartsDetail" component={AutoPartsDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="AddAutoParts" component={AddAutoParts} />
      <Stack.Screen name="AutoPartOrders" component={AutoPartOrders} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchCar" component={SearchCar} />
      <Stack.Screen name="SearchBike" component={SearchBike} />
      <Stack.Screen name="SearchAutoPart" component={SearchAutoPart} />
      <Stack.Screen name="BrowseCars" component={BrowseCars} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="PersonalSetting" component={PersonalSetting} />
      <Stack.Screen name="WriteReview" component={WriteReview} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="Blogs" component={Blogs} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="CarFinance" component={CarFinance} />
      <Stack.Screen name="CarInsurance" component={CarInsurance} />
      <Stack.Screen name="CarInspection" component={CarInspection} />
      <Stack.Screen name="ScheduleInspection" component={ScheduleInspection} />
      {/* BOTTOM TAB */}
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
    </Stack.Navigator>
  );
};
