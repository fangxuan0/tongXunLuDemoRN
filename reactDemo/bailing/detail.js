import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'

export default class Detail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('title', '联系人'),
      // headerTintColor:'#234',
    };
  };
  render() {
    var content = this.props.navigation.getParam('content');
    return(
      <ScrollView>
        <View style={styles.content}>
          <Text style={{lineHeight:20,fontSize:15}}>{content.message}</Text>
        </View>

        <View style={[styles.luokuan,{marginTop:25}]}>
          <View style={{flex:1}}></View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={[styles.text,{color:'#007aff'}]}>{content.username}</Text>
            <Text style={[styles.text,{color:'#3bc1ff'}]}>{content.time}</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  content:{
    marginTop:20,
    marginLeft:15,
    marginRight:15,
    opacity:0.85
  },
  luokuan:{
    flex:1,
    flexDirection:'row',
    marginRight:30
  },
  text:{
    lineHeight:20,
    // width:90
  }
});
