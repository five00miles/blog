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

