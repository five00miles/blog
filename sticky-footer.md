# 一 flex布局
```html
<div class="container">
  <div class="content">
  </div>
  <div class="footer"></div>
</div>
```
```css
.container {
  display: flex;
  flex-flow: column;
  min-height: 100%;
}

.content {
  flex: 1;
}
```