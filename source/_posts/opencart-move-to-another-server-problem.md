title: OpenCart从本地上传到服务器
date: 2015-07-08 22:38:44
categories: PHP
tags:
- opencart
---

一般都要进行的几步：)

<!--more-->

1. 导出本地数据库
2. 在本地调试好的目录上传到服务器
3. 导入本地数据库（在导入前可能需要把sql文件里有关localhost的信息替换成server的，还有数据库名称）
4. 修改config文件（根目录与admin目录）
```
<?php
// HTTP
// 直接填写网站地址就行
define('HTTP_SERVER', 'http://www.test.com/');
define('HTTP_IMAGE', 'http://www.test.com/image/');
define('HTTP_ADMIN', 'http://www.test.com/admin/');

// HTTPS
// 一样填写网站地址
define('HTTPS_SERVER', 'http://www.test.com/');
define('HTTPS_IMAGE', 'http://www.test.com/image/');

// DIR
// 注意这里是填写物理地址
// 可以使用php输出服务器的物理地址
// echo $_SERVER['DOCUMENT_ROOT']
define('DIR_APPLICATION', '/var/www/public_html/catalog/');
define('DIR_SYSTEM', '/var/www/public_html/system/');
define('DIR_DATABASE', '/var/www/public_html/system/database/');
define('DIR_LANGUAGE', '/var/www/public_html/language/');
define('DIR_TEMPLATE', '/var/www/public_html/view/template/');
define('DIR_CONFIG', '/var/www/public_html/system/config/');
define('DIR_IMAGE', '/var/www/public_html/image/');
define('DIR_CACHE', '/var/www/public_html/system/cache/');
define('DIR_DOWNLOAD', '/var/www/public_html/download/');
define('DIR_LOGS', '/var/www/public_html/system/logs/');

// DB
// 数据库信息，没什么好说的
define('DB_DRIVER', 'mysql');
define('DB_HOSTNAME', 'localhost');
define('DB_USERNAME', 'database_name');
define('DB_PASSWORD', 'database_pass');
define('DB_DATABASE', 'opencart');
define('DB_PREFIX', 'oc_');
?>
```
5. 服务器目录与文件权限
按照官方Installation，这几个文件需要可写权限
```
system/cache/
system/logs/
image/
image/cache/
image/data/
download/
```

做完这几步后，打开首页，全是fopen，fwrite，permission deny：(
然后直接把根目录全改为777，呼～～清净了（不建议这么做）

---

中途遇到两个问题：
上传完毕后，打开首页或者/admin/全是空白的
在index.php文件加上
```
error_reporting(E_ALL);
ini_set('display_errors', 1);
```
显示错误，发现不能读取到system/startup.php，原来是config.php中DIR配置填写的是网站地址，改为物理地址就ok了。

但是

Error: Could not load database driver type mysql!
还是config.php文件，database目录配置错误，找到这一行
```
define('DIR_DATABASE', '/var/www/public_html/database/');
//改为
define('DIR_DATABASE', '/var/www/public_html/system/database/');
```