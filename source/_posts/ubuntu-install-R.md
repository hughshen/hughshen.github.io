title: Ubuntu下安装R及RStudio
date: 2015-03-28 20:50:56
categories: 学习
tags:
- Ubuntu
- R
- RStudio
---

## 安装R
添加以下任意一个到`/etc/apt/sources.list`
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
如果出现`GPG 错误`的话，继续终端输入
```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9
```
另外，在其他类似的情况也可以这样解决，例如报错`... 73E6B0FAA42A6CF5`，就取后面的八位`A42A6CF5`，然后使用上面的命令并替换就行。

安装完之后在终端输入`R`查看是否安装成功。 [具体](http://mirrors.opencas.cn/cran/)

---

## 安装RStudio
RStudio直接下载`deb`包用`dpkg`安装就行，对于RStudio Server [具体](http://www.rstudio.com/products/rstudio/download-server/)
```bash
sudo apt-get install gdebi-core
sudo apt-get install libapparmor1 # Required only for Ubuntu, not Debian
wget http://download2.rstudio.org/rstudio-server-0.98.1103-i386.deb
sudo gdebi rstudio-server-0.98.1103-i386.deb
```
安装完之后，可以使用，但是有两个小问题。 

1.编辑`Source`文件不能保存，弹出`no such file or dir`错误。

解决：找到`RStudio`的启动文件，然后修改其用户权限` chmod   u+s   ***（可执行文件名）`；或者在建立`workspace`文件夹的时候，直接建立，不要使用`sudo`。

2.安装包失败，显示`installation of package 'XML' had non-zero exit status`或者`package 'rvest' is not available (for R version 3.1.3)`

解决：原因是这些包依赖了特别的库 [参考](http://www.linuxidc.com/Linux/2012-07/65078.htm)
> * Cairo：`sudo apt-get install libcairo2-dev libxt-dev`
> * cairoDevice：`sudo apt-get install r-cran-cairoDevice`
> * rgl：`sudo apt-get install r-cran-rgl`
> * fftw：`sudo apt-get install libfftw3-dev`
> * rcdd：`sudo apt-get install libgmp3-dev`
> * rgdal：`sudo apt-get install libgdal-dev libproj-dev`
> * XML：`sudo apt-get install libxml++2.6-dev`
> * rimages：`sudo apt-get install fftw-dev fftw2`
> * RCurl：`sudo apt-get install libcurl4-gnutls-dev`，不行的话再安装`libcurl4-openssl-dev`

最后`install.packages("xxx")`即可



 



