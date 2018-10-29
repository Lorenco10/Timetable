import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Metrics, Colors } from '../Themes';

// Styles
import styles from './Styles/TabScreenStyle';

class TabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyRender: true
    };
    this.showTime = this.showTime.bind(this);
  }
  componentDidMount() {
    // NativeModules.NavigationBarAndroid.hide();
    setTimeout(() => {
      this.setState({ emptyRender: false });
    }, 0.001);
  }

  showTime(id) {
    const { changeCard } = this.props;
    const initialArr = !changeCard
      ? [
          { id: '1', text: '8:00 | 9:00' },
          { id: '2', text: '9:00 | 10:00' },
          { id: '3', text: '10:00 | 11:00' },
          { id: '4', text: '11:00 | 12:00' },
          { id: '5', text: '12:00 | 13:00' },
          { id: '6', text: '13:00 | 14:00' },
          { id: '7', text: '14:00 | 15:00' },
          { id: '8', text: '15:00 | 16:00' },
          { id: '9', text: '16:00 | 17:00' },
          { id: '10', text: '17:00 | 18:00' },
          { id: '11', text: '18:00 | 19:00' },
          { id: '12', text: '19:00 | 20:00' }
        ]
      : [
          { id: '1', text: '8:00\n --- \n9:00' },
          { id: '2', text: '9:00\n --- \n10:00' },
          { id: '3', text: '10:00\n --- \n11:00' },
          { id: '4', text: '11:00\n --- \n12:00' },
          { id: '5', text: '12:00\n --- \n13:00' },
          { id: '6', text: '13:00\n --- \n14:00' },
          { id: '7', text: '14:00\n --- \n15:00' },
          { id: '8', text: '15:00\n --- \n16:00' },
          { id: '9', text: '16:00\n --- \n17:00' },
          { id: '10', text: '17:00\n --- \n18:00' },
          { id: '11', text: '18:00\n --- \n19:00' },
          { id: '12', text: '19:00\n --- \n20:00' }
        ];

    const newArr = initialArr.map(prop => {
      if (id === prop.id) {
        return prop.text;
      }
      return 'error';
    });
    return newArr[parseInt(id, 10) - 1];
  }

  render() {
    const { emptyRender } = this.state;
    const { changeCard, pedagogu } = this.props;
    const orderedOrari = this.props.orari;
    return (
      <View style={{ flex: 1 }}>
        {emptyRender ? (
          <View style={{ flex: 1 }} />
        ) : (
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: '#f9f9f9'
            }}
            contentContainerStyle={styles.scrollBox}
          >
            {pedagogu === null
              ? orderedOrari.map((prop, index) => {
                  return (
                    <View
                      style={[
                        styles.card,
                        { backgroundColor: 'white' },
                        {
                          alignItems: changeCard ? 'flex-end' : 'center',
                          height: changeCard
                            ? Metrics.screenHeight * 0.22
                            : Metrics.screenHeight * 0.3,
                          width: changeCard
                            ? Metrics.screenWidth * 0.88
                            : Metrics.screenWidth * 0.47
                        }
                      ]}
                      key={index}
                    >
                      <View
                        style={[
                          styles.cardTextBox,
                          {
                            height: changeCard
                              ? Metrics.screenHeight * 0.22
                              : Metrics.screenHeight * 0.3 - Metrics.screenHeight * 0.3 * 0.18,
                            width: changeCard
                              ? Metrics.screenWidth * 0.88 - Metrics.screenWidth * 0.88 * 0.16
                              : Metrics.screenWidth * 0.47,
                            borderTopRightRadius: changeCard ? 0 : 5,
                            borderBottomLeftRadius: changeCard ? 5 : 0
                          }
                        ]}
                      >
                        <Text
                          style={[
                            styles.degetText,
                            {
                              fontSize: prop.lenda[0].length >= 30 ? 10 : 12,
                              color: 'black'
                            }
                          ]}
                        >
                          {prop.lenda}
                          {'\n'}
                          --
                        </Text>
                        <Text style={styles.degetText}>
                          {prop.klasa}
                          {'\n'}
                          --
                        </Text>
                        <Text style={styles.degetText}>
                          {`${prop.pedagog[0]
                            .split('@')[0]
                            .split('.')[0][0]
                            .toUpperCase() +
                            prop.pedagog[0]
                              .split('@')[0]
                              .split('.')[0]
                              .substring(1)} ${prop.pedagog[0]
                            .split('@')[0]
                            .split('.')[1][0]
                            .toUpperCase()}${prop.pedagog[0]
                            .split('@')[0]
                            .split('.')[1]
                            .substring(1)}`}
                          {'\n'}
                          --
                        </Text>
                        <Text style={styles.degetText}>
                          {prop.tipi[0][0].toUpperCase() + prop.tipi[0].substring(1)}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.modalTitleContainer,
                          { backgroundColor: Colors.button },
                          changeCard
                            ? {
                                height: '100%',
                                width: '16%',
                                borderBottomLeftRadius: 5,
                                borderTopLeftRadius: 5,
                                borderBottomRightRadius: 0,
                                position: 'absolute',
                                top: 0,
                                right:
                                  Metrics.screenWidth * 0.88 - Metrics.screenWidth * 0.88 * 0.16
                              }
                            : null
                        ]}
                      >
                        <Text style={styles.modalTitle}>{this.showTime(prop.ora[0])}</Text>
                      </View>
                      <View
                        style={[
                          styles.modalTitleContainer,
                          {
                            height: '5%',
                            width: '5%',
                            borderBottomLeftRadius: 5,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            position: 'absolute',
                            top: '3%',
                            left: '3%',
                            opacity: prop.tipi[0] === 'leksion' ? 0.5 : 1,
                            backgroundColor: Colors.actionButton
                          },
                          changeCard
                            ? {
                                height: '100%',
                                width: '1%',
                                borderBottomLeftRadius: 0,
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 5,
                                borderBottomRightRadius: 5,
                                position: 'absolute',
                                opacity: prop.tipi[0] === 'leksion' ? 0.5 : 1,
                                top: 0,
                                backgroundColor: Colors.actionButton,
                                left: '99%'
                              }
                            : null
                        ]}
                      />
                    </View>
                  );
                })
              : orderedOrari.map((prop, index) => {
                  return (
                    <View
                      style={[
                        styles.card2,
                        {
                          alignItems: changeCard ? 'flex-end' : 'center',
                          height: changeCard
                            ? Metrics.screenHeight * 0.38
                            : Metrics.screenHeight * 0.48,
                          width: changeCard
                            ? Metrics.screenWidth * 0.88
                            : Metrics.screenWidth * 0.47
                        }
                      ]}
                      key={index}
                    >
                      <View
                        style={[
                          styles.card2TextBox,
                          {
                            height: changeCard
                              ? Metrics.screenHeight * 0.38
                              : Metrics.screenHeight * 0.48 - Metrics.screenHeight * 0.48 * 0.12,
                            width: changeCard
                              ? Metrics.screenWidth * 0.88 - Metrics.screenWidth * 0.88 * 0.16
                              : Metrics.screenWidth * 0.47,
                            borderTopRightRadius: changeCard ? 0 : 5,
                            borderBottomLeftRadius: changeCard ? 5 : 0
                          }
                        ]}
                      >
                        <Text
                          style={[
                            styles.degetText,
                            {
                              fontSize: prop.dega[0].length >= 30 ? 10 : 12
                            }
                          ]}
                        >
                          {prop.dega}
                          {'\n'}
                          --
                        </Text>
                        <Text
                          style={[
                            styles.degetText,
                            {
                              fontSize: prop.lenda[0].length >= 30 ? 10 : 12
                            }
                          ]}
                        >
                          Lenda: {prop.lenda}
                          {'\n'}
                          --
                        </Text>
                        <Text style={styles.degetText}>
                          Viti: {prop.viti}
                          {'\n'}
                          --
                        </Text>
                        <Text style={styles.degetText}>
                          Paraleli: {prop.paraleli}
                          {'\n'}
                          --
                        </Text>
                        <Text style={styles.degetText}>
                          {prop.klasa}
                          {'\n'}
                          --
                        </Text>
                        <Text style={styles.degetText}>
                          {prop.tipi[0][0].toUpperCase() + prop.tipi[0].substring(1)}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.modalTitleContainer,
                          changeCard
                            ? {
                                height: '100%',
                                width: '16%',
                                borderBottomLeftRadius: 5,
                                borderTopLeftRadius: 5,
                                borderBottomRightRadius: 0,
                                position: 'absolute',
                                top: 0,
                                right:
                                  Metrics.screenWidth * 0.88 - Metrics.screenWidth * 0.88 * 0.16,
                                alignItems: 'center',
                                justifyContent: 'center'
                              }
                            : {
                                height: '12%',
                                top:
                                  Metrics.screenHeight * 0.48 - Metrics.screenHeight * 0.48 * 0.12
                              }
                        ]}
                      >
                        <Text style={styles.modalTitle}>{this.showTime(prop.ora[0])}</Text>
                      </View>
                      <View
                        style={[
                          styles.modalTitleContainer,
                          {
                            height: '3%',
                            width: '5%',
                            borderBottomLeftRadius: 5,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            position: 'absolute',
                            top: '3%',
                            left: '3%',
                            opacity: prop.tipi[0] === 'leksion' ? 0.5 : 1,
                            backgroundColor: Colors.actionButton
                          },
                          changeCard
                            ? {
                                height: '100%',
                                width: '1%',
                                borderBottomLeftRadius: 0,
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 5,
                                borderBottomRightRadius: 5,
                                position: 'absolute',
                                opacity: prop.tipi[0] === 'leksion' ? 0.5 : 1,
                                top: 0,
                                backgroundColor: Colors.actionButton,
                                left: '99%'
                              }
                            : null
                        ]}
                      />
                    </View>
                  );
                })}
          </ScrollView>
        )}
      </View>
    );
  }
}

export default TabScreen;
