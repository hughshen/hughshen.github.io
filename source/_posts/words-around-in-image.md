title: CSS文字环绕图片
date: 2015-07-12 20:37:47
categories: HTML
tags:
- css
---

项目要做一个简单的html页面，但是页面中有一部分是文字环绕图片的，图片在右下角，是不规则图片。问公司的前端大神都说不难，但是对我来说很难啊，查找了一些资料还是不得要领，只能草草把效果做出来了，但是并不能根据文字自动进行排版，也就是说文字增加或减少的话， 那页面也要作修改！！

<!--more-->

实现原理就是在页面中增加一些div来对p标签进行换行，图片放在底层。

```
<html>
<head>
<style>
/* main-content */
div {border: 1px solid red;}
.content-area {padding: 0 45px; position: relative; width: 900px; max-width: 900px; margin: 0 auto;}
.content-area .bgimg {position: absolute; bottom: 0; right: 0; z-index: 0; width: 300px; height: 400px; background: #0f0; z-index: -10;}
.content-area > p {position: relative; line-height: 34px; text-indent: 1cm; padding-top: 40px;}
.content-area > p:last-child {padding-bottom: 100px;}
</style>
</head>
<body>
<div class="content-area">
	
	<!--这是图片，可以是不规则的-->
	<!--绿色背景-->
	<div class="bgimg" ></div>

	<!--第一个div很重要，把width设为0，不然右边会有一段空白-->
	<!--后面的div用来使文字换行-->
	<div style="float: right; height: 445px; width: 0; clear: right;"></div>
	<div style="float: right;height:96px;width:135px; clear: right;"></div>
	<div style="float: right;height:52px;width: 109px; clear: right;"></div>
	<div style="float: right;height:34px;width: 159px; clear: right;"></div>
	<div style="float: right;height:30px;width: 220px; clear: right;"></div>
	<div style="float: right;height:30px;width: 277px; clear: right;"></div>

	<p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
	<p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
	<p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
	<p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>

</div>
</body>
</html>
```

做得好粗糙：(
