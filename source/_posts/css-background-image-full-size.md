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