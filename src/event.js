class EventEmitter {
    constructor() {
        this._events = Object.create(null); // 定义事件的存储对象
        this._eventsCount = 0;
    }
    //添加事件监听
    on(eventName, fn, isOnce = false) {
        if (typeof fn !== "function") {
            throw new TypeError("The listener must be a function!");
        }
        if (!this._events[eventName]) {
            this._events[eventName] = [];
            this._events[eventName].push({ fn, isOnce });
        } else {
            this._events[eventName].push({ fn, isOnce }); // 存入监听的事件名和事件
        }
    }

    //一次性事件监听
    once(eventName, fn) {
        this.on(eventName, fn, true);
    }

    // 事件触发
    emit(eventName, ...args) {
        if (!this._events[eventName]) {
            return false;
        }
        const len = this._events[eventName].length;
        for (let i = 0; i < len; i++) {
            let event = this._events[eventName][i];
            event.fn.call(this, ...args);
            if (event.isOnce) {
                this.removeListener(eventName, event.fn);
                i--;
            }
        }
    }
    // 移除监听事件
    removeListener(eventName, fn) {
        if (!this._events[eventName]) return this;
        if (!fn) {
            delete this._events[eventName];
            return this;
        } else {
            this._events[eventName].forEach((item, index) => {
                if (item.fn === fn) {
                    this._events[eventName].splice(index, 1);
                } else {
                    return this;
                }
            });
        }
    }
    // off:removeListener 的别名
    off(eventName, fn) {
        this.removeListener(eventName, fn);
    }
    // 移除所有监听事件
    removeAllListener(eventName) {
        if (eventName) {
            if (this._events[eventName]) {
                this._events[eventName].length = 0;
            }
        } else {
            this._events = Object.create(null);
        }
    }
}

// let eventHandle = new EventEmitter();

// eventHandle.on('changeMsg', function(e,e2) {
//     console.log('changeMsg',e,e2)
// })
// eventHandle.on('changeMsg', function(e,e2) {
//     console.log('changeMsg2',e,e2)
// })

// setInterval(function() {
//     eventHandle.emit('changeMsg','a','b')
// }, 1000)

// setTimeout(function(){
//     eventHandle.removeListener('changeMsg')
// },2200)


// function MyEventEmitter() {
//     this._events = Object.create(null);
// }

// MyEventEmitter.prototype.on = function(eventName, fn, isOnce = false) {
//     if (!this._events[eventName]) {
//         this._events[eventName] = []
//     }
//     this._events[eventName].push({ fn, isOnce })
// }
// MyEventEmitter.prototype.once = function(eventName, fn, isOnce = false) {
//     this.
// }

// MyEventEmitter.prototype.emit = function(eventName, ...args) {
//     if (!this._events[eventName] || this._events[eventName].length === 0) return this

//     for (let i = 0; i < this._events[eventName].length; i++) {
//         let { fn, isOnce } = this._events[eventName][i]
//         fn.call(this, ...args)
//         if (isOnce) {
//             this._events[eventName].splice(i, 1)
//             i--
//         }
//     }
// }

// MyEventEmitter.prototype.removeListener = function(eventName) {
//     if (!this._events[eventName]) return this

//     delete this._events[eventName]
// }
// MyEventEmitter.prototype.removeAllListener = function() {
//     if (!(this._events.length > 0)) return this

//     this._events = []
// }


// let myEventEmitter = new MyEventEmitter()
// myEventEmitter.on('changeMsg', function(a, b) {
//     console.log('changeMsg', a, b)
// })


// setInterval(function() {
//     myEventEmitter.emit('changeMsg', 'a', 'b')
// }, 1000)

// setTimeout(function() {
//     myEventEmitter.removeListener('changeMsg')
// }, 3000)

let arr = []
arr.push(function() {
    console.log(1)
})
arr.push(function() {
    console.log(1)
})
console.log(arr[0]===arr[1])
