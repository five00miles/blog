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

console.log(restoreIpAddresses('25525511135'))