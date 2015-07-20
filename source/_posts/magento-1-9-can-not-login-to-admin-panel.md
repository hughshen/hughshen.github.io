title: Magento1.9登录后台无反应
date: 2015-07-20 21:28:13
categories: PHP
tags:
- magento
---

magento安装完后登录后台，帐号密码输入均正确，但是并不能登录，只是在本页面刷新。
用的1.9版本，google之后发现好像magento大多有这个问题，具体原因不清楚，解决的一个办法是注释magento部分代码。

<!--more-->

找到文件
/app/code/core/Mage/Core/Model/Session/Abstract/Varien.php
```
// session cookie params
$cookieParams = array(
    'lifetime' => $cookie->getLifetime(),
    'path'     => $cookie->getPath(),
    //'domain'   => $cookie->getConfigDomain(),
    //'secure'   => $cookie->isSecure(),
    //'httponly' => $cookie->getHttponly()
);

//if (!$cookieParams['httponly']) {
//    unset($cookieParams['httponly']);
//    if (!$cookieParams['secure']) {
//        unset($cookieParams['secure']);
//        if (!$cookieParams['domain']) {
//            unset($cookieParams['domain']);
//        }
//    }
//}
```
注释一部分代码之后，后台可以登录了，应该是跳过了cookie验证这一部分。

相关阅读
[Magento admin login not working in chrome but works fine for firefox](http://stackoverflow.com/questions/15491819/magento-admin-login-not-working-in-chrome-but-works-fine-for-firefox)
[Magento 1.9 Can’t login to admin panel!](http://magento.stackexchange.com/questions/26071/magento-1-9-can-t-login-to-admin-panel)
[Fixing Magento Login Problem after a Fresh Installation](http://www.aschroder.com/2009/05/fixing-magento-login-problem-after-a-fresh-installation/)