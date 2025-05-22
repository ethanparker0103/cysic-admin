# Stage 1: Build the application
FROM node:18 as builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock 文件
COPY package.json yarn.lock ./
COPY patches ./patches/

# 安装依赖
RUN npm install --force

# 复制所有项目文件到容器
COPY . .

# 构建项目
RUN yarn build:qa

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# 复制构建的 dist 目录到 /app
COPY --from=builder /app/dist /app

# 复制自定义 nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 8080

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]