import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Metrics } from '../Themes';

// Styles
import styles from './Styles/TabScreenStyle';

class TabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeCard: this.props.changeCard
    };
    this.showTime = this.showTime.bind(this);
  }

  showTime(id) {
    const initialArr = [
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
    const orderedOrari = this.props.orari;
    const changeCard = this.state.changeCard;
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#f9f9f9'
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingTop: '2%'
        }}
      >
        {orderedOrari.map((prop, index) => {
          return (
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: changeCard ? 'flex-end' : 'center',
                margin: 9,
                backgroundColor: 'white',
                borderRadius: 5,
                elevation: 2,
                // height: Metrics.screenHeight * 0.25,
                // width: Metrics.screenWidth * 0.45
                height: changeCard ? Metrics.screenHeight * 0.15 : Metrics.screenHeight * 0.25,
                width: changeCard ? Metrics.screenWidth * 0.85 : Metrics.screenWidth * 0.45
              }}
              key={index}
            >
              {/* <Text style={styles.degetText}>{prop.lenda}</Text>
              <Text style={styles.degetText}>{prop.klasa}</Text> */}
              {/* <Text style={styles.degetText}>{prop.color}</Text>
              <Text style={styles.degetText}>{prop.category}</Text> */}
              {/* <Text style={styles.degetText}>
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
              </Text>
              <Text style={styles.degetText}>
                {prop.tipi[0][0].toUpperCase() + prop.tipi[0].substring(1)}
              </Text> */}
              <View
                style={[
                  styles.modalTitleContainer,
                  changeCard
                    ? {
                        height: Metrics.screenHeight * 0.15,
                        width: '15%',
                        borderBottomRightRadius: 5,
                        borderTopRightRadius: 5
                      }
                    : null
                ]}
              >
                {/* <Text style={styles.modalTitle}>{this.showTime(prop.ora[0])}</Text> */}
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

export default TabScreen;
