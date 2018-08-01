/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  NavigatorIOS,
  PixelRatio
} from 'react-native';

import Bai from './bailing/Bai'

export default class reactDemo extends Component {
  render() {
    return (
      <Bai />
    );
  }
}

AppRegistry.registerComponent('reactDemo', () => reactDemo);
