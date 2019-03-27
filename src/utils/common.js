import Taro from "@tarojs/taro";

export const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

export const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

export const logError = (name, action, info) => {
  if (!info) {
    info = "empty";
  }
  try {
    let deviceInfo = Taro.getSystemInfoSync();
    var device = JSON.stringify(deviceInfo);
  } catch (e) {
    console.error("not support getSystemInfoSync api", e.message);
  }
  let time = formatTime(new Date());
  console.error(time, name, action, info, device);
  // if (typeof action !== 'object') {
  // fundebug.notify(name, action, info)
  // }
  // fundebug.notifyError(info, { name, action, device, time })
  if (typeof info === "object") {
    info = JSON.stringify(info);
  }
};

/*获取当前页url*/
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url;
};
