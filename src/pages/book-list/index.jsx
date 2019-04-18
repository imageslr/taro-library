import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtMessage, AtNoticebar } from "taro-ui";
import { connect } from "@tarojs/redux";
import { disfavorBookById } from "../../store/home/action";
import BookCard from "../../components/book-card";

import "./index.scss";

@connect(
  ({ home }) => ({
    newBooks: home.newBooks,
    hotBooks: home.hotBooks,
    recommendBooks: home.recommendBooks
  }),
  {
    dispatchDisfavorBook: disfavorBookById
  }
)
export default class BookList extends Component {
  config = {
    navigationBarTitleText: ""
  };

  constructor() {
    super(...arguments);

    this.state = { isShowNoticebar: true };

    this.onLongPress = this.onLongPress.bind(this);

  }

  componentWillMount(){
    const { type } = this.$router.params;
    switch (type) {
      case "new":
        return Taro.setNavigationBarTitle({ title: "新书速递" });
      case "hot":
        return Taro.setNavigationBarTitle({ title: "近期热门" });
      case "recommend":
        return Taro.setNavigationBarTitle({ title: "为你推荐" });
    }
  }

  onLongPress(id) {
    Taro.showActionSheet({
      itemList: ["不感兴趣"]
    })
      .then(() => {
        this.props.dispatchDisfavorBook(id, this.$router.params.type);
        Taro.atMessage({ message: "我们会减少此图书的出现频率" });
      })
      .catch(e => {
        console.log("取消点击", e);
      });
  }

  onCloseNoticebar() {
    this.setState({ isShowNoticebar: false });
  }

  render() {
    let data;
    const { type } = this.$router.params;
    switch (type) {
      case "new":
        data = this.props.newBooks;
        break;
      case "hot":
        data = this.props.hotBooks;
        break;
      case "recommend":
        data = this.props.recommendBooks;
        break;
    }
    return (
      <View>
        <AtMessage />
        {this.state.isShowNoticebar && (
          <AtNoticebar close onClose={this.onCloseNoticebar}>
            长按标记不感兴趣的图书
          </AtNoticebar>
        )}
        {data.map(item => (
          <BookCard data={item} key={item.id} onLongPress={this.onLongPress} />
        ))}
      </View>
    );
  }
}
