title: WordPress获取多个自定义分类法下的文章
date: 2015-08-30 17:03:19
categories: PHP
tags:
- wordpress
---

主要还是使用WP_Query来获取，关键是args参数。

<!--more-->

```
// 随便怎么写，反正能获取到ids或slugs就行
// 获取post下的要显示的分类slug
$category_value = get_post_meta($post->ID, 'tz_category_include', true);
// 根据slug获取特定分类对象数组
$catObj = get_term_by('slug', $category_value, 'portfolio_category');
$catId = $catObj->term_id;
// 根据特定分类id获取其子分类，返回值为子分类id数组
$termIds = get_term_children($catId, 'portfolio_category');

// args参数
$args = array(
	'post_type' => 'portfolio',
	'tax_query' => array(
		array(
			// 例如'taxonomy' => 'events',
			'taxonomy' => 'portfolio_category',
			// 还可以使用'field'    => 'slug',
			'field'    => 'id',
			// $termIds是id数组，也可以是slug数组，根据是前面定义的field字段
			'terms'    => $termIds,
		)
	),
);
$query = new WP_Query($args);
```


参考链接
[WP Query](https://codex.wordpress.org/Class_Reference/WP_Query)
[get term by](https://codex.wordpress.org/Function_Reference/get_term_by)
[get term children](https://codex.wordpress.org/Function_Reference/get_term_children)