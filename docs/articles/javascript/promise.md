# Promise.all

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

# 实现Promise.allsetled

```javascript
function PromiseAllSettled(promiseArr) {
	return new Promise((resolve, reject) => {
		if(!Array.isArray(promiseArr)) {
			reject(new TypeError("arguments must be an array"))
		}
		
		const promiseLen = promiseArr.length;
		const res = [];
		let count = 0;
		for(let i=0; i<promiseLen; i++) {
			Promise.resolve(promiseArr[i])
			.then((value) => {
				res[i] = {
					status: 'fulfilled',
					value
				}
			})
			.catch((reason) => {
				res[i] = {
					status: 'rejected',
					reason
				}
			})
			.finally(() => {
				count++;
				if(count == promiseLen) {
					resolve(res)
				}
			})
		}
	})
}


function allSettled(promises){
//只需要把rejected的情况捕获一下，并返回一个正常值，状态就会进入到fulFilled
      return Promise.all(promises.map(item=>Promise.resolve(item)
      .then(res=>({status:'fulfilled',value:res}),
             err=>({status:'rejected',reason:err}))
      ))
}



function allSettled(promises){
    return new Promise((resolve)=>{
        promises = Array.isArray(promises)?promises:[]
        let count = promises.length
        let result = []
        for(let i = 0;i < promises.length; i++){
            Promise.resolve(promises[i]).then(res=>result[i]={status:'fulfilled',value:res},
            err=>result[i] = {status:'rejected',reason:err})
            .finally(()=>{
                if(--count<=0){
                    resolve(result)
                }
            })
        }
    })
}
```

# 实现Promise.race

```javascript
var race = function(promise) {
  let promises = Array.from(promise)
  return new Promise(function(resolve, reject) {
      for (var i = 0; i < promises.length; i++) {
          Promise.resolve(promises[i]).then(data => {
      resolve(data);
            }, err => {
              return reject(err)
      })
    }
  })
}
```

# 实现Promise.retry

```javascript
/**
 * @description: 加入失败后使用失败重试功能，如果5次中有任意一次成功了，就停止尝试并返回
 * @param  {*}
 * @return {*}
 * @param {*} fn 绑定函数
 * @param {*} times 请求次数
 * @param {*} delay 延迟时间
 */
Promise.retry = function(fn,times,delay){
    let tryTimes = 0
    return new Promise((resolve,reject)=>{
        function attempt(){
            console.log(tryTimes)
            Promise.resolve(fn()).then(res=>{
                return resolve(res)
            }).catch(err=>{
                if(++tryTimes<times){
                    setTimeout(attempt,delay)
                }else{
                    return reject(err)
                }
            })
        }
        attempt()
    })
}
```

# 实现Promise/A+规范

>通过 npm install promises-aplus-tests ，可以下载测试套件。

```js
const isFunction = obj => typeof obj === 'function'
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj
const isPromise = promise => promise instanceof Promise

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(f) {
  this.result = null
  this.state = PENDING
  this.callbacks = []

  let onFulfilled = value => transition(this, FULFILLED, value)
  let onRejected = reason => transition(this, REJECTED, reason)

  let ignore = false
  let resolve = value => {
    if (ignore) return
    ignore = true
    resolvePromise(this, value, onFulfilled, onRejected)
  }
  let reject = reason => {
    if (ignore) return
    ignore = true
    onRejected(reason)
  }

  try {
    f(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    let callback = { onFulfilled, onRejected, resolve, reject }

    if (this.state === PENDING) {
      this.callbacks.push(callback)
    } else {
      setTimeout(() => handleCallback(callback, this.state, this.result), 0)
    }
  })
}

const handleCallback = (callback, state, result) => {
  let { onFulfilled, onRejected, resolve, reject } = callback
  try {
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
    } else if (state === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
    }
  } catch (error) {
    reject(error)
  }
}

const handleCallbacks = (callbacks, state, result) => {
  while (callbacks.length) handleCallback(callbacks.shift(), state, result)
}

const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return
  promise.state = state
  promise.result = result
  setTimeout(() => handleCallbacks(promise.callbacks, state, result), 0)
}

const resolvePromise = (promise, result, resolve, reject) => {
  if (result === promise) {
    let reason = new TypeError('Can not fufill promise with itself')
    return reject(reason)
  }

  if (isPromise(result)) {
    return result.then(resolve, reject)
  }

  if (isThenable(result)) {
    try {
      let then = result.then
      if (isFunction(then)) {
        return new Promise(then.bind(result)).then(resolve, reject)
      }
    } catch (error) {
      return reject(error)
    }
  }

  resolve(result)
}

module.exports = Promise
```





参考文章：[100 行代码实现 Promises/A+ 规范](https://mp.weixin.qq.com/s/qdJ0Xd8zTgtetFdlJL3P1g)
参考文章：[Promises/A+](https://promisesaplus.com/)

# Promise.resolve和Promise.reject

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

