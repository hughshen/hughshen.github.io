title: Hexo从3.0.0升级到3.1.1之后代码高亮失效
date: 2015-08-23 14:03:41
categories: Blog
tags:
- hexo
---

今天把系统重装了，安装了hexo并把文章同步之后，发现代码高亮失效了，具体就是代码行数只有1,代码有些关键字不能高亮显示，整个样式为文本，并没对内容进行解析。
一开始还以为是主题原因，但是试过其他主题之后还是一样，最后觉得应该是_config.yml的问题，应该在恢复备份的时候直接覆盖了，一些配置没有填好。

<!--more-->

之后又重新建立一个文件夹，并`hexo init`之后，观察初始化的_config.yml，发现填漏了一个配置项`auto_detect: true`，这个选项应该指开启检测代码高亮，加上之后，代码高亮显示正常。
具体配置
```
highlight:
  enable: true
  line_number: true
  auto_detect: true
  tab_replace:
```
PS：tab_replace是指把tab替换，如果是2空格的话，直接冒号后面加上3个空格，不要填2，因为这样会直接替换为'2'的。

