title: Yii 1.1使用Mailer Extensions
date: 2015-08-05 21:19:41
categories: PHP
tags:
- yii
---

今天工作中需要用到php的发邮件功能，在网上找了一些资料，大多是使用写好的邮件类（没有安装邮件服务器），由于是在yii下，所以就使用官方的extensions了，也就是mailer。

<!--more-->

官方使用方式有两种，一种普通的调用component方式。代码很简单。
先查看应用application/extensions/mailer/EMailer是否完整，没有的话就去[下载](http://www.yiiframework.com/extension/mailer/files/mailer-2.2.zip)一份。
```
$message = 'Hello World!';
$mailer = Yii::createComponent('application.extensions.mailer.EMailer');
/* --不一定需要-- */
$mailer->Host = <your smtp host>;
$mailer->Username = 'username';
$mailer->Password = 'password';
/* --------------------- */
$mailer->IsSMTP();
$mailer->SMTPDebug = true; // 开启smtp调试功能
$mailer->From = 'wei@example.com'; // 用来发送邮件的邮箱
$mailer->AddReplyTo('wei@example.com'); // 用来回复的吧，可以跟上面一样
$mailer->AddAddress('qiang@example.com');  // 发送目标邮箱
$mailer->FromName = 'Wei Yard';
$mailer->CharSet = 'UTF-8';
$mailer->Subject = 'Your subject';
$mailer->IsHTML(true); // 可以识别出message里面的html标签
$mailer->Body = $message;
$mailer->Send();
```
还以为发送的邮件是支持html标签的，查了资料才知道要开启IsHTML(true) ：(

还有一种是使用配置文件添加components的方式。
需要在配置文件中添加，例如main.php
```
'components'=>array(
   'mailer' => array(
      'class' => 'application.extensions.mailer.EMailer',
      'pathViews' => 'application.views.email',
      'pathLayouts' => 'application.views.email.layouts'
   ),
   // ...
```
然后可以在controller中调用
```
$message = 'Hello World!';
Yii::app()->mailer->Host = 'smtp.yiiframework.com';
Yii::app()->mailer->IsSMTP();
Yii::app()->mailer->From = 'wei@pradosoft.com';
Yii::app()->mailer->FromName = 'Wei';
Yii::app()->mailer->AddReplyTo('wei@pradosoft.com');
Yii::app()->mailer->AddAddress('qian@yiiframework.com');
Yii::app()->mailer->Subject = 'Yii rulez!';
Yii::app()->mailer->Body = $message;
Yii::app()->mailer->Send();
```

---

这些都是很基础的使用，以后会经常遇到的：)

参考链接
[Yii 1.1: mailer](http://www.yiiframework.com/extension/mailer/)
[PHPMailer Properties](http://phpmailer.worxware.com/index.php?pg=properties)
[PHPMailer Methods](http://phpmailer.worxware.com/index.php?pg=methods)
[在Yii Framework中利用PHPMailer发送邮件](http://blog.sina.com.cn/s/blog_71e9a9d90100ssox.html)