import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

export default class Index extends Component {
  static options = {
    addGlobalClass: true
  };

  render() {
    return (
      <View className='my-copyright'>
        <View className='my-copyright__text'>Copyright © 2021 <View className='my-copyright__link'>@imageslr</View></View>
        <View className='my-copyright__text'>Blog <View className='my-copyright__link'>https://imageslr.github.io</View></View>
      </View>
    );
  }
}
