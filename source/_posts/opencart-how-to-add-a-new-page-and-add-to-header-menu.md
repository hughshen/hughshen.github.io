title: OpenCart添加新的页面并加到头部菜单
date: 2015-07-09 20:50:18
categories: PHP
tags:
- opencart
---

首先在后台依次点击Catalog -> Information，然后添加标题内容什么的，insert之后就是一个新的文章页面了。
而添加到menu需要修改代码。

<!--more-->

找到文件catalog/view/theme/themeXXX/template/common/header.tpl
可以找到menu代码块，例如default主题下的header.tpl
```
<div id="top-links" class="nav pull-right">
  <ul class="list-inline">
    <li><a href="<?php echo $contact; ?>"><i class="fa fa-phone"></i></a> <span class="hidden-xs hidden-sm hidden-md"><?php echo $telephone; ?></span></li>
    <li class="dropdown"><a href="<?php echo $account; ?>" title="<?php echo $text_account; ?>" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> <span class="hidden-xs hidden-sm hidden-md"><?php echo $text_account; ?></span> <span class="caret"></span></a>
      <ul class="dropdown-menu dropdown-menu-right">
        <?php if ($logged) { ?>
        <li><a href="<?php echo $account; ?>"><?php echo $text_account; ?></a></li>
        <li><a href="<?php echo $order; ?>"><?php echo $text_order; ?></a></li>
        <li><a href="<?php echo $transaction; ?>"><?php echo $text_transaction; ?></a></li>
        <li><a href="<?php echo $download; ?>"><?php echo $text_download; ?></a></li>
        <li><a href="<?php echo $logout; ?>"><?php echo $text_logout; ?></a></li>
        <?php } else { ?>
        <li><a href="<?php echo $register; ?>"><?php echo $text_register; ?></a></li>
        <li><a href="<?php echo $login; ?>"><?php echo $text_login; ?></a></li>
        <?php } ?>
      </ul>
    </li>
    <li><a href="<?php echo $wishlist; ?>" id="wishlist-total" title="<?php echo $text_wishlist; ?>"><i class="fa fa-heart"></i> <span class="hidden-xs hidden-sm hidden-md"><?php echo $text_wishlist; ?></span></a></li>
    <li><a href="<?php echo $shopping_cart; ?>" title="<?php echo $text_shopping_cart; ?>"><i class="fa fa-shopping-cart"></i> <span class="hidden-xs hidden-sm hidden-md"><?php echo $text_shopping_cart; ?></span></a></li>
    <li><a href="<?php echo $checkout; ?>" title="<?php echo $text_checkout; ?>"><i class="fa fa-share"></i> <span class="hidden-xs hidden-sm hidden-md"><?php echo $text_checkout; ?></span></a></li>
  </ul>
</div>
```
可以看到，每一个li标签都是一个菜单，如果有二级菜单的话继续添加div+ul+li
以下是一个完整的自定义菜单
```
<li><a class="<?php if ((isset($this->request->get['route']) && $this->request->get['route']=="information/information") && (isset($this->request->get['information_id']) && $this->request->get['information_id']=="13")) {echo "active";} ?>" href="http://templatetesting.com/vincent/index.php?route=information/information&information_id=13">My Menu</a></li>
```
当然可以更加简单点
```
<li><a href="your link">My Menu</a></li>
```
注意别忘记了还有小屏幕版本的menu，一般class是dropdown/phone的是小屏幕版本的menu。

---

其实修改menu是很简单的，这个算是入门吧。
参考文章：[OpenCart. How to add a new content page and link it to a new menu tab](http://www.templatemonster.com/help/opencart-how-to-add-a-new-content-page-and-link-it-to-a-new-menu-tab-based-on-bootstrap-templates.html#prettyPhoto)