```javascript
Promise.prototype.all = function(promises) {
  let results = [];
  let promiseCount = 0;
  let promisesLength = promises.length;
  return new Promise(function(resolve, reject) {
    for (let val of promises) {
      Promise.resolve(val).then(function(res) {
        promiseCount++;
        // results.push(res);
        results[i] = res;
        // 当所有函数都正确执行了，resolve输出所有返回结果。
        if (promiseCount === promisesLength) {
          return resolve(results);
        }
      }, function(err) {
        return reject(err);
      });
    }
  });
};

// 第二种
/** 仅考虑 promises 传入的是数组的情况时 */
Promise.all = function (promise) {
	let promises = Array.from(promise)//将iterator转换为数组
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {//如果数组长度为0则返回空数组
            resolve([]);
        } else {
            let result = [];//存放已成功的异步操作
            let index = 0;//记录已成功的操作数
            for (let i = 0;  i < promises.length; i++ ) {
                Promise.resolve(promises[i])//执行每一个promise
                	.then(data => {
                    	result[i] = data;
                    	if (++index === promises.length) {
                        //所有的 promises 状态都是 fulfilled，promise.all返回的实例才变成 fulfilled 态
                       	 resolve(result);
                    }
                }, err => {
                    reject(err);
                    return;
                });
            }
        }
    });
}
```

