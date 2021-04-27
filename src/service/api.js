import Taro from "@tarojs/taro";
import BASE_URL from "./config";
import { HTTP_STATUS } from "../constants/status";

Taro.cloud.init({
  env: "cloud1-3gwrbav587e2484d"
})

export default {
  baseOptions(params, method = "GET") {
    let { url, data } = params;
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      path: BASE_URL + url,
      data: data,
      method: method,
      header: {
        "content-type": contentType
        // Authorization: Taro.getStorageSync("Authorization")
      }
    };

    console.log("请求参数：", option)

    let res = Taro.cloud.callContainer(option)

    // callContainer 不支持中间件，这里直接把 interceptors 的逻辑粘贴过来
    const { showToast } = params;
    function showError(message, show = true) {
      show &&
        Taro.showToast({
          title: message || "请求异常",
          icon: "none"
        });
      return Promise.reject(message);
    }
    return res
      .catch(res => {
        // 这个catch需要放到前面才能捕获request本身的错误，因为showError返回的也是Promise.reject
        return showError(res.errMsg, showToast);
      })
      .then(res => {
        console.log("请求结果：", res)
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
  },
  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  },
  post: function(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  },
  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  },
  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }
};
