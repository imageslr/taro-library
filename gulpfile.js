// mock相关
// 命令行执行：gulp mock 可以启动mock服务

const path = require("path");
const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const browserSync = require("browser-sync").create();

const server = path.resolve(__dirname, "mock");
// browser-sync配置，配置里启动nodemon任务
gulp.task("browser-sync", ["nodemon"], function() {
  browserSync.init(null, {
    proxy: "http://localhost:8080", // 这里的端口和webpack的端口一致
    port: 8081
  });
});
// browser-sync 监听文件
gulp.task("mock", ["browser-sync"], function() {
  gulp.watch(["./mock/db.js", "./mock/**"], ["bs-delay"]);
});
// 延时刷新
gulp.task("bs-delay", function() {
  setTimeout(function() {
    browserSync.reload();
  }, 1000);
});
// 服务器重启
gulp.task("nodemon", function(cb) {
  // 设个变量来防止重复重启
  var started = false;
  var stream = nodemon({
    script: "./mock/server.js",
    // 监听文件的后缀
    ext: "js",
    env: {
      NODE_ENV: "development"
    },
    // 监听的路径
    watch: [server]
  });
  stream
    .on("start", function() {
      if (!started) {
        cb();
        started = true;
      }
    })
    .on("crash", function() {
      console.error("application has crashed!\n");
      stream.emit("restart", 10);
    });
});
