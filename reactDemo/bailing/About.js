import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native'

export default class About extends Component {
  // static navigationOptions = {
  //   title: 'Message',
  //   headerStyle: {
  //     backgroundColor: '#f4511e',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //     fontSize:20
  //   },
  // };
  openWebView(url){
    this.props.navigation.navigate('WebViewO',{
      url:url
    });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <Image style={styles.avatar} source={require('../img/aaa.jpg')}></Image>
          <View style={{height:200}}></View>
          <Text style={{fontSize:16,marginTop:10,color:'#ababab'}}>Author:siweihong</Text>
          <Text style={{fontSize:16,marginBottom:20,color:'#ababab'}}>Version: v0.0.1</Text>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={this.openWebView.bind(this,'https://github.com/fangxuan0')}>
              <Image style={styles.img} source={require('../img/githubH.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.openWebView.bind(this,'https://weibo.com/2782064470/profile?topnav=1&wvr=6')}>
              <Image style={styles.img} source={require('../img/sina.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.openWebView.bind(this,'https://blog.csdn.net/sinat_36772813')}>
              <Image style={styles.img} source={require('../img/csdn.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  wrapper:{
    alignItems:'center',
    marginTop:70
  },
  avatar:{
    width:90,
    height:90,
    borderRadius:45
  },
  img:{
    width:30,
    height:30,
    marginRight:10,
    marginLeft:10
  }
});
