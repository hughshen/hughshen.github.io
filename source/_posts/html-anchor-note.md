title: HTML跳转到有锚点的网页后自动调整位置
date: 2015-08-13 21:41:27
categories: HTML
tags:
- javascript
---

今天任务中有这样一个小的需求，假如有a、b两个页面，b有锚点，从a上点击链接到b（链接为b页面内容的某个锚点）后，由于b页面有一个保持固定位置的头部，所以在显示锚点内容会出现不完整或者被头部挡住了。

<!--more-->

也没想到什么好的办法，最后是用javascript里面的setTimeout函数来实现，就是在跳转到b页面后，经过一个比较短的时间来自动进行对页面位置进行调整。

a.html
```
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title>A</title>
	<style type="text/css">
		a {color: #00f; font-size: 36px; display: block; text-align: center;}
	</style>
</head>
<body>
	<a href="b.html#anchor2" target="_blank">link to anchor2</a>
	<a href="b.html#anchor3" target="_blank">link to anchor3</a>
	<a href="b.html#anchor4" target="_blank">link to anchor4</a>
</body>
</html>
```

b.html
```
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title>B</title>
	<style type="text/css">
		.header {max-width: 700px; min-height: 150px; max-height: 150px; background-color: #dd6; position: fixed; top: 0; left: 300px;}
		.header li {list-style: none; float: left; line-height: 150px; margin: 0 50px;}
		.testdiv {min-height: 400px; max-height: 400px; margin-bottom: 20px; background-color: #e71; text-align: center; line-height: 400px; font-size: 36px; font-weight: bold;}
	</style>
	<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" charset="utf-8">
		$(document).ready(function () {
			$('a[href*="#"]').on('click', function (e) {
				// e.preventDefault();

				var target = this.hash;
				var $target = $(target);
				// 这个是头部挡住锚点部分的高度
				var headerHeight = 150;

				$('html, body').stop().animate({
					'scrollTop': $target.offset().top - headerHeight
				}, 900, 'swing', function () {
					window.location.hash = target;
				});
			});

			// 当从其他链接过来之后再重新执行滚动，保证锚点位置正确
			if (window.location.hash) {
				setTimeout(function () {
					var target = window.location.hash;
					var $target = $(target);
					var headerHeight = 150;

					$('html, body').stop().animate({
						'scrollTop': $target.offset().top - headerHeight
					}, 900, 'swing', function () {
						window.location.hash = target;
					});
				}, 100);
			}
		});
	</script>
</head>
<body>
	<div class="header">
		<ul>
			<li><a href="#anchor1">anchor1</a></li>
			<li><a href="#anchor2">anchor2</a></li>
			<li><a href="#anchor3">anchor3</a></li>
			<li><a href="#anchor4">anchor4</a></li>
		</ul>
	</div>
	<div class="testdiv" id="anchor1">anchor1</div>
	<div class="testdiv" id="anchor2">anchor2</div>
	<div class="testdiv" id="anchor3">anchor3</div>
	<div class="testdiv" id="anchor4">anchor4</div>
	<div class="testdiv">blank</div>
	<div class="testdiv">blank</div>
</body>
</html>
```

这个方法比较笨：)