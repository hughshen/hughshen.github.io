title: WooCommerce插件下为Products页面移除Sidebar
date: 2015-07-06 21:18:03
categories: PHP
tags:
- wordpress
---

今天找了一下午，终于找到了移除sidebar的代码了。。。一开始还以为是page的template没设置好。
加载product-content的文件是在：
`wp-content/themes/theme52481/includes/shop-functions.php`

<!--more-->

找到这一块
```
function tm_open_shop_content_wrappers(){
	echo '<div class="motopress-wrapper content-holder clearfix woocommerce">
			<div class="container">
				<div class="row">
					<div class="span12" data-motopress-type="static" data-motopress-static-file="static/static-title.php">';
						echo get_template_part("static/static-title");
	echo 			'</div>
				</div>
				<div class="row">
					<div class="' . cherry_get_layout_class( 'content' ) . '" id="content">';
}
function tm_close_shop_content_wrappers(){
	echo			'</div>
					<div class="sidebar ' . cherry_get_layout_class( 'sidebar' ) . '" id="sidebar" data-motopress-type="static-sidebar"  data-motopress-sidebar-file="sidebar.php">';
						//这里注释掉
						//get_sidebar();
	echo			'</div>
				</div>
			</div>
		</div>';
}
```