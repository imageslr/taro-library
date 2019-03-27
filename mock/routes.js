var db = require("./db.js");

// 添加自定义路由
let routes = {
  "/books?isbn=:isbn": "/books/1" // 参数中有isbn时，重定向到id为1的图书
};

// 修改 db.js 中 "root-sub" 形式的路由为 "/root/sub"
Object.keys(db).map(key => {
  let newKey = "/" + key.replace("-", "/");
  key = "/" + key;
  routes[newKey] = key; // '/a-b' => '/a/b'
  routes[newKey + "/:id"] = key + "/:id"; // '/a-b/:id' => '/a/b/:id'
});

module.exports = routes;
