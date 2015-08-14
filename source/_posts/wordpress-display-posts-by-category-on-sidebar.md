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

参考链接
[register sidebar](https://codex.wordpress.org/Function_Reference/register_sidebar)
[add shortcode](https://codex.wordpress.org/Function_Reference/add_shortcode)
[get category by slug](https://codex.wordpress.org/Function_Reference/get_category_by_slug)
[get posts](https://codex.wordpress.org/Template_Tags/get_posts)