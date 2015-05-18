title: Ubuntu下安装R及RStudio
date: 2015-03-28 20:50:56
categories: DataMining
tags:
- ubuntu
- R
- RStudio
---

## 安装R
添加以下任意一个到 */etc/apt/sources.list*
```
deb http://<my.favorite.cran.mirror>/bin/linux/ubuntu utopic/
deb http://<my.favorite.cran.mirror>/bin/linux/ubuntu trusty/
deb http://<my.favorite.cran.mirror>/bin/linux/ubuntu precise/
deb http://<my.favorite.cran.mirror>/bin/linux/ubuntu lucid/
```
<!--more-->
更新源然后安装
```bash
 sudo apt-get update
 sudo apt-get install r-base r-base-dev
```
如果出现 *GPG 错误* 的话，继续终端输入
```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9
```
另外，在其他类似的情况也可以这样解决，例如报错 *... 73E6B0FAA42A6CF5*，就取后面的八位 *A42A6CF5*，然后使用上面的命令并替换就行

安装完之后在终端输入 *R* 查看是否安装成功 [具体](http://mirrors.opencas.cn/cran/)

## 安装RStudio Server
*RStudio* 直接下载 *deb* 包用 *dpkg* 安装就行
对于 *RStudio Server*
```bash
sudo apt-get install gdebi-core
sudo apt-get install libapparmor1 # Required only for Ubuntu, not Debian
wget http://download2.rstudio.org/rstudio-server-0.98.1103-i386.deb
sudo gdebi rstudio-server-0.98.1103-i386.deb
```
安装完之后在浏览器输入 *localhost:8787*，输入用户和密码就能使用 [具体](http://www.rstudio.com/products/rstudio/download-server/)
