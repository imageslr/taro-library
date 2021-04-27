import Taro from "@tarojs/taro";
import { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Text, Block } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";
import API from "../../service/api";
import NetworkError from "../../components/network-error";
import HorizonList from "../../components/horizon-list";

import "./index.scss";

export default class BookDetail extends Component {
  state = {
    book: {},
    isFetching: true,
    isError: false
  };

  constructor() {
    super(...arguments);
    this.onPreview = this.onPreview.bind(this);
    this.onReload = this.onReload.bind(this);
  }

  componentDidMount() {
    this.loadBook();
  }

  onReload() {
    this.loadBook();
  }

  onPreview() {
    let { image } = this.state.book;
    Taro.previewImage({
      current: image,
      urls: [image]
    });
  }

  async loadBook() {
    try {
      let book;
      if (getCurrentInstance().router.params.id) {
        book = await API.get(`/books/${getCurrentInstance().router.params.id}`);
      } else {
        book = await API.get(`/books/isbn/${getCurrentInstance().router.params.isbn}`);
      }
      this.setState({
        book,
        isFetching: false,
        isError: false
      });
    } catch (e) {
      this.setState({
        isFetching: false,
        isError: true
      });
    }
  }

  render() {
    const { book, isFetching, isError } = this.state;
    return (
      <View>
        {!isFetching && !isError && (
          <Block>
            <View className='at-row at-row__align--start book'>
              <View className='at-col book__info'>
                <View className='book__info-title'>{book.title}</View>
                <View>
                  评分：<Text class='color-warning'>{book.score}</Text>（
                  {book.review_num}条评论）
                </View>
                <View>作者：{book.author}</View>
                <View>出版社：{book.publisher}</View>
                <View>出版日期：{book.pubdate}</View>
                <View>ISBN：{book.isbn}</View>
              </View>
              <Image
                className='at-col at-col--auto book__img'
                src={book.image}
                mode='widthFix'
                onClick={this.onPreview}
              />
            </View>
            <View className='book-introduction'>
              <View className='book-introduction__title'>简介与目录</View>
              <View className='book-introduction__content'>
                {book.introduction}
              </View>
            </View>
            <View className='related-books'>
              <View className='related-books__title'>相关图书</View>
              <View className='related-books__content'>
                <HorizonList data={book.related_books} sideSpace={32} />
              </View>
            </View>
          </Block>
        )}
        {isFetching && (
          <AtActivityIndicator mode='center' content='加载中...' />
        )}
        {isError && <NetworkError onClick={this.onReload} />}
      </View>
    );
  }
}
