import React, { Component } from 'react';
import { View, StatusBar, Text } from 'react-native';
import Spinner from 'react-native-spinkit';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TabScreen from './TabScreen';

// Styles
//import styles from './Styles/TopTabScreenStyle';

export default class TopTabScreen extends Component {
  constructor(props) {
    super(props);

    this.orderedCards = this.orderedCards.bind(this);
  }

  orderedCards() {
    const { screenProps } = this.props;
    const orderedOrari = screenProps.orari.filter(prop => {
      if (this.props.dita === prop.dita[0]) {
        return prop;
      }
      return null;
    });
    return orderedOrari.sort((a, b) => {
      return a.ora - b.ora;
    });
  }

  render() {
    const { screenProps } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
        <StatusBar trasparent />
        <TabScreen
          pedagogu={screenProps.pedagogu}
          style={{ flex: 1 }}
          orari={this.orderedCards()}
          changeCard={screenProps.changeCard}
        />
      </View>
    );
  }
}
