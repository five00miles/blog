function throttle(func, wait) {
  let previous = 0;
  return function() {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}
// function throttle(func, wait) {
//   let timeout;
//   return function() {
//       let context = this;
//       let args = arguments;
//       if (!timeout) {
//           timeout = setTimeout(() => {
//               timeout = null;
//               func.apply(context, args)
//           }, wait)
//       }

//   }
// }


function throttle1(func, wait, immediate = false) {
  let timer = null;
  let first = Date.now();
  return function() {
    let context = this;
    let args = arguments;
    let now = Date.now();
    
    if (immediate) {
      func.apply(context, args)
      immediate = false;
    }

    if ((now - first) >= wait && !timer) {
      timer = setTimeout(function() {
        func.apply(context, args)
        clearTimeout(timer);
        timer = null
      }, wait)
    }
  }
}

let myFun = function(timer, num) {
  console.log('执行', timer, num)
}

document.addEventListener('DOMContentLoaded', main())

function main() {
  document.getElementById('app').addEventListener('mousemove', throttle1(myFun, 1000, true))
}
