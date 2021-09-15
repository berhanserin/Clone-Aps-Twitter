import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default class Buttons extends Component {
  render() {
    const {text, btnstyle, textstyle, click} = this.props;
    return (
      <TouchableOpacity style={btnstyle} onPress={click}>
        <Text style={textstyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
