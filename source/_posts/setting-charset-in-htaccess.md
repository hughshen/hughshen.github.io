title: 在htaccess文件中设置字符集
date: 2015-08-30 16:10:24
categories: PHP
tags:
- htaccess
---

要求：网站首页访问index.html，但是charset不对，显示是乱码。
本来访问index.php文件是没问题的，所以可以在apache中使用`DirectoryIndex index.php index.html`来修改默认index文件，老严说可以使用htaccess文件来设置默认charset，google找到了类似的，作个记录。

<!--more-->

在.htaccess文件中添加
```
AddDefaultCharset UTF-8
AddCharset UTF-8 .html
AddType 'text/html; charset=UTF-8' html
```

另外，帖子链接中有提到FilesMatch，例如
```
<FilesMatch "\.(htm|html|css|js|php)$">
AddDefaultCharset UTF-8
DefaultLanguage en-US
</FilesMatch>
```
使用FilesMatch应该是更好的写法，虽然第一种就可以满足我的要求了。

参考链接
[Setting charset in htaccess](http://www.askapache.com/htaccess/setting-charset-in-htaccess.html)
[Using FilesMatch and Files in htaccess](http://www.askapache.com/htaccess/using-filesmatch-and-files-in-htaccess.html)