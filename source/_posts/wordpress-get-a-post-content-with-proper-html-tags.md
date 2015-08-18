title: WordPress返回带HTML标签的内容
date: 2015-08-18 21:07:46
categories: PHP
tags:
- wordpress
---

今天遇到一个小需求：在一篇文章显示另一篇文章的内容。
实现：添加一个shortcode，然后在文章中调用，shortcode需要返回带html标签的内容。

<!--more-->

functions.php中添加
```
function getAnotherPostContent($atts) {
	$atts = shortcode_atts(array(
		'post_id' => -1,
	), $atts);

	$post = get_post($atts['post_id']);
	$content = $post->post_content;

	if ($content) {
		// 对the_content进行过滤，不然返回的是不带html标签的内容。
		$content = apply_filters ("the_content", $content);
	} else {
		$content = '';
	}

	return $content;
}
add_shortcode( 'showpost', 'getAnotherPostContent' );
```

最后在文章中调用就行，例如：[showpost post_id="1"]。

参考链接：
[Get a post content with proper html tags](https://wordpress.org/support/topic/get-a-post-content-with-proper-html-tags)
[apply filters](https://codex.wordpress.org/Function_Reference/apply_filters)
[add shortcode](https://codex.wordpress.org/Function_Reference/add_shortcode)