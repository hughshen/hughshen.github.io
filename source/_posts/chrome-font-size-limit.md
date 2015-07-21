title: Chrome下font-size<12px无效
date: 2015-07-21 21:22:09
categories: HTML
tags:
- css
---

今天又遇到在chrome下font-size的问题，做个记录。
实现方法是使用css3的属性transform:scale()来对字体进行缩放，注意是对整个元素缩放。

<!--more-->

下面是一个简单的例子
```
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title>Test</title>
	<style type="text/css">
		div {border: 1px solid red; margin-bottom: 10px;}
		div span {display: inline-block;}
		div span.f10 {-webkit-transform: scale(0.8);}
	</style>
</head>
<body>
	<div style="font-size: 14px;"><span>Content 14px</span></div>
	<div style="font-size: 13px;"><span>Content 13px</span></div>
	<div style="font-size: 12px;"><span>Content 12px</span></div>
	<div style="font-size: 10px;"><span class="f10">Content 10px</span></div>
</body>
</html>
```

注意因为scale是对有尺寸的元素进行缩放，所以需要把span设置成display:inline-block，其他的内联元素也是一样的处理，而块级元素就不用了，例如p标签。

参考链接
[解决Chrome谷歌浏览器不支持CSS设置小于12px的文字](http://www.w3ci.com/front/xHTMLCSS/34.html)

---

插个记录

根据字体自定义自己的font-family
```
@font-face {
  font-family: test;
  src: url(your-font-file.ttf);
	font-family： bold;
}
```
调用时直接：font-family: test;就行。

具体请看
[CSS3 @font-face Rule](http://www.w3schools.com/cssref/css3_pr_font-face_rule.asp)