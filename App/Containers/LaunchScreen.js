import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  NativeModules,
  Animated,
  TextInput,
  Keyboard,
  Easing
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit';
import { Images, Metrics, Colors } from '../Themes';

// Styles
import styles from './Styles/LaunchScreenStyles';

class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deget: props.navigation.getParam('deget'),
      pedagoget: props.navigation.getParam('pedagoget'),
      student: props.navigation.getParam('student'),
      orari: props.navigation.getParam('orari'),
      modalVisible: false,
      activePicker: '',
      text: '',
      loadContent: false,
      pedagogu: 'PEDAGOGU',
      email: '',
      dega: 'DEGA',
      viti: 'VITI',
      paraleli: 'PARALELI'
    };

    this.modalAnim = new Animated.Value(0.01);
    this.searchAnim = new Animated.Value(0);
    this.show = this.show.bind(this);
    this.animate = this.animate.bind(this);
    this.animateS = this.animateS.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  onChange(value) {
    this.textInput.setNativeProps({ text: value });
    this.setState({ text: value });
  }

  keyboardDidHide() {
    this.animateS(false);
    // NativeModules.NavigationBarAndroid.hide();
  }

  animate(open, load) {
    Animated.spring(this.modalAnim, {
      toValue: open ? 1 : 0,
      useNativeDriver: true,
      velocity: 15,
      tension: 20,
      friction: 50
    }).start(
      load
        ? () => {
            this.setState({ loadContent: !this.state.loadContent });
          }
        : null
    );
  }

  animateS(open) {
    Animated.timing(this.searchAnim, {
      toValue: open ? 1 : 0,
      duration: 500,
      easing: Easing.out(Easing.back(0.01)),
      useNativeDriver: true
    }).start();
  }

  show(picker) {
    if (picker === 'viti') {
      const initialArr = [{ id: 1, text: '1' }, { id: 2, text: '2' }, { id: 3, text: '3' }];
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {initialArr.map(prop => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    this.setState({ modalVisible: !this.state.modalVisible, viti: prop.text });
                  }, 100);
                  this.animate(!this.state.modalVisible, true);
                }}
                style={styles.vitiParaleliContainer}
                key={prop.id}
              >
                <Text style={styles.vitiParaleliText}>{prop.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    if (picker === 'paraleli') {
      const initialArr = [
        { id: 1, text: 'A1' },
        { id: 2, text: 'A2' },
        { id: 3, text: 'B1' },
        { id: 4, text: 'B2' },
        { id: 5, text: 'C1' },
        { id: 6, text: 'C2' }
      ];
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginTop: '50%'
          }}
        >
          {initialArr.map(prop => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    this.setState({
                      modalVisible: !this.state.modalVisible,
                      paraleli: prop.text
                    });
                  }, 100);
                  this.animate(!this.state.modalVisible, true);
                }}
                style={styles.vitiParaleliContainer}
                key={prop.id}
              >
                <Text style={styles.vitiParaleliText}>{prop.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }

    if (picker === 'dega') {
      return (
        <ScrollView
          style={{
            flex: 1
          }}
        >
          {this.state.deget.map(prop => {
            if (this.state.text !== '') {
              return prop.dega[0].toUpperCase().includes(this.state.text.toUpperCase()) ? (
                <TouchableOpacity
                  onPress={() => {
                    setTimeout(() => {
                      this.setState({
                        modalVisible: !this.state.modalVisible,
                        text: '',
                        dega: prop.dega[0]
                      });
                    }, 100);
                    this.animate(!this.state.modalVisible, true);
                  }}
                  style={{ flex: 1 }}
                  key={prop.dega}
                >
                  <Text style={styles.degetText}>{prop.dega}</Text>
                </TouchableOpacity>
              ) : null;
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    this.setState({
                      modalVisible: !this.state.modalVisible,
                      dega: prop.dega[0],
                      text: ''
                    });
                  }, 100);
                  this.animate(!this.state.modalVisible, true);
                }}
                style={{ flex: 1 }}
                key={prop.dega}
              >
                <Text style={styles.degetText}>{prop.dega}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    }
    if (picker === 'pedagogu') {
      return (
        <ScrollView
          style={{
            flex: 1
          }}
        >
          {this.state.pedagoget.map(prop => {
            if (this.state.text !== '') {
              return prop.pedagog[0].toUpperCase().substring(0, this.state.text.length) ===
                this.state.text.toUpperCase() ? (
                <TouchableOpacity
                  onPress={() => {
                    setTimeout(() => {
                      this.setState({
                        modalVisible: !this.state.modalVisible,
                        text: '',
                        pedagogu: prop.pedagog[0].toUpperCase(),
                        email: prop.email[0]
                      });
                    }, 100);
                    this.animate(!this.state.modalVisible, true);
                  }}
                  style={{ flex: 1 }}
                  key={prop.dega}
                >
                  <Text style={styles.degetText}>{prop.pedagog[0].toUpperCase()}</Text>
                </TouchableOpacity>
              ) : null;
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log(prop.email[0]);
                  setTimeout(() => {
                    this.setState({
                      modalVisible: !this.state.modalVisible,
                      pedagogu: prop.pedagog[0].toUpperCase(),
                      email: prop.email[0]
                    });
                  }, 100);
                  this.animate(!this.state.modalVisible, true);
                }}
                style={{ flex: 1 }}
                key={prop.email[0]}
              >
                <Text style={styles.degetText}>{prop.pedagog[0].toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    }
    return (
      <ScrollView
        style={{
          flex: 1
        }}
      />
      /*<FlatList
        data={this.state.deget}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        initialNumToRender={30}
      />*/
    );
  }

  /*   keyExtractor(item, index) {
    return index.toString();
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ dega: item.dega });
          this.closeAnim();
        }}
        style={{ flex: 1, flexDirection: 'row', marginTop: index === 0 ? 15 : null }}
      >
        <Text style={styles.degetText}>{item.dega}</Text>
      </TouchableOpacity>
    );
  } */

  render() {
    const scaleModal = this.modalAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    const fadeModal = this.modalAnim.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    const translateY = this.searchAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -Metrics.screenHeight * 0.37],
      extrapolate: 'clamp'
    });

    const { navigation } = this.props;

    return (
      <View style={styles.mainContainer}>
        <StatusBar trasparent />
        <LinearGradient
          colors={[Colors.gradient1, Colors.gradient2]}
          style={styles.backgroundTheme}
        />
        <View style={styles.centered}>
          <Image source={Images.launch} style={styles.logo} />
          {this.state.student ? (
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  this.setState({
                    modalVisible: !this.state.modalVisible,
                    activePicker: 'dega'
                  });
                  this.animate(!this.state.modalVisible, true);
                }}
              >
                <Text style={styles.pickerText}>{this.state.dega}</Text>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  this.setState({
                    modalVisible: !this.state.modalVisible,
                    activePicker: 'viti',
                    loadContent: true
                  });
                  this.animate(!this.state.modalVisible, false);
                }}
              >
                <Text style={styles.pickerText}>{this.state.viti}</Text>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  this.setState({
                    modalVisible: !this.state.modalVisible,
                    activePicker: 'paraleli',
                    loadContent: true
                  });
                  this.animate(!this.state.modalVisible, false);
                }}
              >
                <Text style={styles.pickerText}>{this.state.paraleli}</Text>
                <View style={styles.line} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  this.setState({
                    modalVisible: !this.state.modalVisible,
                    activePicker: 'pedagogu'
                  });
                  this.animate(!this.state.modalVisible, true);
                }}
              >
                <Text style={styles.pickerText}>{this.state.pedagogu}</Text>
                <View style={styles.line} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            NativeModules.NavigationBarAndroid.hide();
            navigation.goBack();
          }}
        >
          <Icon name="navigate-before" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            navigation.navigate('MainScreen', {
              orari: this.state.orari,
              dega: this.state.dega,
              email: this.state.pedagogu !== 'PEDAGOGU' ? this.state.email : null,
              pedagogu: this.state.pedagogu !== 'PEDAGOGU' ? this.state.pedagogu : null,
              viti: this.state.viti,
              paraleli: this.state.paraleli
            });
          }}
        >
          <Icon name="navigate-next" size={30} color="white" />
        </TouchableOpacity>
        {this.state.modalVisible ? (
          <Animated.View style={[styles.modalContainer, { opacity: fadeModal }]}>
            <TouchableOpacity
              style={[styles.backgroundTheme, { backgroundColor: 'black', opacity: 0.5 }]}
              onPress={() => {
                setTimeout(() => {
                  this.setState({ modalVisible: !this.state.modalVisible, text: '' });
                }, 100);
                this.animate(!this.state.modalVisible, true);
              }}
              activeOpacity={0.5}
            />
            <Animated.View style={[styles.modal, { transform: [{ scale: scaleModal }] }]}>
              {this.state.loadContent ? (
                this.show(this.state.activePicker)
              ) : (
                <Spinner style={styles.spinner} size={50} type="ThreeBounce" color="#ed8063" />
              )}
              <Animated.View style={[styles.modalTitleContainer, { transform: [{ translateY }] }]}>
                {this.state.activePicker === 'dega' || this.state.activePicker === 'pedagogu' ? (
                  <TextInput
                    ref={component => (this.textInput = component)}
                    maxLength={15}
                    placeholder="Search Name"
                    placeholderTextColor="white"
                    underlineColorAndroid="rgba(255,255,255, 0.0)"
                    style={styles.textInput}
                    onFocus={() => this.animateS(true)}
                    onChangeText={value => this.onChange(value)}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                      this.animateS(false);
                      // NativeModules.NavigationBarAndroid.hide();
                    }}
                  />
                ) : (
                  <Text style={styles.modalTitle}>Pick</Text>
                )}
              </Animated.View>
            </Animated.View>
          </Animated.View>
        ) : null}
      </View>
    );
  }
}

export default LaunchScreen;
