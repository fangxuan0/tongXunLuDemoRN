import React, { Component } from 'react'
import {
  AppRegistry,
  WebView,
  View
} from 'react-native'

export default class WebViewO extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('otherParam', ''),
      // headerTintColor:'#234',

    };
  };
  onNavigationStateChange = (navState) => {
    this.props.navigation.setParams({otherParam: navState.title});
    // this.setState({
    //   backButtonEnabled: navState.canGoBack,
    //   forwardButtonEnabled: navState.canGoForward,
    //   url: navState.url,
    //   status: navState.title,
    //   loading: navState.loading,
    //   scalesPageToFit: true
    // });
  };
  render() {
    return(
      <View style={{flex:1}}>
        <WebView source={{uri:this.props.navigation.getParam('url')}} onNavigationStateChange={this.onNavigationStateChange}/>
      </View>
    )
  }
}
