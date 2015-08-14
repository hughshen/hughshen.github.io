title: WordPress获取Portfolio某个分类下的子分类
date: 2015-08-15 00:39:07
categories: PHP
tags:
- wordpress
---

如题。
实现过程：get_term_by->get_term_children->loop。

<!--more-->

代码
```
<ul id="filters" class="filter nav nav-pills">
	<?php
		// 获取post下的要显示的分类slug
		$category_value = get_post_meta($post->ID, 'tz_category_include', true);
		// 根据slug获取特定分类对象数组
		$catObj = get_term_by('slug', $category_value, 'portfolio_category');
		$catId = $catObj->term_id;
		// 根据特定分类id获取其子分类，返回值为子分类id数组
		$termIds = get_term_children($catId, 'portfolio_category');
		$terms = array();
		$termSlugs = array();

		// 对获得的子分类id进行遍历，获取每个子分类的详细信息
		foreach ($termIds as $key => $val) {
			$termTemp = get_term_by('id', $val, 'portfolio_category', 'ARRAY_A');
			$terms[] = $termTemp['slug'];
			$termSlugs[] = $termTemp['slug'];
		}

		foreach ($terms as $key => $val) {
			echo '<li><a href="#">' . $val['name'] . '</a></li>';
		}
	?>
</ul>
```

说下get_term_by与get_term_children的用法。

`get_term_by($field, $value, $taxonomy, $output, $filter)`
$field
(string) (required) 我理解为查询字段，值可以是'id', 'slug', 'name', or 'term_taxonomy_id'，比如说取'slug‘，后面$value必须是分类的slug。Default: 'id'
$value
(string|integer) (required) 要查询的值，与$field对应。Default: None
$taxonomy
(string) (required) 指定的分类法类型，例如我这里就是'portfolio_category'，不清楚的可以到post编辑页面查看url，taxonomy后面的就是。Default: None
$output
(string) (optional) 返回的结果类型，分别有OBJECT, ARRAY_A, or ARRAY_N。Default: OBJECT
$filter
(string) (optional) default is raw or no WordPress defined filter will applied.（英语渣，没看懂）Default: 'raw'

`get_term_children($term, $taxonomy)`
$term
(string) (required) 特定分类的id。Default: None
$taxonomy
(string) (required) 指定的分类法类型，与上面类似。Default: None

原本的功能是要获取所有子分类和子分类下的文章的，但是文章还没想到怎么获取，不知道怎么对多个分类进行获取，难道要一个一个遍历？

参考链接
[get post meta](https://developer.wordpress.org/reference/functions/get_post_meta/)
[get term by](https://codex.wordpress.org/Function_Reference/get_term_by)
[get term children](https://codex.wordpress.org/Function_Reference/get_term_children)