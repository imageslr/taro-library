import Taro, { Component } from "@tarojs/taro";
import { View, Text, Navigator } from "@tarojs/components";
import PropTypes from "prop-types";

import "./index.scss";

export default class Panel extends Component {
  static options = {
    addGlobalClass: true
  };

  static propTypes = {
    url: PropTypes.string,
    title: PropTypes.string
  };

  static defaultProps = {
    url: "",
    title: ""
  };

  componentWillMount() {}

  render() {
    const rootCls = `my-panel ${this.props.className}`;
    return (
      <View className={rootCls}>
        <Navigator url={this.props.url} hoverClass='None'>
          <View className='my-panel-header at-row at-row__align--center'>
            <View className='at-col'>{this.props.title}</View>
            <Text className='my-panel-header__arrow at-icon at-icon-chevron-right at-col' />
          </View>
        </Navigator>
        <View className='my-panel-body'>{this.props.children}</View>
      </View>
    );
  }
}
