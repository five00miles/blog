# 不常见的用法

## 逗号运算符

逗号运算符包含多个表达式，其中只有一个表达式是预期的。它从左到右计算每个操作数，并返回最后一个操作数的值。然而，这经常掩盖副作用，其使用往往是偶然的。以下是一些序列示例：

```javascript
var a = (3, 5); // a = 5

a = b += 5, a + b;

while (a = next(), a && a.length);

(0, eval)("doSomething();");
```



## 在条件语句中使用赋值运算符

不允许在条件语句中使用赋值运算符，很难判断特定任务是否是故意的。

```javascript
// Check the user's job title
if (user.jobTitle = "manager") {
    // user.jobTitle is now incorrect
}
```

# parseInt

```javascript
['1','2','3'].map(parseInt) // [1, NaN, NaN]
```

# 创建空对象

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


# 实现枚举

```javascript
let days

(function(days){
    days[days['a']=0]='a'
    days[days['b']=2]='b'
    days[days['c']=2]='c'
})(days || (days = {}))

export EnumDays = Object.freeze(days)
```

# Number.isNaN和isNaN的区别

```javascript
Number.isNaN(NaN) // true
isNaN(NaN) // true
Number.isNaN('NaN') // false
isNaN('NaN') // true
Number.isNaN(undefined) // false
isNaN(undefined) // true
Number.isNaN('undefined') // false
isNaN('undefined') // true
```

# 标题

这是我昨天在阅读 Airbnb 的 [Javascript 风格指南](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fairbnb%2Fjavascript)的时候，阅读到其中有一条：

> Do not call Object.prototype methods directly, such as hasOwnProperty, propertyIsEnumerable, and isPrototypeOf.
>
> ```javascript
>   // bad
>   console.log(object.hasOwnProperty(key));
>   // good
>   console.log(Object.prototype.hasOwnProperty.call(object, key));
>   // best
>   const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
>   /* or */
>   import has from 'has'; // https://www.npmjs.com/package/has
>   // ...
>   console.log(has.call(object, key));
> ```

当时在想为什么呢，第一时间想到的就是：

这个实例有可能重写了 hasOwnProperty 等方法，当然这也是最主要的原因了。

然后还提到说：

如果使用 Object.create(null) 创建的对象是没有prototype的，所以是没有任何方法的，这种情况下，调用上述方法只会得到 `undefined`。

这显然不是想要的结果，所以，使用 Object.prototype.hasOwnProperty.call(myObj, prop)，可以确保调用到正确的方法，并且得到?正确的结果。