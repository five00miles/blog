# 手写实现EventEmitter

>包含emit，on，off，once
```javascript
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
```

