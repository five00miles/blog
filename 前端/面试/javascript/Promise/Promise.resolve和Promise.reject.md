```javascript
// Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)      // 出错了
});

Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

