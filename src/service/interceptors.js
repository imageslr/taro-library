import Taro from "@tarojs/taro";
import { HTTP_STATUS } from "../constants/status";
import { getCurrentPageUrl } from "../utils/common";

function showError(message, show = true) {
  show &&
    Taro.showToast({
      title: message || "请求异常",
      icon: "none"
    });
  return Promise.reject(message);
}

const customInterceptor = function(chain) {
  const requestParams = chain.requestParams;
  const { showToast } = requestParams;
  return chain
    .proceed(requestParams)
    .catch(res => {
      // 这个catch需要放到前面才能捕获request本身的错误，因为showError返回的也是Promise.reject
      return showError(res.errMsg, showToast);
    })
    .then(res => {
      // 只要请求成功，不管返回什么状态码，都走这个回调
      if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
        return showError("请求资源不存在", showToast);
      } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
        return showError("服务端出现了问题", showToast);
      } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
        Taro.setStorageSync("Authorization", "");
        let path = getCurrentPageUrl();
        if (path !== "pages/login/login") {
          Taro.navigateTo({
            url: "/pages/login/login"
          });
        } // TODO 根据自身业务修改
        return showError("没有权限访问", showToast);
      } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
        Taro.setStorageSync("Authorization", "");
        let path = getCurrentPageUrl();
        if (path !== "pages/login/login") {
          Taro.navigateTo({
            url: "/pages/login/login"
          });
        }
        return showError("需要鉴权", showToast);
      } else if (res.statusCode >= 400) {
        let errorMsg = res.data && res.data.message;
        return showError(errorMsg, showToast);
      } else {
        return res.data;
      }
    });
};

const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
