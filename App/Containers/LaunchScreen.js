import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Animated,
  TextInput,
  Keyboard,
  Easing,
  AsyncStorage
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit';
import Animation from 'lottie-react-native';
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
      toggle: false,
      keybardHeight: 0,
      moveScrollView: false,
      activated: false,
      loadContent: false,
      pedagogu: 'PEDAGOGU',
      email: '',
      dega: 'DEGA',
      viti: 'VITI',
      paraleli: 'PARALELI'
    };

    this.modalAnim = new Animated.Value(0.01);
    this.searchAnim = new Animated.Value(0);
    this.toggleAnim = new Animated.Value(0);

    this.show = this.show.bind(this);
    this.animate = this.animate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.animateToggle = this.animateToggle.bind(this);
    this.storeItem = this.storeItem.bind(this);
    this.retrieveItem = this.retrieveItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    const { student } = this.state;
    if (student) {
      this.retrieveItem('infoS').then(info1 => {
        if (info1 !== null) {
          const val = JSON.parse(info1);
          this.setState(
            {
              dega: val.dega,
              paraleli: val.paraleli,
              viti: val.viti,
              toggle: true,
              activated: true
            },
            () => {
              setTimeout(() => {
                this.animateToggle(true);
              }, 300);
            }
          );
        }
      });
    } else {
      this.retrieveItem('infoP').then(info1 => {
        if (info1 !== null) {
          const val = JSON.parse(info1);
          this.setState(
            {
              pedagogu: val.pedagogu,
              email: val.email,
              toggle: true,
              activated: true
            },
            () => {
              setTimeout(() => {
                this.animateToggle(true);
              }, 300);
            }
          );
        }
      });
    }
  }

  componentWillUnmount() {
    const { dega, viti, paraleli, toggle, student, pedagogu, email } = this.state;
    if (toggle) {
      if (student) {
        this.storeItem('infoS', JSON.stringify({ dega, viti, paraleli }));
      } else {
        this.storeItem('infoP', JSON.stringify({ pedagogu, email }));
      }
    } else {
      this.deleteItem(student ? 'infoS' : 'infoP');
    }
  }

  onChange(value) {
    this.textInput.setNativeProps({ text: value });
    this.setState({ text: value });
  }

  async storeItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      //console.log(error.message);
    }
  }

  async deleteItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      // console.log(error.message);
    }
  }

  async retrieveItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      // console.log(error.message);
    }
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

  animateToggle(move) {
    Animated.timing(this.toggleAnim, {
      toValue: move ? 0.5 : 1,
      duration: 500,
      easing: Easing.linear
    }).start();
  }

  show(picker) {
    if (picker === 'viti') {
      const initialArr = [{ id: 1, text: '1' }, { id: 2, text: '2' }, { id: 3, text: '3' }];
      return (
        <View style={styles.vitiBox}>
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
        <View style={styles.paraleliBox}>
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
        <ScrollView style={[styles.degaBox, { marginTop: '18%' }]}>
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
                  style={styles.degaItem}
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
                style={styles.degaItem}
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
        <ScrollView style={[styles.degaBox, { marginTop: '18%' }]}>
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
                  style={styles.degaItem}
                  key={prop.dega}
                >
                  <Text style={styles.degetText}>{prop.pedagog[0].toUpperCase()}</Text>
                </TouchableOpacity>
              ) : null;
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    this.setState({
                      modalVisible: !this.state.modalVisible,
                      pedagogu: prop.pedagog[0].toUpperCase(),
                      email: prop.email[0]
                    });
                  }, 100);
                  this.animate(!this.state.modalVisible, true);
                }}
                style={styles.degaItem}
                key={prop.email[0]}
              >
                <Text style={styles.degetText}>{prop.pedagog[0].toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    }
    return <ScrollView style={styles.degaBox} />;
  }

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

    const { navigation } = this.props;
    const { dega, paraleli, viti, toggle, email, student, pedagogu, activePicker } = this.state;

    return (
      <View style={styles.mainContainer}>
        <StatusBar hidden />
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
            navigation.goBack();
          }}
        >
          <Icon name="navigate-before" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (toggle) {
              if (student) {
                this.storeItem('infoS', JSON.stringify({ dega, viti, paraleli }));
              } else {
                this.storeItem('infoP', JSON.stringify({ pedagogu, email }));
              }
            } else {
              this.deleteItem(student ? 'infoS' : 'infoP');
            }
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
              <Animated.View
                style={[
                  styles.modalTitleContainer,
                  {
                    top: activePicker === 'dega' || activePicker === 'pedagogu' ? '0%' : '88%',
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: Metrics.screenHeight * 0.005,
                    borderTopLeftRadius: Metrics.screenHeight * 0.005
                  }
                ]}
              >
                {this.state.activePicker === 'dega' || this.state.activePicker === 'pedagogu' ? (
                  <TextInput
                    ref={component => (this.textInput = component)}
                    maxLength={50}
                    placeholder="Search Name"
                    placeholderTextColor="white"
                    underlineColorAndroid="rgba(255,255,255, 0.0)"
                    style={styles.textInput}
                    onChangeText={value => this.onChange(value)}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                  />
                ) : (
                  <Text style={styles.modalTitle}>Pick</Text>
                )}
              </Animated.View>
              {this.state.loadContent ? (
                this.show(this.state.activePicker)
              ) : (
                <Spinner
                  style={styles.spinner}
                  size={50}
                  type="ThreeBounce"
                  color={Colors.actionButton}
                />
              )}
            </Animated.View>
          </Animated.View>
        ) : null}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setTimeout(() => {
              this.setState({ toggle: !this.state.toggle });
            }, 0.01);
            this.animateToggle(!this.state.toggle);
          }}
          style={styles.toggleBox}
        >
          <Animation
            style={{ width: Metrics.screenWidth * 0.17, height: Metrics.screenWidth * 0.17 }}
            progress={this.toggleAnim}
            source="anim3.json"
          />
        </TouchableOpacity>
        <View style={[styles.toggleBox, { top: '93.2%', left: '4.6%' }]}>
          <Text style={styles.toggleText}>Save</Text>
        </View>
      </View>
    );
  }
}

export default LaunchScreen;
