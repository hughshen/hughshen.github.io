title: 使用CSS固定footer在底部
date: 2015-06-25 22:07:17
categories: HTML
tags:
- css
---

固定底部分两种情况。
第一种是页面内容未填充满，footer需要固定在底部;
第二种是页面填充满后，footer需要随着页面内容的增加二填充在主体内容的下方。
在网站搜索，找到一篇文章，适合学习，感谢作者，具体看[这里](http://blog.sina.com.cn/s/blog_7f95e24b01016vc7.html)

<!--more-->
第一种方法
```
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title>A</title>
	<style type="text/css">
		html, body {height: 100%; margin: 0; padding: 0;}
		.main {height: auto !important; height:100%; min-height: 100%; position: relative;}
		.contain {background: #909; margin: 0 auto; padding-bottom: 80px; width: 500px;}
		.header {width: 100%; background: #3ff; height: 100px;}
		.footer {height: 80px; position: absolute; bottom: 0px; background: #0ff; width: 100%; clear: both;}
	</style>
</head>
<body>
	<div class="main">
		<div class="header">Header</div>
		<div class="contain">Content</div>
		<div class="footer">Footer</div>
	</div>
</body>
</html>
```
实现原理：
1、html和body标签都要设置margin和padding都为0；同时他们的高度也必须设置为100%，这样就可以在容器上设置百分比了
2、main容器必须设置一个最小高度为100%，这主要使他在内容少的时候也能保持100%的高度，不过IE6不支持MIN-HEIGHT,所以同时也设置height:100%还有一个就是关于IE6下的bug，所以添加了height:auto !important;此外我们还需要设置它的相对定位，以便于你们进行绝对定位后该容器不会跑了
3、contian他必须设置padding_bottom,其大小就是footer的高度
4、就是footer，它的高度就是 上面contain的padding-bottom.然后将其设为绝对定位，同时bottom为0，这样它就就页底了

优点：
结构简单清晰，无需js和任何hack能实现各浏览器下的兼容，并且也适应iphone。

缺点：
不足之处就是需要给div#footer容器设置一个固定高度，这个高度可以根据你的需求进行设置，其单位可以是px也可以是em，而且还需要将div#contain容器的padding-bottom（或border-bottom-width）设置大小等于（或略大于）div#footer的高度，才能正常运行。

---
第二种方法
```
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title>A</title>
	<style type="text/css">
		html, body {margin: 0; padding: 0; height: 100%;}
		.main {min-height: 100%; height: auto !important; height: 100%; margin: 0 auto;}
		.contain {margin-bottom: 200px; background: #30f;}
		.header {height: 100px; background: #f0f; width: 100%;}
		.footer {position: absolute; bottom: 0; height: 200px; background: #06f; width: 100%;}
	</style>
</head>
<body>
	<div class="main">
		<div class="header">Header</div>
		<div class="contain">Content</div>
	</div>
	<div class="footer">Footer</div>
</body>
</html>
```
原理：
与方法一不同的是方法二和方法三都将FOOTER层放置在大层的外面，与最外面的层同级
1、html和body标签都要设置margin和padding都为0；同时他们的高度也必须设置为100%，这样就可以在容器上设置百分比了
2、main容器必须设置一个最小高度为100%，这主要使他在内容少的时候也能保持100%的高度，不过IE6不支持MIN-HEIGHT,所以同时也设置height:100%还有一个就是关于IE6下的bug，所以添加了height:auto !important;
3、contian他必须设置margin_bottom,其大小就是footer的高度
4、就是footer，它的高度就是 上面contain的margin-bottom.然后将其设为绝对定位，同时bottom为0，这样它就就页底了

优点：
结构简单清晰，无需js和任何hack能实现各浏览器下的兼容。

缺点：
要给footer设置固定值，因此无法让footer部分自适应高度。

---
第三种方法
```
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title>A</title>
	<style type="text/css">
		html, body {margin: 0; padding: 0; height: 100%;}
		.main {min-height: 100%; height: auto !important; height: 100%; margin: 0 auto -60px;}
		.contain {background: #0f3; width: 100%;}
		.header {width: 100%; background: #f03; height: 100px;}
		.push, .footer {height: 60px; background: #96f; clear: both;}
		.push {display: none;}
	</style>
</head>
<body>
	<div class="main">
		<div class="header">Header</div>
		<div class="contain">Content</div>
		<div class="push">Push</div>
	</div>
	<div class="footer">Footer</div>
</body>
</html>
```
原理： 方法三与方法二都是把footer放置在外面与Mian层同级，在这里方法三在main里面添加了一个空层，push，它必须放置在main里面的最后一层，而且必须为空层，持方法简单
1、html和body标签都要设置margin和padding都为0；同时他们的高度也必须设置为100%，这样就可以在容器上设置百分比了
2、main容器必须设置一个最小高度为100%，这主要使他在内容少的时候也能保持100%的高度，不过IE6不支持MIN-HEIGHT,所以同时也设置height:100%还有一个就是关于IE6下的bug，所以添加了height:auto !important; 此外将Mian的margin_bottom设置为footer的高度。
3、就是footer，它的高度就是上面contain的margin-bottom.此方法不必将footer设为绝对定位，这样它就就页底了

优点：
简单明了，易于理解，兼容所有浏览器。

缺点：
较之前面的两种方法，多使用了一个div.push容器，同样此方法限制了footer部分高度，无法达到自适应高度效果。