title: Phpmyadmin下显示中文乱码 
date: 2015-05-18 10:52:47
categories:  PHP 
tags:
- phpmyadmin
---

>* 数据库、数据表、表字段的字符编码统一为`utf8_general_ci`；
>* 文件保存格式为`UTF-8`
>* html文件指定`<meta http-equiv="content-type" content="text/html; charset=utf-8" /> `
>* php文件在对数据库进行增删改查时添加`SET NAMES 'utf8 '`语句，