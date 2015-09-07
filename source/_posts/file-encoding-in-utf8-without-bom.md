title: 带BOM的UTF-8文件输出问题
date: 2015-09-05 19:56:06
categories: PHP
tags:
- vim
---

今天在做wordpress主题时，输出首页发现顶部始终会有一部分显示空白，F12发现，`head`标签部分的内容包括`title`，`meta`均包含在`body`标签内，而`body`的顶部始终有这样一个字串`&#65279`，觉得很奇怪，google之后才发现原来是文件保存编码的问题，把文件保存为`utf-8 without bom`就可以了。

<!--more-->

具体BOM是什么，可以google去找找：)

一般来说，utf-8的网页代码不应使用bom，否则就会出现上述情况。

修改文件保存编码很简单，有sublime text的话点击file菜单就能找到。

在vim下的操作，作个记录。
```
" 保存为utf-8 without bom
:setlocal nobomb 
" 查看当前文件是否有bom
:setlocal bomb?
" 下面两个也可以，一个是设置当前没有bom，另一个有bom
:set nobomb
:set bomb
```

参考链接
[为什么这个网页代码&lt;head&gt;内的信息会被浏览器理解为在&lt;body&gt;内？](http://www.zhihu.com/question/20138814)
[「带 BOM 的 UTF-8」和「无 BOM 的 UTF-8」有什么区别？网页代码一般使用哪个？](http://www.zhihu.com/question/20167122)
[Why is &#65279 appearing in my HTML?](http://stackoverflow.com/questions/9691771/why-is-65279-appearing-in-my-html)
[How can I use vim to convert my file to utf8?](http://stackoverflow.com/questions/9310274/how-can-i-use-vim-to-convert-my-file-to-utf8)
[How to display and remove BOM in utf-8 encoded file](http://vim.1045645.n5.nabble.com/How-to-display-and-remove-BOM-in-utf-8-encoded-file-td4681708.html)