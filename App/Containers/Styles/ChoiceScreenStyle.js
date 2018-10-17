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
    marginTop: Metrics.screenHeight * 0.14,
    paddingRight: Metrics.screenHeight * 0.3 * 0.22,
    flexDirection: 'row'
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo_main,
    width: Metrics.images.logo_main,
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
    left: Metrics.screenWidth * 0.42,
    top: Metrics.screenHeight * 0.875
  },
  toggleBox: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight * 0.07,
    width: Metrics.screenHeight * 0.13,
    backgroundColor: 'rgba(255,255,255,0.0)',
    top: Metrics.screenHeight * 0.91,
    left: '5%'
  },
  toggleContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: Metrics.screenHeight * 0.015,
    width: Metrics.screenHeight * 0.08,
    borderRadius: (Metrics.screenHeight * 0.015) / 2,
    backgroundColor: 'white'
  },
  toggleCircle: {
    height: Metrics.screenHeight * 0.032,
    width: Metrics.screenHeight * 0.032,
    marginRight: '-1%',
    borderRadius: (Metrics.screenHeight * 0.032) / 2,
    elevation: 5
  },
  alertBox: {
    height: Metrics.screenHeight * 0.07,
    width: Metrics.screenWidth,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    position: 'absolute',
    top: Metrics.screenHeight * 0.75
  },
  alertText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: 'red',
    letterSpacing: 2
  },
  toggleText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: 'white',
    letterSpacing: 2,
    fontWeight: '300'
  }
});
