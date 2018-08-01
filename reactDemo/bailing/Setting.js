import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  AsyncStorage,
  DeviceEventEmitter
} from 'react-native'

import Util from './util'

export default class Home extends Component {
  // static navigationOptions = {
  //   title: 'Setting',
  //   headerStyle: {
  //     backgroundColor: '#f90'//'#f4511e',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //     fontSize:20
  //   },
  // };
  loadPage(component,title){
    if (title === '删除联系人') {
      AsyncStorage.getItem('email',(err,token)=>{
        if (!err && token) {
          if (token !== 'swhglcat@sina.com' && token !== 'swhglcat@126.com') {
            alert('您没有该权限');
            return;
          }else {
            this.props.navigation.navigate(component,{
              title:title
            });
          }
        }else {
          alert('您没有该权限');
          return;
        }
      });
    }else {
      this.props.navigation.navigate(component,{
        title:title
      });
    }

  }
  clear() {
    this.props.navigation.navigate('Home');//popToTop();
    DeviceEventEmitter.emit('xxxName',{});
    AsyncStorage.clear();
  }
  render() {
    var colors = ['#f4000b', '#17b4ff', '#ffd900', '#f00000'];
    var tags = ['U', 'A', 'D', 'M'];
    var items = ['修改密码', '增加联系人', '删除联系人', '发布公告'];
    var component = ['ModifyPassword', 'AddUser', 'DeleteUser', 'PostMessage'];
    var jsxDom = [];
    for (var i in items) {
      jsxDom.push(
        <TouchableOpacity key={i} onPress={this.loadPage.bind(this,component[i],items[i])}>
          <View style={styles.item}>
            <Text style={[styles.tag,{color:colors[i]}]}>{tags[i]}</Text>
            <Text style={[styles.font,{flex:1}]}>{items[i]}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          {jsxDom}
        </View>

        <View style={{marginTop:30}}>
          <TouchableOpacity onPress={this.clear.bind(this)}>
            <View style={styles.item}>
              <Text style={[styles.tag,{color:colors[i]}]}>Q</Text>
              <Text style={[styles.font,{flex:1}]}>退出登录</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f5f5f5'
  },
  item:{
    height:44,
    justifyContent:'center',
    borderTopWidth:Util.pixel,
    borderTopColor:'#ddd',
    backgroundColor:'#fff',
    alignItems:'center',
    flexDirection:'row'
  },
  font:{
    fontSize:15,
    marginLeft:5,
    marginRight:10
  },
  wrapper:{
    marginTop:30
  },
  tag:{
    marginLeft:10,
    fontSize:16,
    fontWeight:'bold'
  }
});
