<template>
  <div id="app">
    <div id="page" @mousemove="handleMousemove"></div>
  </div>
</template>

<script>

function debounce(func, wait) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(function() {
      func.apply(context, args)
    }, wait);
  }
}

export default {
  name: 'App',
  methods: {
    handleMousemove: debounce(function() {
      console.log('执行')
    }, 1000)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#page {
  width: 400px;
  height: 400px;
  border: 1px solid #2c3e50;
}
</style>
