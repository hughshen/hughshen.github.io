title: CSS背景图片铺满
date: 2015-06-29 22:03:35
categories: HTML
tags:
- css
---

想要把一张图片作为背景图，由于图片太大，总是不能完全显示，只能显示一部分，google之，原来是background-size没设置好，做个记录。具体[参考](http://stackoverflow.com/questions/22887548/css-stretching-background-image-to-100-width-and-height-of-screen)
```
body {
    background: url("bg.jpg") no-repeat;
    background-size: 100% 100%;
}
```
size用来获取背景图片，100%是把整张图片铺满背景

---

2015-09-01
今天工作中又遇到：(
使用css3的方法。
```
body {
  background: url('bg.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
```
主要还是`background-size: cover`这个属性。

** 定义和用法 **
语法
`background-size: length|percentage|cover|contain;`

length（一般是px值）
设置背景图像的高度和宽度。
第一个值设置宽度，第二个值设置高度。
如果只设置一个值，则第二个值会被设置为 "auto"。

percentage（百分比）
以父元素的百分比来设置背景图像的宽度和高度。
第一个值设置宽度，第二个值设置高度。
如果只设置一个值，则第二个值会被设置为 "auto"。

cover
把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
背景图像的某些部分也许无法显示在背景定位区域中。

contain
把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。

这是一个简单的测试页面：[测试](http://www.w3school.com.cn/tiy/c.asp?f=css_background-size)

参考链接
[完美的背景图全屏css代码 – background-size:cover?](http://huilang.me/perfect-full-page-background-image/)
[CSS3 background-size 属性](http://www.w3school.com.cn/cssref/pr_background-size.asp)