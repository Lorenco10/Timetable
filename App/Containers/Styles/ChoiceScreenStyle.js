import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/';

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
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.screenHeight * 0.1,
    marginRight: Metrics.screenWidth * 0.1,
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
    height: 56,
    width: 56,
    //elevation: 10,
    borderRadius: 28,
    backgroundColor: Colors.transparent,
    left: Metrics.screenWidth * 0.45,
    top: Metrics.screenHeight * 0.9
  }
});
