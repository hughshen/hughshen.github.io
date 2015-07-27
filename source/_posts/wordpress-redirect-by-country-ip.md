title: Wordpress根据国家IP自动跳转到不同页面
date: 2015-07-27 21:56:35
categories: PHP
tags:
- wordpress
---

项目中需要根据访问者ip来为其自动跳转到不同页面，例如大陆用户访问自动跳转到另一个服务器，其他用户则不变。
想到的方法有两种，一种是使用ip数据库来进行筛选，然后在php中使用header函数进行跳转，另一种是修改.htaccess文件（这个没实验过），还有网上说用javascript来获取浏览器语言来进行跳转。
方法应该有很多，但是能力有限，最后还是使用别人开发的wordpress plugin来解决，真是惭愧啊：(

<!-- more -->

###GeoIP数据库
1.下载ip数据库等文件
Download [GeoLite Country (binary format)](http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz), and extract the file GeoIP.dat.
Download [geoip.inc](http://www.maxmind.com/download/geoip/api/php/geoip.inc).

2.php跳转代码
```
// include the php script
include("geoip.inc");
// open the geoip database
$gi = geoip_open("GeoIP.dat",GEOIP_STANDARD);
// to get country code
$country_code = geoip_country_code_by_addr($gi, $_SERVER['REMOTE_ADDR']);
echo "Your country code is: $country_code \n";
// to get country name
$country_name = geoip_country_name_by_addr($gi, $_SERVER['REMOTE_ADDR']);
echo "Your country name is: $country_name \n";
// close the database
geoip_close($gi);
// redirect
if ($country_name === 'china') {
	header('Location: http://www.baidu.com');
}
```
这段代码真是简洁而且实用啊。

这段代码想要在wordpress中使用，一般是做成插件的形式，真是幸运已经有人做好了，不过插件的最后更新日期是2013年，可能会有问题，需要自己调试。

代码出处：[GeoIP country lookup with PHP](http://www.phpandstuff.com/articles/geoip-country-lookup-with-php)
wordpress插件：[Geo Redirect](https://wordpress.org/plugins/geographical-redirect/)
插件github：[wordpress-geographical-redirect](https://github.com/ladrower/wordpress-geographical-redirect)
非常感谢以上两位作者。

PS：在使用插件时，后台填写static url要注意填写完整的跳转地址，例如`http://www.example.com`，如果只填写www.example.com的话，最后浏览器地址栏里会得到localhost/wordpress/www.example.com，这样当然是404了。

另外也有其他的ip数据库可以使用，例如：[ip2location](http://www.ip2location.com/free/visitor-redirection)。
下面是一段生成的代码示例
```
<?php
require_once 'IP2Location.php';

$loc = new IP2Location('databases/IP-COUNTRY.BIN', IP2Location::FILE_IO);
$record = $loc->lookup($_SERVER['REMOTE_ADDR'], IP2Location::ALL);

if($record == 'CN') {
	header('HTTP/1.1 301 Moved Permanently');
	header('Location: http://www.baidu.com');
	exit;
}
?>
```

###修改.htaccess文件
这个我是没有试过的，只是在stackoverflow找到了这样的回答（其实也是调用了GepIP），做个记录。
```
GeoIPEnable On
GeoIPDBFile /path/to/GeoIP.dat

# Start Redirecting countries

# Canada
RewriteEngine on
RewriteCond %{ENV:GEOIP_COUNTRY_CODE} ^CA$
RewriteRule ^(.*)$ http://ca.abcd.com$1 [L]

# India
RewriteEngine on
RewriteCond %{ENV:GEOIP_COUNTRY_CODE} ^IN$
RewriteRule ^(.*)$ http://in.abcd.com$1 [L]

# etc etc etc...
```

---

参考链接
[4 WordPress Plugins for Geo Targeting](http://www.wpsolver.com/geo-redirect-wordpress-plugins-for-geo-targeting/)
[GeoLite Legacy Downloadable Databases](http://dev.maxmind.com/geoip/legacy/geolite/)
[how to redirect domain according to country IP address](http://stackoverflow.com/questions/9838344/how-to-redirect-domain-according-to-country-ip-address)
[Geo IP Location](http://www.php.net/manual/en/book.geoip.php)
[.htaccess Geo Country / IP Redirect Script](https://forums.digitalpoint.com/threads/htaccess-geo-country-ip-redirect-script.153845/)