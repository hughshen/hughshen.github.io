title: PHP实现301重定向
date: 2015-08-11 22:20:04
categories: PHP
tags:
- htaccess
---

php中实现301重定向挺简单的，代码也不复杂，无非就是对域名进行判断，不是新域名就使用header函数进行跳转，但是中途也出现一些问题，在此做个记录。

<!--more-->

```
$host = 'www.new.com'; // 要跳转的域名
$query = $_SERVER['REQUEST_URI']; // 查询字段
$query2 = $_SERVER['SCRIPT_NAME'].$SERVER['QUERY_STRING']; // 也可以这样获取查询字段
// 判断访问的是否是跳转的域名，不是则进行跳转
if (strpos($_SERVER['HTTP_HOST'], $host) === false) {
	header('HTTP/1.1 301 Moved Permanently');
	header('Location: http://'.$host.$query);
}
```
情况是这样的，有两个域名（例如www.ab.com，www.cd.com），都是使用同一个ftp，即ping的返回ip是一样的，一开始直接使用header进行跳转时一直是重定向循环，然后在网上找到一段重定向代码，发现需要对$_SERVER['HTTP_HOST']进行判断，而调试输出$_SERVER之后发现两个域名的HTTP_HOST是一样的（例如两个域名的HTTP_HOST都是www.cd.com，这样不管怎样跳转都是重定向循环），叫客户在域名面板配置好（具体操作不知道），在输出$_SERVER之后两个域名的HTTP_HOST不一样了，终于可以进行判断并跳转了。
本来很简单的一个重定向，却因为域名没有设置好，弄了半天：(

还有另一个方法是使用.htaccess文件。
其实之前有试过，但是也是因为HTTP_HOST问题出现重定向循环，更改域名设置后应该可以了。
```
RewriteEngine On
RewriteCond %{HTTP_HOST} !www.old.com$ [NC]
RewriteRule ^(.*)$ http://www.new.com/$1 [R=301,L]
```
注意要确定.htaccess文件可用。

参考链接
[php完美实现多个域名指向同一网站的301转向](http://www.lseventt.com/archives/986.html)
[多个绑定多域名的PHP代码](http://www.williamlong.info/archives/372.html)
[.htaccess 301重定向详细教程](http://www.111cn.net/phper/apache/42188.htm)
[PHP: $_SERVER](http://php.net/manual/zh/reserved.variables.server.php)