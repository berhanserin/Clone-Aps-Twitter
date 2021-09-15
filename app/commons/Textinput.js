import React, {Component} from 'react';
import {TextInput} from 'react-native';

export default class Textinput extends Component {
  render() {
    const {
      placeholder,
      value,
      ChangeText,
      type = 'default',
      password,
      Blur,
      style,
    } = this.props;
    return (
      <TextInput
        style={style}
        placeholder={placeholder}
        value={value}
        keyboardType={type}
        onChangeText={ChangeText}
        onBlur={Blur}
        secureTextEntry={password}
      />
    );
  }
}
