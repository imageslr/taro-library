const devURL = "http://localhost:3000"; // 开发环境，需要开启 mock server（执行：gulp mock）
const prodURL = "http://mock.51y.cc:81/mock/6087977be290eb06c92f1ae9"; // 生产环境，线上服务器

const BASE_URL = process.env.NODE_ENV === "development" ? devURL : prodURL;

export default BASE_URL;
