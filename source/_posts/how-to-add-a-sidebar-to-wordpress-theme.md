title: WrodPress添加自定义Sidebar
date: 2015-06-25 22:51:18
categories: PHP
tags:
- wordpress
---

还是在撸wordpress，呼~~~
google到一篇很好的学习教程，感谢作者，具体看[这里](https://www.tastyplacement.com/add-sidebar-wordpress)。PS：貌似需要FQ才能访问-_-!

<!--more-->

第一步
在functions.php文件下注册sidebar
```
if ( function_exists('register_sidebar') ) {
	register_sidebar(array(
		'name' => 'Homepage Sidebar',
		'id' => 'homepage-sidebar',
		'description' => 'Appears as the sidebar on the custom homepage',
		'before_widget' => '<div style="height: 280px"></div><li id="%1$s" class="widget %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h2 class="widgettitle">',
		'after_title' => '</h2>',
	));
}
```
然后可以在后台widgets页面下看到新添加的sidebar

第二步
创建一个自定义的sidebar文件
例如：sidebar-homepage.php，添加代码（可以复制sidebar.php源文件）。
```
<div id="sidebar">
   <ul>
      <?php
      if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('homepage-sidebar') ) :
      endif; ?>
   </ul>
</div>
```
PS：注意homepage-sidebar为注册sidebar时的id

第三步
在theme中调用自定义的sidebar
sidebar文件有一个统一的命名：sidebar-*custom_name*.php，在需要调用时可以用get_sidebar()函数
例如在template文件中加入代码
```
<?php get_sidebar('homepage'); ?>
```