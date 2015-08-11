title: WordPress自定义上传文件类型
date: 2015-08-11 23:10:12
categories: PHP
tags:
- wordpress
---

很简单！！
在functions.php文件中添加如下代码。

<!--more-->

```
/**
 * Add custom file type
 */
add_filter('upload_mimes', 'custom_upload_xml');
 
function custom_upload_xml($mimes = array()) {
    $mimes = array_merge($mimes, array('xml' => 'application/xml'));
    return $mimes;
}
```
添加上面代码可以将xml文件上传到后台中。

更多的文件类型可以到这里查看：[MIME Types – Complete List](http://www.sitepoint.com/web-foundations/mime-types-complete-list/)

参考链接
[Plugin API/Filter Reference/upload mimes](https://codex.wordpress.org/Plugin_API/Filter_Reference/upload_mimes)