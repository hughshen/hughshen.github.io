title: nanoScroller初次使用
date: 2015-07-21 21:53:27
categories: HTML
tags:
- javascript
---

nanoScroller.js 是一个jQuery plugin，提供了类似Mac OS X Lion-styled的滚动条样式。
这个是基于jQuery的，很容易就能使用。

<!--more-->

1.需要满足一定的html结构。
内容：.nano > .nano-content；
滚动条：.pane > .nano-slider。
2.引入相关文件。
jquery.min.js，
jquery.nanoscroller.js，
nanoscroller.css。
3.定义css样式。
.nano { background: #bba; width: 500px; height: 500px; }
.nano > .nano-content { padding: 10px; }
.nano > .nano-pane   { background: #888; }
.nano > .nano-pane > .nano-slider { background: #111; }
4.javascript加载
$(".nano").nanoScroller();
5.自定义滚动，例如添加滚动事件等等。

下面是一个简单的例子
```
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title>Test</title>
	<link rel="stylesheet" href="https://rawgithub.com/jamesflorentino/nanoScrollerJS/master/bin/css/nanoscroller.css">
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="https://rawgithub.com/jamesflorentino/nanoScrollerJS/master/bin/javascripts/jquery.nanoscroller.js"></script>
	<style type="text/css">
		.nano {background: #bba; width: 250px; height: 200px; margin: 0 auto;}
		.nano .nano-content {padding: 10px;}
		.nano .nano-pane {background: #606060 !important;}
		.nano .nano-slider {background: #fbfcfc !important;}
	</style>
	<script type="text/javascript" charset="utf-8">
		$(function () {
			$('.nano').nanoScroller({
				alwaysVisible: true,
				//不知道为什么在ie下显示样式有问题，添加下面这个选项就好了
				preventPageScrolling: true
			});
		});
	</script>
</head>
<body>
	<div class="nano">
		<div class="nano-content">
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
			<p>This is nanoScroller test</p>
		</div>
		<div class="nano-pane">
			<div class="nano-slider"></div>
		</div>
	</div>
</body>
</html>
```

参考链接
[nanoScrollerJS](http://jamesflorentino.github.io/nanoScrollerJS/)
[github项目地址](https://github.com/jamesflorentino/nanoScrollerJS)
[jQuery滚动条插件nanoscroller使用指南，jquerynanoscroller](http://www.bkjia.com/Javascript/987920.html)

---

中途出现文件加载问题：('text/plain') is not executable。
原因是调用github上的文件需要修改地址。
就是把raw.githubusercontent.com替换为rawgithub.com。