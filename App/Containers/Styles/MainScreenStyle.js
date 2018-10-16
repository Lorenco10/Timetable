import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  backButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: Metrics.screenWidth * 0.15,
    zIndex: 5,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    left: '82%',
    top: '1%'
  },
  errorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notFoundText: {
    fontSize: 24,
    fontFamily: 'Roboto',
    color: 'red',
    textAlign: 'center',
    fontWeight: '900',
    letterSpacing: 5
  },
  messageBox: {
    flex: 0.05,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '2%'
  },
  messageText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: 'black',
    textAlign: 'center',
    letterSpacing: 2
  }
});
