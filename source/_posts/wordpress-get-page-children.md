title: WordPress获取子页面
date: 2015-08-30 16:49:05
categories: PHP
tags:
- wordpress
---

获取子页面很简单，代码也不长，需要注意的变量的传递问题。

<!--more-->

代码
```
<?php
// 首先获取到需要的pages，可以自定义args
$query = new WP_Query();
$pages = $query->query(array('post_type' => 'page', 'posts_per_page' => -1,));

// 需要把前面获取到的$pages作为参数传递到get_page_children方法中
$page_children = get_page_children( $page->ID, $pages );
?>
```


参考链接
[get page children](http://codex.wordpress.org/Function_Reference/get_page_children)