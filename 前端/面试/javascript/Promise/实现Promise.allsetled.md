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

