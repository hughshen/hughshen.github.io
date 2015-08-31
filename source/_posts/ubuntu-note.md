title: Ubuntu使用笔记
date: 2015-03-29 16:28:10
categories: Note
tags:
- ubuntu
---

### 目录文件夹名称改为英文
```bash
export LANG=en_US
xdg-user-dirs-gtk-update
```
在弹出的窗口中询问是否将目录转化为英文路径，同意并关闭，然后改回中文 *epxort LANG=zh_CN* 重启就行
<!--more-->

### Dos、Unix文件编码转换 [参考](https://kb.iu.edu/d/acux)
1.*vim*
```
:set ff=unix #转换为 Unix
:set ff=dos #转换为 Windows
```
2.*vi*
 ```
:1,$s/^M//g #移除 ^M 字符，为了输入 ^M，需要先 Ctrl-v , 然后 Enter 或者 return
```
3.使用工具*dos2unix*,*unix2dos*
```
dos2unix winfile.txt unixfile.txt
unix2dos unixfile.txt winfile.txt
```

### 查看文件夹大小
1.查看分区情况
```
df -h
```
2.查看文件或文件夹大小
```
du -h --max-depth=1
```
*-h* 人类可读，比如显示 *MB*，*GB* 等等。
*--max-depth=N* 指定目录层数，如果是当前文件夹占用空间，*N=0* 即可，如果是当前目录及下一级目录，*N=1* 即可。

### 终端下调节音量 [参考](http://linux.cn/thread-13254-1-1.html)
```bash
alsamixer
```
上下调节音量，左右选择设备，*Esc* 退出。

### 修正时区
```bash
mv /etc/localtime /etc/localtime.old
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime # 修改默认时区为上海
```