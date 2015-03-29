title: Ubuntu1404下安装Hadoop2.6.0
date: 2015-03-29 16:42:24
categories: 学习
tags:
- Ubuntu
- Hadoop
---

安装过程参考[1](http://www.cnblogs.com/kinglau/p/3794433.html)，[2](http://www.cnblogs.com/kinglau/p/3796164.html)，感谢原[作者](http://home.cnblogs.com/u/kinglau/)。本文用作记录。
## 单机模式
### 创建用户组和用户并添加权限
```bash
sudo addgroup hadoop
sudo adduser -ingroup hadoop hadoop
```
<!--more-->
要求密码就输入密码，其他回车就行。

编辑`/etc/sudoers`，在`root`下面添加`hadoop	ALL=(ALL:ALL) ALL`

最后使用创建的用户重新登录系统

### SSH配置与JAVA 环境
```bash
# 安装SSH
sudo apt-get install openssh-server
# 启动SSH服务
sudo /etc/init.d/ssh start
# 设置免密码登录，生成私钥和公钥
ssh-keygen -t rsa -P ""
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
# 登录SSH
ssh localhost
# 退出
exit
# 接下来安装JAVA
sudo apt-get install openjdk-7-jdk
# 查看是否安装成功
java -version
```

### 配置Hadoop2.6.0

到[这里](http://mirror.bit.edu.cn/apache/hadoop/common/)下载Hadoop。

解压并复制文件夹到想安装的位置
```bash
sudo tar xzf hadoop-2.6.0.tar.gz
sudo mv hadoop-2.6.0 /usr/local/hadoop
# 修改文件夹读写权限
sudo chmod 775 /usr/local/hadoop
```

**原文是`774`，但是后来`cd`到`hadoop`提示没有权限（不知道什么原因）。**

设置JAVA_HOME环境变量
```bash
# 查看JAVA安装路径
update-alternatives - -config java
```
显示`/usr/lib/jvm/java-7-openjdk-i386/jre/bin/java`，取其中的`/usr/lib/jvm/java-7-openjdk-i386`

修改`~/.bashrc`文件。
```
#HADOOP VARIABLES START
export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-i386
export HADOOP_INSTALL=/usr/local/hadoop
export PATH=$PATH:$HADOOP_INSTALL/bin
export PATH=$PATH:$HADOOP_INSTALL/sbin
export HADOOP_MAPRED_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_HOME=$HADOOP_INSTALL
export HADOOP_HDFS_HOME=$HADOOP_INSTALL
export YARN_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_INSTALL/lib/native
export HADOOP_OPTS="-Djava.library.path=$HADOOP_INSTALL/lib"
#HADOOP VARIABLES END
```
```bash
# 使环境变量生效。
source ~/.bashrc
```

编辑`/usr/local/hadoop/etc/hadoop/hadoop-env.sh`，找到`JAVA_HOME`变量`修改为
```
export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64
```
### WordCount测试

单机模式安装完成，下面通过执行Hadoop自带实例WordCount验证是否安装成功
`/usr/local/hadoop`路径下创建`input`文件夹，并添加文件   
```bash
sudo mkdir input
sudo cp README.txt input
```
**明明已经给`hadoop`添加权限了，但是还是需要`sudo`，，，**

执行WordCount，注意Hadoop的版本要正确，这里是`2.6.0`
```bash
bin/hadoop jar share/hadoop/mapreduce/sources/hadoop-mapreduce-examples-2.6.0-sources.jar org.apache.hadoop.examples.WordCount input output
# 执行完之后查看结果
cat output/*
```

---

## 伪分布模式
### 配置xml文件
文件均在`/usr/local/hadoop/etc/hadoop/`

在`<configuration></configuration>`之间增加内容

`core-site.xml`包含了Hadoop启动时的配置信息。
```
<property>
        <name>fs.default.name</name>
        <value>hdfs://localhost:9000</value>
</property>
```
`yarn-site.xml`包含了MapReduce启动时的配置信息。
```
<property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
</property>
<property>
        <name>yarn.nodemanager.aux-services.mapreduce.shuffle.class</name>
        <value>org.apache.hadoop.mapred.ShuffleHandler</value>
</property>
```
`mapred-site.xml`用于指定MapReduce使用的框架
```bash
cd /usr/local/hadoop/etc/hadoop
cp mapred-site.xml.template mapred-site.xml 
```
```
<property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
</property>
```
`hdfs-site.xml`用来配置集群中每台主机都可用，指定主机上作为`namenode`和`datanode`的目录。
```bash
cd /usr/local/hadoop/etc/hadoop
sudo mkdir hdfs
sduo mkdir hdfs/name
sduo mkdir hdfs/data
```
可以在别的路径下创建`name`和`data`文件夹，名称也可以与不同，但是需要和`hdfs-site.xml`中的配置一致。
```
<property>
        <name>dfs.replication</name>
        <value>1</value>
</property>
<property>
        <name>dfs.namenode.name.dir</name>
        <value>file:/usr/local/hadoop/hdfs/name</value>
</property>
<property>
        <name>dfs.datanode.data.dir</name>
        <value>file:/usr/local/hadoop/hdfs/data</value>
</property>
```
### 启动Hadoop
首先格式化hdfs
```bash
hdfs namenode -format
# 原文没有这个
hdfs datanode -format
```
只需要执行一次即可，如果在Hadoop已经使用后再次执行，会清除掉`hdfs`上的所有数据。

经过上文所描述配置和操作后，下面就可以启动这个单节点的集群，注意在`/usr/local/hadoop/etc/hadoop`
```bash
sbin/start-dfs.sh
# 执行该命令时，如果有yes /no提示，输入yes，回车即可。
sbin/start-yarn.sh
# jps命令，可以查看Hadoop相关的进程，一般有NameNode,SecondaryNameNode,DataNode,JPS,NodeManager
jps
```
**中途如果出现`root@localhost's password:`，可以把`hadoop`文件夹的所有者与用户修改为`hadoop`**
```bash
sudo chown hadoop:hadoop /usr/local/hadoop
```
在浏览器中输入`localhost:50070`，会看到hdfs管理页面；`localhost:8088`，会看到hadoop进程管理页面。

### WordCount验证
`/usr/local/hadoop/etc/hadoop`下运行
```bash
# dfs上创建input目录
bin/hadoop fs -mkdir -p input
# 把hadoop目录下的README.txt拷贝到dfs新建的input里
hadoop fs -copyFromLocal README.txt input
# 运行WordCount
hadoop jar share/hadoop/mapreduce/sources/hadoop-mapreduce-examples-2.6.0-sources.jar org.apache.hadoop.examples.WordCount input output
# 查看单词统计结果
hadoop fs -cat output/*
```

---

**虽然配置好了Hadoop，但是接下来还有很多要学习的，，，最后再次感谢原[作者](http://home.cnblogs.com/u/kinglau/)**