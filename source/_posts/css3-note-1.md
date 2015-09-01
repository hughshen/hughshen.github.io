title: CSS3笔记1-动画效果
date: 2015-07-06 20:46:12
categories: HTML
tags:
- css
---

### css3知识匮乏，做个记录，感谢原作者：[http://www.jq-school.com/Show.aspx?id=281](http://www.jq-school.com/Show.aspx?id=281)
效果一：360度旋转，修改rotate（旋转度数）

<!--more-->

 ```
* {
	transition:All 0.4s ease-in-out;
	-webkit-transition:All 0.4s ease-in-out;
	-moz-transition:All 0.4s ease-in-out;
	-o-transition:All 0.4s ease-in-out;
}
*:hover {
	transform:rotate(360deg);
	-webkit-transform:rotate(360deg);
	-moz-transform:rotate(360deg);
	-o-transform:rotate(360deg);
	-ms-transform:rotate(360deg);
}

```
效果二：放大，修改scale（放大的值）
```
* {
	transition:All 0.4s ease-in-out;
	 -webkit-transition:All 0.4s ease-in-out;
	-moz-transition:All 0.4s ease-in-out;
	-o-transition:All 0.4s ease-in-out;
}
*:hover {
	transform:scale(1.2);
	-webkit-transform:scale(1.2);
	-moz-transform:scale(1.2);
	-o-transform:scale(1.2);
	-ms-transform:scale(1.2);
}

```
效果三：旋转放大，修改rotate（旋转度数）scale（放大值）
```
* {
	transition:All 0.4s ease-in-out;
	-webkit-transition:All 0.4s ease-in-out;
	-moz-transition:All 0.4s ease-in-out;
	-o-transition:All 0.4s ease-in-out;
}
*:hover {
	transform:rotate(360deg) scale(1.2);
	-webkit-transform:rotate(360deg) scale(1.2);
	-moz-transform:rotate(360deg) scale(1.2);
	-o-transform:rotate(360deg) scale(1.2);
	-ms-transform:rotate(360deg) scale(1.2);
}

```
效果四：左右移动，修改translate（x轴，y轴）
```
* {
	transition:All 0.4s ease-in-out;
	-webkit-transition:All 0.4s ease-in-out;
	-moz-transition:All 0.4s ease-in-out;
	-o-transition:All 0.4s ease-in-out;
}
*:hover {
	transform:translate(0,-10px);
	-webkit-transform:translate(0,-10px);
	-moz-transform:translate(0,-10px);
	-o-transform:translate(0,-10px);
	-ms-transform:translate(0,-10px);
}

```
效果五：左右或者垂直翻转，修改scale（x轴，y轴）
```
* {
	transition:All 0.4s ease-in-out;
	 -webkit-transition:All 0.4s ease-in-out;
	-moz-transition:All 0.4s ease-in-out;
	-o-transition:All 0.4s ease-in-out;
}
/*左右翻转*/
*:hover {
	transform:scale(-1,1);
	-webkit-transform:scale(-1,1);
	-moz-transform:scale(-1,1);
	-o-transform:scale(-1,1);
	-ms-transform:scale(-1,1);
/*垂直翻转*/
*:hover {
	transform:scale(1,-1);
	-webkit-transform:scale(1,-1);
	-moz-transform:scale(1,-1);
	-o-transform:scale(1,-1);
	-ms-transform:scale(1,-1);
```
效果六：同一个div下多种动画效果
```
/*首先把需要有动画效果的元素初始化*/
.content .div1 {
	-webkit-transition:all 0.5s ease;
	-moz-transition:all 0.5s ease;
	-o-transition:all 0.5s ease;
	transition:all 0.5s ease;
}
.content .div2 {
	-webkit-transition:all 0.5s ease;
	-moz-transition:all 0.5s ease;
	-o-transition:all 0.5s ease;
	transition:all 0.5s ease;
}
/*注意hover放在父元素里*/
.content:hover .div1 {
	background:#474747;
	background:rgba(71,71,71,0.9);
	transform:rotate3d(0,1,0,-180deg);
}
.content:hover .div2 {
	background:#fff;
	background:rgba(255,255,255,0.9);
	transform:rotate3d(0,1,0,180deg);
	color:#333333;
}
```