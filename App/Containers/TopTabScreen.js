import React, { Component } from 'react';
import { View } from 'react-native';
import TabScreen from './TabScreen';

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
      <View style={this.props.style}>
        <TabScreen
          pedagogu={screenProps.pedagogu}
          style={{ flex: 1 }}
          orari={this.orderedCards()}
          changeCard={screenProps.changeCard}
          nightMode={screenProps.nightMode}
        />
      </View>
    );
  }
}
