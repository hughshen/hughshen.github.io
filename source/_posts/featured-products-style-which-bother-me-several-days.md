title: WooCommerce特色产品ShortCode页面样式问题
date: 2015-07-07 21:08:24
categories: PHP
tags:
- wordpress
---

最近被一个首页排版问题纠结了好久，明明标签排版都一样，css也已经加载了，但跟模板显示的效果差别很大，一直追踪shortcode与F12才发现是输出内容外面没有添加相应的div容器，问题终于得到解决。

<!--more-->

解决过程很简单。>_<！！
F12查看模板的css文件，看到有如下的一段
```
#motopress-main.main-holder .content-holder .featured_products ul.products li.product 
```
可以看到，ul.products前面还有.content-holder .featured_products这两个类，而当前首页并没有这两个类，说明需要添加这两个类（div），而添加的方式在shortcode里，需要修改shortcode代码。

注意：尽量不要修改原本的plugin files，应该添加代码到主题下的funcionts.php文件中。
这里用的woocommerce插件，所以应该修改主题下的includes/shop-functions.php文件。

找到featured_products的shortcode代码片段
```
public static function featured_products( $atts ) {
	global $woocommerce_loop;

	$atts = shortcode_atts( array(
		'per_page' => '12',
		'columns'  => '4',
		'orderby'  => 'date',
		'order'    => 'desc'
	), $atts );

	$meta_query   = WC()->query->get_meta_query();
	$meta_query[] = array(
		'key'   => '_featured',
		'value' => 'yes'
	);

	$args = array(
		'post_type'           => 'product',
		'post_status'         => 'publish',
		'ignore_sticky_posts' => 1,
		'posts_per_page'      => $atts['per_page'],
		'orderby'             => $atts['orderby'],
		'order'               => $atts['order'],
		'meta_query'          => $meta_query
	);

	ob_start();

	$products = new WP_Query( apply_filters( 'woocommerce_shortcode_products_query', $args, $atts ) );

	$columns = absint( $atts['columns'] );
	$woocommerce_loop['columns'] = $columns;

	if ( $products->have_posts() ) : ?>

		<?php woocommerce_product_loop_start(); ?>

			<?php while ( $products->have_posts() ) : $products->the_post(); ?>

				<?php wc_get_template_part( 'content', 'product' ); ?>

			<?php endwhile; // end of the loop. ?>

		<?php woocommerce_product_loop_end(); ?>

	<?php endif;

	wp_reset_postdata();

	return '<div class="woocommerce columns-' . $columns . '">' . ob_get_clean() . '</div>';
}
```
在shop-functions.php中添加
```
//add custom featured_products shortcode
add_shortcode( 'my_featured_products', 'my_featured_products_function' );
function my_featured_products_function( $atts ) {
	global $woocommerce_loop;

	$atts = shortcode_atts( array(
		'per_page' => '12',
		'columns'  => '4',
		'orderby'  => 'date',
		'order'    => 'desc'
	), $atts );

	$meta_query   = WC()->query->get_meta_query();
	$meta_query[] = array(
		'key'   => '_featured',
		'value' => 'yes'
	);

	$args = array(
		'post_type'           => 'product',
		'post_status'         => 'publish',
		'ignore_sticky_posts' => 1,
		'posts_per_page'      => $atts['per_page'],
		'orderby'             => $atts['orderby'],
		'order'               => $atts['order'],
		'meta_query'          => $meta_query
	);

	ob_start();

	$products = new WP_Query( apply_filters( 'woocommerce_shortcode_products_query', $args, $atts ) );

	$columns = absint( $atts['columns'] );
	$woocommerce_loop['columns'] = $columns;

	if ( $products->have_posts() ) {

		woocommerce_product_loop_start();

			while ( $products->have_posts() ) {
				$products->the_post();
				wc_get_template_part( 'content', 'product' );
			}

			woocommerce_product_loop_end();

	}

	wp_reset_postdata();
	
	//添加div容器使得css生效
	return '<div class="content-holder"><div class="woocommerce featured_products columns-' . $columns . '">' . ob_get_clean() . '</div></div>';
}
```

---

中途遇到ob_start()函数，顺便作个记录。
ob_start()可以定义代码下面的echo不要将内容输出到浏览器上，而是将内容输出到缓冲区，然后使用ob_get_clean()这个函数来获取存放在缓冲区的内容。