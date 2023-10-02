import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  centeredView: {
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  lModalView: {
    paddingVertical: height * 0.04,
    width: width * 0.8,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: width * 0.05,
  },
  logoBox: {
    width: width * 0.3,
    height: height * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  msgText: {
    fontSize: width * 0.03,
    color: '#0095FF',
    textAlign: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  okBox: {
    height: height * 0.05,
    width: width * 0.2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.025,
    borderWidth: 1,
    borderColor: '#0095FF',
  },
  okText: {
    fontSize: width * 0.03,
    color: '#0095FF',
  },
  notitext: {
    fontSize: width * 0.04,
    color: '#0095FF',
    textAlign: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
});
