###### 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

```javascript
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  s = [...s]
  // if (s[0] == 0) return []
  let list = [], lists = []

  run(s, 4)
  function checkNum(number) {
      return ((number <= 255 && (parseInt(number)+'').length == number.length))
  }
  function run(s, level) {
      if (level == 1) {
          const target = s.join('')
          if (checkNum(target)) {
              list.push(target)
              lists.push([].concat(list).join('.'))
              list.pop()
          }
          return
      }

      const lvl = level - 1
      let number = 1
      while (s.length >= number && number <= 3) {
          const target = [].concat(s).splice(0, number).join('')
          if (checkNum(target)) {
              list.push(target)
              run([].concat(s).slice(number), lvl)
              list.pop()
          }
          number++
      }
  }

  return lists
};
```

