import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
    //backgroundColor: Colors.background
  },
  centered: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontFamily: 'sans-serif-thin',
    fontSize: 80,
    color: 'white',
    textAlign: 'center'
  },
  textContainer: {
    width: Metrics.screenHeight * 0.3,
    height: Metrics.screenHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.7,
    borderRadius: (Metrics.screenHeight * 0.3) / 2,
    borderColor: 'white',
    top: '65%',
    alignSelf: 'center',
    paddingRight: Metrics.screenHeight * 0.3 * 0.22,
    flexDirection: 'row'
  },
  logo: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    height: Metrics.screenWidth * 0.3,
    width: Metrics.screenWidth * 0.3,
    resizeMode: 'contain'
  },
  nextButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenWidth * 0.2,
    width: Metrics.screenWidth * 0.2,
    borderRadius: (Metrics.screenWidth * 0.2) / 2,
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    top: '87.5%'
  },
  toggleBox: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight * 0.07,
    width: Metrics.screenWidth * 0.2,
    backgroundColor: Colors.transparent,
    top: '90%',
    left: '5%'
  },
  alertBox: {
    height: Metrics.screenHeight * 0.05,
    width: Metrics.screenWidth,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    position: 'absolute',
    top: '84%'
  },
  alertText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: 'black',
    letterSpacing: 2
  },
  toggleText: {
    fontSize: 11,
    fontFamily: 'Roboto',
    color: 'white',
    letterSpacing: 1,
    fontWeight: '300'
  }
});
