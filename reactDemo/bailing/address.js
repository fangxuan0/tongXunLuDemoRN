import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  ActionSheetIOS,
  Linking
} from 'react-native'

import Service from './service'
import Util from './util'

export default class Address extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('title', '联系人'),
      // headerTintColor:'#234',
    };
  };
  showActionSheet(tel,email,uname){
    var options = [];
    options.push('拨打电话给:' + uname);
    options.push('发送短信给:' + uname);
    options.push('发送邮件给:' + uname);
    options.push('取消');
    var events = [];
    events.push(()=>{
      Linking.openURL('tel://'+tel);
    });
    events.push(()=>{
      Linking.openURL('sms://'+tel);
    });
    events.push(()=>{
      Linking.openURL('mailto://'+email);
    });

    ActionSheetIOS.showActionSheetWithOptions({
      options:options,
      cancelButtonIndex:options.length -1
    },(index)=>{
      events[index] && events[index]();
    });
  }
  render() {
    var views = [];
    var data = this.props.navigation.getParam('data');
    var items = data.status ? data.data : [];
    var colors = ['#e20079','#ffd602','#25bffe','#f90000','#04e246','#04e246','#00afc9'];
    var color = {
      backgroundColor : colors[parseInt(Math.random()*7)]
    };
    for (var i in items) {
      views.push(
        <View key={i} style={styles.row}>
          <View style={[styles.text,color]}>
            <Text style={{ fontSize:25,color:'#fff',fontWeight:'bold'}}>
              {items[i].username.substr(0,1) || '未'}
            </Text>
          </View>
          <View style={styles.part}>
            <Text>
              {items[i].username}
            </Text>
            <Text style={styles.unColor}>
              {(items[i].partment || '') + '部-' + (items[i].tag || '') + '人员'}
            </Text>
          </View>
          <View style={{flex:1}}>
            <TouchableHighlight underlayColor='#fff'
              onPress={this.showActionSheet.bind(this,items[i].tel,items[i].email,items[i].username)}>
              <Text style={styles.link}>
                {items[i].tel}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#fff'
              onPress={this.showActionSheet.bind(this,items[i].tel,items[i].email,items[i].username)}>
              <Text style={styles.link}>
                {items[i].email}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      )
    }
    return(
      <ScrollView>
        {views}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  row:{
    flexDirection:'row',
    height:80,
    borderBottomWidth:Util.pixel,
    borderBottomColor:'#ccc',
    alignItems:'center'
  },
  text:{
    width:50,
    height:50,
    borderRadius:4,
    marginLeft:10,
    alignItems:'center',
    justifyContent:'center'
    // backgroundColor:'#e30082'
  },
  part:{
    flex:1,
    marginLeft:5
  },
  link:{
    color:'#1bb7ff',
    marginTop:2
  },
  unColor:{
    color:'#575656',
    marginTop:8,
    fontSize:12
  }
});
