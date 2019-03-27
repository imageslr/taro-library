import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Navigator, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import URL from "../../constants/urls";

import "./index.scss";

export default class HorizonList extends Component {
  static options = {
    addGlobalClass: true
  };

  static propTypes = {
    isBook: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.object),
    sideSpace: PropTypes.number // 组件左侧到屏幕左侧的间距，单位为rpx
  };

  static defaultProps = {
    isBook: true,
    data: [],
    sideSpace: 24
  };

  componentWillMount() {}

  render() {
    const { isBook, data, sideSpace } = this.props;
    const url = isBook ? URL.BOOK_DETAIL : URL.BOOK_LIST_DETAIL;

    // 以rpx为单位计算图片宽高
    let imgWidth, imgHeight;
    imgWidth = (750 - 24 * 2 - sideSpace * 2) / 3; // 24是两张图片之间的距离
    imgHeight = (imgWidth * 300) / 218; // 图片宽高比为218/300

    return (
      <ScrollView className='my-horizon-list-container' scrollX>
        <View className='my-horizon-list'>
          {data.map(item => {
            return (
              <Navigator
                key={item.id}
                url={`${url}?id=${item.id}`}
                className='my-horizon-list-item'
                hoverClass='None'
                style={{ width: Taro.pxTransform(imgWidth) }}
              >
                <Image
                  className={
                    isBook
                      ? "my-horizon-list-item__book"
                      : "my-horizon-list-item__booklist"
                  }
                  style={{
                    width: Taro.pxTransform(imgWidth),
                    height: isBook
                      ? Taro.pxTransform(imgHeight)
                      : Taro.pxTransform(imgWidth)
                  }}
                  src={item.image}
                  mode='aspectFill'
                />
                <View className='my-horizon-list-item__title'>
                  {item.title}
                </View>
                {isBook && (
                  <View className='my-horizon-list-item__author'>
                    {item.author}
                  </View>
                )}
              </Navigator>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
