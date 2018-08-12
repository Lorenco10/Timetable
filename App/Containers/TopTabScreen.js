import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Spinner from 'react-native-spinkit';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TabScreen from './TabScreen';

// Styles
//import styles from './Styles/TopTabScreenStyle';

export default class TopTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orari: this.props.screenProps.orari,
      changeCard: this.props.screenProps.changeCard,
      dita: this.props.dita
    };

    this.orderedCards = this.orderedCards.bind(this);
  }

  orderedCards() {
    const orderedOrari = this.props.screenProps.orari.filter(prop => {
      if (this.state.dita === prop.dita[0]) {
        return prop;
      }
      return null;
    });
    return orderedOrari.sort((a, b) => {
      return a.ora - b.ora;
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
        <StatusBar trasparent />
        {/* <TabScreen style={{ flex: 1 }} orari={this.orderedCards()} /> */}
        <TabScreen
          style={{ flex: 1 }}
          orari={this.state.orari}
          changeCard={this.state.changeCard}
        />
      </View>
    );
  }
}
