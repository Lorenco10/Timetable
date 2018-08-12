import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  modalTitleContainer: {
    backgroundColor: Colors.button,
    height: '20%',
    width: '100%',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    //elevation: 5,
    //alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: 'white',
    letterSpacing: 2
  },
  degetText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    letterSpacing: 2,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5
  }
});
