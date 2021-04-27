import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import PropTypes from "prop-types";

import "./index.scss";

export default class NetworkError extends Component {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    content: "网络错误，重新加载",
    onClick: () => {}
  };

  static propTypes = {
    content: PropTypes.string,
    onClick: PropTypes.func
  };

  componentWillMount() {}

  render() {
    const { content } = this.props;
    return (
      <View className='my-network-error'>
        <AtButton type='primary' onClick={this.props.onClick}>
          {content}
        </AtButton>
      </View>
    );
  }
}
