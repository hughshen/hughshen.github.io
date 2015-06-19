title: WordPress获取文章中的图片
date: 2015-06-20 03:28:58
categories: PHP
tags:
- wordpress
---

###获取post中的特色图片
```
<?php
$thumbnail_image_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'thumbnail');
echo $thumbnail_image_url[0];
?>
```

<!--more-->

其中thumbnail可以替换成‘medium’，‘large’，‘full’，分别代表获得图片的尺寸，还可以使用array(width,height)来指定尺寸，注意只能获取post的特色图片，如果没有设定特色图片的话是获取不到的

###获取post中所包含的图片
在functions.php文件中加入
```
function get_first_image_url($post_content = '') {
	//如果没有指定文章则选取当前的文章
	if ($post_content == '') {
		global $post, $posts;
		$image_url = '';
		ob_start();
		ob_end_clean();
		$post_content = $post->post_content;
	}
	//使用正则表达式筛选出img标签并返回图片数组
	$output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post_content, $matches);
	$image_url = $matches [1] [0];
	if(empty($image_url)){ 
	//如果没有图片，可以返回false或者返回一张默认图片
	$image_url = false;
	}
	return $image_url;
}
```
然后可以在模板文件中调用
```
<?php
	//注意不要使用the_content()函数，否则会直接输出内容，这里不用输出内容
	$image_url = get_first_image_url(get_the_content());
		if ($image_url)
			echo '<img src="'.$image_url.'">';
?>
```