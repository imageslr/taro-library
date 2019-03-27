const jsonServer = require("json-server");
const db = require("./db.js");
const routes = require("./routes.js");

const port = 3000;
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter(routes);
server.use(middlewares);
// 将 POST 请求转为 GET
server.use((request, res, next) => {
  request.method = "GET";
  next();
});

// 添加一个750ms的延迟
server.use((request, res, next) => {
  setTimeout(next, 750);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
// server.use(jsonServer.bodyParser);
server.use(rewriter); // 注意：rewriter 的设置一定要在 router 设置之前
server.use(router);
server.listen(port, () => {
  console.log("open mock server at localhost:" + port);
});
