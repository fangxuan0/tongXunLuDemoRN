import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Button,
  StatusBar,
  ScrollView
} from 'react-native'

import Util from './util'
import ItemBlock from './itemblock'

export default class Home extends Component {
  // static navigationOptions = {
  //   title: '呵呵',
    // headerStyle: {
    //   backgroundColor: '#f4511e',
    // },
    // headerTintColor: '#fff',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    //   fontSize:20
    // },
  // };
  constructor(props){
    super(props);
    var width = Math.floor((Util.size.width - 70) / 4);
    var items = [
      {
        title:'研发',
        partment:'框架研发',
        color:'#126aff'
      },
      {
        title:'研发',
        partment:'BU研发',
        color:'#ffd600'
      },
      {
        title:'产品',
        partment:'公共产品',
        color:'#f80728'
      },
      {
        title:'产品',
        partment:'BU产品',
        color:'#05c147'
      },
      {
        title:'产品',
        partment:'启明星',
        color:'#ff4eb9'
      },
      {
        title:'项目',
        partment:'项目管理',
        color:'#ee810d'
      }
    ];
    this.state = {
      items:items,
      width:width
    };
  }
  render() {
    var Items1 = [];
    var Items2 = [];
    var items = this.state.items;
    for (var i = 0; i < this.state.items.length; i++) {
      if (i < 4) {
        Items1.push(
          <ItemBlock
            key={i}
            title={items[i].title}
            partment={items[i].partment}
            width={this.state.width}
            color={items[i].color}
            nav={this.props.navigation} />
        );
      }else {
        Items2.push(
          <ItemBlock
            key={i}
            title={items[i].title}
            partment={items[i].partment}
            width={this.state.width}
            color={items[i].color}
            nav={this.props.navigation} />
        );
      }
    }
    return (
      <ScrollView style={styles.container}>
        <StatusBar
          animated={false}
          barStyle='light-content'
          hidden={false}
        />
        <View style={styles.itemRow}>
          { Items1 }
        </View>
        <View style={styles.itemRow}>
          { Items2 }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10
  },
  itemRow:{
    flex:1,
    flexDirection:'row',
    // justifyContent:'space-around',
    marginBottom:10
  }
});
