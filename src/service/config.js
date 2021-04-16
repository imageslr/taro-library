const devURL = "http://localhost:3000"; // 开发环境，需要开启 mock server（执行：gulp mock）
const prodURL = "TODO"; // 生产环境，线上服务器

const BASE_URL = process.env.NODE_ENV === "development" ? devURL : prodURL;

export default BASE_URL;
