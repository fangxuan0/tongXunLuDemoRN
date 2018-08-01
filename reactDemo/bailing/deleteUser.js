import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  AlertIOS,
  AsyncStorage
} from 'react-native'

import Util from './util'
import Service from './service'

export default class DeleteUser extends Component {
  static navigationOptions = {
    headerTitle:'删除联系人'
  };
  setEmail(val){
    this.setState({
      email:val
    });
  }
  deleteUser(){
    AlertIOS.alert('提示','确认删除该用户?',[
      {
        text:'删除',
        onPress:()=>{
          var path = Service.host + Service.deleteUser;
          AsyncStorage.getItem('token',(err,data)=>{
            if (!err) {
              Util.post(path,{
                token:data,
                email:this.state.email
              },(data)=>{
                if (data.status) {
                  AlertIOS.alert('成功','删除成功');
                }else {
                  AlertIOS.alert('失败','删除失败');
                }
              });
            }else {
              AlertIOS.alert('提示','没有权限');
            }
          });
        }
      },
      {
        text:'取消',
        onPress:()=>null
      }
    ]);
  }
  render() {
    return(
      <ScrollView>
        <View style={{height:35,marginTop:30}}>
          <TextInput style={styles.input} placeholder='请输入用户的邮箱' onChangeText={this.setEmail.bind(this)} />
        </View>

        <View>
          <TouchableOpacity onPress={this.deleteUser.bind(this)}>
            <View style={styles.btn}>
              <Text style={{color:'#fff'}}>删除用户</Text>
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
    marginTop:30,
    backgroundColor:'#1db8ff',
    height:38,
    marginLeft:20,
    marginRight:20,
    borderRadius:4
  }
});
