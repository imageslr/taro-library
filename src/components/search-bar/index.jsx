import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import PropTypes from "prop-types";

import "./index.scss";

export default class SearchBar extends Component {
  static options = {
    addGlobalClass: true
  };

  constructor(props) {
    super(...arguments);
    this.state = {
      isFocus: props.focus
    };
  }

  handleFocus = (...arg) => {
    this.setState({
      isFocus: true
    });
    this.props.onFocus(...arg);
  };

  handleBlur = (...arg) => {
    this.setState({
      isFocus: false
    });
    this.props.onBlur(...arg);
  };

  handleChange = (e, ...arg) => this.props.onChange(e.target.value, ...arg);

  handleClear = (...arg) => this.props.onChange("", ...arg);

  handleConfirm = (...arg) => this.props.onConfirm(...arg);

  handleScan = (...arg) => this.props.onScan(...arg);

  render() {
    const {
      value,
      placeholder,
      maxLength,
      focus,
      disabled,
      fixed,
      customStyle,
      onClick
    } = this.props;
    const { isFocus } = this.state;
    const fontSize = 14;

    // 聚焦时，placeholder左移
    const placeholderWrapStyle = {};
    if (isFocus || (!isFocus && value)) {
      placeholderWrapStyle.width = `${(placeholder.length + 2.5) * fontSize}px`; // 使placeholder落于合适的位置
      placeholderWrapStyle.flexGrow = 0;
    } else if (!isFocus && !value) {
      placeholderWrapStyle.flexGrow = 1;
    }

    const clearIconStyle = { display: "flex" };
    const scanIconStyle = { display: "flex" };
    const placeholderStyle = { visibility: "hidden" };
    if (!value.length) {
      clearIconStyle.display = "none";
      placeholderStyle.visibility = "visible";
    } else {
      scanIconStyle.display = "none";
    }

    let rootCls = "my-search-bar";
    if (fixed) {
      rootCls += " my-search-bar--fixed";
    }

    return (
      <View className={rootCls} style={customStyle} onClick={onClick}>
        <View className='my-search-bar__input-container'>
          <View
            className='my-search-bar__placeholder-wrap'
            style={placeholderWrapStyle}
          >
            <Text className='at-icon at-icon-search' />
            <Text
              className='my-search-bar__placeholder'
              style={placeholderStyle}
            >
              {placeholder}
            </Text>
          </View>
          <Input
            className='my-search-bar__input'
            type='text'
            confirmType='search'
            value={value}
            focus={focus}
            disabled={disabled}
            maxLength={maxLength}
            onInput={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onConfirm={this.handleConfirm}
          />
          <View
            className='my-search-bar__clear'
            style={clearIconStyle}
            onTouchStart={this.handleClear}
          >
            <Text className='at-icon at-icon-close' />
          </View>
          <View
            className='my-search-bar__scan'
            style={scanIconStyle}
            onTouchStart={this.handleScan}
          >
            <Text className='icon icon-scan' />
          </View>
        </View>
      </View>
    );
  }
}

SearchBar.defaultProps = {
  value: "",
  placeholder: "搜索",
  maxLength: 140,
  focus: false,
  disabled: false,
  fixed: false,
  customStyle: {},
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onConfirm: () => {},
  onScan: () => {}
};

SearchBar.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  focus: PropTypes.bool,
  disabled: PropTypes.bool,
  fixed: PropTypes.bool,
  customStyle: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onConfirm: PropTypes.func,
  onScan: PropTypes.func
};
