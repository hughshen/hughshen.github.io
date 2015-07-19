title: qTranslate-X自定义字段多语言
date: 2015-07-08 22:27:25
categories: PHP
tags:
- wordpress
---

这个其实看官方FAQ就好了，做个记录吧。
[How do I translate custom configuration fields, which are not handled by language switch buttons?](https://qtranslatexteam.wordpress.com/faq/)

格式很简单，FAQ说得很清楚了，这里介绍一个简洁点的。
```
[:en]English Text[:zh]Chinese[:]
```

<!--more-->

---

2015-07-09
还以为上面的写法已经够用了呢，谁知在html上失效了。
google找到了另一个写法，解决了问题。
```
<?php _e("<!--:en-->english text<!--:--><!--:zh-->chinese text<!--:-->"); ?>
```
参考文章：[Writing html in the template file with multiple languages](https://wordpress.org/support/topic/plugin-qtranslate-writing-html-in-the-template-file-with-multiple-languages)

以下是今天使用的例子，目的是修改qtranslate-x插件原来text的显示，使文字统一为中文或者英文。
```
<script type="text/javascript">
	jQuery(document).ready(function(){
		// qtranslate-x
		$('ul.qtranxs_language_chooser li a[hreflang="en"] span').text('<?php _e("<!--:en-->ENG<!--:--><!--:zh-->英文<!--:-->"); ?>');
		$('ul.qtranxs_language_chooser li a[hreflang="zh"] span').text('<?php _e("<!--:en-->CHI<!--:--><!--:zh-->中文<!--:-->"); ?>');
	});
</script>
```

---

2015-07-18
虽然之前的_e()解决了问题，但是输出格式不是想要的，_e()会直接换行，google发现以下这种写法，可以满足需求。
```
<?php __("<!--:en-->english text<!--:--><!--:zh-->chinese text<!--:-->"); ?>
```
阅读：[https://wordpress.org/support/topic/_-_e-and-_xwhats-the-difference-are-there-more](https://wordpress.org/support/topic/_-_e-and-_xwhats-the-difference-are-there-more)