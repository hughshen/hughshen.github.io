title: Vim使用笔记
date: 2015-05-17 14:19:24
categories: Note
tags:
- vim
---

### 多个文件中查找
语法：`:vim[grep][!] /{pattern}/[g][j] {file}`
例子：
`:vimgrep /class/ *.php` #当前文件夹下（不包括子文件夹）所有php文件中搜索class字符串
`:vimgrep /class/ */**/*` #当前文件夹下（包括所有子文件夹）所有文件
查看：`:copen`

<!--more-->

### 统计字符数
normal 模式下：`g<C-g>`

### 打开多个窗口
水平分割：`:split`或`:sp`
垂直分割：`:vsplit`或`:vs`
保留当前：`:only`
关闭所有：`:qall`

### 快速删除括号中的内容
normal 模式下：`ci`加`(、{、[、<、'、"`，能够删除其中的内容并进入insert模式