import Promise from "./promise.js"

let p1 = function() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(3)
    }, 1000)
  })
}

Promise.prototype.catch = function(reject) {
  return this.then(null, reject)
}
Promise.resolve = value => new Promise(resolve => resolve(value))

Promise.resolve(function() {
  console.log('a')
}).then(val => console.log(val))
