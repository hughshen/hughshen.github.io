title: Ubuntu使用笔记
date: 2015-03-29 16:28:10
categories: 学习
tags:
- Ubuntu
---

### 目录文件夹名称改为英文
```bash
export LANG=en_US
xdg-user-dirs-gtk-update
```
在弹出的窗口中询问是否将目录转化为英文路径，同意并关闭，然后改回中文 *epxort LANG=zh_CN* 重启就行
<!--more-->

### Dos、Unix文件编码转换 [参考](https://kb.iu.edu/d/acux)
1. *vim*
 > `:set ff=unix` 转换为*Unix*，`:set ff=dos`转换为*Windows*
2. *vi*
 > 使用`:1,$s/^M//g`来移除*^M*字符，为了输入*^M*，需要先*Ctrl-v*, 然后*Enter*或者*return*.
3. 使用工具*dos2unix*,*unix2dos*
 > `dos2unix winfile.txt unixfile.txt`，`unix2dos unixfile.txt winfile.txt`