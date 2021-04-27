import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { Component } from 'react'
import { connect } from 'react-redux'
import Copyright from "../../components/copyright";
import { add, minus, asyncAdd } from "../../store/counter/action";

import "./index.scss";

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    }
  })
)
class Index extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>
          +
        </Button>
        <Button className='dec_btn' onClick={this.props.dec}>
          -
        </Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>
          async
        </Button>
        <View>
          <Text>{this.props.counter.num}</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
        </View>
        <Copyright />
      </View>
    );
  }
}

export default Index;
