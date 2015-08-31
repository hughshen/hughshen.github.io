title: OpenCart修改上传图片大小限制
date: 2015-08-31 21:41:20
categories: PHP
tags:
- opencart
---

修改filemanager.php的上传代码，文件一般位于`admin\controller\common\filemanager.php`
 
具体是修改里面的size值。
```
if ($this->request->files['image']['size'] > 300000) {
$json['error'] = $this->language->get('error_file_size');
```

<!--more-->

参考链接
[File Picture Upload OpenCart 1.5.1.3.1](http://forum.opencart.com/viewtopic.php?t=52004)

