title: WordPress笔记-2
date: 2015-08-30 16:29:00
categories: PHP
tags:
- wordpress
---

### 对文件内容进行截取
```
echo mb_substr(get_the_content(), 0, 130, 'utf8');
```

<!--more-->

### 获取特色图片地址
```
$images = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'thumbnail');
$imageUrl = $images[0];
```

### 直接在PHP中调用已经写好的shortcode
```
echo do_shortcode('[your-shortcode att=val]');
```

### 获取主题下图片文件夹路径
```
<?php
bloginfo('stylesheet_directory');
?>
// =>/images/example.jpg"
// or
The get_stylesheet_directory_uri();
```

### 判断首页
```
if ($site_description && (is_home() || is_front_page())) {}
```

### 获取首页Page Title
```
$home = get_the_title(get_option('page_on_front', true));
```


参考链接
[How do I execute shortcode in my PHP code](https://wordpress.org/support/topic/how-do-i-execute-shortcode-in-my-php-code-only)
[What's the image path for a new theme](https://wordpress.org/support/topic/whats-the-image-path-for-a-new-theme)
[WordPress中is_home()与is_front_page()这两个判断的使用](http://www.zhugexiaojue.com/note/judge-484.html)