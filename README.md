# IME

### install

```shell
npm i -g ime
```

### 新建项目

```shell
# 在当前目录创建<project>目录，并初始化项目
i new <project>
```

### 开启本地开发服务

```shell
# 开启前端 + Node服务
i start

# 开启前端服务
i start client

# 开启Node服务
i start server
```

### 编译前端文件

```shell
# 编译前端静态文件
i build

# 编译dll文件
i build dll
```

### 环境变量设置

```shell
# 可通过 --env 设置 process.env.NODE_ENV 的值：development/production
i start --env development

# 可使用缩写 -e (d)evelopment (p)roduction
i build -e p
```