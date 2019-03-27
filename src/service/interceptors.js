import Taro from "@tarojs/taro";
import { HTTP_STATUS } from "../constants/status";
import { getCurrentPageUrl } from "../utils/common";

const customInterceptor = function(chain) {
  const requestParams = chain.requestParams;
  return chain.proceed(requestParams).then(res => {
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在");
    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现了问题");
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      Taro.setStorageSync("Authorization", "");
      let path = getCurrentPageUrl();
      if (path !== "pages/login/login") {
        Taro.navigateTo({
          url: "/pages/login/login"
        });
      } // TODO 根据自身业务修改
      return Promise.reject("没有权限访问");
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      Taro.setStorageSync("Authorization", "");
      let path = getCurrentPageUrl();
      if (path !== "pages/login/login") {
        Taro.navigateTo({
          url: "/pages/login/login"
        });
      }
      return Promise.reject("需要鉴权");
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res.data;
    }
  });
};

const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
