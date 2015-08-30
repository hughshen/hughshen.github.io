title: 使用Cherry Parallax Plugin为Pages添加背景图片
date: 2015-06-29 22:19:52
categories: PHP
tags:
- wordpress
---

首先需要安装cherry parallax plugin，可以到了这里下载：[1.0.0](https://github.com/pioneer903/shirincafe/tree/6b817f6aa7f47b19f3b4c190c424994567ee8dbf/wp-content/plugins/cherry-parallax)，[1.0.1](https://github.com/happywithyou86/Wordpress_PCCO/tree/12728d462e992170f87b773c2caa78321bb67b76/wp-content/plugins/cherry-parallax)。
按照cherry framework的[documentaction](http://www.templatemonster.com/help/quick-start-guide/wordpress-themes/master/index_en.html#introduction)，shortcode应该是如下的写法
```
[cherry_parallax image="wp-content/uploads/../../image.jpg" width="1920" speed="2" custom_class="custom-class"]
	Text
[/cherry_parallax]
```

<!--more-->

但是不能正确显示，在chrome中使用F12发现标签中的data-img-url为空，说明图片地址为空，不能识别，应该是图片地址写错了，在查看插件包中的cherry-parallax.php文件（版本为1.0.0），找到其中的shortcode代码，其中有
```
$args = array(
    'post_type' => 'attachment',
    'post_mime_type' =>'image',
    'post_status' => 'inherit',
    'posts_per_page' => -1,
);
$query_images = new WP_Query( $args );
if ( $query_images->have_posts() ) {
  foreach ( $query_images->posts as $item) { 
    $filename = wp_basename($item->guid);
    if($image == $filename) $image_url = $item->guid;
  }
}
```
插件首先从数据库中读取特定类型的所有图片，然后与传递进来的图片地址进行比较，这里在进行比较之前先把图片地址的目录部分去掉了，只剩下文件名与扩展名，所以在shortcode里并不需要把目录加上，正确的写法应该是
```
[cherry_parallax image="image.jpg" width="1920" speed="2" custom_class="custom-class"]
	Text
[/cherry_parallax]
```
只需填写image文件名就行，不需填写目录。
想要把哪一部分内容添加背景图片，就写到shortcode里面就行，即Text部分。

---
wordpress的shortcode是一个难点，需要多看看一些插件或者主题的shortcode部分，了解其是如何运作的。