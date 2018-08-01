import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  TextInput,
  DeviceEventEmitter
} from 'react-native'

import Service from './service'
import Util from './util'
import Item from './item'

export default class Home extends Component {
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
  getMessage(){
    var path = Service.host + Service.getMessage;
    Util.post(path,{
      key:Util.key,
    },(data)=>{
      if (data.status) {
        this.setState({
          items:data.data
        });
      }else {
        this.setState({
          items:[]
        });
      }
    });
  }
  constructor(props){
    super(props);
    this.state = {
      items:[]
    }
  }
  componentDidMount(){
    this.listner = DeviceEventEmitter.addListener('newData', this.getMessage);
    this.getMessage();
  }
  componentWillUnmount(){
    this.listner.remove();
  }
  render() {
    var contents = this.state.items;
    var subV = [];
    for (var i = 0; i < contents.length; i++) {
       subV.push(
         <Item
           key = {i}
           data={contents[i]}
           nav={this.props.navigation}
           component='Detail'
           text={contents[i].message}
           name={contents[i].username}
           date={contents[i].time} />
       );
    }
    return (
      <ScrollView style={styles.container}>
        <View style={{height:50,padding:8}}>
          <TextInput style={styles.search} placeholder="搜索"></TextInput>
        </View>
        <View style={{backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#ddd'}}>
          {subV}
          <View style={{height:35}}></View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f5f5f5',
    flexDirection:'column'
  },
  search:{
    height:34,
    borderWidth:Util.pixel,
    borderColor:'#ccc',
    paddingLeft:10,
    borderRadius:6,
    fontSize:13,
    backgroundColor:'#fff'
  }
});
