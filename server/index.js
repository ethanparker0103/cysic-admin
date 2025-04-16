const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { jsonDb } = require('./utils');

const app = express();
const PORT = 3001;

// 启用更详细的日志记录
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 确保中间件配置正确
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 添加基本的健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 在此之前添加错误处理
try {
  // 注册路由
  routes(app);
  
  // 处理未匹配的路由
  app.use('*', (req, res) => {
    console.warn(`未找到路由: ${req.originalUrl}`);
    res.status(404).json({
      msg: "API not found",
      code: 404
    });
  });
} catch (error) {
  console.error('路由设置错误:', error);
}

// 全局错误处理中间件
app.use((err, req, res) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    msg: "Internal Server Error",
    code: 500
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`模拟API服务已启动: http://localhost:${PORT}`);
  jsonDb.init();
});