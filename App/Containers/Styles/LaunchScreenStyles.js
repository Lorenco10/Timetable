import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo_main,
    width: Metrics.images.logo_main,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  pickerContainer: {
    height: Metrics.screenHeight * 0.4,
    width: Metrics.screenWidth * 0.8,
    marginTop: Metrics.screenWidth / 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerText: {
    ...Fonts.style.main,
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: 10,
    paddingBottom: 5
  },
  picker: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.screenHeight * 0.05
  },
  degetText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
    letterSpacing: 2,
    paddingRight: 30,
    paddingLeft: 16,
    paddingBottom: 2,
    paddingTop: 6
  },
  vitiParaleliText: {
    fontFamily: 'monospace',
    fontSize: 16,
    textAlign: 'center',
    color: 'white'
  },
  vitiParaleliContainer: {
    width: Metrics.screenHeight * 0.1,
    height: Metrics.screenHeight * 0.07,
    borderRadius: Metrics.screenHeight * 0.05,
    margin: 10,
    elevation: 5,
    backgroundColor: Colors.modalButton,
    justifyContent: 'center',
    alignItems: 'center'
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
    left: Metrics.screenWidth * 0.8,
    top: Metrics.screenHeight * 0.9
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: Metrics.screenHeight * 0.75,
    width: Metrics.screenWidth * 0.8,
    justifyContent: 'flex-end',
    marginLeft: Metrics.screenWidth / 2,
    marginRight: Metrics.screenWidth / 2
  },
  modalTitleContainer: {
    backgroundColor: Colors.modalButton,
    height: Metrics.navBarHeight,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: 'white',
    letterSpacing: 2
  },
  line: {
    height: 1,
    width: Metrics.screenWidth * 0.1,
    backgroundColor: 'white',
    borderRadius: 0.5,
    marginTop: 15
  }
});