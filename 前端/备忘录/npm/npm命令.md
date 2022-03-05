###### 安装依赖失败

```
npm install --ignore-script
```

###### npm ci

npm ci在以下情况下会明显更快

- 有一个package-lock.json或npm-shrinkwrap.json文件
- node_modules文件夹丢失或为空

