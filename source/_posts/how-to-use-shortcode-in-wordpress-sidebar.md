title: 在WordPress Sidebar中使用ShortCode
date: 2015-07-07 21:39:23
categories: PHP
tags:
- wordpress
---

很简单，在functions.php中添加
```
// Use shortcode in sidebar
add_filter('widget_text', 'do_shortcode');
```

<!--more-->
