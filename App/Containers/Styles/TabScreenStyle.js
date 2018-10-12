import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  modalTitleContainer: {
    backgroundColor: Colors.button,
    height: '15%',
    width: '100%',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    position: 'absolute',
    top: Metrics.screenHeight * 0.3 - Metrics.screenHeight * 0.3 * 0.15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2
  },
  degetText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    letterSpacing: 2,
    paddingRight: '3%',
    paddingLeft: '3%'
    //paddingTop: '2%'
  }
});
