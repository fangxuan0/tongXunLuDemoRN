import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  AsyncStorage,
  TouchableHighlight,
  TextInput,
  DeviceEventEmitter,
  StatusBar
} from 'react-native'

import { createStackNavigator,createBottomTabNavigator } from 'react-navigation';

// var RegistManager = require('react-native').NativeModules.RegistManager;

import Home from './Home'
import Message from './Message'
import Setting from './Setting'
import About from './About'
import Service from './service'
import Util from './util'
import Address from './address'
import Detail from './detail'
import ModifyPassword from './modifyPassword'
import AddUser from './addUser'
import DeleteUser from './deleteUser'
import PostMessage from './postMessage'
import WebViewO from './webView'
// import DetailsScreen from './DetailsScreen'
// import MessageDetail from './MessageDetail'

class TabBarItem extends Component {
    render() {
        return(
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
                style={ { tintColor:this.props.tintColor,width:20,height:20 } }
            />
        )
    }
}

const styleO = {
  // headerTitle:'主页',
  headerBackTitle:null,
  headerTintColor:'white',
  headerStyle:{
    backgroundColor: 'tomato'//'#f90'
  },
  headerTitleStyle:{
    fontSize:20,
    color:'#fff'
  }
};

const TabV =  createBottomTabNavigator({
  Home: {
    screen:Home,
    navigationOptions:({navigation}) => ({
      tabBarLabel:'首页',
      tabBarVisible:true,
      tabBarIcon:({focused,tintColor}) => (
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={require('../img/ResumeList@2x.png')}
          selectedImage={require('../img/ResumeList_HighLighted@2x.png')}
        />
      ),
    })
  },
  Message:{
    screen:Message,
    navigationOptions:({navigation}) => ({
      tabBarLabel:'公告',
      tabBarIcon:({focused,tintColor}) => (
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={require('../img/JobList@2x.png')}
          selectedImage={require('../img/JobList_HighLighted@2x.png')}
        />
      ),
    })
  },
  Setting: {
    screen:Setting,
    navigationOptions:({navigation}) => ({
      tabBarLabel:'管理',
      tabBarIcon:({focused,tintColor}) => (
        <TabBarItem
         tintColor={tintColor}
          focused={focused}
          normalImage={require('../img/Mine@3x.png')}
          selectedImage={require('../img/Mine_HighLighted@2x.png')}
        />
      )
    })
  },
  About: {
    screen:About,
    navigationOptions:({navigation}) => ({
      tabBarLabel:'关于',
      tabBarIcon:({focused,tintColor}) => (
        <TabBarItem
         tintColor={tintColor}
          focused={focused}
          normalImage={require('../img/Message@3x.png')}
          selectedImage={require('../img/Message_HighLighted@2x.png')}
        />
      )
    })
  },
},
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      labelStyle:{
        marginBottom:5
      }
    },
});

TabV.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  let headerTitle;
  if (routeName === 'Home') {
      headerTitle = '首页';
  }else if (routeName === 'Message') {
    headerTitle = '公告';
  }else if (routeName === 'Setting'){
    headerTitle = '管理';
  }else {
    headerTitle = '关于';
  }

  // AsyncStorage.getItem('token',(err,token)=>{
  //   if (!err && token) {
  //
  //   }else {
  //     App.setState({
  //       isLoadingShow:false
  //     });
  //   }
  // });

  // alert(navigation.state.routes.length);
  return {
    headerTitle,
  };
};

