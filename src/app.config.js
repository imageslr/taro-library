export default {
  pages: [
    "pages/home/index",
    "pages/book-list/index",
    "pages/search/index",
    "pages/book-detail/index",
    "pages/index/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    backgroundColor: "#FAFBFC"
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "./assets/tab_home.png",
        selectedIconPath: "./assets/tab_home_f.png"
      },
      {
        pagePath: "pages/index/index",
        text: "测试",
        iconPath: "./assets/tab_me.png",
        selectedIconPath: "./assets/tab_me_f.png"
      }
    ],
    color: "#a6a6a6",
    selectedColor: "#78a4fa",
    backgroundColor: "#ffffff",
    borderStyle: "black"
  }
}
