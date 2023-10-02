import {StyleSheet, Dimensions, I18nManager} from 'react-native';

// local
import Colors from '../../constants/color';

// dimenstion
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: width * 0.95,
    // height: height * 0.06,
    marginVertical: height * 0.007,
    // paddingHorizontal: width * 0.02,
    backgroundColor: 'white',
    // backgroundColor: 'red',
    justifyContent: 'center',
    // borderBottomWidth: 2,
    // borderColor: '#539AE8',
    marginTop: height * 0.015,
    borderRadius: 6,
    alignSelf: 'center',
  },
  textInput: {
    fontSize: width * 0.035,
    // height: height * 0.05,
    width: width * 0.9,
    // backgroundColor: '0095FF',
    color: 'black',
    marginLeft: width * 0.025,
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    borderRadius: 10,
  },
  errorMessage: {
    fontSize: width * 0.032,
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: height * 0.005,
    marginBottom: height * 0.01,
  },
  txt1: {
    fontSize: width * 0.035,
    color: 'black',
    fontWeight: 'bold',
  },
  textCont: {
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
    marginLeft: width * 0.035,
    color: 'black',
    // backgroundColor: 'yellow',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