const OtherV = createStackNavigator(
  {
    TabV:TabV,
    Address:Address,
    Detail:Detail,
    ModifyPassword:ModifyPassword,
    AddUser:AddUser,
    DeleteUser:DeleteUser,
    PostMessage:PostMessage,
    WebViewO:WebViewO
    // Details:DetailsScreen,
    // MessageDetail:MessageDetail
  },
  {
    initialRouteName: 'TabV',
    navigationOptions:styleO
  }
);

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showIndex:{
        height:0,
        opacity:0
      },
      showLogin:{
        flex:1,
        opacity:1
      },
      obj:{},
      isLoadingShow:false
    };
  }
  componentDidMount(){
    this.listner = DeviceEventEmitter.addListener('xxxName', ()=>{
      this.setState({
        showLogin:{
          opacity:1,
          flex:1
        },
        showIndex:{
          height:0,
          opacity:0
        },
        isLoadingShow:false
      });
    });
    var that = this;
    AsyncStorage.getItem('token',(err,token)=>{
      if (!err && token) {
        var path = Service.host + Service.loginByToken;
        Util.post(path,{
          token:token
        },(data)=>{
          if (data.status) {
            that.setState({
              showLogin:{
                height:0,
                width:0,
                flex:0
              },
              showIndex:{
                flex:1,
                opacity:1
              },
              isLoadingShow:true
            });
          }else {
            that.setState({
              showLogin:{
                opacity:1,
                flex:1
              },
              showIndex:{
                height:0,
                opacity:0
              },
              isLoadingShow:false
            });
          }
        });
        var path = Service.host + Service.getMessage;
        Util.post(path,{
          key:Util.key
        },(data)=>{
          that.setState({
            data:data
          });
        });
      }

    });
  }

  componentWillUnmount(){
     this.listner.remove();
   };
  btnClick(){
    alert('abc');
  }
  getEmail(val){
    this.setState({
      email:val
    });
    // alert('123');
  }
  getPassword(val){
    var pwd = val;
    this.setState({
      password:pwd
    });
  }
  login(val){
    // RegistManager.openImagePicker();
    console.log(val);
    var email = this.state.email;
    var password = this.state.password;
    var path = Service.host + Service.login;


    Util.post(path,{
      email:email,
      password:password,
      deviceId:'siweihong'
    },(data)=>{
      if (data.status) {
        var user = data.data;
        //加载数据到本地
        AsyncStorage.multiSet([
          ['username',user.username],
          ['token',user.token],
          ['userid',user.userid],
          ['email',user.email],
          ['tel',user.tel],
          ['partment',user.partment],
          ['tag',user.tag]
        ],(err)=>{
          if (!err) {
            //隐藏登录页并且加载loading效果
            this.setState({
              showLogin:{
                height:0,
                width:0,
                flex:0
              },
              isLoadingShow:true
            });
          }else {
            alert('登录失败');
          }
        });
      }else {
        alert('用户名或密码错误');
      }
    })
  }
  render() {
    // alert('abc');
    return(

        !this.state.isLoadingShow ?

      <View style={{flex:1,backgroundColor:'#eee'}}>
        <StatusBar
          animated={false}
          barStyle='light-content'
          hidden={true}
        />
        <ScrollView style={[this.state.showLogin]}>
          <View style={styles.container}>
            <View>
              <Image style={styles.logo} source={require('../img/logo.png')}></Image>
            </View>
            <View style={[styles.inputRow,{marginTop:10}]}>
              <Text>邮箱</Text>
              <TextInput
                style={styles.input}
                placeholder='请输入邮箱'
                onChangeText={this.getEmail.bind(this)} />
            </View>
            <View style={styles.inputRow}>
              <Text>密码</Text>
              <TextInput
                style={styles.input}
                placeholder='请输入密码'
                password={true}
                onChangeText={this.getPassword.bind(this)} />
            </View>
            <View>
              <TouchableHighlight underlayColor='#fff'
                onPress={this.login.bind(this)}>
                <View style={styles.btn}>
                  <Text style={{color:'#fff',fontSize:18}}>登   录</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View> :
      //<RootV />
      // <TabV />
      <OtherV />

    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:50,
    alignItems:'center'
  },
  logo:{
    marginTop:20,
    width:200,
    height:200,
    resizeMode:Image.resizeMode.stretch
  },
  inputRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:15
  },
  input:{
    marginLeft:10,
    width:220,
    borderWidth:Util.pixel,
    height:35,
    paddingLeft:8,
    borderRadius:5,
    borderColor:'#ccc'
  },
  btn:{
    marginTop:50,
    marginLeft:15,
    marginRight:15,
    width:300,
    height:44,
    backgroundColor:'#3bc1ff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:4
  }
});
