title: Ubuntu1404下安装LAMP
date: 2015-04-27 00:56:39
categories: 学习
tags:
- Ubuntu
- LAMP
---

###安装Apache2
```bash
sudo apt-get install apache2
```
在浏览中输入 *localhost* ，显示 *It's works!* 表示成功。

<!--more-->

###安装PHP5
```bash
sudo apt-get install php5 libapache2-mod-php5
```
在 */var/www/html/* 建立一个测试文件，查看 *PHP* 与 *Apache* 是否一起工作。
### 安装Mysql
```bash
sudo apt-get install mysql-server #一般会要求输入密码
mysql -u root -p #测试mysql是否安装成功
show databases;
```
###配置PHPMyadmin
```bash
sudo apt-get install libapache2-mod-auth-mysql php5-mysql phpmyadmin
# 建立phpmyadmin的软链接
sudo ln -s /usr/share/phpmyadmin/ /var/www/html/
```
###PHP的一些扩展
```bash
sudo apt-get install php5 php5-cgi php5-mysql php5-curl php5-gd php5-idn php-pear php5-imagick php5-imap php5-mcrypt php5-memcache php5-mhash php5-ming php5-pspell php5-recode php5-snmp php5-tidy php5-xmlrpc php5-sqlite php5-xsl
```
###中途遇到的问题
*Could not reliably determine the server's fully qualified domain name, using 127.0.1.1. Set the 'ServerName' directive globally to suppress this message*
```bash
sudo vim /etc/apache2/apache2.conf
```
在 *ServerRoot* 下面添加 *ServerName 127.0.0.1*

**参考 [1](http://www.cnblogs.com/ubuntubox/archive/2011/04/07/2008258.html)，[2](http://www.lvtao.net/server/499.html)，感谢原作者。**