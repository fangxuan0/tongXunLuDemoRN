import React, { Component } from 'react'
import {
  Dimensions,
  PixelRatio
} from 'react-native'

const Util = {
  pixel: 1/PixelRatio.get(),
  size:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
  },
  post:(url,data,callback) => {
    var fetchOptions = {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    };
    // Promise.race([
    //   fetch(url,fetchOptions),
    //   new Promise((resolve,reject)=>{
    //     setTimeout(alert('网络请求失败'),2000);
    //   })
    // ]).then((response)=> response.text())
    // .then((responseText)=>{
    //   callback(JSON.parse(responseText));
    // });
    fetch(url,fetchOptions)
    .then((response)=> response.text())
    .then((responseText) => {
      callback(JSON.parse(responseText));
    }).catch((err)=>{
      alert('网络请求错误');
    });
  },
  key:'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE'
};

export default Util
