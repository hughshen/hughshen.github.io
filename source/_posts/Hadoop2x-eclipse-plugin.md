title: Hadoop2x-eclipse-plugin编译
date: 2015-04-22 21:32:44
categories: DataMining
tags:
- hadoop
- eclipse
---

###到 [Github](https://github.com/winghc/hadoop2x-eclipse-plugin)下载文件并解压
然后进入 *release* 文件夹把2.6.0版本的复制到 *eclipse* 的插件文件夹就行

<!--more-->

```bash
sudo cp hadoop2x-eclipse-plugin/release/hadoop-eclipse-plugin-2.6.0.jar /usr/lib/eclipse/plugins/
```
*/usr/lib/eclipse/plugins/* 在 *eclipse* 安装目录下
安装完之后打开 *eclipse* 进行设置
> 1.打开window===>prefernces,找到Hadoop Map/Reduce选项卡
> 2.配置hadoop installation directory目录，指向hadoop的安装目录
> 3.打开window====>show view====>other，找到Map/Reduce Locations，使其显示
> 4.在Map/Reduce Locations右键=====>new hadoop locations
> 5.host填写localhost或者其他ip，map/red====>port:50020，hdfs====>port:9000

###自行编译（失败，做个记录）
```bash
cd src/contrib/eclipse-plugin
ant jar -Dversion=2.6.0 -Dhadoop.version=2.6.0 -Declipse.home=/usr/lib/eclipse -Dhadoop.home=/usr/local/hadoop
```
编译成功的话文件会在 *${hadoop2x-eclipse-plugin}/build/contrib/eclipse-plugin/hadoop-eclipse-plugin-2.4.1.jar*。
**说明**
> 1.version: plugin版本
> 2.hadoop.version: 需要编译的的hadoop版本
> 3.eclipse.home: eclipse安装路径，这里是 /usr/lib/eclipse，参考4（需要手动安装的eclipse，通过命令行一键安装的不行？）
> 4.hadoop.home: hadoop安装路径，这里是 /usr/local/hadoop

参考 [1](http://aub.iteye.com/blog/2162155?utm_source=tuicool)，[2](http://www.tuicool.com/articles/qY7F3q)，[3](http://www.aboutyun.com/thread-8780-1-1.html)，[4](http://blog.csdn.net/ggz631047367/article/details/42497557)

