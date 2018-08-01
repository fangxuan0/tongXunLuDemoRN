import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  AlertIOS
} from 'react-native'

import Service from './service'
import Util from './util'

export default class ModifyPassword extends Component {
  static navigationOptions = {
    headerTitle:'修改密码'
  };
  getOldPassword(val){
    this.setState({
      oldPassword:val
    });
  }
  getNewPassword(val){
    this.setState({
      password:val
    });
  }
  resetPassword(){
    var path = Service.host + Service.updatePassword;
    AsyncStorage.getItem('token',(err,data)=>{
      if (!err) {
        Util.post(path,{
          password:this.state.password,
          oldPassword:this.state.oldPassword,
          token:data
        },(data)=>{
          if (data.status) {
            AlertIOS.alert('成功',data.data);
          }else {
            AlertIOS.alert('失败',data.data);
          }
        });
      }else {
        AlertIOS.alert('失败',data.data);
      }
    });
  }
  render() {
    return(
      <ScrollView>
        <View style={{height:35,marginTop:30}}>
          <TextInput style={styles.input} password={true} placeholder='原始密码'
           onChangeText={this.getOldPassword.bind(this)} />
        </View>

        <View style={{height:35,marginTop:10}}>
          <TextInput style={styles.input} password={true} placeholder='新密码'
           onChangeText={this.getNewPassword.bind(this)} />
        </View>

        <View>
          <TouchableOpacity onPress={this.resetPassword.bind(this)}>
            <View style={styles.btn}>
              <Text style={{color:'#fff'}}>修改密码</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  input:{
    flex:1,
    marginLeft:20,
    marginRight:20,
    height:35,
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius:4,
    paddingLeft:5,
    fontSize:13
  },
  btn:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    backgroundColor:'#1db8ff',
    height:38,
    marginLeft:20,
    marginRight:20,
    borderRadius:4
  }
});
