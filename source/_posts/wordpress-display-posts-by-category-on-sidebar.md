title: WordPress在Sidebar中显示某个分类下的文章
date: 2015-08-14 23:44:50
categories: PHP
tags:
- wordpress
---

实现过程
1.注册sidebar widget（register_sidebar）；
2.添加获取分类文章的shortcode（add_shortcode）；
3.允许在widget中使用shortcode（do_shortcode）。

<!--more-->

使用的是cherry framework主题，所以修改的是主题下的sidebar-init.php文件，也可以直接写在functions.php文件。
```
<?php
// Register sidebars by running cherry_widgets_init() on the widgets_init hook.
add_action( 'widgets_init', 'cherry_widgets_init' );

function cherry_widgets_init() {
	// Get Posts By Category
	// Location: the sidebar
	register_sidebar( array(
		'name'          => __('Get Posts By Category', 'your-theme'),
		'id'            => 'posts-sidebar',
		'description'   => theme_locals("sidebar_desc"),
		'before_widget' => '<div id="%1$s" class="widget">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3>',
		'after_title'   => '</h3>',
	) );
}
?>
```

添加完之后，可以在后台widgets中看到新添加的sidebar，接下来添加shortcode与允许其在widget使用，修改functions.php文件。
```
<?php
/* Allow shortcodes in widget areas */
add_filter('widget_text', 'do_shortcode');

/* 
 * Get posts by category
 */
function getPostsByCat($atts) {
    $a = shortcode_atts(array(
        'catslug' => '',
        'postnum' => 10,
    ), $atts);

    // Get category id by slug
    $catObj = get_category_by_slug($a['catslug']);
    $catId = $catObj->term_id;

    $args = array(
		'posts_per_page'   => $a['postnum'],
		'category'         => $catId,
		'orderby'          => 'date',
		'order'            => 'DESC',
		'post_type'        => 'post',
		'post_status'      => 'publish',
		'suppress_filters' => true 
	);
	$posts = get_posts( $args );

	$list .= '<div class="widget_categories"><ul>';
	foreach ($posts as $key => $post) {
		$list .= '<li><a href="'.$post->guid.'">'.$post->post_title.'</a></li>';	
	}
	$list .= '</ul></div>';

	return $list;
}
add_shortcode( 'postsbycat', 'getPostsByCat' );
```

添加完之后，可以在sidebar中添加text widget，写上shortcode，例如[postsbycat catslug="mycat"]，最后在模板文件调用就行。

---
2015-08-19
今天在使用的时候发现两个小问题。
1.$atts参数命名问题
注意参数变量命名不要有大写，最好用_下划线区分单词，因为在输出$atts之后发现变量名全部转化为小写了，并不能正确传递参数 。

2.获取文章链接地址问题
在使用guid作为链接发现地址不对，改为get_permalink($post->ID)比较好。

附上今天修改的代码
```
<?php

function getPostsByCat($atts) {
	extract(shortcode_atts(array(
        'cat_id' => 0,
        'title' => 'Categories',
        'post_num'	=> 10,
    ), $atts));

    // print_r($atts);exit;

    $args = array(
    	'posts_per_page'   => $post_num,
		'category'         => $cat_id,
		'orderby'          => 'date',
		'order'            => 'DESC',
		'post_type'        => 'post',
		'post_status'      => 'publish',
		'suppress_filters' => true 
	);
	$posts = get_posts($args);

	// print_r($posts);exit;

	$list .= '<div class="widget"><h3>'.$title.'</h3><ul>';

	foreach ($posts as $key => $post) {
		$list .= '<li><a href="'.get_permalink($post->ID).'">'.$post->post_title.'</a></li>';	
	}

	$list .= '</ul></div>';

	return $list;
}
add_shortcode( 'postsbycat', 'getPostsByCat' );
```


参考链接
[register sidebar](https://codex.wordpress.org/Function_Reference/register_sidebar)
[add shortcode](https://codex.wordpress.org/Function_Reference/add_shortcode)
[get category by slug](https://codex.wordpress.org/Function_Reference/get_category_by_slug)
[get posts](https://codex.wordpress.org/Template_Tags/get_posts)
[PHP: extract](http://php.net/manual/en/function.extract.php)