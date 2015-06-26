title: WordPress创建Portfolio时选取Gallery或者Slidershow格式
date: 2015-06-26 22:49:10
categories: PHP
tags:
- wordpress
---

在发表portfolio时明明选择了slidershow格式，也上传了图片，但是并没有slidershow的效果，而默认的模板里并没有看到有图片发表或者上传，一直没搞懂是如何做到了，还是在google上找到答案了，具体看[这里](http://www.templatemonster.com/help/wordpres-how-to-create-portfolio-galleryslider-post.html)

<!--more-->

第一步：在发表时需要选择slidershow format；

第二步：然后在post内容页点击add media按钮；

第三步：在弹出的窗口中，选择好需要上传的图片（可以拖动增加图片，还有是不能选择media library里面已有的图片的，需要重新从电脑里上传），但是有一点需要注意，有一个下拉框，需要选择uploaded to this page（这个很重要，只有选择了这个并上传的图片才会显示在slidershow当中），上传好之后post内容页会显示刚刚上传的图片，先不要管，直接点击publish；

第四步：publish之后可以到前台查看是否已经可以正常显示slidershow，一般是可以的了，然后可以到后台把post内容页不需要的图片去掉，这不影响slidershow的图片的，最后再次publish就行了。

---
还有一个gallery format的也是类似的做法。