```js
var o = Object.create(Object.prototype,{
    a:{
        writable:true,
        configurable:true,
        value:'1'
    }
})
// 上下两者相等
var o = {a:1}
```

使用`Object.create(null)`的好处：

- 我们可以把它当作一个非常纯净的map来使用，我们可以自己定义hasOwnProperty、toString方法，不管是有意还是不小心，我们完全不必担心会将原型链上的同名方法覆盖掉

- 在我们使用for..in循环的时候会遍历对象原型链上的属性，使用create(null)就不必再对属性进行检查了，当然，我们也可以直接使用Object.keys[]


总结，何时使用Object.create(null)：

- 你需要一个非常干净且高度可定制的对象当作数据字典的时候；

- 想节省hasOwnProperty带来的一丢丢性能损失并且可以偷懒少些一点代码的时候，用Object.create(null)吧！
  其他时候，请用{}。

