import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    height: Metrics.screenWidth * 0.3,
    width: Metrics.screenWidth * 0.3,
    resizeMode: 'contain',
    transform: [{ rotate: '0deg' }]
  },
  centered: {
    alignItems: 'center'
  },
  pickerContainer: {
    height: Metrics.screenHeight * 0.4,
    width: Metrics.screenWidth * 0.8,
    marginTop: '68%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerText: {
    ...Fonts.style.main,
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: 10,
    paddingBottom: '1%'
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
    paddingRight: '3%',
    paddingLeft: '4%',
    paddingBottom: '0.5%',
    paddingTop: '1.5%'
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
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: Metrics.screenHeight * 0.02,
    elevation: 5,
    backgroundColor: Colors.modalButton,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paraleliBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: '50%'
  },
  vitiBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  degaBox: {
    flex: 1
  },
  degaItem: {
    flex: 1
  },
  nextButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenWidth * 0.2,
    width: Metrics.screenWidth * 0.2,
    borderRadius: (Metrics.screenWidth * 0.2) / 2,
    backgroundColor: Colors.transparent,
    left: Metrics.screenWidth * 0.77,
    top: '86.3%'
  },

  backButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenWidth * 0.1,
    width: Metrics.screenWidth * 0.1,
    borderRadius: (Metrics.screenWidth * 0.2) / 2,
    backgroundColor: Colors.transparent,
    left: Metrics.screenWidth * 0.05,
    top: Metrics.screenHeight * 0.05
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: Metrics.screenHeight * 0.008,
    height: Metrics.screenHeight * 0.75,
    width: Metrics.screenWidth * 0.8,
    justifyContent: 'flex-end',
    marginLeft: Metrics.screenWidth / 2,
    marginRight: Metrics.screenWidth / 2
  },
  modalTitleContainer: {
    top: '88%',
    position: 'absolute',
    backgroundColor: Colors.modalButton,
    height: '12%',
    width: '100%',
    borderBottomRightRadius: Metrics.screenHeight * 0.005,
    borderBottomLeftRadius: Metrics.screenHeight * 0.005,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: 'white',
    letterSpacing: 2
  },
  line: {
    height: Metrics.screenWidth * 0.004,
    width: Metrics.screenWidth * 0.1,
    backgroundColor: 'white',
    borderRadius: (Metrics.screenWidth * 0.1) / 2,
    marginTop: '5%'
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    marginLeft: Metrics.screenWidth * 0.35
  },
  textInput: {
    height: Metrics.screenHeight * 0.075,
    width: Metrics.screenWidth * 0.7,
    maxHeight: Metrics.screenHeight * 1.3,
    color: 'white',
    fontSize: 14,
    fontWeight: '200',
    textAlign: 'center',
    fontFamily: 'monospace'
  },
  toggleBox: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight * 0.07,
    width: Metrics.screenHeight * 0.13,
    backgroundColor: 'rgba(255,255,255,0.0)',
    top: '90%',
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
  toggleText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: 'white',
    letterSpacing: 2,
    fontWeight: '300'
  }
});
