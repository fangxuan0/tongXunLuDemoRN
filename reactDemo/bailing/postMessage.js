import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  AsyncStorage,
  DeviceEventEmitter
} from 'react-native'

import Util from './util'
import Service from './service'

export default class PostMessage extends Component {
  static navigationOptions = {
    headerTitle:'发布公告'
  };
  onChange(val){
    this.setState({
      message:val
    });
  }
  postMessage(){
    AsyncStorage.getItem('token',(err,data)=>{
      if (!err) {
        Util.post(Service.host + Service.addMessage,{
          token:data,
          message:this.state.message
        },(data)=>{
          if (data.status) {
            alert('添加成功!');
            DeviceEventEmitter.emit('newData');
            this.props.navigation.goBack();
          }else {
            alert('添加失败!');
          }
        });
      }else {
        alert('权限失效，请退出App，重新登录');
      }
    });
  }
  render() {
    return(
      <ScrollView>
        <View>
          <TextInput
            multiline={true}
            placeholderTextColor='#ccc'
            onChangeText={this.onChange.bind(this)}
            style={styles.textinput}
            placeholder='请输入公告内容' />
        </View>
        <View style={{marginTop:30}}>
          <TouchableOpacity onPress={this.postMessage.bind(this)}>
            <View style={styles.btn}>
              <Text style={{color:'#fff'}}>发布公告</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  textinput:{
    flex:1,
    height:100,
    borderWidth:1,
    borderColor:'#ddd',
    marginTop:30,
    marginLeft:20,
    marginRight:20,
    paddingLeft:8,
    fontSize:13,
    borderRadius:4,
  },
  btn:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#1db8ff',
    height:38,
    marginLeft:20,
    marginRight:20,
    borderRadius:4
  }
});
