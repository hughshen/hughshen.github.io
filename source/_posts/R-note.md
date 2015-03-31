title: R使用笔记
date: 2015-03-31 14:51:47
categories: 学习
tags:
  - R
---

### *No such file or directory*
解决：找到 *RStudio* 的启动文件，然后修改其用户权限 *chmod   u+s   filename*；或者在建立 *workspace* 文件夹的时候，直接建立，不要使用 *sudo*

<!--more-->

### *install.packages()*
例如显示 *installation of package 'XML' had non-zero exit status* 或者 *package 'rvest' is not available (for R version 3.1.3)* 等等

解决：原因是这些包依赖了特别的库，具体参考 [1](http://www.linuxidc.com/Linux/2012-07/65078.htm)，[2](http://rattle.togaware.com/rattle-install-troubleshooting.html)
> * Cairo：*sudo apt-get install libcairo2-dev libxt-dev*
> * cairoDevice：*sudo apt-get install r-cran-cairoDevice*
> * rgl：*sudo apt-get install r-cran-rgl*
> * fftw：*sudo apt-get install libfftw3-dev*
> * rcdd：*sudo apt-get install libgmp3-dev*
> * rgdal：*sudo apt-get install libgdal-dev libproj-dev*
> * XML：*sudo apt-get install libxml++2.6-dev*
> * rimages：*sudo apt-get install fftw-dev fftw2*
> * RCurl：*sudo apt-get install libcurl4-gnutls-dev*，不行的话再安装 *libcurl4-openssl-dev*
> * RGtk2：*sudo apt-get install libgtk2.0-dev*，安装 *rattle* 时提示 *GTK version 2.8.0 required*，但是运行 *rattle()* 时界面不能使用（无响应）
> * 最后 *install.packages("xxx")* 即可