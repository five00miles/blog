# npm命令

## 安装依赖失败，用以下命令
```shell
npm install --ignore-script # 阻止包现场编译
```

## npm ci
npm ci在以下情况下会明显更快
- 有一个package-lock.json或npm-shrinkwrap.json文件
- node_modules文件夹丢失或为空

## window环境下的工程包
```shell
sudo npm install --global --production windows-build-tools
```

