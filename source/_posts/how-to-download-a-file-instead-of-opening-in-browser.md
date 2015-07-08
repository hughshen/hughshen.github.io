title: 强制下载文件而不是在浏览器中打开
date: 2015-07-08 21:25:57
categories: HTML
tags:
- javascript
---

最近工作中项目要求这样一个功能：上传文件（例如pdf）到wordpress中，分别给文件两个点击链接，一个是view now，一个是download，view now的功能容易实现，一个a标签链接就行，而download一时间觉得难搞，又不想安装插件。。。还是万能的google解决了这个问题。

<!--more-->

一开始，还是想用php来解决，想法是添加shortcode来实现，但是。。。
```
//add custom shortcode
add_shortcode('download', 'download_function');
function download_function () {
	$file = 'test.pdf';
	if (file_exists($file)) {
		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename='.basename($file));
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($file));
		readfile($file);
		exit;
	}
}
```
然而这并不能运行，我想是我的代码有问题。。。*（有空要搞清楚）*
google发现也有人跟我有一样的需求，不过提出的问题已经过去四年了。。。在回复中有人给出了思路
问题post在这里：[Two kinds of links for pdf, view online OR download](https://wordpress.org/support/topic/two-types-of-links-for-pdf-view-online-or-download)
回复中给出的思路有两个：一种是php header与file_get_contents结合，与readfile差不多，不过未能实现。
另一种是使用.htaccess来实现，具体是在文件中添加如下代码
```
AddType application/pdf
AddType application/octet-stream .pdf
```
具体没去试过。
这时想到用html来试试看行不行，还真找到了方法，而且方法也简单。
原来html5有个神奇的属性，看代码
```
<a href="http://link/to/file" download="test.pdf">Download it</a>
```
吓了一跳，这么简单。。。。
不过有限制，并不是所有浏览器都能使用download这个属性（not work in IE/Safari），具体看：[Download attribute](http://caniuse.com/#search=download)
除了download这属性外，还能使用js来实现
```
<html>
<head>
<script>
function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var evt = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        save.dispatchEvent(evt);

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE < 11
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}
</script>
</head>
<body>
<a href="javascript:SaveToDisk('test.html', 'testtest.html');">Download this</a>
</body>
</html>
```
可以在chrome中实现。
就这一简单的功能，都能折腾那么久，还需要加倍努力充电！！！

---

来一首[Fight Song](http://music.163.com/#/song?id=29803675)：)
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="http://music.163.com/outchain/player?type=2&id=29803675&auto=0&height=66"></iframe>

---

问题过程中使用到的链接，感谢作者
[Force download a pdf link using javascript/ajax/jquery](http://stackoverflow.com/questions/3077242/force-download-a-pdf-link-using-javascript-ajax-jquery/30714824#30714824)
[(HTML) Download a PDF file instead of opening them in browser when clicked](http://stackoverflow.com/questions/6794255/html-download-a-pdf-file-instead-of-opening-them-in-browser-when-clicked)
[HTML5 download Attribute](http://davidwalsh.name/download-attribute)
扩展阅读：[Save files on disk using JavaScript or JQuery!](http://muaz-khan.blogspot.fr/2012/10/save-files-on-disk-using-javascript-or.html)